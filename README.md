# pardot_form

## yarn

以下実行するとcssが生成される。実行中は保存で変更を逐次反映。

`yarn watch:scss2cssprefix`

## Pardotフォーム側の設定

### 「フォーム」のテンプレートを数点変更

* divの追加
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
....（省略）....                       
```

* `%%form-field-input%%`を囲むinput-wrapper`要素の追加

コメント部分は実装時に入力しないように注意

```
%%form-start-loop-fields%%
  <p class="form-field %%form-field-css-classes%% %%form-field-class-type%% %%form-field-class-required%% %%form-field-class-hidden%% %%form-field-class-no-label%% %%form-field-class-error%% %%form-field-dependency-css%%">
  
    %%form-if-field-label%%
      <label class="field-label" for="%%form-field-id%%">%%form-field-label%%</label>
    %%form-end-if-field-label%%
    
    // %%form-field-input%%を囲む要素を追加
    <span class="input-wrapper">%%form-field-input%%</span>
    
    //「説明」を利用するカスタムを実装する場合は必須。クラス名注意。
    %%form-if-field-description%%
      <span class="hpdf-description">%%form-field-description%%</span>
    %%form-end-if-field-description%%
    
  </p>
  
  // エラー表示に利用するため必須なのでクラス名を変更するなどしないように注意。
  <div id="error_for_%%form-field-id%%" style="display:none"></div>
  %%form-field-if-error%%
    <p class="error no-label">%%form-field-error-message%%</p>
  %%form-field-end-if-error%%
  
%%form-end-loop-fields%%
```

### 「レイアウト」のテンプレート

必要なCSS、jsファイルへのリンクを適宜追加する

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

横幅固定版（PC:800px、SP:100%）を利用したい場合は、`body`に`form-width-fix`というクラスを付与してください。
クラスなしの場合は横幅100%で表示されます。

## フォーム項目カスタムリスト

フォームの「項目」編集メニューの「詳細」にある「CSSクラス」「説明」を利用してフォーム項目の表示方法をカスタムできます。

