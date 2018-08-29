import Obj from './Obj'
import * as Stage from '../util/Stage'

class ScrollBg {
 
      private bgArr : Array<egret.Bitmap> = [];

      private container : egret.DisplayObjectContainer;
  
      constructor(container: egret.DisplayObjectContainer, bgArr : Array<egret.Bitmap>) {
          this.container = container;
          this.bgArr = bgArr; //初始化背景列表
          this.initBgPos(); //初始化背景位置
          this.addBgToContainer(); //添加背景到容器
      }
  
      private initBgArr(bgArr):void{
        this.bgArr = bgArr;
      }
  
      private initBgPos():void{
          this.bgArr.map((bg,index)=>{
               bg.x = 0;
               bg.y = index *  Stage.getStageH() * -1;
          });
      }
  
      private addBgToContainer():void{
          this.bgArr.map((bg)=>{
              this.container.addChild(bg);
          });
      }
 
      public reset():void{
          this.initBgPos();
      }
  
      //当num > 0时，背景向上滚动， < 0时，向下滚动
      public scroll( num : number ):void{
          if(num == 0){
              return;
          }
          if( num > 0){ //向上滚动
              let topBg = this.bgArr[this.bgArr.length - 1]; //最上面的背景
              if(topBg.y == 0){
                  return;
              }else{
                  let maxMoveStep = 0 - topBg.y;
                  num = Math.min(maxMoveStep,num);
              }
          }else{
             let bottomBg = this.bgArr[0]; //最下面的背景
             if(bottomBg.y == 0){ 
                 return;
             }else{
               let maxMoveStep = 0 - bottomBg.y;
               num = Math.max(maxMoveStep,num);
             }
  
          }
          this.bgArr.map((bg)=>{
              bg.y += num;
          });
      }
  }

  export default ScrollBg;