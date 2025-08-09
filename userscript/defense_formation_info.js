// JQuery、DefenseFormationInfo()の組込
function loadDFI() {
  var scriptElement = document.createElement('script');
  scriptElement.setAttribute('type','text/javascript');
  scriptElement.textContent = '(' + DefenseFormationInfo.toString() + ')(j213$);';
  document.body.appendChild(scriptElement);
}

// 拡張のメイン処理
function DefenseFormationInfo($){
  console.debug('Chrome拡張 UserJs start');
  console.debug('現在のページのURL=' + location.pathname);

  var xrwStatusText = function(xhr) {
    return xhr.setRequestHeader('X-Requested-With', 'statusText');
  };

  // 待機部隊を読込む
  $.ajax({
    type: 'post',
    url: '/facility/unit_status.php?dmo=wait',
    beforeSend: xrwStatusText,
    }).then(function (html) {
      // 部隊名を抽出
      var h = $(html).find('.ig_fight_statusarea.home_defense_formation').find('h3'),
      s = $(html).find('.ig_fight_statusarea.sub_area_defense_formation').find('h3'),
      h_html = '';
      if (h.length) {
        h_html += '<div class="mt_defense_formation" style="background-color:rgba(0,50,100,0.5);margin-top:5px;padding:3px 0 5px;">' +
        '<div class="mt_troops" style="width:95%;padding:2px 0px 0px 0px;">' +
        '<a href="/facility/set_unit_list.php?ano=9">' +
        '<span style="color:red;">本丸兵士編成</span></a>' +
        '<span style="display:inline-block;border-radius:50%;line-height:12px;width:12px;height:12px;text-align:center;background-color:#359;margin-left:5px;">' +h.length + '</span>' +
        '<button id="honmaru_close_btn" style="font-size:6px;border:none;margin-left:10px;">▲▼</button>' +
        '</div>' +
        '<div id="honmaru_butai_ichiran" style="display:none;">';
        for (var n = 0; n < h.length; n++) {
          // 部隊名
          var h_butai = h[n].textContent.replace(/\[|\]|\s|（|部隊|スキルあり）/g,'');
          h_html += '<div class="mt_troops">' +
          '<div class="mt_unit" style="background-color:#359;color:whitesmoke;">' +
          h_butai.substring(0, 6) +
          '</div></div>';
        }
        h_html += '</div></div>';
      }
      if (s.length) {
        h_html += '<div class="mt_defense_formation" style="background-color:rgba(0,50,100,0.5);margin-top:5px;padding:3px 0 5px;">' +
        '<div class="mt_troops" style="width:95%;padding:2px 0px 0px 0px;">' +
        '<a href="/facility/set_unit_list.php?ano=14">' +
        '<span style="color:blue;">所領兵士編成</span></a>' +
        '<span style="display:inline-block;border-radius:50%;line-height:12px;width:12px;height:12px;text-align:center;background-color:#359;margin-left:5px;">' + s.length + '</span>' +
        '<button id="shoryo_close_btn" style="font-size:6px;border:none;margin-left:10px;">▲▼</button>' +
        '</div>' +
        '<div id="shoryo_butai_ichiran" style="display:none;">';
        for (var n = 0; n < s.length; n++) {
          // 部隊名
          var s_butai = s[n].textContent.replace(/\[|\]|\s|（|部隊|スキルあり）/g,'');
          h_html += '<div class="mt_troops">' +
          '<div class="mt_unit" style="background-color:#359;color:whitesmoke;">' +
          s_butai.substring(0, 6) +
          '</div></div>';
        }
        h_html += '</div></div>';
      }
      if (h.length || s.length) {
        $(document).find('#mt_butai').append(h_html);

        // 部隊名表示・非表示切り替え
        $(document).on('click', '[id$="_close_btn"]', function() {
          $(this).closest('.mt_defense_formation').find('[id$="_butai_ichiran"]').slideToggle();
        });
      }
    });
    return;
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', loadDFI);
} else {
  loadDFI();
}