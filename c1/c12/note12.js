// [Vue-note12] 2019-10-18 Escano

/* 1.2 介紹 */

/* 1.2.1 Vue.js 是什麼 -> 觀看本節視頻講解: https://learning.dcloud.io/#/?vid=0

-Vue (讀音/vjuː/, 類似於 view )是一套用於構建用戶界面的漸進式框架. 與其它大型框架不同的是, Vue 被設計為可以自底向上逐層應用. Vue 的核心庫
 只關注視圖層, 不僅易於上手, 還便於與第三方庫或既有項目整合. 另一方面, 當與 現代化的工具鏈(5.1節) 以及各種支持類庫結合使用時, Vue 也完全能夠為複雜的單頁應用提供驅動.
-如果你已經是有經驗的前端開發者, 想知道Vue與其它庫/框架有哪些區別, 請查看 對比其它框架(https://cn.vuejs.org/v2/guide/comparison.html) */


/* 1.2.2 起步 -> 觀看本節視頻講解: https://learning.dcloud.io/#/?vid=1

*官方指南假設你已了解關於 HTML、CSS 和 JavaScript 的中級知識. 如果你剛開始學習前端開發, 將框架作為你的第一步可能不是最好的主意——掌握好基礎知識
 再來吧！之前有其它框架的使用經驗會有幫助, 但這不是必需的.

-嘗試 Vue.js 最簡單的方法是使用JSFiddle上的Hello World例子(https://jsfiddle.net/chrisvfritz/50wL7mdz/)
 你可以在瀏覽器新標籤頁中打開它, 跟著例子學習一些基礎用法. 或者你也可以創建一個 .html 文件, 然後通過如下方式引入 Vue:

    <!-- 開發環境版本, 包含了有幫助的命令行警告 -->
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>

或者:

    <!-- 生產環境版本, 優化了尺寸和速度 -->
    <script src="https://cdn.jsdelivr.net/npm/vue"></script>

-安裝教程給出了更多安裝 Vue 的方式. 請注意我們不推薦新手直接使用 vue-cli, 尤其是在你還不熟悉基於 ode.js 的構建工具時

*Scrimba上的系列教程(https://scrimba.com/playlist/pXKqta)
                   (https://scrimba.com/g/glearnvue) */


/* 1.2.3 聲明式渲染

-Vue.js 的核心是一個允許採用簡潔的模板語法來聲明式地將數據渲染進 DOM 的系統:

*{{ }} 指令: 可直接渲染 DOM

    <div id="app">
      {{ message }}
    </div>


    var app = new Vue({
    el: '#app',
      data: {
        message: 'Hello Vue!'
      }
    })

-我們已經成功創建了第一個 Vue應用！看起來這跟渲染一個字符串模板非常類似, 但是 Vue 在背後做了大量工作. 現在數據和 DOM 已經被建立了關聯,
 所有東西都是響應式的. 我們要怎麼確認呢？打開你的瀏覽器的 JavaScript 控制台(就在這個頁面打開), 並修改 app.message 的值, 你將看到上例相應地更新

*v-bind 指令: 除了文本插值, 我們還可以像這樣來綁定元素特性:

    <div id="app-2">
      <span v-bind:title="message">
        鼠標懸停幾秒鐘查看此處動態綁定的提示信息！
      </span>
    </div>


    var app2 = new Vue({
      el: '#app-2',
      data: {
        message: '頁面加載於 ' + new Date().toLocaleString()
      }
    })

-這裡我們遇到了一點新東西. 你看到的 v-bind 特性被稱為指令. 指令帶有前綴 v-, 以表示它們是 Vue 提供的特殊特性. 可能你已經猜到了, 它們會
 在渲染的 DOM 上應用特殊的響應式行為. 在這裡, 該指令的意思是: “將這個元素節點的 title 特性和 Vue 實例的 message 屬性保持一致”
-如果你再次打開瀏覽器的 JavaScript 控制台, 輸入 app2.message = '新消息', 就會再一次看到這個綁定了 title 特性的 HTML 已經進行了更新 */


/* 1.2.4 條件與循環

*v-if 指令: 控制切換一個元素是否顯示:

    <div id="app-3">
      <p v-if="seen">現在你看到我了</p>
    </div>


    var app3 = new Vue({
      el: '#app-3',
      data: {
        seen: true
      }
    })

-繼續在控制台輸入 app3.seen = false, 你會發現之前顯示的消息消失了.

-這個例子演示了我們不僅可以把數據綁定到 DOM 文本或特性, 還可以綁定到 DOM 結構. 此外, Vue 也提供一個強大的過渡效果系統, 可以在 Vue 插入/更新/移除元素時
 自動應用過渡效果.

*v-for 指令: 可以綁定數組的數據來渲染一個項目列表:

    <div id="app-4">
      <ol>
        <li v-for="todo in todos">
          {{ todo.text }}
        </li>
      </ol>
    </div>


    var app4 = new Vue({
      el: '#app-4',
      data: {
        todos: [
          { text: '學習 JavaScript' },
          { text: '學習 Vue' },
          { text: '整個牛項目' }
        ]
      }
    })

-在控制台裡, 輸入 app4.todos.push({ text: '新項目' }), 你會發現列表最後添加了一個新項目 */


