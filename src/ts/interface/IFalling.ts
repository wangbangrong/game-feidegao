
/**
 * 下落物体实现的接口，规定了rebound() 反弹方法 getTouchPoint() 获取下落物体下落时用于判断的一点
 */
interface IFalling{
   /**
    * 下落物体的反弹方法
    * @param speed 反弹时的速度
    */
    rebound( speed : number) : void;

    /**
     * 获取下落物体下落时用于判断的一点
     */
    getTouchPoint() : egret.Point;
}


export default IFalling;