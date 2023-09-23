import {Watch} from "../effect/Watch";

// 已经被代理过的对象才有的键值
export const HAS_PROXY_KEY = Symbol()

// 已经代理过的对象
export const HAS_PROXY_OBJECT = new WeakMap<any , any>()

// 代理对象对应的watch
export const REACTIVE_TO_WATCH = new WeakMap<any , Map<string , Set<Watch>>>()