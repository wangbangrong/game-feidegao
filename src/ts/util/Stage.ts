
/** 用于记录stage.width */
let stageW : number;

/** 用于记录stage.height */
let stageH : number;

export function setStageW( val : number){
    stageW = val;
}

export function setStageH( val : number){
    stageH = val;
}

export function getStageW():number{
    return stageW;
}

export function getStageH():number{
    return stageH;
}

export function init( stageW:number, stageH :number){
    setStageH(stageH);
    setStageW(stageW);
}
