// watch类，每个effect对应一个watch，watch对应多个reactive对象，每个reactive对象改变会通知所有effect执行
import {getCurrentWatch, setCurrentWatch} from "./cache";

export class Watch {

  // 是否活跃
  private __active: boolean = true
  public get active() {return this.__active}
  public set active(v) {
    this.__active = v
    this.clearDep()
  }

  // 父watch
  protected parent: null|Watch = null

  // 绑定的run
  private readonly fn: Function

  // 所有依赖于该watch的变量
  public __allDep: Set<Set<Watch>> = new Set<Set<Watch>>()

  // 构造器
  constructor(fn: Function) {
    this.fn = fn
  }

  private clearDep() {
    // 先清空之前的依赖
    [...this.__allDep].forEach(arr => arr.clear())
    this.__allDep = new Set
  }

  public run() {
    // 入栈父元素
    this.parent = getCurrentWatch()
    // 如果活越则收集依赖
    if (this.active) setCurrentWatch(this)
    else setCurrentWatch(null)
    // 先清空依赖
    this.clearDep()
    // 执行用户函数
    try {
      this.fn()
    } catch (e) {throw e} finally {
      // 出栈父元素
      setCurrentWatch(this.parent)
      this.parent = null
    }
  }

}