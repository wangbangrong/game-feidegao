import * as Stage from '../util/Stage'

export enum horizontalDirection {
    left = 1,
    right
}

export enum verticalDirection {
    top = 3,
    bottom
}


export function getFullSizeContainer(): egret.DisplayObjectContainer {
    let ret = new egret.DisplayObjectContainer;
    ret.width = Stage.getStageW();
    ret.height = Stage.getStageH();
    return ret;
}

export function getZeroByLen(len: number): string {
    let ret: string = '';
    for (let i = 0; i < len; i++) {
        ret += '0';
    }
    return ret;
}

export function fixZero(num: number, fixLen: number): string {
    let n = num.toString();
    if (n.length >= fixLen) {
        return n;
    } else {
        let fixedLen = fixLen - n.length; //需要补0的数量
        let preFix = getZeroByLen(fixedLen);
        return [preFix, n].join('');
    }
}

/**
 * 判断x,y坐标是否存在于x1,y1,x2,y2所构成的矩形内
 * @param x1 左上角坐标
 * @param y1 
 * @param x2 右下角坐标
 * @param y2 
 * @param x 
 * @param y 
 */
export function isInRect(x1: number, y1: number, x2: number, y2: number, x: number, y: number): boolean {
    if (x >= x1 && x <= x2 && y >= y1 && y <= y2) {
        return true;
    }
    return false;
}

/**
 * 判断两个矩形是否相交
 * @param x1 第1个矩形左上角坐标
 * @param y1 第1个矩形左上角坐标
 * @param x2 第1个矩形右下角坐标
 * @param y2 第1个矩形右下角坐标
 * @param x3 第2个矩形左上角坐标
 * @param y3 第2个矩形左上角坐标
 * @param x4 第2个矩形右下角坐标
 * @param y4 第2个矩形右下角坐标
 */
export function isIntersect(x1: number, y1: number, x2: number, y2: number, x3: number, y3: number, x4: number, y4: number): boolean {
    //x3,y3 x4,y4 构成的矩形的4个角
    let pointArr: Array<egret.Point> = [];
    pointArr.push(new egret.Point(x3, y3));
    pointArr.push(new egret.Point(x4, y3));
    pointArr.push(new egret.Point(x3, y4));
    pointArr.push(new egret.Point(x4, y4));

    let ret: boolean = false;
    for (let i = 0; i < pointArr.length; i++) {
        let point: egret.Point = pointArr[i];
        ret = isInRect(x1, y1, x2, y2, point.x, point.y);
        if (ret) {
            break;
        }
    }

    if (!ret) {
        let pointArr: Array<egret.Point> = [];
        pointArr.push(new egret.Point(x1, y1)); // x1 y1
        pointArr.push(new egret.Point(x2, y1));// x2 y1
        pointArr.push(new egret.Point(x1, y2)); // x1 y2
        pointArr.push(new egret.Point(x2, y2)); // x2 y2
        for (let i = 0; i < pointArr.length; i++) {
            let point: egret.Point = pointArr[i];
            ret = isInRect(x3, y3, x4, y4, point.x, point.y);
            if (ret) {
                console.log('b');
                console.log(x3, y3, x4, y4, point);
                break;
            }
        }
    }

    return ret;
}