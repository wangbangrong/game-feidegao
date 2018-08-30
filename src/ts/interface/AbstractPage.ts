
/**
 * Page类的抽象类，规定了：start() 启动方法 destroy()销毁方法,并继承了egret.DisplayObjectContainer
 */
abstract class AbstractPage extends egret.DisplayObjectContainer {
    constructor(container) {
        super();
        this.container = container;
    }

    private container: egret.DisplayObjectContainer;

    /**
     * 添加页面对象到容器
     * @param container 容器,非必填，如果指定了container，则会替换初始化时的container
     */
    public addToContainer(container?: egret.DisplayObjectContainer): void {
        if (container) {
            this.container = container;
        }
        this.container.addChild(this);
    }

    public getContainer(): egret.DisplayObjectContainer {
        return this.container;
    }

    /**
     * 从容器中移除页面对象
     */
    public removeEl(): void {
        this.parent &&
            this.parent.removeChild(this);
    }

    //当页面对象要进行异步操作时，可以使用await async
    abstract start(): Promise<any>;

    //当页面对象要进行异步操作时，可以使用await async
    abstract destroy(): Promise<any>;
}

export default AbstractPage;