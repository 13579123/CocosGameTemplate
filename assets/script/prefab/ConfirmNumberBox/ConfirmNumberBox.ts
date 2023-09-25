import { EditBox } from 'cc';
import { EventHandler } from 'cc';
import { Label } from 'cc';
import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('ConfirmNumberBox')
export class ConfirmNumberBox extends Component {

    @property(EditBox)
    private NumberEditBox: EditBox

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

    private _maxNumber: number = 999999
    public get maxNumber() { return this._maxNumber }
    public set maxNumber(v: number) {
        if (v < this._minNumber) return
        this._maxNumber = v
        if (this.inputNumber > this._maxNumber)
            this.inputNumber = this._maxNumber
    }

    private _minNumber: number = -999999
    public get minNumber() { return this._minNumber }
    public set minNumber(v: number) {
        if (v > this._maxNumber) return
        this._minNumber = v
        if (this.inputNumber < this._minNumber)
            this.inputNumber = this._minNumber
    }

    private onCancelCallbackSet: Set<Function> = new Set

    private onConfirmCallbackSet: Set<Function> = new Set

    // 最新的输入值
    private _inputNumber: number = 0
    public get inputNumber() { return this._inputNumber }
    public set inputNumber(v: number) {
        if (v > this._maxNumber) v = this._maxNumber
        if (v < this._minNumber) v = this._minNumber
        this._inputNumber = v
        this.NumberEditBox.string = this._inputNumber + ''
    }

    public onEditingDidEnded() {
        const currentEidtNumber = parseInt(this.NumberEditBox.string)
        if (Number.isNaN(currentEidtNumber)) {
            this.NumberEditBox.string = this._inputNumber + ''
            return 
        }
        this.inputNumber = currentEidtNumber
    }

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

    // 数字增加1
    protected addNumber() { this.inputNumber++ }

    // 数字减少1
    protected reduceNumber() { this.inputNumber-- }

    // 取消事件
    protected onCancelClick() {
        this.onCancelCallbackSet.forEach((c) => c(parseInt(this.NumberEditBox.string) || 0))
    }

    // 点击事件
    protected onConfirmClick() {
        this.onConfirmCallbackSet.forEach((c) => c(parseInt(this.NumberEditBox.string) || 0))
    }
    
}


