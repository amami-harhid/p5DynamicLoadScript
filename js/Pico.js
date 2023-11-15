// loadDynamicScript.jsの
// p5.prototype.registerMethod('init')にて
// window.p = p; を実行している。
// このJSファイルはp5.preload()の中で動的に読み込まれる
// 前提なので p を参照できる。
p.PicoSprite = class extends p.Sprite {
      
  constructor(...args) {
    super(...args);
    this.fukidashi = new p.Fukidashi(this);
  }
  
  _customDraw() {
    if(this.collide(floorGroup,()=>{
      this.vel.y = -3;
    }));
    if(this.x > W) this.x = 0;
    if(this.x < 0) this.x = W;
    if(this.y < 0) this.vel.y = -3;
    this.fukidashi.speak("私はPICO");
  }
  
  draw() {
    super.draw();
    this._customDraw();
  }
  
}