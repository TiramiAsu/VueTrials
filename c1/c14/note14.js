// [Vue-note14] 2019-10-18 Escano

/* 1.4 模板語法

-Vue.js 使用了基於HTML 的模板語法, 允許開發者聲明式地將 DOM 綁定至底層 Vue 實例的數據. 所有 Vue.js 的模板都是合法的HTML , 所以能
 被遵循規範的瀏覽器和 HTML 解析器解析.
-在底層的實現上, Vue 將模板編譯成虛擬 DOM 渲染函數. 結合響應系統, Vue 能夠智能地計算出最少需要重新渲染多少組件, 並把 DOM 操作次數減到最少.
-如果你熟悉虛擬 DOM 並且偏愛 JavaScript 的原始力量, 你也可以不用模板, 直接寫渲染(render)函數, 使用可選的 JSX 語法. */


/* 1.4.1 插值

// 1.4.1.1 文本

-數據綁定最常見的形式就是使用 “Mustache” 語法(雙大括號) 的文本插值:

    <span>Message: {{ msg }}</span>

-Mustache 標籤將會被替代為對應數據對像上 msg 屬性的值. 無論何時, 綁定的數據對像上 msg 屬性發生了改變, 插值處的內容都會更新.
-通過使用 v-once 指令, 你也能執行一次性地插值, 當數據改變時, 插值處的內容不會更新. 但請留心這會影響到該節點上的其它數據綁定:

    <span v-once>這個將不會改變: {{ msg }}</span>


// 1.4.1.2 原始 HTML

-雙大括號會將數據解釋為普通文本, 而非 HTML 代碼. 為了輸出真正的 HTML, 你需要使用 v-html 指令:

    <p>Using mustaches: {{ rawHtml }}</p>
    <p>Using v-html directive: <span v-html="rawHtml"></span></p>

-這個 span 的內容將會被替換成為屬性值 rawHtml, 直接作為 HTML -> 會忽略解析屬性值中的數據綁定. 注意, 你不能使用 v-html 來複合局部模板,
 因為 Vue 不是基於字符串的模板引擎. 反之, 對於用戶界面(UI), 組件更適合作為可重用和可組合的基本單位.

*你的站點上動態渲染的任意HTML可能會非常危險, 因為它很容易導致 XSS 攻擊. 請只對可信內容使用 HTML 插值, 絕不要對用戶提供的內容使用插值.


// 1.4.1.3 特性

-Mustache 語法不能作用在 HTML 特性上, 遇到這種情況應該使用 v-bind 指令:

    <div v-bind:id="dynamicId"></div>

-對於布林特性(它們只要存在就意味著值為 true ), v-bind 工作起來略有不同, 在這個例子中:

    <button v-bind:disabled="isButtonDisabled">Button</button>

-如果 isButtonDisabled 的值是 null、undefined 或 false, 則 disabled 特性甚至不會被包含在渲染出來的<button>元素中.


// 1.4.1.4 使用 JavaScript 表達式

-迄今為止, 在我們的模板中, 我們一直都只綁定簡單的屬性鍵值. 但實際上, 對於所有的數據綁定, Vue.js 都提供了完全的 JavaScript 表達式支持.

    {{ number + 1 }}
    {{ ok ? 'YES' : 'NO' }}
    {{ message.split('').reverse().join('') }}
    <div v-bind:id="'list-' + id"></div>

-這些表達式會在所屬 Vue 實例的數據作用域下作為 JavaScript 被解析. 有個限制就是, 每個綁定都只能包含單個表達式, 所以下面的例子都不會生效.

    <!-- 這是語句, 不是表達式 -->
    {{ var a = 1 }}

    <!-- 流程控制也不會生效, 要使用三元表達式 -->
    {{ if (ok) { return message } }}

*模板表達式都被放在沙盒中, 只能訪問全局變量的一個白名單, 如Math和Date. 你不應該在模板表達式中試圖訪問用戶定義的全局變量. */


