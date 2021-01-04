# pardot_form

## yarn

以下実行するとcssが生成される。実行中は保存で変更を逐次反映。

`yarn watch:scss2cssprefix`

## Pardotフォーム側の設定

「フォーム」のテンプレートを変更
```
<form accept-charset="UTF-8" method="post" action="%%form-action-url%%" class="form" id="pardot-form">
<div class="form-before-contents">　←追加
%%form-opening-general-content%%

%%form-if-thank-you%%
        %%form-javascript-focus%%
        %%form-thank-you-content%%
        %%form-thank-you-code%%
%%form-end-if-thank-you%%

%%form-if-display-form%%

        %%form-before-form-content%%
                %%form-if-error%%
                        <p class="errors">Please correct the errors below:</p>
                %%form-end-if-error%%
</div>                ←追加
                %%form-start-loop-fields%%

....（省略）....

%%form-if-field-label%%
                                        <label class="field-label" for="%%form-field-id%%">%%form-field-label%%</label>
                                %%form-end-if-field-label%%
                                <span class="input-wrapper">%%form-field-input%%</span>　←囲むspanを追加
                                %%form-if-field-description%%
                                        <span class="description">%%form-field-description%%</span>
                                %%form-end-if-field-description%%
....（省略）....                       
```

レイアウトのテンプレート
```
<!DOCTYPE html>
<html>
        <head>
                <base href="" >
                <meta charset="utf-8"/>
                <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
                <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
                <meta name="description" content="%%description%%"/>
                <title>%%title%%</title>
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/yakuhanjp@3.2.0/dist/css/yakuhanjp.min.css">
                <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/normalize.css@8.0.1/normalize.css">
                <link rel="stylesheet" type="text/css" href="https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
                <link rel="stylesheet" type="text/css" href="{生成されるCSSのURL}">
                <script src="https://code.jquery.com/jquery-3.5.1.min.js" crossorigin="anonymous"></script>
                <script src="{生成されるjsファイルのURL}"></script>
        </head>
        <body>
                %%content%%
        </body>
</html>
```

・横幅固定版（PC:800px、SP:100%）を利用したい場合は、`body`に`form-width-fix`というクラスを付与してください。
クラスなしの場合は横幅100%で表示されます。

## formカスタムclassリスト

| やりたいこと | 対象項目 | CSSクラス名 | 備考 |
|:--|:--|:--|:--|
|inputを2項目並べたい | input(text) | input-inline_2-1,input-inline_2-2" | 必ずtext_inline_1とtext_inline_2を並べること。input-inline_2-2はafter_hrとの共存はできないので、この項目の後に水平線を引きたい場合は次の項目にbefore_hrをつけるエラーメッセージは最初の項目(input-inline_*-1)に入力したメッセージが表示され、後ろの項目に設定したエラーメッセージは表示されなくなる。 |
|inputを3項目並べたい | input-inline_3-1〜input-inline_3-3	| | |
|inputのラベルを表示したくない | input-inline_2-2,input-inline_3-2,input-inline_3-3 | no-label	| 2項目並べた場合2個目のinputはラベル表示したくないぞという場合に利用する|
|項目幅を300pxにしたい | input(text),input(email),select | input-300 | 郵便番号など、入力欄の幅が短くていい場合こちら付与 |
|項目の後に水平線を引きたい |  | after_hr | 上下60pxのマージンをもった水平線がひかれる |
|項目の前に水平線を引きたい |  | before_hr | |
|項目を1列に並べたRadio,checkboxにしたい | input(radio),input(checkbox) | inline |  |
|プライバシーポリシー同意のチェックを作りたい | input(checkbox) | policy-check | 「説明」にプライバシーポリシー文を記述する。改行は反映されるがタグは使えないので注意。 |
|placeholderを入力したい | input(text), input(email),textarea | has-placeholder | 「説明」に入力した文言がplaceholderとして表示される。 項目後ろの説明文との併用はできない。 |
|項目の後ろに説明文を出したい | input(text) | text_after | 「説明」に入力した文言が項目の後ろに表示される。単位を出したい時などに。placeholder、項目下に表示との併用はできない。 |
|項目の下に説明文を出したい | input(text) |   | 「説明」に入力した文言が項目の下に表示される。placeholder、項目後ろに表示との併用はできない。 |
|項目の分かれた年月日の入力項目をいい感じにしたい | input(text)	inline_y, inline_m, inline_d |  | 年月日の3項目を並べた際にinputのサイズを調整したい場合各項目に指定する。 inputのwidthが年が長め、月・日は短めになる。 |
