
import * as Stage from './Stage'


class Speed {
    public static G: number;

    //一帧消耗的时间
    public static frameTime : number = 16.7;

    //点从顶部掉落到底部的时间，用于计算重力加速度G
    public static fallingTime: number = 1500;

    //点从顶部掉落到底部的时间内的频率数
    public static updateTimes: number;

    public static getUpdateTimes(): number {
        if (!Speed.updateTimes) {
            Speed.updateTimes = Math.floor(Speed.fallingTime / Speed.frameTime);
        }
        return Speed.updateTimes;
    }

    //获取重力加速度
    public static getG(): number {
        if (!Speed.G) {
            let stageH: number = Stage.getStageH();
            let t: number = Speed.getUpdateTimes();
            Speed.G = 2 * stageH / Math.pow(t, 2);
        }
        
        return Speed.G;
    }

    //根据初速度和末速度和加速度计算位移
    //取向下为正方向
    public static getDistByV( speedStart:number, speedEnd:number, G : number){
        return (Math.pow(speedEnd,2) - Math.pow(speedStart,2)) / (2 * G);
    }
}

export default Speed;