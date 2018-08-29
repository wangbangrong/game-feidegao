import Obj from './Obj'
import IRebound from '../interface/IRebound'
import IFalling from '../interface/IFalling'


class Drawboard extends Obj implements IRebound {
    constructor(bm: egret.Bitmap, container: egret.DisplayObjectContainer, speed : number,x : number,y : number) {
        super(bm, container);
        this.x = x;
        this.y = y; 
        this.speed = speed;
        this.setX(this.x);
        this.setY(this.y);
    }

    private hLimit: Array<number>;

    private wLimit: Array<number>;

 

    private x : number;

    private y : number;

    private isWatching : boolean = false;

 

    //反弹速度 取下方向为正
    private speed : number;

    private fallingObj : IFalling;

    private getHLimit(): Array<number> {
        return [this.getY(), this.getY() + this.getH()];
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

    private watching():boolean{
        let fallingObj = this.fallingObj;
        let touchPoint = fallingObj.getTouchPoint();
 
        let drawboardH = this.getH();
        let yLimit = [this.y,this.y + drawboardH / 2];

        if(touchPoint.y < yLimit[0]){
            this.isWatching = false;
            this.stop();
            this.setY(this.y);
        }else if(touchPoint.y > yLimit[1]){
            fallingObj.rebound(this.speed);
        }else{
            this.setY(touchPoint.y);
        }
 
        return false;
    }

    private watchFalling(obj : IFalling):void{
        if(!this.isWatching){
            this.isWatching = true;
            this.fallingObj =obj;
            egret.startTick(this.watching,this);
        }
    }

    public hitTestPoint(obj: IFalling): boolean {
        if(this.hasTouch(obj)){
            this.watchFalling(obj);
            return true;
        }
        return false;
    }

    public stop():void{
        egret.stopTick(this.watching,this)
    }

    public restart():void{
        egret.startTick(this.watching,this);
    }

    /**
     * 释放资源
     */
    public destroy():void{
        this.stop();
        this.removeEl();
    }
}

export default Drawboard;