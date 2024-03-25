import { Plugin } from './plugin';

export interface IOpts {
  plugin: Plugin;
  key: string;
  fn: Function;
  before?: string;
  stage?: number;
}

export class Hook {
  plugin: Plugin;
  key: string;
  fn: Function;
  before?: string;
  stage?: number;
  constructor(opts: IOpts) {
    this.plugin = opts.plugin;
    this.key = opts.key;
    this.fn = opts.fn;
    this.before = opts.before;
    this.stage = opts.stage || 0;
  }
}
