import Obj from './Obj'
import IRebound from '../interface/IRebound'
import IFalling from '../interface/IFalling'

class Cloud extends Obj implements IRebound {
    constructor(bm: egret.Bitmap, container: egret.DisplayObjectContainer, speed: number) {
        super(bm, container);
        this.speed = speed;
    }

    private hLimit: Array<number>;

    private wLimit: Array<number>;

    private getHLimit(): Array<number> {
        if (this.hLimit) {
            return this.hLimit;
        }
        
        return [this.getY(), this.getY() + this.getH() / 2];
    }

    private getWLimit(): Array<number> {
        if (this.wLimit) {
            return this.wLimit;
        }
        return [this.getX(), this.getX() + this.getW()];
    }

    private hasTouch(obj: IFalling) {
        let hLimit: Array<number> = this.getHLimit();
        let wLimit: Array<number> = this.getWLimit();
        let touchPoint: egret.Point = obj.getTouchPoint();
        if (touchPoint.x >= wLimit[0] && touchPoint.x <= wLimit[1] && touchPoint.y >= hLimit[0] && touchPoint.y <= hLimit[1]) {
            return true;
        } else {
            return false;
        }
    }

    //反弹速度，取向下为正方向
    private speed: number;

    public hitTestPoint(obj: IFalling): boolean {
        let ret = this.hasTouch(obj);
        if(ret){
            obj.rebound(this.speed);
            this.removeEl();
        }
        return ret;
    }
}

export default Cloud;