import { AsyncSeriesWaterfallHook, SyncWaterfallHook } from 'tapable';
import { Command } from './command';
import { Plugin } from './plugin';
import { Hook } from './hook';
import { PluginAPI } from './pluginAPI';
import presetPlugin from './presetPlugin';
import { IModify, ApplyPluginsType, IAdd } from '../types';

interface IOpts {
  plugins?: { id?: string; key: string; apply: Plugin['apply'] }[];
  // cwd: string;
  // env: Env;
  // plugins?: string[];
  // presets?: string[];
  // frameworkName?: string;
  // defaultConfigFiles?: string[];
}

export class Service {
  opts: IOpts;

  // { name: 命令 }。eg { dev: Command, build: Command }
  commands: Record<string, Command> = {};

  // { key: hooks[] } 把 hook 按照 key 分组。eg: { modifyConfig: hook[], addXxx: hook[] }
  hooks: Record<string, Hook[]> = {};

  // { id: plugin } 方便根据 id 找 plugin
  plugins: Record<string, Plugin> = {};

  // { key: plugin } 方便根据 key 找 plugin
  keyToPluginMap: Record<string, Plugin> = {};

  // { 方法名: { 插件 和 函数 } } // 注册方法。eg: { modifyConfig: { plugin, fn }, }
  pluginMethods: Record<string, { plugin: Plugin; fn: Function }> = {};

  constructor(opts: IOpts = {}) {
    this.opts = opts;
  }

  isPluginEnable(hook: Hook | string) {
    return true;
  }

  // 使用插件
  applyPlugins(opts: {
    key: string;
    type?: ApplyPluginsType;
    initialValue?: any;
    args?: any;
    sync?: boolean;
  }) {
    const hooks = this.hooks[opts.key] || [];
    let { type } = opts;
    // guess type from key
    if (!type) {
      if (opts.key.startsWith('on')) {
        type = ApplyPluginsType.event;
      } else if (opts.key.startsWith('modify')) {
        type = ApplyPluginsType.modify;
      } else if (opts.key.startsWith('add')) {
        type = ApplyPluginsType.add;
      } else {
        throw new Error(
          `Invalid applyPlugins arguments, type must be supplied for key ${opts.key}.`
        );
      }
    }
    switch (type) {
      case ApplyPluginsType.add:
        const tAdd = new AsyncSeriesWaterfallHook(['memo']);
        for (const hook of hooks) {
          if (!this.isPluginEnable(hook)) continue;
          tAdd.tapPromise(
            {
              name: hook.plugin.key,
              stage: hook.stage || 0,
              before: hook.before,
            },
            async (memo: any) => {
              const dateStart = new Date();
              const items = await hook.fn(opts.args);
              // hook.plugin.time.hooks[opts.key] ||= [];
              hook.plugin.time.hooks[opts.key] =
                hook.plugin.time.hooks[opts.key] || [];
              hook.plugin.time.hooks[opts.key].push(
                new Date().getTime() - dateStart.getTime()
              );
              return memo.concat(items);
            }
          );
        }
        return tAdd.promise(opts.initialValue || []);
      case ApplyPluginsType.modify:
        const tModify = new AsyncSeriesWaterfallHook(['memo']);
        for (const hook of hooks) {
          if (!this.isPluginEnable(hook)) continue;
          tModify.tapPromise(
            {
              name: hook.plugin.key,
              stage: hook.stage || 0,
              before: hook.before,
            },
            async (memo: any) => {
              const dateStart = new Date();
              const ret = await hook.fn(memo, opts.args);
              // hook.plugin.time.hooks[opts.key] ||= [];
              hook.plugin.time.hooks[opts.key] =
                hook.plugin.time.hooks[opts.key] || [];
              hook.plugin.time.hooks[opts.key].push(
                new Date().getTime() - dateStart.getTime()
              );
              return ret;
            }
          );
        }
        return tModify.promise(opts.initialValue) as any;
      case ApplyPluginsType.event:
        if (opts.sync) {
          const tEvent = new SyncWaterfallHook(['_']);
          hooks.forEach(hook => {
            if (this.isPluginEnable(hook)) {
              tEvent.tap(
                {
                  name: hook.plugin.key,
                  stage: hook.stage || 0,
                  before: hook.before,
                },
                () => {
                  const dateStart = new Date();
                  hook.fn(opts.args);
                  // hook.plugin.time.hooks[opts.key] ||= [];
                  hook.plugin.time.hooks[opts.key] =
                    hook.plugin.time.hooks[opts.key] || [];
                  hook.plugin.time.hooks[opts.key].push(
                    new Date().getTime() - dateStart.getTime()
                  );
                }
              );
            }
          });

          return tEvent.call(1);
        }

        const tEvent = new AsyncSeriesWaterfallHook(['_']);
        for (const hook of hooks) {
          if (!this.isPluginEnable(hook)) continue;
          tEvent.tapPromise(
            {
              name: hook.plugin.key,
              stage: hook.stage || 0,
              before: hook.before,
            },
            async () => {
              const dateStart = new Date();
              await hook.fn(opts.args);
              // hook.plugin.time.hooks[opts.key] ||= [];
              hook.plugin.time.hooks[opts.key] =
                hook.plugin.time.hooks[opts.key] || [];
              hook.plugin.time.hooks[opts.key].push(
                new Date().getTime() - dateStart.getTime()
              );
            }
          );
        }
        return tEvent.promise(1) as any;
      default:
        throw new Error(
          `applyPlugins failed, type is not defined or is not matched, got ${opts.type}.`
        );
    }
  }

  async initPlugin(opts: {
    plugin: Plugin;
    plugins: Plugin[];
    presets?: Plugin[];
  }) {
    const { plugin } = opts;
    this.plugins[plugin.id] = plugin;
    this.keyToPluginMap[plugin.key] = plugin;

    // apply with PluginAPI
    const pluginAPI = new PluginAPI({
      plugin: opts.plugin,
      service: this,
    });

    pluginAPI.registerPlugins = pluginAPI.registerPlugins.bind(
      pluginAPI,
      opts.plugins
    );
    const proxyPluginAPI = PluginAPI.proxyPluginAPI({
      service: this,
      pluginAPI,
      serviceProps: ['applyPlugins'],
      staticProps: {
        // ApplyPluginsType,
        // ConfigChangeType,
        // EnableBy,
        // ServiceStage,
        service: this,
      },
    });
    const ret = await plugin.apply(proxyPluginAPI);
    return ret;
  }

  async run(args?: { name?: string }) {
    // 解析、标准化插件
    const { plugins } = Plugin.getPluginsAndPresets({
      plugins: [{ key: 'presetPlugin', apply: presetPlugin }].concat(
        (this.opts.plugins || []) as any
      ),
    });

    // 初始化插件
    await Promise.all(
      plugins.map(async plugin => {
        await this.initPlugin({ plugin, plugins });
      })
    );

    // 使用插件
    // await this.applyPlugins({
    //   key: 'modifyConfig',
    // });

    // 执行命令
    const command = this.commands[args?.name];
    if (command) {
      await command.fn({ args: {} });
    }
  }
}

export interface IServicePluginAPI {
  applyPlugins: typeof Service.prototype.applyPlugins;
  modifyProps: IModify<any, null>;
  addUIComponent: IAdd<any, any>;
  registerPresets: (presets: any[]) => void;
  registerPlugins: (plugins: (Plugin | {})[]) => void;
}
