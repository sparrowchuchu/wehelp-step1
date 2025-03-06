# Topic 2: CSS Selector Naming
OOCSS, SMACSS, and BEM are 3 common naming guidelines for CSS Selector. These guidelines help us write more readable CSS code.
Follow learning steps below to prepare your report:
1. Introduce the concepts of OOCSS, SMACSS, and BEM naming guidelines.
2. Tell us which naming guideline is your favorite, and give an example to demonstrate the main concept of that guideline. For example, you can demo how to apply the OOCSS naming guideline to the CSS code in our week 1 tasks.

## 1.1 OOCSS
Object-Oriented CSS
- 樣式與結構分離
- 內容與容器分離

### 樣式與結構分離
```
/* CSS */
.card{
   width: 500px;
   height: 200x;
   border: 2px solid #eee;
   border-radius: 6px;
   color: #222;
} 
/* OOCSS */
.card{
   width: 500px;
   height: 200x;
}
 .card-skin{
   border: 2px solid #eee;
   border-radius: 6px;
   color: #222;
}
/* HTML */
<div class=”card card-skin”> card text </div>
```

### 內容與容器分離
```
/* HTML */
<div class=”card”>
   <p class=”card-text”> this is card text </p>
</div>
/* CSS */
.card{
   . . .
}
.card p{
   . . .
}
/* OOCSS */
.card{
   . . .
}
p.card-text{
   . . .
}
```

[What is OOCSS](https://medium.com/@mahmutmese86/oocss-42b0218cb729)

## 1.2 SMACSS
### Scalable and Modular Architecture for CSS
1. Base: 設定 HTML 標籤的預設模式，
2. Layout: 版面區塊，裡面可以放置數個模組。主要用於共用的頁面。
3. Module: 設計可重複使用的模組，例如: 選單、面板、表單。
4. State: 表示版面區塊或模組的狀態，例如: hidden、expanded、active 或 inactive。
    - 通常都會使用 .is- 當作前綴詞。
    - 允許使用 !important
5. Theme: 主題外觀。不是網頁中必要的存在。

### Base
```
html, body, form { margin: 0; padding: 0; }  
input[type=text] { border: 1px solid #999; }  
a { color: #039; }  
a:hover { color: #03C; }
```
CSS Resets : 自定義預設樣式，避免不同瀏覽器的預設值不一樣導致版面跑掉。

### Layout
```
#header, #article, #footer {
    width: 960px;
    margin: auto;
}

#article {
    border: solid #CCC;
    border-width: 1px 0 0;
}
```

### Module
```
<div class="fld">
    <span>Folder Name</span>
</div>

/* The Folder Module */
.fld > span {
    padding-left: 20px;
    background: url(icon.png);
}
```

### State
```
<div id="header" class="is-collapsed">
    <form>
        <div class="msg is-error">
            There is an error!
        </div>
        <label for="searchbox" class="is-hidden">Search</label>
        <input type="search" id="searchbox">
    </form>
</div>
```

### Theme
```
// in module-name.css
.mod {
    border: 1px solid;
}

// in theme.css
.mod {
    border-color: blue;
}
```

[SMACSS](https://smacss.com/book/categorizing//)  
[What is SMACSS](https://medium.com/@mahmutmese86/what-is-smacss-110f678c14f)

## 1.3 BEM
### Block, Element, Modifier
- 區塊 ( Block ) : 區塊的功能，例如 : 
    - 區塊名稱 `.search-form{ }`。
- 元素 ( Element ) : 區塊內子元素的功能，例如 : 
    - 區塊名稱__元素名稱 `.search-form__input{ }`。
- 狀態選項 ( Modifier ) :  描述外觀、狀態或行為，例如 : 
    - 區塊名稱_狀態選項 `.search-form_focused{ }`。
    - 區塊名稱__元素名稱_狀態選項 `.search-form__button_disabled{ }`。

建議使用 CSS 類別選擇器，例如 : `.search-form{ }`。   
不推薦使用 html tag，例如 : `div{ }`、`a{ }` 和 ID 選擇器，例如 : `#button{ }`。

## 範例
```
<!-- The `search-form` block has the `theme` modifier with the value `islands` -->
<form class="search-form search-form_theme_islands">
    <input class="search-form__input">

    <!-- The `button` element has the `size` modifier with the value `m` -->
    <button class="search-form__button search-form__button_size_m">Search</button>
</form>

<!-- You can't use two identical modifiers with different values simultaneously -->
<form class="search-form
             search-form_theme_islands
             search-form_theme_lite">

    <input class="search-form__input">

    <button class="search-form__button
                   search-form__button_size_s
                   search-form__button_size_m">
        Search
    </button>
</form>
```

### 檔案結構
```
search-form/                           # Directory of the search-form

    __input/                           # Subdirectory of the search-form__input
        search-form__input.css         # CSS implementation of the
                                       # search-form__input element
        search-form__input.js          # JavaScript implementation of the
                                       # search-form__input element

    __button/                          # Subdirectory of the search-form__button
                                       # element
        search-form__button.css
        search-form__button.js

    _theme/                            # Subdirectory of the search-form_theme
                                       # modifier
        search-form_theme_islands.css  # CSS implementation of the search-form block
                                       # that has the theme modifier with the value
                                       # islands
        search-form_theme_lite.css     # CSS implementation of the search-form block
                                       # that has the theme modifier with the value
                                       # lite

    search-form.css                    # CSS implementation of the search-form block
    search-form.js                     # JavaScript implementation of the
                                       # search-form block
```

[BEM](https://en.bem.info/)

## 1.4 Atomic CSS
- Utility: 把 CSS class 拆分到極致。一個類別名稱。能完整表達一個對應的屬性跟值。
```
.bgr-blue { background-color: #357edd; }
.background-blue  { background-color: #357edd; }
.backgroundcolor-blue  { background-color: #357edd; }
.text-h1 { font-size: 3rem; }
.text-3rem { font-size: 3rem; }
.text-huge { font-size: 3rem; }
.fontsize-1 { font-size: 3rem; }
.marg-0 { margin: 0; }
.margin-0 { margin: 0; }
```
```
/* Programmatic */
bgrBlue(#357edd) { background-color: #357edd; }
backgroundBlue(#357edd) { background-color: #357edd; }
backgroundColorBlue(#357edd) { background-color: #357edd; }
```

[淺談 Atomic CSS 的發展背景與 Tailwind CSS](https://blog.huli.tw/2022/05/23/atomic-css-and-tailwind-css/)
[Atomizer ](https://acss-io.github.io/atomizer/)

[CSS Naming Conventions](https://www.geeksforgeeks.org/css-naming-conventions/)  
[BEM、SMACSS、OOCSS — CSS 三種常見命名原則](https://medium.com/@k2307874/css-%E5%91%BD%E5%90%8D%E5%8E%9F%E5%89%87-bem-smacss-oocss-84e843a263d1)


## 2.1 沒有網頁設計實務經驗，下面是我粗略了解三種設計模式後的想法。
1. OOCSS 應用性高，Bootstrap 就是使用 OOCSS 設計模式。
2. SMACSS 有 html 標籤做基礎設定，適合版面單純的網頁。目前個人比較習慣的設計模式。
3. BEM 適合網頁版面清晰，一致性高且結構複雜的網頁
4. Atomic 適合有高度客製化 UI/UX 的網頁，Tailwind CSS 使用的設計模式。

## 2.2 使用 SMACSS 撰寫 week 1 tasks
一開始的設計模式比較接近 SMACSS ，在學習線上的網頁設計時不小心內化的，如果有可以優化的地方或其他想法歡迎討論。



