import { Raw, ReactionForRaw, ReactionFunction, ReactiveProxy } from "./types";

// k:v 原对象：代理对象
export const rawToProxy = new WeakMap<Raw, ReactiveProxy>();

// k:v 代理对象：原对象
export const proxyToRaw = new WeakMap<ReactiveProxy, Raw>();

export const connectionStore = new WeakMap<Raw, ReactionForRaw>();

export const reactionStack: ReactionFunction[] = [];

export const IS_REACTION = Symbol("is reaction");

export const ITERATION_KEY = Symbol("iteration key");
