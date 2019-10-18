// [Vue-note15] 2019-10-18 Escano

/* 1.5 計算屬性和監聽器 */

/* 1.5.1 計算屬性

-模板內的表達式非常便利, 但是設計它們的初衷是用於簡單運算的. 在模板中放入太多的邏輯會讓模板過重且難以維護. 例如:

    <div id="example">
      {{ message.split('').reverse().join('') }}
    </div>

-在這個地方, 模板不再是簡單的聲明式邏輯. 你必須看一段時間才能意識到, 這裡是想要顯示變量 message 的翻轉字符串. 當你想要在模板中多次引用
 此處的翻轉字符串時, 就會更加難以處理. 所以, 對於任何復雜邏輯, 你都應當使用計算屬性.


// 1.5.1.1 基礎範例

    <div id="example">
      <p>Original message: "{{ message }}"</p>
      <p>Computed reversed message: "{{ reversedMessage }}"</p>
    </div>


    var vm = new Vue({
      el: '#example',
      data: {
        message: 'Hello'
      },
      computed: {
        // 計算屬性的 getter
        reversedMessage: function () {
          // `this` 指向 vm 實例
          return this.message.split('').reverse().join('')
        }
      }
    })

-這裡我們聲明了一個計算屬性 reversedMessage. 我們提供的函數將用作屬性 vm.reversedMessage的getter 函數:

    console.log(vm.reversedMessage) // => 'olleH'
    vm.message = 'Goodbye'
    console.log(vm.reversedMessage) // => 'eybdooG'

-你可以打開瀏覽器的控制台, 自行修改例子中的 vm. vm.reversedMessage 的值始終取決於 vm.message 的值.
-你可以像綁定普通屬性一樣在模板中綁定計算屬性. Vue 知道 vm.reversedMessage 依賴於vm.message, 因此當 vm.message 發生改變時, 所有
 依賴 vm.reversedMessage 的綁定也會更新. 而且最妙的是我們已經以聲明的方式創建了這種依賴關係: 計算屬性的 getter 函數是沒有副作用(side effect)
 的, 這使它更易於測試和理解.


// 1.5.1.2 計算屬性緩存 v.s. 方法

-你可能已經注意到我們可以通過在表達式中調用方法來達到同樣的效果:

    <p>Reversed message: "{{ reversedMessage() }}"</p>


    // 在组件中
    methods: {
      reversedMessage: function () {
        return this.message.split('').reverse().join('')
      }
    }

-我們可以將同一函數定義為一個方法而不是一個計算屬性. 兩種方式的最終結果確實是完全相同的. 然而, 不同的是計算屬性是基於它們的響應式依賴進行緩存的.
 只在相關響應式依賴發生改變時它們才會重新求值. 這就意味著只要 message 還沒有發生改變, 多次訪問 reversedMessage 計算屬性會立即返回之前的計算結果,
 而不必再次執行函數.

-這也同樣意味著下面的計算屬性將不再更新, 因為 Date.now() 不是響應式依賴:

    computed: {
      now: function () {
        return Date.now()
      }
    }

-相比之下, 每當觸發重新渲染時, 調用方法將總會再次執行函數.

-我們為什麼需要緩存？假設我們有一個性能開銷比較大的計算屬性 A, 它需要遍歷一個巨大的數組並做大量的計算. 然後我們可能有其他的計算屬性依賴於 A. 如果
 沒有緩存, 我們將不可避免的多次執行 A 的 getter. 如果你不希望有緩存, 請用方法來替代.


// 1.5.1.3 計算屬性vs 監聽屬性

-Vue 提供了一種更通用的方式來觀察和響應 Vue 實例上的數據變動: 監聽屬性. 當你有一些數據需要隨著其它數據變動而變動時, 你很容易濫用 watch -> 特別是
 如果你之前使用過 AngularJS. 然而, 通常更好的做法是使用計算屬性而不是命令式的 watch 回調. 細想一下這個例子:

    <div id="demo">{{ fullName }}</div>


    var vm = new Vue({
      el: '#demo',
      data: {
        firstName: 'Foo',
        lastName: 'Bar',
        fullName: 'Foo Bar'
      },
      watch: {
        firstName: function (val) {
          this.fullName = val + ' ' + this.lastName
        },
        lastName: function (val) {
          this.fullName = this.firstName + ' ' + val
        }
      }
    })

-上面代碼是命令式且重複的. 將它與計算屬性的版本進行比較:

    var vm = new Vue({
      el: '#demo',
      data: {
        firstName: 'Foo',
        lastName: 'Bar'
      },
      computed: {
        fullName: function () {
          return this.firstName + ' ' + this.lastName
        }
      }
    })

-好得多了, 不是嗎？


// 1.5.1.4 計算屬性的 setter

-計算屬性默認只有 getter , 不過在需要時你也可以提供一個 setter :

    // ...
    computed: {
      fullName: {
        // getter
        get: function () {
          return this.firstName + ' ' + this.lastName
        },
        // setter
        set: function (newValue) {
          var names = newValue.split(' ')
          this.firstName = names[0]
          this.lastName = names[names.length - 1]
        }
      }
    }
    // ...

-現在再運行 vm.fullName = 'John Doe'時, setter 會被調用, vm.firstName 和 vm.lastName 也會相應地被更新.


// 1.5.2 監聽器

-雖然計算屬性在大多數情況下更合適, 但有時也需要一個自定義的監聽器. 這就是為什麼 Vue 通過 watch 選項提供了一個更通用的方法,
 來響應數據的變化. 當需要在數據變化時執行異步或開銷較大的操作時, 這個方式是最有用的. 例如:

    <div id="watch-example">
      <p>
        Ask a yes/no question:
        <input v-model="question">
      </p>
      <p>{{ answer }}</p>
    </div>


    <!-- 因為 AJAX 庫和通用工具的生態已經相當豐富, Vue 核心代碼沒有重複 -->
    <!-- 提供這些功能以保持精簡. 這也可以讓你自由選擇自己更熟悉的工具. -->
    <script src="https://cdn.jsdelivr.net/npm/axios@0.12.0/dist/axios.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/lodash@4.13.1/lodash.min.js"></script>
    <script>
      var watchExampleVM = new Vue({
        el: '#watch-example',
        data: {
          question: '',
          answer: 'I cannot give you an answer until you ask a question!'
        },
        watch: {
          // 如果 `question` 發生改變, 這個函數就會運行
          question: function (newQuestion, oldQuestion) {
            this.answer = 'Waiting for you to stop typing...'
            this.debouncedGetAnswer()
          }
        },
        created: function () {
          // `_.debounce` 是一個通過 Lodash 限制操作頻率的函數.
          // 在這個例子中, 我們希望限制訪問 yesno.wtf/api 的頻率
          // AJAX 請求直到用戶輸入完畢才會發出. 想要了解更多關於
          // `_.debounce` 函數 (及其近親 `_.throttle`) 的知識,
          // 請參考：https://lodash.com/docs#debounce
          this.debouncedGetAnswer = _.debounce(this.getAnswer, 500)
        },
        methods: {
          getAnswer: function () {
            if (this.question.indexOf('?') === -1) {
              this.answer = 'Questions usually contain a question mark. ;-)'
              return
            }
            this.answer = 'Thinking...'
            var vm = this
            axios.get('https://yesno.wtf/api')
              .then(function (response) {
                vm.answer = _.capitalize(response.data.answer)
              })
              .catch(function (error) {
                vm.answer = 'Error! Could not reach the API. ' + error
              })
          }
        }
      })
    </script>

-在這個示例中, 使用 watch 選項允許我們執行異步操作(訪問一個 API), 限制我們執行該操作的頻率, 並在我們得到最終結果前, 設置中間狀態.
 這些都是計算屬性無法做到的. 除了 watch 選項之外, 您還可以使用命令式的 vm.$watch API. */
