window.onload = () => {
  new p5( sketch );
};
const W = window.innerWidth;
const H = window.innerHeight;
let picoImage;
let fishImage;
let floorGroup;
const _scriptPathArr = [
  './js/Pico.js',  // Spriteを継承
  './js/Pico2.js', // Picoを継承して speakメソッドをOverride
  './js/Pico3.js', // Pico2を継承
  './js/Pico4.js', // Pico3を継承
];

const sketch = function( p ) {
　p.preload = function(){
    // 引数配の要素順にロード順を保証する
    p.dynamicLoadScript(_scriptPathArr);
    picoImage = p.loadImage('./assets/Pico walk1.svg')
  };
  
  p.setup = function(){
    p.world.gravity.y = 5;
    new p.Canvas(W,H);
    const floorSprite = new p.Sprite(W/4, H-5, W/2, 10, "static");
    const floorSprite2 = new p.Sprite(W*3/4, H-100, W/2, 10, "static");
    floorGroup = new p.Group();
    floorGroup.add(floorSprite, floorSprite2);
    pico = new p.PicoSprite(W*0.2,H/2);
    pico.addImage(picoImage);
    pico2 = new p.PicoSprite4(W*0.6,H/2);
    pico2.addImage(picoImage);
    pico2.opacity = 0.5
    
  };
  p.draw = function() {
    p.background(250,50);
  }
};