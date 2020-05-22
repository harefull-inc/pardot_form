$(function(){
  const $formFields = $('.form-field.has-placeholder');
  $formFields.each(function(i, item) {
    if ($(item).children('span.description').length) {
      const $placeholder = $(item).children('span.description');
      const placeholder_text = $placeholder.text();
      $placeholder.hide();
      $(item).find('.input-wrapper > input,.input-wrapper > textarea').attr('placeholder',placeholder_text);
    }
  });
  const $policyElem = $('.form-field.policy-check');
  if($policyElem.length) {
    const $placeholder = $policyElem.children('span.description');
    const placeholder_text = $placeholder.text();
    $placeholder.hide();
    $policyElem.find('.input-wrapper')
      .before($('<div>')
        .addClass('privacy-policy-text')
        .html(nl2br(placeholder_text))
      );
  }
  const inlineElements = [
    //".input-inline_2-1.error",
    ".input-inline_2-2.error",
    //".input-inline_3-1.error",
    ".input-inline_3-2.error",
    ".input-inline_3-3.error"
  ];
  const errors = $(inlineElements.join(','));
  errors.each(function(i, item){
    const $errorMsg = $(item).nextAll('.error').first();
    $errorMsg.remove();
  });

  $('.input-inline_2-1, .input-inline_3-1').each(function(i,item){
    const $errorMsg = $(item).nextAll('.error').first();
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


});
 const nl2br = function(str) {
  return str.replace(/\r\n/g, "<br />").replace(/(\n|\r)/g, "<br />");
}