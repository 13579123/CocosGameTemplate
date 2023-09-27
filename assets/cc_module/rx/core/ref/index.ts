import { getCurrentWatch } from "../effect/cache";
import { REF_TO_WATCH } from "./cache";
import { RefData } from "./type";

// 返回一个对基本数据进行监控的响应式对象，data只能为Object外的基本数据
export function ref<T>(d: T): RefData<T> {
    if (typeof d === 'object') throw Error("data must be a base type exclude object")
    const key = "value"
    const result = {
        get value(): T {
            // 收集对应的watch
            const currentWatch = getCurrentWatch()
            if (currentWatch !== null) {
                let map = REF_TO_WATCH.get(result)
                if (!map) {
                    map = new Map
                    REF_TO_WATCH.set(result , map)
                  }
                  let set = map.get(key)
                  if (!set) {
                    set = new Set
                    map.set(key , set)
                  }
                  set.add(currentWatch)
                  currentWatch.__allDep.add(set)
            }
            return d
        },
        set value(v: T) {
            if (v === d) return
            if (typeof d === 'object') throw Error("data must be a base type exclude object")
            d = v
            let map = REF_TO_WATCH.get(result)
            if (!map) return 
            let set = map.get(key)
            if (!set) return;
            [...set].forEach(w => w.run())
        }
    }
    return result
}