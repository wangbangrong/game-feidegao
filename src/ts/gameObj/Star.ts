import Obj from './Obj'
import Speed from '../util/Speed'

export class StartConstrArg {
    /** 起始位置 */
    x: number;
    y: number;
    /** 重力加速度 */
    G: number;
    /** 垂直速度，取向下为正方向 */
    VSpeed: number;
    /** 水平速度，取右方向为正方向 */
    HSpeed: number;
    /** bitmap对象 */
    bm: egret.Bitmap;
    /** 容器 */
    container: egret.DisplayObjectContainer;
}

class Star extends Obj {
    constructor(option: StartConstrArg) {
        let bm = option.bm;
        let container = option.container;
        super(bm, container);
        this.init(option);
    }

    /** 初始位置 */
    private x: number;

    private y: number;

    /** 加速度 */
    private G: number;

    private VSpeed: number;

    private HSpeed: number;

    private init(option: StartConstrArg) {
        this.x = option.x;
        this.y = option.y;
        this.G = option.G;
        this.VSpeed = option.VSpeed;
        this.HSpeed = option.HSpeed;
        this.setX(this.x);
        this.setY(this.y);
    }

    /**
     * 设置透明度
     * @param opacity 透明度
     */
    public setOpacity(opacity: number) {
        this.getBm().alpha = opacity;
    }

    public move(): void {
        let curX: number = this.getX();
        let curY: number = this.getY();
        let targetX: number = curX + this.HSpeed;
        let yDiff: number = Speed.getDistByV(this.VSpeed, this.VSpeed + this.G, this.G);
        let targetY: number = curY + yDiff;
        this.VSpeed += this.G;
        this.setX(targetX);
        this.setY(targetY);
    }

}

export default Star;