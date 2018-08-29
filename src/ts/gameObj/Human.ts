import Obj from './Obj'
import IFalling from '../interface/IFalling'
import Speed from '../util/Speed'
import { horizontalDirection, verticalDirection } from '../util/common'

export class HumanConstrArgs {
    container: egret.DisplayObjectContainer;
    horizontalStatus: horizontalDirection;
    verticalStatus: verticalDirection;
    // horizontalSpeed: number;
    verticalSpeed: number;
    maxY: number;
    G: number;
    bm: egret.Bitmap;
}

class Human extends Obj implements IFalling {
    constructor(option: HumanConstrArgs) {
        super(option.bm, option.container);
        this.init(option);
    }

    public static E_HUMAN_FALLING: string = 'E_HUMAN_FALLING';

    public static E_HUMAN_BEFORE_MOVE: string = 'E_HUMAN_BEFORE_MOVE';

    public static E_HUMAN_CLIMB : string = 'E_HUMAN__CLIMB';

    public static E_HUMAN_RASING : string = 'E_HUMAN_RASING';

    public static E_HUMAN_AFTER_MOVE: string = 'E_HUMAN_AFTER_MOVE';

    public static E_HUMAN_REACH_TOP : string = 'E_HUMAN_REACH_TOP';

    public static E_HUMAN_REBOUND : string = 'E_HUMAN_REBOUND';

    //方向状态(水平)
    private horizontalStatus: horizontalDirection;

    private verticalStatus: verticalDirection;

    private textures : any;

    //水平速度;
    private horizontalSpeed: number;

    private preVerticalSpeed: number = 0;

    //垂直速度
    private verticalSpeed: number;

    private maxY: number;

    private limit: number;

    private preY : number;

    //用于监听 egret.Event.ENTER_FRAME
    private obj: egret.DisplayObject = new egret.DisplayObject;

    //重力加速度
    private G: number;

    private init(option: HumanConstrArgs) {
        this.horizontalStatus = option.horizontalStatus;
        this.verticalStatus = option.verticalStatus;
        this.verticalSpeed = option.verticalSpeed;
        this.maxY = option.maxY;
        this.G = option.G;
    }

    //根据人物horizontalStatus verticalStatus获取对应的texture
    private getTexture(){
        if(!this.textures){
            this.textures =  {
                tl: RES.getRes('tl_png'),
                tr: RES.getRes('tr_png'),
                bl: RES.getRes('bl_png'),
                br: RES.getRes('br_png')
            };
        }

        if (this.verticalStatus == verticalDirection.top) { //竖直方向上
            if (this.horizontalStatus == horizontalDirection.left) { //水平方向左

                return this.textures['tl'];
            } else {

                return this.textures['tr'];
            }
        } else {
            if (this.horizontalStatus == horizontalDirection.left) { //水平方向左

                return this.textures['bl'];
            } else {

                return this.textures['br'];
            }
        }
    }

    public rebound(speed: number): void {
        this.verticalSpeed = speed;
        this.setVerticalStatus(verticalDirection.top);
        this.updateShape();
    }

    public getVerticalSpeed(): number {
        return this.verticalSpeed;
    }

    public getPreVerticalSpeed(): number {
        return this.preVerticalSpeed;
    }

    public getPreY():number{
        return this.preY;
    }

    public getMaxY():number{
        return this.maxY;
    }


    public getTouchPoint(): egret.Point {
        let x = this.getX() + this.getW() / 2;
        let y = this.getY() + this.getH();
        return new egret.Point(x, y);
    }

    // public start():void{
    //     //添加到容器
    //     this.addToContainer();
    //     //开启心跳
    // }

    public startFrame(): void {
        this.obj.addEventListener(egret.Event.ENTER_FRAME, this.updateFrame, this);
    }

    public stopFrame(): void {
        this.obj.removeEventListener(egret.Event.ENTER_FRAME, this.updateFrame, this);
    }

    public destroy(): void { 
        this.stopFrame();
    }

    //更新人物位置
    public updatePos(): void {
        let vertStep = Speed.getDistByV(this.preVerticalSpeed, this.verticalSpeed, this.G);
        let newY = this.getY() + vertStep;
        newY = Math.max(this.maxY,newY);
        this.setY(newY);
    }

    public setHorizontalStatus(status: horizontalDirection): void {
        this.horizontalStatus = status;
    }

    public setVerticalStatus(status: verticalDirection): void {
        this.verticalStatus = status;
    }

    /**
      * 更新垂直方向
      */
    public updateVertDir(): void {
        //垂直方向速度（新）
        let newVerticalSpeed = this.verticalSpeed;
        let speedDir = newVerticalSpeed * this.preVerticalSpeed;

        //新旧速度在同一个方向上
        if (speedDir > 0) {
            //无需修改

            //新旧速度不同一个方向，意味着垂直方向上要变向
        } else if (speedDir < 0) {
            this.verticalStatus =
                this.verticalStatus == verticalDirection.top ?
                    verticalDirection.bottom :
                    verticalDirection.top;
        } else {
            if (newVerticalSpeed + this.preVerticalSpeed > 0) {
                this.verticalStatus = verticalDirection.bottom;
            } else {
                this.verticalStatus = verticalDirection.top;
            }
        }
    }

    public updateShape() {
        let newTexture = this.getTexture();
        let humanCurTexture = this.getBm().texture;
        if(humanCurTexture !== newTexture){
            this.getBm().texture = newTexture;
        }
     }

  
     private broadcast(option: any) {
        let oldSpeed = option.oldVerticalSpeed;
        let curSpeed = option.newVerticalSpeed;
        let oldVerticalSpeedBeforeUpdate = option.oldVerticalSpeedBeforeUpdate;
        let preY = option.y;
        let curY = this.getY();

        if (curY < preY) {
            this.dispatchEventWith(Human.E_HUMAN_RASING);
        }


        if (this.verticalStatus === verticalDirection.top && curY == this.maxY) {
           this.dispatchEventWith(Human.E_HUMAN_REACH_TOP);
        }

        if (curY > preY) {
            this.dispatchEventWith(Human.E_HUMAN_FALLING);
        }

        if (oldSpeed * oldVerticalSpeedBeforeUpdate <= 0 && curSpeed < 0) {
           this.dispatchEventWith(Human.E_HUMAN_REBOUND);
        }

    }

    private updateData(): void {
        this.preY = this.getY();
        //垂直方向速度（旧）
        this.preVerticalSpeed = this.verticalSpeed;
        //垂直方向速度（新）
        this.verticalSpeed = this.verticalSpeed + this.G;
        //更新垂直方向
        this.updateVertDir();
    }

    private updateFrame(): void {
        //垂直方向速度（旧）
        let oldVerticalSpeed = this.verticalSpeed;
        //垂直方向速度（新）
        let newVerticalSpeed = this.verticalSpeed + this.G;

        let oldVerticalSpeedBeforeUpdate = this.preVerticalSpeed;
        //记录更新前的数据
        let y = this.getY();



        //更新人物属性
        this.updateData();

        //事件广播
        this.dispatchEventWith(Human.E_HUMAN_BEFORE_MOVE);

        //更新人物位置
        this.updatePos();

        //事件广播
        this.dispatchEventWith(Human.E_HUMAN_AFTER_MOVE);

        //更新人物bitmap
        this.updateShape();

        //E_HUMAN_BEFORE_MOVE,E_HUMAN_BEFORE_MOVE以外的事件广播
        this.broadcast({
            oldVerticalSpeed,
            newVerticalSpeed,
            y,
            oldVerticalSpeedBeforeUpdate
        });
    }

}

export default Human;
