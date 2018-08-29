
import Star from './Star'
import Speed from '../util/Speed'
import { StartConstrArg } from './Star'
import * as RESUtil from '../util/RES'


export class StarManagerConstrArg {
    x: number;
    y: number;
    G: number;
    container: egret.DisplayObjectContainer;
    starNum: number;
    time: number;
    VSpeedLimit: number;
    HSpeedLimit: number;
}

class StarManager {
    constructor(option: StarManagerConstrArg) {
        this.option = option;
        this.VSpeedLimit = option.VSpeedLimit;
        this.HSpeedLimit = option.HSpeedLimit;
        this.playTimes = Math.round(option.time / Speed.frameTime);
        this.starList = this.createStarList();
    }
    private option: StarManagerConstrArg;

    private starList: Array<Star>;

    //心跳执行次数
    private playTimes: number;

    private curPlayTimes: number = 0;

    private VSpeedLimit: number;

    private HSpeedLimit: number;

    private createStarList(): Array<Star> {
        let option: StarManagerConstrArg = this.option;
        let ret = [];
        for (let i = 0; i < option.starNum; i++) {
            let star = this.getStar(option.x, option.y, );
            ret.push(star);
        }
        return ret;
    }

    //获取随机水平速度
    private getRandVx(): number {
        return StarManager.getRandByNum(this.HSpeedLimit);
    }

    private getRandVy(): number {
        return StarManager.getRandByNum(this.VSpeedLimit);
    }

    //返回[- num / 2, num / 2]之间的随机数
    public static getRandByNum(num: number): number {
        let ret = Math.random() * num;
        let half = num / 2;
        ret -= half;
        return ret;
    }

    private getStar(x: number, y: number): Star {
        let option: StartConstrArg;
        option = {
            x,
            y,
            container: this.option.container,
            bm: RESUtil.getBitmap('star_png'),
            G: Speed.getG(),
            VSpeed: this.getRandVy(),
            HSpeed: this.getRandVx()
        };

        return new Star(option);
    }

    private starMove(): void {
        this.starList.map((star: Star) => {
            star.move();
        });
    }


    private starFadeOut(): void {
        let curOpacity: number = 1 - (1 / this.playTimes) * this.curPlayTimes;
        this.starList.map((star: Star) => {
            star.setOpacity(curOpacity);
        });
    }

    private removeStar(): void {
        this.starList.map((star: Star) => {
            star.removeEl();
        });
    }



    private tick(): boolean {
        //star move
        this.starMove();

        //star fadeOut
        this.starFadeOut();

        this.curPlayTimes++;

        if (this.curPlayTimes >= this.playTimes) {
            egret.stopTick(this.tick, this);
            this.removeStar();
        }

        return false;
    }

    public start(): void {
        //star 全部添加到容器中
        this.starList.map((star: Star) => {
            star.addToContainer();
        });
        //启动心跳开始move和fadeout
        egret.startTick(this.tick, this);
    }




}

export default StarManager;