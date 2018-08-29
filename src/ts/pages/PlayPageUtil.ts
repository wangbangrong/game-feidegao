import Drawboard from '../gameObj/Drawboard'
import * as Stage from '../util/Stage'
import { getTexture, getBitmap } from '../util/RES'
import Speed from '../util/Speed'
import HumanManager from '../gameObj/HumanManager'
import UFO from '../gameObj/UFO'
import * as Util from '../util/common'
 

class PlayPageUtil {
    
    public static getDrawboard(container: egret.DisplayObjectContainer): Drawboard {
        let bm = getBitmap('drawboard_png');
        let drawboard = new Drawboard(bm, container, -1 * Speed.getG() * Math.floor(Speed.updateTimes * 0.75),0,Stage.getStageH() - bm.texture.textureHeight);

        return drawboard;
    }

    /**
     * 根据爬升高度计算得分
     * @param h 爬升的高度
     */
    public static getScore( h : number):number{
        return Math.round(h / 10);
    }

    /**
     * 根据得分判断跳板消失与否
     * @param score 得分
     * @param drawboard 跳板对象
     */
    public static isHideDrawboard(score:number,drawboard:Drawboard):boolean{
        return score >= 100 && !!drawboard.getBm().parent;
    }

    /**
     * 判断是否游戏结束
     * @param humanY human对象的y值
     */
    public static isGameOver( humanY : number){
        if( humanY>= Stage.getStageH()){
            return true;
        }else{
            return false;
        }
    }

    public static getBgScrollStep( humanStep : number):number{
        return humanStep / 20;
    }

    public static isIntersectWithUFO( humanManager : HumanManager, ufo : UFO):boolean{
        let x1 : number = humanManager.getHumanX();
        let y1 : number = humanManager.getHumanY();
        let x2 : number = x1 + humanManager.getHumanW();
        let y2 : number = y1 + humanManager.getHumanH();

        let x3 : number = ufo.getX();
        let y3 : number = ufo.getY();
        let x4 : number = x3 + ufo.getW();
        let y4 : number = y3 + ufo.getH();
        let ret : boolean = Util.isIntersect(x1,y1,x2,y2,x3,y3,x4,y4);
        
        return ret;
    }
}

export default PlayPageUtil;