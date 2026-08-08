// ==UserScript==
// @name IxaMokoLogin
// @description 戦国IXA用ツール ログイン
// @version 10.32.202608.2
// @namespace hoge
// @author nameless
// @include https://*.sengokuixa.jp/world/*
// @run-at document-start
// @grant none
// ==/UserScript==

// MokoLogin
function MokoLogin($) {
    console.debug('Load... MokoLogin');
    "use strict";

    // ログイン時間のオーバーフローバグを修正
    var time = Math.floor(new Date().getTime() / 1000);
    document.cookie = 'im_st=' + time + '; domain=.sengokuixa.jp; path=/;';

    $('div.infoTable').css({
        'margin-left': '0',
        'padding': '0'
    }).insertBefore('div.back');

    $('div[class*="subserver_s"], div[class*="mainserver_s"]').click(function () {
        if (MokoLogin.flag) {
            location.href = $('div.back a').attr('href');
            return false;
        }

        var title = $(this).parent().attr('title') || $(this).find('a').attr('title');
        if (!title) return;

        var world = title.replace('ワールド', '');

        // 画像URLから現在の正しい「章」の数字を自動取得（取得できない場合はデフォルトで'32'に）
        var chapter_match = $(this).find('span.otono_sm:first img').attr('src')?.match(/_otono_s(\d+)_\d+\.png/);
        var chapter = $(this).find('span.sho_tit img').attr('src')?.match(/s(\d+)\.png/)?.[1] || '32';

        // 「期」の取得
        var season_img = $(this).find('span[class^="flag_"] img').attr('src');
        var season_num = season_img ? season_img.match(/flag_\w(\d+).gif/) : null;
        var season = season_num ? parseFloat(season_num[1]).toString(10) : '1';

        // 古い日付判定の固定処理は削除しました

        if (!chapter) {
            alert('【sengokuixa-moko】\n\nこのワールドの舞台には対応していません');
            return false;
        }

        // ワールド・章・期 クッキー登録
        document.cookie = 'chapter=' + world + '-' + chapter + '-' + season + '; domain=.sengokuixa.jp; path=/;';
        MokoLogin.flag = true;
    });
}

// 読み込みタイミングを「公式の通信が完全に終わった後」に遅らせる修正
window.addEventListener('load', function () {
    setTimeout(function () {
        var scriptMoko = document.createElement('script');
        scriptMoko.setAttribute('type', 'text/javascript');
        scriptMoko.textContent = '(' + MokoLogin.toString() + ')(j$);';
        document.head.appendChild(scriptMoko);
    }, 500); // 0.5秒待ってから挿入
});
