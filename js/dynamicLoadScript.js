/*
 * p5のinit処理の中で『dynamicLoadScript』をpreloadメソッドとして登録する。 
 * dynamicLoadScript内でPromise処理で処理完了した数がパス配列の数に達したら、preload数を減算する。
 */
p5.prototype.registerMethod('init', function() {
  const p = this;
  window.p = p;
  
  // preloadメソッドとして登録する
  p5.prototype.registerPreloadMethod('dynamicLoadScript', p5.prototype);

  p5.prototype.dynamicLoadScript = function(path){

    const _msTime = Date.now(); // Cache回避用

    // 引数が配列でないときは配列化する
    let _pathArr;
    if( Array.isArray(path) ) {
      _pathArr = path;
    }else{
      _pathArr = [path];      
    }

    // 引数のパス数
    let _scriptPreLoadCount = _pathArr.length;

    // 順番に直列でロードする。
    (async () => {
      await (async () => {
        for (const _path of _pathArr) {
          const _pathNonCache = `${_path}?ts=${_msTime}`;// Cacheされないように対策
          await _loadScriptDynamic(_pathNonCache)
          .then(()=>{
            // ロード数に達したら デクリメントする
            _scriptPreLoadCount -= 1;
            if( _scriptPreLoadCount == 0){
              p._decrementPreload();
            }
          })
          .catch((err)=>{
            // reject時は意図的にデクリメントしない → setupは動かない。
            console.log("ERROR!=",err);
          });
        }
      })();
    })();
  }
});
/*
 * _dynamicLoadScript
 * Javascriptを読み込む処理をPromiseとして返す。
*/
const _loadScriptDynamic =  function(_path, _ms=3000, _async = true, _type = "text/javascript") {
  return new Promise((resolve, reject)=>{
    try {
      setTimeout(() => reject('timeout'), _ms);
      const scriptEle = document.createElement("script");
      scriptEle.type = _type;
      scriptEle.async = _async;
      scriptEle.src = _path;

      scriptEle.addEventListener("load", (ev) => {
        resolve({ status: true });
      });

      scriptEle.addEventListener("error", (ev) => {
        reject({
          status: false,
          message: `Failed to load the script ${_path}`
        });
      });
      document.body.appendChild(scriptEle);
      
    } catch (error) {
      reject(error);
    }
  });
}
