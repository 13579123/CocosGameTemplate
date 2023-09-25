import { Label } from 'cc';
import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('ConfirmBox')
export class ConfirmBox extends Component {

    @property(Label)
    private TitleLabel: Label

    private _title: string = ""
    public get title() { return this._title }
    public set title(v: string) { 
        this._title = v
        this.TitleLabel.string = this._title
    }

    @property(Label)
    private MessageLable: Label

    private _message: string = ""
    public get message() { return this._message }
    public set message(v: string) { 
        this._message = v
        this.MessageLable.string = this._message
    }

    private onCancelCallbackSet: Set<Function> = new Set

    private onConfirmCallbackSet: Set<Function> = new Set

    public addCancelListen(...callList: Function[]) {
        callList.forEach(c => this.onCancelCallbackSet.add(c))
    }

    public removeCancelListen(...callList: Function[]) {
        callList.forEach(c => this.onCancelCallbackSet.delete(c))
    }

    public addConfirmListen(...callList: Function[]) {
        callList.forEach(c => this.onConfirmCallbackSet.add(c))
    }

    public removeConfirmListen(...callList: Function[]) {
        callList.forEach(c => this.onCancelCallbackSet.delete(c))
    }

    // 取消事件
    protected onCancelClick() {
        this.onCancelCallbackSet.forEach((c) => c())
    }

    // 点击事件
    protected onConfirmClick() {
        this.onConfirmCallbackSet.forEach((c) => c())
    }

}


