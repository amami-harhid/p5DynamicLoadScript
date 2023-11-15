// Pico2.js
// p5.prototype.registerMethod('init')にて
// window.p = p; を実行している。
// このJSファイルはp5.preload()の中で動的に読み込まれる
// 前提なので p を参照できる。
// Scriptは直列で順番にロードするので、p.PicoSprite を参照できる。
// PicoSpriteのメソッドは継承しているので、PicoSprite2に書かなくても利用できる。

p.PicoSprite2 = class extends p.PicoSprite {

  _customDraw() {
    if(this.collide(floorGroup,()=>{
      this.vel.y = -6;
      this.vel.x = p.random(-2,2);
    }));
    if(this.x > W) this.x = 0;
    if(this.x < 0) this.x = W;
    if(this.y < 0) this.vel.y = -6;
    this.fukidashi.speak("ぼくPICO2");
  }
};
