# p5DynamicLoadScript

動的にJavascriptファイルをロードするサンプルです。

## dynamicLoadScript.js

次で参照できます。
https://amami-harhid.github.io/p5DynamicLoadScript/js/dynamicLoadScript.js

このサンプルでは、次の４つのファイルを動的にロードします。
| File | class |
----|----
| js/Pico.js | PicoSprite / p5.play の Spriteを継承する |
| js/Pico2.js | PicoSprite2 / PicoSprite を継承する |
| js/Pico3.js | PicoSprite3 / PicoSprite2 を継承する |
| js/Pico4.js | PicoSprite4 / PicoSprite3 を継承する |

## 非同期直列型

### 配列で利用

指定した順番にロードします。p5 の preloadメソッドのなかで使用します。

```
const _scriptPathArr = [
  './js/Pico.js',
  './js/Pico2.js',
  './js/Pico3.js',
  './js/Pico4.js',
];

const sketch = function( p ) {
　p.preload = function(){
    // 引数配の要素順にロード順を保証する
    p.dynamicLoadScript(_scriptPathArr);
  };
};
```

### 単独パスで利用（１つだけロードする）

```
const _scriptPathArr = [
  './js/Pico.js',
  './js/Pico2.js',
  './js/Pico3.js',
  './js/Pico4.js',
];

const sketch = function( p ) {
　p.preload = function(){
    p.dynamicLoadScript('./js/Pico.js');
  };
};
```

### index.html

scriptタグで　dynamicLoadScript.jsを読み込んでください。