/* 1.2.5 處理用戶輸入

*v-on 指令: 讓用戶和你的應用進行交互, 添加一個事件監聽器, 通過它調用在 Vue 實例中定義的方法:

    <div id="app-5">
      <p>{{ message }}</p>
      <button v-on:click="reverseMessage">反轉訊息</button>
    </div>


    var app5 = new Vue({
      el: '#app-5',
      data: {
        message: 'Hello Vue.js!'
      },
      methods: {
        reverseMessage: function () {
          this.message = this.message.split('').reverse().join('')
        }
      }
    })

-注意在 reverseMessage 方法中, 我們更新了應用的狀態, 但沒有觸碰 DOM -> 所有的 DOM 操作都由 Vue 來處理, 你編寫的代碼只需要關注邏輯層面即可

*v-model指令: 它能輕鬆實現表單輸入和應用狀態之間的雙向綁定.

    <div id="app-6">
      <p>{{ message }}</p>
      <input v-model="message">
    </div>


    var app6 = new Vue({
      el: '#app-6',
      data: {
        message: 'Hello Vue!'
      }
    })
*/


/* 1.2.6 組件化應用構建

-組件系統是 Vue 的另一個重要概念, 因為它是一種抽象, 允許我們使用小型、獨立和通常可複用的組件構建大型應用. 仔細想想, 幾乎任意
 類型的應用界面都可以抽象為一個組件樹(Component Tree)
-在 Vue 裡, 一個組件本質上是一個擁有預定義選項的一個 Vue 實例

*Vue.component 指令: 在 Vue 中註冊組件:

    // 定義名為 todo-item 的新組件
    Vue.component('todo-item', {
      template: '<li>這是個待辦項</li>'
    })

-現在你可以用它構建另一個組件模板:

    <ol>
      <!-- 創建一個 todo-item 組件的實例 -->
      <todo-item></todo-item>
    </ol>

-但是這樣會為每個待辦項渲染同樣的文本, 這看起來並不炫酷. 我們應該能從父作用域將數據傳到子組件才對. 讓我們來修改一下組件的定義, 使之能夠接受一個 prop:

    Vue.component('todo-item', {
      // todo-item 組件現在接受一個
      // "prop", 類似於一個自定義特性
      // 這個 prop 名為 todo
      props: ['todo'],
      template: '<li>{{ todo.text }}</li>'
    })

-現在, 我們可以使用 v-bind 指令將待辦項傳到循環輸出的每個組件中:

    <div id="app-7">
      <ol>
        <!-- 現在我們為每個 todo-item 提供 todo 對象 todo 對像是變量, 即其內容可以是動態的
             我們也需要為每個組件提供一個 “key”, 稍後再作詳細解釋 -->
        <todo-item
          v-for="item in groceryList"
          v-bind:todo="item"
          v-bind:key="item.id"
        ></todo-item>
      </ol>
    </div>


    Vue.component('todo-item', {
      props: ['todo'],
      template: '<li>{{ todo.text }}</li>'
    })
    var app7 = new Vue({
      el: '#app-7',
      data: {
        groceryList: [
          { id: 0, text: '蔬菜' },
          { id: 1, text: '奶酪' },
          { id: 2, text: '隨便其它什麼人吃的東西' }
        ]
      }
    })

-儘管這只是一個刻意設計的例子, 但是我們已經設法將應用分割成了兩個更小的單元. 子單元通過 prop 接口與父單元進行了良好的解耦. 我們現在可以
 進一步改進 <todo-item> 組件, 提供更為複雜的模板和邏輯, 而不會影響到父單元.

-在一個大型應用中, 有必要將整個應用程序劃分為組件, 以使開發更易管理. 在後續教程中我們將詳述組件, 不過這裡有一個(假想的)例子, 以展示使用了
 組件的應用模板是什麼樣的:

    <div id="app">
      <app-nav></app-nav>
      <app-view>
        <app-sidebar></app-sidebar>
        <app-content></app-content>
      </app-view>
    </div>
*/


/* 1.2.7 與自定義元素的關係

-你可能已經註意到Vue組件非常類似於自定義元素 -> 它是 Web 組件規範的一部分, 這是因為 Vue 的組件語法部分參考了該規範. 例如 Vue 組件實現
 了 Slot API 與 is 特性. 但是, 還是有幾個關鍵差別:

 1. Web Components 規範已經完成並通過, 但未被所有瀏覽器原生實現. 目前 Safari 10.1+、Chrome 54+ 和Firefox 63+ 原生支持 Web Components.
    相比之下, Vue 組件不需要任何 polyfill, 並且在所有支持的瀏覽器(IE9 及更高版本) 之下表現一致. 必要時, Vue 組件也可以包裝於原生自定義元素之內.

 2. Vue 組件提供了純自定義元素所不具備的一些重要功能, 最突出的是跨組件數據流、自定義事件通信以及構建工具集成.

-雖然 Vue 內部沒有使用自定義元素, 不過在應用使用自定義元素、或以自定義元素形式發佈時, 依然有很好的互操作性. Vue CLI 也支持將Vue組件構建成為原生的自定義元素. */


/* 1.2.8 準備好了嗎？

-我們剛才簡單介紹了 Vue 核心最基本的功能——本教程的其餘部分將更加詳細地涵蓋這些功能以及其它高級功能, 所以請務必讀完整個教程！*/
