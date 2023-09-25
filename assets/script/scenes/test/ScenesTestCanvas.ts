import { sys } from 'cc';
import { _decorator, Component, Node } from 'cc';
import { JSB } from 'cc/env';
import { ConfirmBox } from '../../prefab/ConfirmBox/ConfirmBox';
import { Rocker } from '../../prefab/Rocker/Rocker';
const { ccclass, property } = _decorator;

@ccclass('ScenesTestCanvas')
export class ScenesTestCanvas extends Component {

    protected start(): void {
        const confirmBoxNode = this.node.getChildByName("ConfirmBox")
        console.log(confirmBoxNode)
        confirmBoxNode.getComponent(ConfirmBox)
        .addCancelListen(() => {
            if (!confirmBoxNode.parent) return
            confirmBoxNode.parent.removeChild(confirmBoxNode)
        })
    }

}


