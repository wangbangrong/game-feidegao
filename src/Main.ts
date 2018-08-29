import { getBitmap } from './ts/util/RES'
import * as Stage from './ts/util/Stage'
import StartPage from './ts/pages/StartPage'
import LoadingUI from './ts/gameObj/LoadingUI'




/** 程序入口 */
class Main extends egret.DisplayObjectContainer {

    constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private startPage: StartPage;

    private loadingUI: LoadingUI;

    private onAddToStage(event: egret.Event): void {
        Stage.init(
            this.stage.stageWidth,
            this.stage.stageHeight
        );

        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);

        RES.loadConfig("resource/default.res.json", "resource/");

    }

    private async onConfigComplete(): Promise<any> {
        this.loadingUI = new LoadingUI(Stage.getStageW(), Stage.getStageH());
        this.addChild(this.loadingUI);
        await RES.loadGroup("firstPage", 0, this.loadingUI);
        this.onGroupComplete();
    }


    private async onGroupComplete(): Promise<any> {
        this.removeChild(this.loadingUI);
        egret.lifecycle.onPause = () => {
            egret.ticker.pause();
        }

        egret.lifecycle.onResume = () => {
            egret.ticker.resume();
        }

        this.startPage = new StartPage(this);
        await this.startPage.start();
    }
}

//egret.registerClass(Main, "Main");
window["Main"] = Main;