* [inputを2項目並べたい](#inputを2項目並べたい)
* [inputを3項目並べたい](#inputを3項目並べたい)
* [並べたinputのラベルを表示したくない](#並べたinputのラベルを表示したくない)
* [項目幅を300pxにしたい](#項目幅を300pxにしたい)
* [項目の後に水平線を引きたい](#項目の後に水平線を引きたい)
* [項目の前に水平線を引きたい](#項目の前に水平線を引きたい)
* [項目を1列に並べたRadio,checkboxにしたい](#項目を1列に並べたRadio,checkboxにしたい)
* [プライバシーポリシー同意のチェックを作りたい](#プライバシーポリシー同意のチェックを作りたい)
* [placeholderを入力したい](#placeholderを入力したい)
* [項目の後ろに説明文を出したい](#項目の後ろに説明文を出したい)
* [項目の下に説明文を出したい](#項目の下に説明文を出したい)
* [項目の分かれた年月日の入力項目をいい感じにしたい](#項目の分かれた年月日の入力項目をいい感じにしたい)

### inputを2項目並べたい
#### 対象項目
input(text)
#### 項目に付与するCSSクラス
input-inline_2-1,input-inline_2-2
#### 備考
必ずtext_inline_1とtext_inline_2を並べること。input-inline_2-2はafter_hrとの共存はできないので、この項目の後に水平線を引きたい場合は次の項目にbefore_hrをつける。
エラーメッセージは最初の項目(input-inline_*-1)に入力したメッセージが表示され、後ろの項目に設定したエラーメッセージは表示されなくなる。

### inputを3項目並べたい
#### 対象項目
input(text)
#### 項目に付与するCSSクラス
input-inline_3-1, input-inline_3-2, input-inline_3-3
#### 備考
「inputを2項目並べたい」と同様。

### 並べたinputのラベルを表示したくない
#### 対象項目
input-inline_2-2,input-inline_3-2,input-inline_3-3 のクラスがついた項目
#### 項目に付与するCSSクラス
no-label
#### 備考
2項目並べた場合2個目のinputはラベル表示したくないぞという場合に利用する。

### 項目幅を300pxにしたい
#### 対象項目
input(text),input(email),select
#### 項目に付与するCSSクラス
input-300
#### 備考
郵便番号など、入力欄の幅が短くていい場合に利用する。

### 項目の後に水平線を引きたい
#### 項目に付与するCSSクラス
after_hr
#### 備考
対象項目の後に、上下60pxのマージンをもった水平線がひかれる。

### 項目の前に水平線を引きたい
#### 項目に付与するCSSクラス
before_hr
#### 備考
対象項目の前に、上下60pxのマージンをもった水平線がひかれる。

### 項目を1列に並べたRadio,checkboxにしたい
#### 対象項目
input(radio),input(checkbox)
#### 項目に付与するCSSクラス
inline
#### 備考
性別選択など短い選択肢が1行に複数項目並べたい場合に利用する。

### プライバシーポリシー同意のチェックを作りたい
#### 対象項目
input(checkbox) 
#### 項目に付与するCSSクラス
policy-check
#### 項目の「説明」に記述する内容
表示したいプライバシーポリシー文を入力する。
改行は反映されるがタグは使えないので注意。
#### フォームテンプレートに必要な記載
`form-field`の子要素内に`hpdf-description`クラスで囲んだ`%%form-field-description%%` を入れる

例
```
<p class="form-field %%form-field-css-classes%% %%form-field-class-type%% %%form-field-class-required%% %%form-field-class-hidden%% %%form-field-class-no-label%% %%form-field-class-error%% %%form-field-dependency-css%%">
	%%form-if-field-label%%
	<label class="field-label" for="%%form-field-id%%">%%form-field-label%%</label>
	%%form-end-if-field-label%%
	<span class="input-wrapper">%%form-field-input%%</span>
  // 以下必須
	%%form-if-field-description%%
		<span class="hpdf-description">%%form-field-description%%</span>
	%%form-end-if-field-description%%
</p>
```
#### 備考
項目の「説明」を利用する他のクラスとの併用はできない。

### placeholderを入力したい
#### 対象項目
input(text), input(email),textarea
#### 項目に付与するCSSクラス
has-placeholder
#### 項目の「説明」に記述する内容
placeholderとして表示したい内容
#### フォームテンプレートに必要な記載
`form-field`の子要素内に`hpdf-description`クラスで囲んだ`%%form-field-description%%` を入れる

例
```
<p class="form-field %%form-field-css-classes%% %%form-field-class-type%% %%form-field-class-required%% %%form-field-class-hidden%% %%form-field-class-no-label%% %%form-field-class-error%% %%form-field-dependency-css%%">
	%%form-if-field-label%%
	<label class="field-label" for="%%form-field-id%%">%%form-field-label%%</label>
	%%form-end-if-field-label%%
	<span class="input-wrapper">%%form-field-input%%</span>
  // 以下必須
	%%form-if-field-description%%
		<span class="hpdf-description">%%form-field-description%%</span>
	%%form-end-if-field-description%%
</p>
```
#### 備考
項目の「説明」を利用する他のクラスとの併用はできない。

### 項目の後ろに説明文を出したい
#### 対象項目
input(text) 
#### 項目に付与するCSSクラス
text_after
#### 項目の「説明」に記述する内容
項目の後ろに表示したい内容
#### フォームテンプレートに必要な記載
`form-field`の子要素内に`hpdf-description`クラスで囲んだ`%%form-field-description%%` を入れる

例
```
<p class="form-field %%form-field-css-classes%% %%form-field-class-type%% %%form-field-class-required%% %%form-field-class-hidden%% %%form-field-class-no-label%% %%form-field-class-error%% %%form-field-dependency-css%%">
	%%form-if-field-label%%
	<label class="field-label" for="%%form-field-id%%">%%form-field-label%%</label>
	%%form-end-if-field-label%%
	<span class="input-wrapper">%%form-field-input%%</span>
  // 以下必須
	%%form-if-field-description%%
		<span class="hpdf-description">%%form-field-description%%</span>
	%%form-end-if-field-description%%
</p>
```
#### 備考
改行後ではなくinputのすぐ後ろに表示される。単位をつけたい時などに利用する。
項目の「説明」を利用する他のクラスとの併用はできない。

### 項目の下に説明文を出したい
input(text)
#### 項目の「説明」に記述する内容
項目の後ろに表示される。
#### 項目に付与するCSSクラス
なし
（説明」に内容が記述されていて特定のクラスが付与されていない場合は項目の下に表示される事になる）
#### フォームテンプレートに必要な記載
`form-field`の子要素内に`hpdf-description`クラスで囲んだ`%%form-field-description%%` を入れる

例
```
<p class="form-field %%form-field-css-classes%% %%form-field-class-type%% %%form-field-class-required%% %%form-field-class-hidden%% %%form-field-class-no-label%% %%form-field-class-error%% %%form-field-dependency-css%%">
	%%form-if-field-label%%
	<label class="field-label" for="%%form-field-id%%">%%form-field-label%%</label>
	%%form-end-if-field-label%%
	<span class="input-wrapper">%%form-field-input%%</span>
  // 以下必須
	%%form-if-field-description%%
		<span class="hpdf-description">%%form-field-description%%</span>
	%%form-end-if-field-description%%
</p>
```
#### 備考
項目の「説明」を利用する他のクラスとの併用はできない。

### 項目の分かれた年月日の入力項目をいい感じにしたい
#### 対象項目
input(text)
#### 項目に付与するCSSクラス
inline_y, inline_m, inline_d
#### 備考
年月日の3項目を並べた際にinputのサイズを調整したい場合各項目に指定する。
inputのwidthは年が長め、月・日は短めになる。

### 郵便番号から住所を自動入力したい
#### 対象項目
input(text)
#### 項目に付与するCSSクラス
hpdf-zipcode, pref, address_one
#### 自動入力先項目項目
input(select), input(text)
#### 自動入力先項目に付与するCSSクラス
pref, address_one
#### 備考
zipcloudが提供している[郵便番号検索API](http://zipcloud.ibsnet.co.jp/doc/api)を利用して住所を自動入力している。

## その他

* 項目設定で「必須」がチェックされている`text` `email` `number` `textarea` `select`は、入力値のリアルタイムバリデーションを実行します。
