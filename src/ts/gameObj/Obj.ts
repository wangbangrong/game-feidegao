

/**
* 具备bitmap属性的物体,具备常规的bm属性获取及操作,具备事件监听与派发能力
* 适用于单个bitmap属性的对象
*/
class Obj extends egret.EventDispatcher {
    /**
    * 初始化bm和容器container
    * @param bm egret.Bitmap对象，必填
    * @param container egret.DisplayObjectContainer对象，用作bm的容器
    */
    constructor(bm: egret.Bitmap, container?: egret.DisplayObjectContainer) {
        super();
        this.bm = bm;
        this.container = container;
    }

    /** 对象的bitmap */
    private bm: egret.Bitmap;

    /** bitmap的容器 */
    private container: egret.DisplayObjectContainer;

    /**
    * 获取bitmap属性
    *
    * @param return Obj对象的bm属性
    */
    public getBm(): egret.Bitmap {
        return this.bm;
    }

    public getContainer() : egret.DisplayObjectContainer{
        return this.container;
    }

    /**
    * 从容器中移除bitmap
    */
    public removeEl(): void {
        this.bm.parent &&
            this.bm.parent.removeChild(this.bm);
    }

    /**
    * 添加bitmap到容器中
    *
    * @param container bitmap的容器，非必填，当传入container时，会将bitmap更换到传入的container容器中，并替换原有的container
    */
    public addToContainer(container?: egret.DisplayObjectContainer): void {
        if (container) {
            this.container = container;
        }
        this.container.addChild(this.bm);
    }

    /**
    * 获取bitmap.x
    * @return  bitmap.x
    */
    public getX(): number {
        return this.bm.x;
    }

    /**
    * 获取bitmap.y
    * @return  bitmap.y
    */
    public getY(): number {
        return this.bm.y;
    }

    /**
     * 获取bitmap.width
     * @return  bitmap.width
     */
    public getW(): number {
        return this.bm.width;
    }

    public getH() : number{
        return this.bm.height;
    }

    /**
     * 设置bitmap.x
     * @param x 设置bitmap的x属性
     */
    public setX(x: number) {
        this.bm.x = x;
    }

    /**
     * 设置bitmap.y
     * @param y 设置bitmap的y属性
     */
    public setY(y: number) {
        this.bm.y = y;
    }



}

export default Obj;