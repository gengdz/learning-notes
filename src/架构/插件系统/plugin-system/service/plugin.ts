export interface IOpts {
  id?: string;
  key: string;
  apply: Function;
  config?: any;
  // enableBy?: EnableBy | (() => boolean);
}

export class Plugin {
  private cwd?: string;

  // type: PluginType;
  path?: string;

  // 插件的唯一标识
  id?: string;

  // 进行插件配置时的键名
  key: string;

  // 插件的函数
  apply: Function;

  config? = {};
  time?: {
    register?: number;
    hooks: Record<string, number[]>;
  } = { hooks: {} };
  // enableBy:
  //   | EnableBy
  //   | ((opts: { userConfig: any; config: any; env: Env }) => boolean) =
  //   EnableBy.register;
  constructor(opts: IOpts) {
    this.id = opts.id;
    this.key = opts.key;
    this.apply = opts.apply;
  }

  merge(opts: { key?: string; config?: any; enableBy?: any }) {
    if (opts.key) this.key = opts.key;
    // if (opts.config) this.config = opts.config;
    // if (opts.enableBy) this.enableBy = opts.enableBy;
  }

  static getPluginsAndPresets(opts: {
    plugins?: { id?: string; key: string; apply: Function }[];
    presets?: { id?: string; key: string; apply: Function }[];
  }) {
    function get(type: 'plugin' | 'preset') {
      const types = `${type}s` as 'plugins' | 'presets';
      return [
        // opts
        ...(opts[types] || []),
      ].map(plugin => {
        return new Plugin({ ...plugin });
      });
    }

    return {
      presets: get('preset'),
      plugins: get('plugin'),
    };
  }
}
