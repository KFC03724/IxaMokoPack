// ==UserScript==
// @name         IxaMokoLogin
// @description  戦国IXA用ツール ログイン
// @version      10.20.202008.0
// @namespace    hoge
// @author       nameless
// @include      https://*.sengokuixa.jp/world/*
// @run-at       document-start
// @grant        none
// ==/UserScript==

// MokoLogin
function MokoLogin($) {
  console.debug('Load... MokoLogin');
  "use strict";
  
  // ログイン時間
  var time = ~~(new Date() / 1000);
  document.cookie = 'im_st=' + time + '; domain=.sengokuixa.jp; path=/;';
  $('div.infoTable').css({
    'margin-left': '0',
    'padding': '0'
  }).insertBefore('div.back');
  $('div[class*="subserver_s"], div[class*="mainserver_s"]').click(function() {
    if (MokoLogin.flag) {
      location.href = $('div.back a').attr('href');
      return false;
    }
    
    var title = $(this).parent().attr('title') || $(this).find('a').attr('title');
    var chapter_num = $(this).attr('class').match(/\d+/g)[0];
    var season_num = $(this).find('span[class^="flag_"] img').attr('src').match(/flag_\w(\d+).gif/)[1];
    var world = title.replace('ワールド', '');
    // var chapter = {
    //   1: '19'
    // }[chapter_num];
    // メンテナンス終了は17:00なので、UTCとの時差は考慮しない

// 2021.02.05 21章表示対応 ここから
//    var chapter = ((new Date()).toISOString().substr(0,10) < "2020-08-14")
//      ? '19'
//      : '20'
var chapter = ((new Date()).toISOString().substr(0,10) < "2021-02-05")
? '20'
: '21'
// 2021.02.05 21章表示対応 ここまで
    
    var season = parseFloat(season_num).toString(10);
    
    if (!chapter) {
      alert('【sengokuixa-moko】\n\nこのワールドの舞台には対応していません');
      return false;
    }
    
    // ワールド・章・期 クッキー登録
    document.cookie = 'chapter=' + world + '-' + chapter + '-' + season + '; domain=.sengokuixa.jp; path=/;';
    MokoLogin.flag = true;
  });
}

window.addEventListener('DOMContentLoaded', function() {
  var scriptMoko = document.createElement('script');
  scriptMoko.setAttribute('type','text/javascript');
  scriptMoko.textContent = '(' + MokoLogin.toString() + ')(j$);';
  document.head.appendChild(scriptMoko);
});
