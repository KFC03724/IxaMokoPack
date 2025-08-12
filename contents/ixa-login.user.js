// ==UserScript==
// @name         IxaMokoLogin
// @description  戦国IXA用ツール ログイン
// @version      10.30.202508.6
// @namespace    hoge
// @author       nameless
// @include      https://*.sengokuixa.jp/world/*
// @run-at       document-start
// @grant        none
// ==/UserScript==

// 音楽：魔王魂
function MokoLogin($) {
  console.debug('Load... MokoLogin');
  "use strict";

// 2023.09.17 MOKOが有効だとログイン即セッションタイムアウトになる事象の解消 ここから
  // === Cookie ===

  // クッキーに登録したログイン時間を取得
  if (getCookie('im_st')) {
    login_data.endtime = getCookie('im_st');
    setStorage('ixamoko_login_data', login_data);
    document.cookie = 'im_st=0; expires=Fri, 31-Dec-1999 23:59:59 GMT; domain=.sengokuixa.jp; path=/;';
  }
  
  // クッキーに登録した 章・期の取得
  if (getCookie('chapter')) {
    var shred = getCookie('chapter').split('-');
    login_data.world = shred[0];
    login_data.chapter = shred[1];
    login_data.season = shred[2];
    setStorage('ixamoko_login_data', login_data);
    document.cookie = 'chapter=; expires=Fri, 31-Dec-1999 23:59:59 GMT; domain=.sengokuixa.jp; path=/;';
  }
  
  // login_dataがない場合
  if (!Object.keys(login_data).length) {
    location.href = '/false/login_sessionout.php';
  return false;
  }
  
  // ^ Cookie
  // 2023.09.17 MOKOが有効だとログイン即セッションタイムアウトになる事象の解消 ここまで

  console.debug('Load... MokoLogin');
  "use strict";

  // ログイン時間
  var time = ~~(new Date() / 1000);
  document.cookie = 'im_st=' + time + '; max-age=10800; domain=.sengokuixa.jp; path=/;';
  $('div.infoTable').css({
    'margin-left': '0',
    'padding': '0'
  }).insertBefore('div.back');
  $('div[class*="subserver_s"], div[class*="mainserver_s"]').mousedown(function() {
    if (MokoLogin.flag) {
    location.href = $('div.back a').attr('href');
    return false;
  }
  var title = $(this).parent().attr('title') || $(this).find('a').attr('title');
  var season_num = $(this).find('span[class^="flag_"] img').attr('src').match(/flag_.(\d+)\.gif/)[1];
  var world = title.replace('ワールド', '');
  var chapter = $(this).find('span.otono_sm:first img').attr('src')?.match(/_otono_s(\d+)_\d+\.png/)[1] || '30';

  var season = parseFloat(season_num).toString(10);

  if (!chapter) {
    alert('【sengokuixa-moko】\n\nこのワールドの舞台には対応していません');
    return false;
  }

  // ワールド・章・期 クッキー登録
  document.cookie = 'chapter=' + world + '-' + chapter + '-' + season + '; max-age=10800; domain=.sengokuixa.jp; path=/;';
  MokoLogin.flag = true;
  });
}

function loadMokoLogin() {
  var scriptMoko = document.createElement('script');
  scriptMoko.setAttribute('type','text/javascript');
  scriptMoko.textContent = '(' + MokoLogin.toString() + ')(j$);';
  document.head.appendChild(scriptMoko);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', loadMokoLogin);
} else {
  loadMokoLogin();
}