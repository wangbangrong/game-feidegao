
import Human from './Human'
import { getTexture, getBitmap } from '../util/RES'
import IFalling from '../interface/IFalling'
import Speed from '../util/Speed'
import AbstracPage from '../interface/AbstractPage'
import * as Stage from '../util/Stage'
import { horizontalDirection, verticalDirection } from '../util/common'
import { HumanConstrArgs } from '../gameObj/Human'

export class HumanManagerConstrArgs extends HumanConstrArgs {
    page: AbstracPage
}

class HumanManager extends egret.EventDispatcher implements IFalling {
    constructor(option: HumanManagerConstrArgs) {
        super();
        this.init(option);
    }

    public static E_HUMAN_FALLING: string = 'E_HUMAN_FALLING';

    public static E_HUMAN_REBOUND: string = 'E_HUMAN_REBOUND';

    public static E_HUMAN_REACH_TOP: string = 'E_HUMAN_REACH_TOP';

    public static getMoveStep(humanX: number, preX: number, curX: number, humanPointDiff: number): number {
        let totalDiff = curX - humanX - humanPointDiff;
        let curDiff = curX - preX;

        if (totalDiff == 0) {
            return 0;
        }

        let _totalDiff = Math.abs(totalDiff);
        let _curDiff = Math.abs(curDiff);

        let moveStep;

        moveStep = _totalDiff * 0.2;
        moveStep = Math.max(moveStep, 0.5); //设置最小步速

        if (_curDiff > 0 && moveStep > _curDiff) {
            moveStep = _curDiff;
        }

        if (moveStep > _totalDiff) {
            moveStep = _totalDiff;
        }

        if (totalDiff >= 0) {
            return moveStep;
        } else {
            return moveStep * -1;
        }
    }

    private human: Human;

    private option: HumanManagerConstrArgs;

    /**        this.preTouchX = e.stageX;
        this.curTouchX = e.stageX;
        this.touchPointX = e.stageX;
        this.humanPointDiff = e.stageX - this.human.x; */

    //上一桢触点的 x    
    private preTouchX: number;

    //当前帧触点的 x
    private curTouchX: number;

    private humanPointDiff: number;

    //用于监听 egret.Event.ENTER_FRAME
    private obj: egret.DisplayObject = new egret.DisplayObject;

    //获取human的y值
    public getHumanY():number{
        return this.human.getY();
    }

    public getHumanX():number{
        return this.human.getX();
    }

    public getHumanW():number{
        return this.human.getW();
    }

    public getHumanH():number{
        return this.human.getH();
    }

    public getTouchPoint(): egret.Point {
        return this.human.getTouchPoint();
    }

    public init(option: HumanManagerConstrArgs) {
        this.option = option;
        let humanOption: HumanConstrArgs;
        humanOption = {
            container: option.container,
            horizontalStatus: option.horizontalStatus,
            verticalStatus: option.verticalStatus,
            verticalSpeed: option.verticalSpeed,
            maxY: option.maxY,
            G: option.G,
            bm: option.bm
        };
        this.human = new Human(humanOption);
    }

    //获取当前帧human到达maxY时，向上刷新的位移
    public getHumanReachDist(): number {
        let curY: number = this.human.getY();
        let preY: number = this.human.getPreY();
        let maxY: number = this.human.getMaxY();
        let preSpeed: number = this.human.getPreVerticalSpeed();
        let curSpeed: number = this.human.getVerticalSpeed();
        let diffY: number = Math.abs(curY - preY);
        let dist: number = Speed.getDistByV(preSpeed, curSpeed, Speed.getG());
        dist = Math.abs(dist);
        if (diffY) { //到达maxY，但上一个点的位置不在maxY上
            return dist - diffY;
        } else {
            return dist;
        }
    }

    public getCloudScrollDist(): number {
        let curY: number = this.human.getY();
        let maxY: number = this.human.getMaxY();
        let startSpeed: number = this.human.getVerticalSpeed();
        let endSpeed: number = 0;
        let dist: number = Speed.getDistByV(startSpeed, endSpeed, Speed.getG());
        dist = Math.abs(dist);
        return dist - (curY - maxY);
    }


    public rebound(speed: number): void {
        this.human.rebound(speed);
        this.dispatchEventWith(HumanManager.E_HUMAN_REBOUND);
    }

 

    public start(): void {
        this.human.addEventListener(Human.E_HUMAN_FALLING, this.humanFalling, this);
        this.human.addEventListener(Human.E_HUMAN_BEFORE_MOVE, this.beforeHumanMove, this);
        this.human.addEventListener(Human.E_HUMAN_REACH_TOP, this.reachTop, this);
        this.human.addToContainer();

        this.human.startFrame();

        //启动心跳 计算和设置人物的位置和外形
        //     this.startFrame();

        //绑定事件，记录操作位置
        this.option.page.touchEnabled = true;
        this.option.page.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBegin, this);
        this.option.page.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchMove, this);
    }

    private reachTop(): void {
        this.dispatchEventWith(HumanManager.E_HUMAN_REACH_TOP);
    }

    //设置人物水平位置
    private setHumanHorPos(): void {
        if (this.curTouchX) {
            let moveStep = HumanManager.getMoveStep(this.human.getX(), this.preTouchX, this.curTouchX, this.humanPointDiff);
            this.human.setX(this.human.getX() + moveStep);
        }
    }

    private beforeHumanMove(): void {
        this.setHumanHorPos();
    }

    private touchBegin(e: egret.TouchEvent): void {
        this.preTouchX = e.stageX;
        this.curTouchX = e.stageX;

        this.humanPointDiff = e.stageX - this.human.getX();
    }

    private touchMove(e: egret.TouchEvent): void {
        e.preventDefault();

        let humanX = e.stageX - this.humanPointDiff;
        let humanR = humanX + this.human.getW();

        //当触及左右边缘时return
        if ((humanX <= 0) || (humanR >= Stage.getStageW())) {
            return;
        }

        this.preTouchX = this.curTouchX;
        this.curTouchX = e.stageX;

        if (this.curTouchX - this.preTouchX >= 0) {
            this.human.setHorizontalStatus(horizontalDirection.right);
        } else {
            this.human.setHorizontalStatus(horizontalDirection.left);
        }

    }

    private humanFalling(): void {
        this.dispatchEventWith(HumanManager.E_HUMAN_FALLING);
    }



    public destroy(): void {
        this.human.removeEventListener(Human.E_HUMAN_FALLING, this.humanFalling, this);
        this.human.removeEventListener(Human.E_HUMAN_BEFORE_MOVE, this.beforeHumanMove, this);
        this.human.removeEventListener(Human.E_HUMAN_REACH_TOP, this.reachTop, this);
        this.human.destroy();

        this.option.page.touchEnabled = false;
        this.option.page.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBegin, this);
        this.option.page.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchMove, this);
  

/**
 *       this.human.addEventListener(Human.E_HUMAN_FALLING, this.humanFalling, this);
        this.human.addEventListener(Human.E_HUMAN_BEFORE_MOVE, this.beforeHumanMove, this);
        this.human.addEventListener(Human.E_HUMAN_REACH_TOP, this.reachTop, this);
        this.human.addToContainer();

        this.human.startFrame();

        //启动心跳 计算和设置人物的位置和外形
        //     this.startFrame();

        //绑定事件，记录操作位置
        this.option.page.touchEnabled = true;
        this.option.page.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBegin, this);
        this.option.page.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchMove, this);
 */
    }

}



export default HumanManager;