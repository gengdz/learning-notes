import _ from 'lodash';
import { Service } from './service';
import { Command, IOpts as ICommandOpts } from './command';
import { Hook, IOpts as IHookOpts } from './hook';
import { Plugin } from './plugin';

interface IOpts {
  service: Service;
  plugin: Plugin;
}

export class PluginAPI {
  service: Service;
  plugin: Plugin;

  constructor(opts: IOpts) {
    this.service = opts.service;
    this.plugin = opts.plugin;
  }

  describe(opts: {
    key?: string;
    // config?: IPluginConfig;
    // enableBy?:
    //   | EnableBy
    //   | ((enableByOpts: { userConfig: any; env: Env }) => boolean);
  }) {
    this.plugin.merge(opts);
  }

  register(opts: Omit<IHookOpts, 'plugin'>) {
    this.service.hooks[opts.key] = this.service.hooks[opts.key] || [];
    // this.service.hooks[opts.key]  ||= [];
    this.service.hooks[opts.key].push(
      new Hook({ ...opts, plugin: this.plugin })
    );
  }

  registerMethod(opts: { name: string; fn? }) {
    const { name, fn } = opts;

    this.service.pluginMethods[name] = {
      plugin: this.plugin,
      fn:
        fn ||
        function(fn: Function | Object) {
          this.register({
            key: opts.name,
            ...(_.isPlainObject(fn) ? (fn as any) : { fn }),
          });
        },
    };
  }

  registerCommand(opts: Omit<ICommandOpts, 'plugin'>) {
    this.service.commands[opts.name] = new Command({
      ...opts,
      plugin: this.plugin,
    });
  }

  registerPlugins(source: Plugin[], plugins: any[]) {
    // registerPlugins 这一步先不用实现。用不到这个场景。
  }

  static proxyPluginAPI(opts: {
    pluginAPI: PluginAPI;
    service: Service;
    serviceProps: string[];
    staticProps: Record<string, any>;
  }) {
    return new Proxy(opts.pluginAPI, {
      get: (target, prop: string) => {
        if (opts.service.pluginMethods[prop]) {
          return opts.service.pluginMethods[prop].fn;
        }
        if (opts.serviceProps.includes(prop)) {
          const serviceProp = opts.service[prop];
          return typeof serviceProp === 'function'
            ? serviceProp.bind(opts.service)
            : serviceProp;
        }
        if (prop in opts.staticProps) {
          return opts.staticProps[prop];
        }
        return target[prop];
      },
    });
  }
}
