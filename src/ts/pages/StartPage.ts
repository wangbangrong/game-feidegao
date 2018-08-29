
import AbstractPage from '../interface/AbstractPage'
import * as Stage from '../util/Stage'
import { getTexture } from '../util/RES'
import loadingUI from '../gameObj/LoadingUI'
import PlayPage from './PlayPage'

/**
 * 游戏开始显示界面（非loading界面）
 * 
 */
class StartPage extends AbstractPage {
    constructor(container: egret.DisplayObjectContainer) {
        super(container);
        this.init();
    }

    private bg: egret.Bitmap;

    private playBtn: egret.Bitmap;

    private textureDefault: egret.Texture;

    private init(): void {
        this.width = Stage.getStageW();
        this.height = Stage.getStageH();

        this.bg = new egret.Bitmap;
        this.bg.texture = getTexture('startBg_png');

        this.textureDefault = getTexture('playDefault_png');

        this.playBtn = new egret.Bitmap;
        this.playBtn.texture = this.textureDefault;
        this.playBtn.y = 500;
        this.playBtn.x = (this.width - this.playBtn.texture.textureWidth) / 2;

        this.playBtn.touchEnabled = true;
        this.playBtn.addEventListener(egret.TouchEvent.TOUCH_END, this.btnTouchEnd, this);
        this.playBtn.once(egret.TouchEvent.TOUCH_TAP, this.btnTouchTap, this);
    }

    private async btnTouchTap() {
        let loadingView = new loadingUI(Stage.getStageW(), Stage.getStageH());
        this.addChild(loadingView);

        await RES.loadGroup("playPage", 0, loadingView);
        this.removeChild(loadingView);
        await this.destroy();

        let playPage = new PlayPage(this.getContainer());
        playPage.start();
    }

    private btnTouchEnd() {
        this.playBtn.texture = this.textureDefault;
    }

  
    public removeEvent() {
        this.playBtn.removeEventListener(egret.TouchEvent.TOUCH_END, this.btnTouchEnd, this);
    }

    public start(): Promise<any> {
        this.addToContainer();
        this.addChild(this.bg);
        this.addChild(this.playBtn);

        let p = new Promise(function (res, rej) {
            res();
        });
        return p;
    }

    public destroy(): Promise<any> {
        this.removeEvent();
        this.removeEl();

        let p = new Promise(function (res, rej) {
            res();
        });
        return p;
    }
}

export default StartPage;