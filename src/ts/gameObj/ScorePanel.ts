 

export class ScorePanelConstrArg{
    /** 初始分数 */
    score : number;
    x : number;
    y : number;
    w : number;
    h : number;
    color : number;
    fontSize : number;
    textAlign : string
}


class ScorePanel extends egret.DisplayObjectContainer{
    constructor(option : ScorePanelConstrArg){
        super();
        this.init(option);
    }

    private color : number;

    private fontSize : number;

    private score : number;

    private el: egret.TextField;

    private textAlign : string;

    private init( option : ScorePanelConstrArg):void{
        this.x = option.x;
        this.y = option.y;
        this.width = option.w;
        this.height = option.h;
        this.score = option.score;

        this.color = option.color;
        this.fontSize = option.fontSize;
        this.textAlign = option.textAlign;

        let text : egret.TextField = new egret.TextField();
        text.size =  this.fontSize;
        text.textColor =   this.color;
        text.textAlign = this.textAlign;
        text.width = this.width;
        text.height = this.height;
        text.verticalAlign = 'middle';
        text.text = this.score.toString();
        this.el = text;

        this.addChild(this.el);
    }

    public getScore():number{
        return this.score;
    }

    public updateScore(score : number):void{
        this.score = score;
        this.el.text = this.score.toString();
    }
}

export default ScorePanel;