/* 1.4.2 指令

-指令(Directives) 是帶有 v- 前綴的特殊特性. 指令特性的值預期是單個 JavaScript 表達式 ( v-for 是例外情況, 稍後我們再討論). 指令的職責
 是, 當表達式的值改變時, 將其產生的連帶影響, 響應式地作用於 DOM. 回顧我們在介紹中看到的例子:

    <p v-if="seen">现在你看到我了</p>

-這裡, v-if 指令將根據表達式 seen 的值的真假來 插入/移除 <p> 元素.


// 1.4.2.1 參數

-一些指令能夠接收一個 “參數”, 在指令名稱之後以冒號表示. 例如: v-bind 指令可以用於響應式地更新 HTML 特性:

    <a v-bind:href="url">...</a>

-在這裡 href 是參數, 告知v-bind指令將該元素的 href 特性與表達式 url 的值綁定.
-另一個例子是 v-on 指令, 它用於監聽 DOM 事件:

    <a v-on:click="doSomething">...</a>

-在這裡參數是監聽的事件名. 我們也會更詳細地討論事件處理.


// 1.4.2.2 動態參數

-從2.6.0 開始, 可以用方括號括起來的 JavaScript 表達式作為一個指令的參數:

    <!-- 注意, 參數表達式的寫法存在一些約束, 如之後的“對動態參數表達式的約束”章節所述. -->
    <a v-bind:[attributeName]="url"> ... </a>

-這裡的 attributeName 會被作為一個 JavaScript 表達式進行動態求值, 求得的值將會作為最終的參數來使用.
 例如: 如果你的 Vue 實例有一個 data 屬性 attributeName, 其值為 "href", 那麼這個綁定將等價於 v-bind:href.

-同樣地, 你可以使用動態參數為一個動態的事件名綁定處理函數:

    <a v-on:[eventName]="doSomething"> ... </a>

-在這個示例中, 當 eventName 的值為 "focus" 時, v-on:[eventName] 將等價於 v-on:focus.

#對動態參數的值的約束:
 動態參數預期會求出一個字符串, 異常情況下值為 null. 這個特殊的 null 值可以被顯性地用於移除綁定. 任何其它非字符串類型的值都將會觸發一個警告.

#對動態參數表達式的約束:
 動態參數表達式有一些語法約束, 因為某些字符, 如空格和引號, 放在 HTML attribute 名裡是無效的. 例如:

    <!-- 這會觸發一個編譯警告 -->
    <a v-bind:['foo' + bar]="value"> ... </a>

-變通的辦法是使用沒有空格或引號的表達式, 或用計算屬性替代這種複雜表達式.

-在 DOM 中使用模板時(直接在一個HTML 文件裡撰寫模板), 還需要避免使用大寫字符來命名鍵名, 因為瀏覽器會把 attribute 名全部強制轉為小寫:

    <!-- 在 DOM 中使用模板時這段代碼會被轉換為 `v-bind:[someattr]`.
        除非在實例中有一個名為 “someattr” 的 property, 否則代碼不會工作. -->
    <a v-bind:[someAttr]="value"> ... </a>


// 1.4.2.3 修飾符

-修飾符(modifier) 是以半角句號.指明的特殊後綴, 用於指出一個指令應該以特殊方式綁定. 例如, .prevent 修飾符告訴 v-on 指令對於觸發的事件
 調用 event.preventDefault():

    <form v-on:submit.prevent="onSubmit">...</form>

-在接下來對 v-on 和 v-for 等功能的探索中, 你會看到修飾符的其它例子. */


/* 1.4.3 縮寫

- v-前綴作為一種視覺提示, 用來識別模板中 Vue 特定的特性. 當你在使用 Vue.js 為現有標籤添加動態行為(dynamic behavior) 時, v-前綴很有幫助,
 然而, 對於一些頻繁用到的指令來說, 就會感到使用繁瑣. 同時, 在構建由 Vue 管理所有模板的 單頁面應用程序(SPA, Single Page Application) 時,
 v-前綴也變得沒那麼重要了. 因此, Vue 為 v-bind 和 v-on 這兩個最常用的指令, 提供了特定簡寫:

// 1.4.3.1 v-bind 縮寫

    <!-- 完整語法 -->
    <a v-bind:href="url">...</a>

    <!-- 縮寫 -->
    <a :href="url">...</a>


// 1.4.3.2 v-on 縮寫

    <!-- 完整語法 -->
    <a v-on:click="doSomething">...</a>

    <!-- 縮寫 -->
    <a @click="doSomething">...</a>

-它們看起來可能與普通的 HTML 略有不同, 但 : 與 @ 對於特性名來說都是合法字符, 在所有支持Vue的瀏覽器都能被正確地解析. 而且, 它們不會出現在最終
 渲染的標記中. 縮寫語法是完全可選的, 但隨著你更深入地了解它們的作用, 你會慶幸擁有它們. */
