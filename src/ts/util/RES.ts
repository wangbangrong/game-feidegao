

//根据id获取纹理 
//因为RES.getRes('a.b')获取不到纹理,最新发现RES.getRes('a#b')可以获取到，但因为无法在文档中找到该用法，还是使用以下函数封装;
export function getTexture(id: string): egret.Texture {
    if (id.indexOf('.') !== -1) { //纹理集
        let keys : Array<string>  = id.split('.');
        let group : string = keys[0];
        let item : string  = keys[1];
        let map = RES.getRes(group)._textureMap; //_textureMap
        return map[item];
    } else {
        return RES.getRes(id);
    }
}

//根据id获取bm对象
export function getBitmap(id: string): egret.Bitmap {
    let texture: egret.Texture = getTexture(id);
    let bm: egret.Bitmap = new egret.Bitmap(texture);
    return bm;
}