import {Watch} from "./Watch";

// 当前绑定的watch
let CURRENT_WATCH: Watch|null = null

export function getCurrentWatch(): Watch|null {return CURRENT_WATCH}

export function setCurrentWatch(w: Watch|null) {CURRENT_WATCH = w}