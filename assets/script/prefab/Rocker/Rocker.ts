import { Sprite } from 'cc';
import { SpriteFrame } from 'cc';
import { _decorator, Component, Node } from 'cc';
import { EventTouch } from 'cc';
import { UITransform } from 'cc';
import { Vec2 } from 'cc';
import { v2 } from 'cc';
import { Camera } from 'cc';
import { v3 } from 'cc';
import { CCFloat } from 'cc';
import { Input } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Rocker')
export class Rocker extends Component {

    @property(CCFloat)
    private RockerRadius: number = 70

    // UI摄像机
    @property(Camera)
    private UiCamera: Camera

    // 滑杆Sprite
    @property(Sprite)
    private RockerTumbSprite: Sprite

    // 滑杆背景Sprite
    @property(Sprite)
    private RockerBackgroundSprite: Sprite

    // 方向向量
    private _directive: Vec2 = v2(0,0)
    public get directive() { return this._directive }

    // 开始函数
    protected start(): void {
        // 设置事件
        this.node.on(Input.EventType.TOUCH_START , this.onTouchStart , this)
        this.node.on(Input.EventType.TOUCH_MOVE , this.onTouchMove , this)
        this.node.on(Input.EventType.TOUCH_END , this.onTouchComplete , this)
        this.node.on(Input.EventType.TOUCH_CANCEL , this.onTouchComplete , this)
    }

    // 销毁函数
    protected onDestroy(): void {
        // 解除事件 
        this.node.off(Input.EventType.TOUCH_START , this.onTouchStart , this)
        this.node.off(Input.EventType.TOUCH_MOVE , this.onTouchMove , this)
        this.node.off(Input.EventType.TOUCH_END , this.onTouchComplete , this)
        this.node.off(Input.EventType.TOUCH_CANCEL , this.onTouchComplete , this)
    }

    // 当触摸开始
    protected onTouchStart(e: EventTouch) {
        this.RockerBackgroundSprite.node.setScale(
            1.1 , 1.1 , 1.1
        )
    }

    // 触摸移动
    protected onTouchMove(e: EventTouch) {
        let screenPos: Vec2 = e.getLocation()
        const worldPos = this.UiCamera.screenToWorld(v3(screenPos.x , screenPos.y , 0))
        const pos = this.node.getComponent(UITransform).convertToNodeSpaceAR(worldPos)
        pos.z = 0
        const len = pos.length()
        if(len > this.RockerRadius) {
            pos.x = pos.x * this.RockerRadius / len
            pos.y = pos.y * this.RockerRadius / len
        }
        this.RockerTumbSprite.node.setPosition(pos)
        this._directive = v2(pos.x / this.RockerRadius , pos.y / this.RockerRadius)
    }

    // 触摸完成
    protected onTouchComplete(e: EventTouch) {
        this.RockerTumbSprite.node.setPosition(0 , 0 , 0)
        this.RockerBackgroundSprite.node.setScale(
            1.0 , 1.0 , 1.0
        )
        this._directive = v2(0,0)
    }

}


