import IFalling from './IFalling'

/**
 * 具备反弹能力物体实现的接口，规定了用于检测下落物体与反弹物体碰撞检测的方法hitTestPoint(),并在此完成碰撞时两个物体间的处理逻辑 
 */
interface IRebound{
    hitTestPoint( obj : IFalling ) : boolean;
}

export default IRebound;