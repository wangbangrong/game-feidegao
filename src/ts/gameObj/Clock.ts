import Obj from './Obj'
import * as Stage from '../util/Stage'
import * as Util from '../util/common'

export class ClockConstrArg {
    bm: egret.Bitmap;
    container: egret.DisplayObjectContainer;
    x: number;
    y: number;
    time: number;
}

class Clock extends Obj {
    constructor(option: ClockConstrArg) {
        super(option.bm, option.container);
        this.init(option);
    }

    public static E_CLOCK_TIME_END: string = 'E_CLOCK_TIME_END';

    private time: number;

    private timer: egret.Timer;

    private textField: egret.TextField;

    private init(option: ClockConstrArg): void {
        this.time = option.time;
        this.setX(option.x);
        this.setY(option.y);
        this.initTimer();
        //添加bitmap到容器
        this.addToContainer();
        //添加文本到容器
        this.initTextField();

    }

    private timerHandler(): void {
        if (this.time >= 1) {
            this.setTime(this.time - 1);
        } else {
            this.stop();
            this.dispatchEventWith(Clock.E_CLOCK_TIME_END);
        }

    }


    private initTimer(): void {
        let timer = new egret.Timer(1000, 0);
        timer.addEventListener(egret.TimerEvent.TIMER, this.timerHandler, this);
        this.timer = timer;
    }

    private initTextField(): void {
        let textField = new egret.TextField;
        textField.textAlign = "center";
        textField.size = 30;
        textField.width = this.getBm().texture.textureWidth;
        textField.y = this.getBm().texture.textureHeight / 2 + this.getY() - 12;
        textField.x = this.getX();
        textField.textColor = 0x000000;
        this.textField = textField;

        this.setText(this.time);
        this.getContainer().addChild(this.textField);
    }

    private setText(time: number): void {
        let text = Util.fixZero(time, 2);
        this.textField.text = text;
    }

    public start(): void {
        this.timer.start();
    }

    public stop(): void {
        this.timer.stop();
    }

    public setTime(time: number): void {
        this.time = time;
        this.setText(this.time);
    }

    //重写父类方法
    public removeEl(): void {
        super.removeEl();
        this.textField.parent && this.textField.parent.removeChild(this.textField);
    }


}

export default Clock;