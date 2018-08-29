import UFO from './UFO'
import { UFOConstrArg } from './UFO'
import Speed from '../util/Speed'
import * as RESUtil from '../util/RES'
import * as Stage from '../util/Stage'

export interface IUFOListEachFunc{
    (ufo :UFO) : void;
}

class UFOManager extends egret.EventDispatcher {
    constructor(container: egret.DisplayObjectContainer, G:number) {
        super();
        this.container = container;
        this.G = G;
    }

    public static readonly UFO_TYPE_RED : string = 'UFO_TYPE_RED';

    public static readonly E_UFO_AFTER_FRAME: string = 'E_UFO_AFTER_FRAME';

    private redUFOList: Array<UFO> = [];

    private G : number;

    private container: egret.DisplayObjectContainer;

    private redUFOTextureCache: egret.Texture;

    private getRedUFOTexture(): egret.Texture {
        if (!this.redUFOTextureCache) {
            this.redUFOTextureCache = RESUtil.getTexture('UFO_png');
        }
        return this.redUFOTextureCache;
    }

    private getRedUFOBitmap(x: number): egret.Bitmap {
        //UFO_png
        let texture: egret.Texture = this.getRedUFOTexture();
        let targetX: number = x - texture.textureWidth / 2;
        let targetY: number = Stage.getStageH();
        let bm: egret.Bitmap = new egret.Bitmap(texture);
        bm.x = targetX;
        bm.y = targetY;
        return bm;
    }

    /**
     * 创建红色ufo
     * @param x ufo中点的x值
     */
    public createRedUFO(x: number): void {
        let ufo: UFO;
        let option: UFOConstrArg;
        option = {
            bm: this.getRedUFOBitmap(x),
            container: this.container,
            G:this.G,
            vSpeed: 0,
            type : UFOManager.UFO_TYPE_RED
        };
        ufo = new UFO(option);
        this.redUFOList.push(ufo);
        
        ufo.addToContainer();
    }

    public getRedUFOList(): Array<UFO> {
        return this.redUFOList;
    }

    private emit(): void {
        this.dispatchEventWith(UFOManager.E_UFO_AFTER_FRAME);
    }

    private frame(): boolean {
        this.redUFOList.map((ufo: UFO) => {
            ufo.move();
        });
        this.emit();
        return false;
    }

    public start(): void {
        this.stop();
        egret.startTick(this.frame, this);
    }

    public stop(): void {
        egret.stopTick(this.frame, this);
    }

    public eachAllUFO(func:IUFOListEachFunc):void{
        this.redUFOList.map((ufo : UFO)=>{
            func(ufo);
        });
    }

    public removeUFO(ufo : UFO, isRemoveEl : boolean = true):void{
        let UFOArr : Array<UFO> = [];
        if(ufo.getType() === UFOManager.UFO_TYPE_RED){
            UFOArr = this.redUFOList;
        }

        for(let i = UFOArr.length - 1; i>=0; i--){
            let tempUFO = UFOArr[i];
            if(tempUFO === ufo){
                UFOArr.splice(i,1);
                isRemoveEl && ufo.removeEl();
            }
        }
    }



    /**
     * 删除滚动到舞台以外位置的ufo
     */
    public delScrolledUFO():void{
        this.eachAllUFO((ufo : UFO)=>{
            let y = ufo.getY();
            let h = ufo.getH();
            if(y + h < 0){
               this.removeUFO(ufo);
            }
        });
    }


}


export default UFOManager;