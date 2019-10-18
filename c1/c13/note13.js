// [Vue-note13] 2019-10-18 Escano

/* 1.3 Vue 實例 */

/* 1.3.1 創建一個 Vue 實例

-每個 Vue 應用都是通過用 Vue 函數創建一個新的 Vue 實例開始的:

    var vm = new Vue({
      // 選項
    })

-雖然沒有完全遵循 MVVM 模型, 但是 Vue 的設計也受到了它的啟發. 因此在文檔中經常會使用 vm(ViewModel的縮寫) 這個變量名表示 Vue 實例.
-當創建一個 Vue 實例時, 你可以傳入一個選項對象. 這篇教程主要描述的就是如何使用這些選項來創建你想要的行為. 作為參考, 你也可以在 API 文檔中瀏覽完整的選項列表.

-一個 Vue 應用由一個通過new Vue 創建的根 Vue 實例, 以及可選的嵌套的、可複用的組件樹組成. 舉個例子, 一個 todo 應用的組件樹可以是這樣的:

根实例
└─ TodoList
   ├─ TodoItem
   │  ├─ DeleteTodoButton
   │  └─ EditTodoButton
   └─ TodoListFooter
      ├─ ClearTodosButton
      └─ TodoListStatistics

-我們會在稍後的組件系統章節具體展開. 不過現在, 你只需要明白所有的 Vue 組件都是 Vue 實例, 並且接受相同的選項對象(一些根實例特有的選項除外). */


/* 1.3.2 數據與方法

-當一個 Vue 實例被創建時, 它將 data 對像中的所有的屬性加入到 Vue 的響應式系統中. 當這些屬性的值發生改變時, 視圖將會產生“響應”, 即匹配更新為新的值.

    // 我們的數據對象
    var data = { a: 1 }

    // 該對像被加入到一個 Vue 實例中
    var vm = new Vue({
      data: data
    })

    // 獲得這個實例上的屬性
    // 返回源數據中對應的字段
    vm.a == data.a // => true

    // 設置屬性也會影響到原始數據
    vm.a = 2
    data.a // => 2

    // 反之亦然
    data.a = 3
    vm.a // => 3

-當這些數據改變時, 視圖會進行重渲染. 值得注意的是只有當實例被創建時就已經存在於 data 中的屬性才是響應式的. 也就是說如果你添加一個新的屬性, 比如:

    vm.b = 'hi'

-那麼對 b 的改動將不會觸發任何視圖的更新. 如果你知道你會在晚些時候需要一個屬性, 但是一開始它為空或不存在, 那麼你僅需要設置一些初始值. 比如:

    data: {
      newTodoText: '',
      visitCount: 0,
      hideCompletedTodos: false,
      todos: [],
      error: null
    }

-這裡唯一的例外是使用 Object.freeze(), 這會阻止修改現有的屬性, 也意味著響應系統無法再追踪變化.

    var obj = {
      foo: 'bar'
    }

    Object.freeze(obj)

    new Vue({
      el: '#app',
      data: obj
    })
    <div id="app">
      <p>{{ foo }}</p>
      <!-- 这里的 `foo` 不会更新！ -->
      <button v-on:click="foo = 'baz'">Change it</button>
    </div>

-除了數據屬性, Vue 實例還暴露了一些有用的實例屬性與方法. 它們都有前綴$, 以便與用戶定義的屬性區分開來. 例如:

    var data = { a: 1 }
    var vm = new Vue({
      el: '#example',
      data: data
    })

    vm.$data === data // => true
    vm.$el === document.getElementById('example') // => true

    // $watch 是一個實例方法
    vm.$watch('a', function (newValue, oldValue) {
      // 這個回調將在 `vm.a` 改變後調用
    })

-以後你可以在 API 參考中查閱到完整的實例屬性和方法的列表. */


/* 1.3.3 實例生命週期鉤子

-每個 Vue 實例在被創建時都要經過一系列的初始化過程 -> 例如, 需要設置數據監聽、編譯模板、將實例掛載到 DOM 並在數據變化時更新 DOM 等. 同時
 在這個過程中也會運行一些叫做生命週期鉤子的函數, 這給了用戶在不同階段添加自己的代碼的機會.

-比如 created 鉤子可以用來在一個實例被創建之後執行代碼:

    new Vue({
      data: {
        a: 1
      },
      created: function () {
        // `this` 指向 vm 实例
        console.log('a is: ' + this.a)
      }
    })
    // => "a is: 1"

-也有一些其它的鉤子, 在實例生命週期的不同階段被調用, 如 mounted、updated 和 destroyed. 生命週期鉤子的 this 上下文指向調用它的 Vue 實例.
-不要在選項屬性或回調上使用箭頭函數, 比如 created: () => console.log(this.a) 或 vm.$watch('a', newValue => this.myMethod()). 因為箭頭函數
 並沒有this, this會作為變量一直向上級詞法作用域查找, 直至找到為止, 經常導致 Uncaught TypeError: Cannot read property of undefined或Uncaught
 TypeError: this.myMethod is not a function 之類的錯誤. */

/* 1.3.4 生命週期圖示

下圖展示了實例的生命週期. 你不需要立馬弄明白所有的東西, 不過隨著你的不斷學習和使用, 它的參考價值會越來越高.

 --Vue 實例生命週期圖-- */
