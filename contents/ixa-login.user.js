// ==UserScript==
// @name         IxaMokoLogin
// @description  戦国IXA用ツール ログイン
// @version      10.17.2500.14
// @namespace    hoge
// @author       nameless
// @include      https://*.sengokuixa.jp/world/*
// @run-at       document-start
// @grant        none
// ==/UserScript==

// 改修履歴
// 2019.08.27
// 18章対応のみ。バージョンは10.17.2500.14としました。

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
    var chapter = {
    1: '16',
    2: '17',
    3: '18'
    }[chapter_num];    
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
