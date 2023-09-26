import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Loading')
export class Loading extends Component {
    
    @property(Node)
    private IconNode: Node

    public rotateSpeed: number = 1

    protected update(dt: number): void {
        this.IconNode.angle += 50 * dt * 1
    }

}


