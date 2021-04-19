// k:v 原对象：代理过的对象
export const rawToProxyMap = new WeakMap<object, object>();

// k:v 代理过的对象：原对象
export const proxyToRawMap = new WeakMap<object, object>();

