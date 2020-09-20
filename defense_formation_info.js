// JQuery、DefenseFormationInfo()の組込
window.addEventListener('DOMContentLoaded', function() {
    var scriptElement = document.createElement('script');
    scriptElement.setAttribute('type','text/javascript');
    scriptElement.textContent = '(' + DefenseFormationInfo.toString() + ')(j213$);';
    document.body.appendChild(scriptElement);
    });
    
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
    var h = $(html).find('.ig_fight_statusarea.home_defense_formation').find('h3');
    if (h.length > 0) {
    var h_html = '<div class="mt_defense_formation" style="background-color:midnightblue;">' +
    '<a href="/facility/set_unit_list.php?ano=9">' +
    '<div class="mt_troops" style="color:yellow;width:95%;padding:2px 0px 0px 0px;">' +
    '<span>本丸防御陣形[一括編成]</span></div></a>';
    for (var n = 0; n < h.length; n++) {
    // 部隊名
    var h_butai = h[n].textContent.replace(/[\[\] ]/g,'').replace(/部隊/,'');
    h_html = h_html +
    '<div class="mt_troops">' +
    '<div class="mt_unit" style="background-color:whitesmoke; color: darkgreen;">' +
    h_butai + '</div></div>';
    }
    h_html = h_html + '</div>';
    $('#mt_butai').append(h_html);
    }
    });
    return;
}