$(function(){
  const $formFields = $('.form-field.has-placeholder');
  $formFields.each(function(i, item) {
    const $description = $(item).find('.hpdf-description')
    if ($description.length) {
      const placeholder_text = $description.text();
      $description.hide();
      $(item).find('.input-wrapper > input,.input-wrapper > textarea')
        .attr('placeholder',placeholder_text);
    }
  });
  const $policyElem = $('.form-field.policy-check');
  if($policyElem.length) {
    const $placeholder = $policyElem.find('.hpdf-description');
    const placeholder_text = $placeholder.text();
    $placeholder.hide();
    $policyElem.find('.input-wrapper')
      .before($('<div>')
        .addClass('privacy-policy-text')
        .html(nl2br(placeholder_text))
      );
  }
  const inlineElements = [
    ".input-inline_2-2.error",
    ".input-inline_3-2.error",
    ".input-inline_3-3.error"
  ];
  const errors = $(inlineElements.join(','));
  errors.each(function(i, item){
    const $errorMsg = $(item).nextAll('.error').first();
    $errorMsg.remove();
  });

  $('.input-inline_2-1.error, .input-inline_3-1.error').each(function(i,item){
    const $errorMsg = $(item).nextAll('.error.no-label:not(.form-field)').first();
    const $newErrorMsg = $errorMsg.clone();
    $errorMsg.remove();
    const $lastElem = $(item).nextAll('.input-inline_2-2, .input-inline_3-3').first();
    $lastElem.addClass('no-margin-bottom');
    $lastElem.after($newErrorMsg);
  });

  const hr_errors = $('.error.after_hr:not(.input-inline_*)');
  if(hr_errors.length) {
    hr_errors.each(function(i,item){
      const $error = $(item).nextAll('.error.no-label').first();
      const $newError = $error.clone();
      $error.remove();
      $(item).append($newError);
      $(item).find('.error.no-label').show();
    });
  }

  const $privacy = $('.policy-check.error');
  if($privacy.length) {
    const $privacyError = $privacy.nextAll('.error.no-label').first();
    const $newError = $privacyError.clone();
    $privacy.append($newError);
    $privacyError.remove();
    $privacy.find('.error.no-label').show();
  }

  $("[class*='maxlength-'] .input-wrapper").each(function(){
    const $inputWrapper = $(this);
    const regex = /maxlength-(?<len>\d*)/;
    const classList = $(this).parent().attr("class").split(" ");
    let maxLength = 0;
    for (var i = 0; i < classList.length; i++) {
      const match = classList[i].match(regex);
      if (match) {
        maxLength = match[1];
      }
    }

    const $input = $(this).children();
    $input.on('blur change',function(){
      $inputWrapper.next(".error").remove();
        if( $(this).val().length >  maxLength) {
          $inputWrapper.parent().addClass("error");
          $inputWrapper.after("<p class=\"error no-label\">" + maxLength + "文字以内で入力してください</p>");
        } else {
          $inputWrapper.parent().removeClass("error");
        }
      });
    });

  $('.hpdf-zipcode').append('<span class="p-country-name" style="display:none;">Japan</span>');
  const $zipInput = $('.hpdf-zipcode .input-wrapper input');
  $zipInput.before('<span class="zipcode-mark">〒</span>');
  $zipInput.after('<a href="" id="searchZipcode">検索</a>');

  $('#searchZipcode').on('click', function () {
    const zip = $zipInput.val().replace('-', '');
    const zipPattern = /^[0-9]{7}$/;
    if(!zip.match(zipPattern)) {
      return false;
    }

    const api = 'https://zipcloud.ibsnet.co.jp/api/search?zipcode=';
    const url = api + zip;

    fetchJsonp(url, {
      timeout: 10000
    })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          if (data.status === 400) {
            // 入力パラメータエラー
            console.log('入力パラメータエラー');
          } else if (data.results === null) {
            // みつからない
          } else {
            $('.pref select option').filter(function () {
                return $(this).text() === data.results[0].address1;
            }).prop('selected', true);
            $('.address_one .input-wrapper input').val(`${data.results[0].address2}${data.results[0].address3}`);
          }
        })
        .catch((ex) => {
          console.log(ex);
          return false;
        });
    return false;
  });

  $('.required input[type=text],.required input[type=number],.required input[type=email],.required textarea, .required select').checkRequire();
});
const nl2br = function(str) {
  return str.replace(/\r\n/g, "<br />").replace(/(\n|\r)/g, "<br />");
}

jQuery.fn.extend( {
  checkRequire: function(){
    $(this).on('blur change',function(){
      if(!$(this).val()) {
        $inputLabel = $(this).parent().prev().text();
        $errMsg = $('<p>').addClass('error no-label').text($inputLabel+'は必須です');
        $(this).addClass('error');

        if ($(this).hasClass('select')) {
          if($(this).parent().next('p.error').length < 1) {
            $(this).parent().after($errMsg);
          }
        } else if ($(this).parent().parent().hasClass('hpdf-zipcode')) {
          if($("#searchZipcode").next('p.error').length < 1) {
            $("#searchZipcode").after($errMsg);
          }
        } else {
          if($(this).next('p.error').length < 1) {
            $(this).after($errMsg);
          }
        }

      } else {
        $(this).removeClass('error');
        if ($(this).hasClass('select')) {
          $(this).parent().next('p.error').remove();
        } else if ($(this).parent().parent().hasClass('hpdf-zipcode')) {
          $("#searchZipcode").next('p.error').remove();
        } else {
          $(this).next('p.error').remove();
        }
      }
    });
  }
});