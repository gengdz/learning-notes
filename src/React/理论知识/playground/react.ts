import { classComponentUpdate } from './update';

export function createElement(type, config, ...chidren) {
  let key = null;
  let ref = null;
  let props = {};

  // 处理 props
  if (config) {
    key = config.key || null;
    ref = config.ref || null;
    Reflect.deleteProperty(config, 'key');
    Reflect.deleteProperty(config, 'ref');
    props = config;
  }

  // 处理 children
  if (chidren.length > 0) {
    if (chidren.length === 1) {
      props.children = chidren[0];
    } else {
      props.children = chidren;
    }
  }

  return {
    $$typeof: Symbol('react_element'),
    type,
    key,
    ref,
    props,
  };
}

export class Component {
  props: any;

  constructor(props) {
    this.props = props;
  }

  static isReactComponent = true;

  setState(partialState) {
    classComponentUpdate(this, partialState);
  }
}

export default { createElement, Component };
