import {Watch} from "../effect/Watch";

// 代理对象对应的watch
export const REF_TO_WATCH = new WeakMap<any , Map<string , Set<Watch>>>()