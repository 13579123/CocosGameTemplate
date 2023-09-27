import { sys } from 'cc';
import { _decorator, Component, Node } from 'cc';
import { JSB } from 'cc/env';
import { ConfirmBox } from '../../prefab/ConfirmBox/ConfirmBox';
import { Rocker } from '../../prefab/Rocker/Rocker';
import { rx } from '../../../cc_module/rx';
const { ccclass, property } = _decorator;

@ccclass('ScenesTestCanvas')
export class ScenesTestCanvas extends Component {

    protected start(): void {
        const confirmBoxComponent = this.node.getChildByName("ConfirmBox").getComponent(ConfirmBox)
        const refTest = rx.ref(1314)
        rx.effect(() => confirmBoxComponent.message = refTest.value + '' )
        confirmBoxComponent.addCancelListen(() => refTest.value++ )
    }

}


