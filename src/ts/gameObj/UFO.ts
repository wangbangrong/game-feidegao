import Obj from './Obj'
import  Speed from '../util/Speed'

export class UFOConstrArg {
    bm: egret.Bitmap;
    container: egret.DisplayObjectContainer;
    G : number;
    vSpeed : number;
    type : string;
}

class UFO extends Obj {
    constructor(option: UFOConstrArg) {
        super(option.bm, option.container);
        this.init(option);
    }

    /** 垂直方向上的加速度,取向下为正方向 */
    private G : number;

   /** 垂直速度，取向下为正方向 */
    private vSpeed : number;

    /** 记录上一帧vSpeed值 */
    private preVSpeed : number;

    /** UFO 类型 */
    private type : string;

    private init(option : UFOConstrArg):void{
        this.G = option.G;
        this.vSpeed = option.vSpeed;
        this.type = option.type;
    }

    /**
     * ufo的运动（向上匀加速）
     */
    public move():void{
           this.preVSpeed = this.vSpeed;
           this.vSpeed += this.G;
           let diff : number = Speed.getDistByV(this.preVSpeed,this.vSpeed,this.G);
           let targetY : number = this.getY() + diff;
           this.setY(targetY);
    }

    public getType():string{
        return this.type;
    }
}

export default UFO;