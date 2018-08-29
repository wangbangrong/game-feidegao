
import Cloud from './Cloud'
import IRebound from '../interface/IRebound'
import * as Stage from '../util/Stage'


export class CloudManagerConstrArgs {
    container: egret.DisplayObjectContainer;
    cloudRowSpace: number;
    cloudStartY: number;
}

//云管理类
class CloudManager extends egret.EventDispatcher {
    constructor(option: CloudManagerConstrArgs) {
        super();
        this.init(option);

    }

    private container: egret.DisplayObjectContainer;

    // 与两个外边框的距离
    private lrColSpace: number;

    //云朵行间距
    private cloudRowSpace: number;

    //云朵列数最大值
    private cloudColNum: number;

    //云朵生成起点(从底部开始算起)
    private cloudStartY: number;

    //一层云的高度（包括间距和云高度）
    private cloudRowH: number;

    //
    private cloudList: Array<Cloud> = [];

    //默认云朵 texture
    private textureCache: egret.Texture;

    // //小云朵 texture
    // private  smCloudTextureCache: egret.Texture;

    // //大云朵texture
    // private  bigCloudTextureCache: egret.Texture;

    public scroll(step: number): void {
        // CloudManager.cloudList.map((cloud: Cloud) => {
        //     //cloud.scroll(step);
        // });
        this.cloudList.map((cloud: Cloud) => {
            let y = cloud.getY();
            cloud.setY(y + step);
        });
    }


    private getCloudNumByDis(s: number): number {
        let rowH = this.cloudRowH;
        let rows = s / rowH;
        return s % rowH ? Math.round(s / rowH) : (s / rowH);
    }

    private getRandBitMap(): egret.Bitmap {
        let bitmap = new egret.Bitmap();
        bitmap.texture = this.textureCache;
        return bitmap;
    }

    //  public removeCloud(cloud : Cloud):void{}

    private getCloud(cloud?: Cloud): Cloud {
        let y: number;
        if (cloud) {
            y = cloud.getY() - this.cloudRowH;
        } else {
            y = Stage.getStageH() - this.cloudStartY;
        }

        let x: number = Math.floor(this.cloudColNum * Math.random()) * this.textureCache.textureWidth + this.lrColSpace;
        let randomBitmap: egret.Bitmap = this.getRandBitMap();
        let newCloud = new Cloud(randomBitmap, this.container, -15);
        newCloud.setX(x);
        newCloud.setY(y);
        return newCloud;
    }

    public getCloudList(): Array<Cloud> {
        return this.cloudList;
    }



    //根据距离生成云列表
    //可用于生成云的距离
    public createCloudList(s: number): void {
        //距离s可用于生成云的行数
        let cloudRow: number = this.getCloudNumByDis(s);

        for (let i = 0; i < cloudRow; i++) {
            let cloud: Cloud;
            if (!this.cloudList.length) {
                cloud = this.getCloud();
            } else {
                let preCloud: Cloud = this.cloudList[this.cloudList.length - 1];

                cloud = this.getCloud(preCloud);
            }
            this.cloudList.push(cloud);
            cloud.addToContainer();
        }
    }

    //删除云朵（已经滚到下边缘的）
    public delScrolledCloud(deep: boolean = false): void {
        let cloudLen = this.cloudList.length;
        if (!cloudLen) {
            return;
        }
        for (let i = cloudLen - 1; i >= 0; i--) {
            let cloud: Cloud = this.cloudList[i];
            if (cloud.getY() > Stage.getStageH()) {
                this.cloudList.splice(i, 1);
                deep && cloud.removeEl();
            }
        }
    }

    public delAllCloud(deep: boolean = false) {
        this.cloudList = [];
        deep && this.container.removeChildren();

    }


    //删除单个云朵(在队列中)
    public removeCloud(cloud: Cloud): void {
        for (let i = 0; i < this.cloudList.length; i++) {
            let c = this.cloudList[i];
            if (cloud === c) {
                this.cloudList.splice(i, 1);
                break;
            }
        }
    }

    private init(option: CloudManagerConstrArgs) {
        this.container = option.container;
        this.cloudRowSpace = option.cloudRowSpace;
        this.textureCache = RES.getRes("blueCloud_png");
        this.cloudStartY = option.cloudStartY;
        this.cloudRowH = this.textureCache.textureHeight + this.cloudRowSpace;
        let textureW = this.textureCache.textureWidth;
        let stageW = Stage.getStageW();
        this.lrColSpace = (stageW % textureW) / 2;
        this.cloudColNum = Math.round((stageW - this.lrColSpace * 2) / textureW);
    }
}

export default CloudManager;