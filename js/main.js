$(function() {
  
  // カラーコードテキストボックスのフォーカスアウト処理
  $('#colorCodeBox').blur(function() {
    if ($('#colorCodeBox').val().length === 0) {
      $('#colorCodeBox').val('#');
      $('.colorChart').css("background", '');
    }
  });

  //　changeイベント
  $('input').on('input change', function() {
    // change対象のクラス
    let currentClass = $(this).attr('class');

    // スライドバー変更時処理
    if (currentClass === 'bar') {
      // 操作中のスライドバーのid取得
      let id = '#' + $(this).prev().attr('id');
      $(id).val($(this).val());
      colorChange();
    }

    // RGBテキストボックス変更時処理
    if (currentClass == 'score') {
      // 操作中のテキストボックスのid取得
      let barId = '#' + $(this).next().attr('id');
      let boxId = '#' + $(this).attr('id');
      let alphaBoxNum = $(boxId).val();
      // alpha入力時
      if (boxId === '#alphas') {
        if (alphaBoxNum > 1) {
          $(boxId).val('1');
        } else if (alphaBoxNum < 0){
          $(boxId).val('0');
        } else {
          $(boxId).val(alphaBoxNum);
        }
        $(barId).val(alphaBoxNum);
        colorChange();
        return;
      }

      let boxNum = Math.floor($(boxId).val());
      // テキストボックスの値が入力範囲を超えた場合min、maxをセット
      if (boxNum > 255) {
        $(boxId).val('255');
      } else if (boxNum < 0){
        $(boxId).val('0');
      } else {
        $(boxId).val(boxNum);
      }
      // スライドバーに入力値と同じ値を設定
      $(barId).val(boxNum);
      colorChange();
    }
  });

  // RGB⇒カラーコード変換処理
  function colorChange() {
    // 各RGBの値を16進数に変換
    let colorR = Number($('#reds').val()).toString(16);
    let colorG = Number($('#greens').val()).toString(16);
    let colorB = Number($('#blues').val()).toString(16);
    let alpha = $('#alphas').val();
    // 16進変換後一桁の場合はそれぞれ先頭に0を付ける
    if (colorR.length === 1) {
      colorR = "0" + colorR;
    }
    if (colorG.length === 1) {
      colorG = "0" + colorG;
    }
    if (colorB.length === 1) {
      colorB = "0" + colorB;
    }
    let colorCode = "#" + colorR + colorG + colorB;
    let rgba = "rgba(" + $('#reds').val() + ", " + $('#greens').val() + ", " + $('#blues').val() + ", " + alpha + ")";
    // 変換ボックスに表示
    $('#colorCodeBox').val(colorCode);
    // colorChartの色変更
    $('.colorChart').css("background", rgba);
    $('.colorChart').css("border", '2px solid #000');
  }

  // paletteボタン押下処理
  $('.btn').click(function() {
    // クリックされたボタン
    let clickBtn = $(this).attr('id');
    // paletteボタン押下時の処理
    if (clickBtn === 'paletteBtn') {
      $('#paletteModal').fadeIn();
    } 
    // modalのclose処理
    if (clickBtn === 'closeBtn') {
      $('#paletteModal').fadeOut();
    }
  });
});
 
