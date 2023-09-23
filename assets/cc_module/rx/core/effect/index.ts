import {Watch} from "./Watch";
import {EffectOption} from "./type";

// 监听函数的变化
export function effect(fn: Function , option: EffectOption = {}) {

  const watch = new Watch(fn)

  if (!option.delay) watch.run()

  return watch

}