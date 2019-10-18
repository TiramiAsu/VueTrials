// [Vue-note11] 2019-10-18 Escano

/* 1.1 安裝

#兼容性: Vue 不支持 IE8 及以下版本, 因為Vue使用了 IE8 無法模擬的 ECMAScript 5 特性. 但它支持所有兼容 ECMAScript 5 的瀏覽器.
#更新日誌: 最新穩定版本: 2.6.10 (每個版本的更新日誌見 GitHub ) */


/* 1.1.1 Vue Devtools

-在使用 Vue 時, 我們推薦在你的瀏覽器上安裝 Vue Devtools. 它允許你在一個更友好的界面中審查和調試 Vue 應用.


/* 1.1.2 直接用 <script> 引入 -> 觀看本節視頻講解: https://learning.dcloud.io/#/?vid=1

-直接下載並用 <script> 標籤引入, Vue會被註冊為一個全局變量
-在開發環境下不要使用壓縮版本, 不然你就失去了所有常見錯誤相關的警告!
 開發版本 -> 包含完整的警告和調試模式
 生產版本 -> 刪除了警告, 33.30KB min+gzip */


/* 1.1.3 CDN

-對於製作原型或學習, 你可以這樣使用最新版本:

    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>


-對於生產環境, 我們推薦鏈接到一個明確的版本號和構建文件, 以避免新版本造成的不可預期的破壞:

    <script src="https://cdn.jsdelivr.net/npm/vue@2.6.0"></script>


-如果你使用原生 ES Modules, 這裡也有一個兼容 ES Module 的構建文件:

    <script type="module">
      import Vue from 'https://cdn.jsdelivr.net/npm/vue@2.6.10/dist/vue.esm.browser.js'
    </script>


-你可以在 cdn.jsdelivr.net/npm/vue 瀏覽NPM包的源代碼.
-Vue 也可以在 unpkg 和 cdnjs 上獲取 (cdnjs 的版本更新可能略滯後).
-請確認了解不同構建版本並在你發布的站點中使用生產環境版本, 把 vue.js 換成 vue.min.js. 這是一個更小的構建,
 可以帶來比開發環境下更快的速度體驗 */


/* 1.1.4 NPM

-在用Vue構建大型應用時推薦使用 NPM 安裝(1.1.12節). NPM 能很好地和諸如 webpack 或 Browserify 模塊打包器配合使用.
 同時 Vue 也提供配套工具來開發單文件組件.

-最新稳定版: $ npm install vue */


/* 1.1.5 命令行工具(CLI)

-Vue 提供了一個官方的 CLI, 為 單頁面應用(SPA) 快速搭建繁雜的腳手架. 它為現代前端工作流提供了 batteries-included 的構建設置.
 只需要幾分鐘的時間就可以運行起來並帶有熱重載、保存時 lint 校驗, 以及生產環境可用的構建版本. 更多詳情可查閱 Vue CLI 的文檔.

*CLI 工具假定用戶對 Node.js 和相關構建工具有一定程度的了解. 如果你是新手, 我們強烈建議先在不用構建工具的情況下通讀指南,
 在熟悉 Vue 本身之後再使用 CLI */


/* 1.1.6 對不同構建版本的解釋

-在 NPM 包的 dist/ 目錄你將會找到很多不同的 Vue.js 構建版本. 這裡列出了它們之間的差別:

                        |          UMD         |        CommonJS         |  ES Module (基於構建工具使用)  |  ES Module (直接用於瀏覽器)
------------------------|----------------------|-------------------------|-------------------------------|-----------------------------
完整版                   |        vue.js        |      vue.common.js      |          vue.esm.js           |     vue.esm.browser.js
只包含運行時版            |    vue.runtime.js    |  vue.runtime.common.js  |      vue.runtime.esm.js       |             -
完整版(生產環境)          |       vue.min.js     |            -            |              -                |   vue.esm.browser.min.js
只包含運行時版(生產環境)   |  vue.runtime.min.js  |            -            |              -                |            -               */


/* 1.1.7 術語

-完整版:    同時包含編譯器和運行時的版本.
-編譯器:    用來將模板字符串編譯成為 JavaScript 渲染函數的代碼.
-運行時:    用來創建 Vue 實例、渲染並處理虛擬 DOM 等的代碼. 基本上就是除去編譯器的其它一切.
-UMD:       UMD 版本可以通過 <script> 標籤直接用在瀏覽器中. jsDelivr CDN 的 https://cdn.jsdelivr.net/npm/vue 默認文件就是運行時 + 編譯器的
            UMD 版本(vue.js).
-CommonJS:  CommonJS 版本用來配合老的打包工具比如 Browserify 或 webpack 1. 這些打包工具的 默認文件(pkg.main) 是只包含運行時的 CommonJS 版本
            (vue.runtime.common.js).
-ES Module: 從 2.6 開始Vue會提供兩個 ES Modules(ESM) 構建文件:
  1. 為打包工具提供的 ESM: 為諸如 webpack 2 或 Rollup 提供的現代打包工具. ESM 格式被設計為可以被靜態分析, 所以打包工具可以利用這一點來進行 “tree-shaking”
                          並將用不到的代碼排除出最終的包. 為這些打包工具提供的 默認文件(pkg.module) 是只有運行時的 ES Module 構建(vue.runtime.esm.js).
  2. 為瀏覽器提供的 ESM(2.6+): 用於在現代瀏覽器中通過 <script type="module"> 直接導入 */


/* 1.1.8 運行時 + 編譯器 vs. 只包含運行時

-如果你需要在客戶端編譯模板(比如傳入一個字符串給 template 選項, 或掛載到一個元素上並以其 DOM 內部的 HTML 作為模板), 就將需要加上編譯器, 即完整版:

    // 需要编译器
    new Vue({
      template: '<div>{{ hi }}</div>'
    })

    // 不需要编译器
    new Vue({
      render (h) {
        return h('div', this.hi)
      }
    })

-當使用 vue-loader 或 vueify 的時候, *.vue 文件內部的模板會在構建時預編譯成 JavaScript , 你在最終打好的包裡實際上是不需要編譯器的,
 所以只用運行時版本即可

-因為運行時版本相比完整版體積要小大約 30%, 所以應該盡可能使用這個版本. 如果你仍然希望使用完整版, 則需要在打包工具裡配置一個別名:
 1. webpack

    module.exports = {
      // ...
      resolve: {
        alias: {
          'vue$': 'vue/dist/vue.esm.js' // 用 webpack 1 时需用 'vue/dist/vue.common.js'
        }
      }
    }


 2. Rollup

    const alias = require('rollup-plugin-alias')
    rollup({
      // ...
      plugins: [
        alias({
          'vue': require.resolve('vue/dist/vue.esm.js')
        })
      ]
    })


 3. Browserify: 添加到你項目的 package.json:

    {
      // ...
      "browser": {
        "vue": "vue/dist/vue.common.js"
      }
    }


 4. Parcel: 在你項目的 package.json 中添加:

    {
      // ...
      "alias": {
        "vue" : "./node_modules/vue/dist/vue.common.js"
      }
    }

*/


/* 1.1.9 開發環境 v​​s. 生產環境模式

-對於 UMD 版本來說, 開發環境/生產環境模式是硬編碼好的: 開發環境下用未壓縮的代碼, 生產環境下使用壓縮後的代碼.
-CommonJS 和 ES Module 版本是用於打包工具的, 因此我們不提供壓縮後的版本. 你需要自行將最終的包進行壓縮.
-CommonJS 和 ES Module 版本同時保留原始的 process.env.NODE_ENV 檢測, 以決定它們應該運行在什麼模式下. 你應該使用適當的
 打包工具配置來替換這些環境變量以便控制 Vue 所運行的模式. 把 process.env.NODE_ENV 替換為字符串字面量同時可以讓 UglifyJS
 之類的壓縮工具完全丟掉僅供開發環境的代碼塊, 以減少最終的文件尺寸.

 1. webpack: 在 webpack 4+ 中, 你可以使用 mode 選項:

    module.exports = {
      mode: 'production'
    }

    但是在 webpack 3 及其更低版本中, 你需要使用 DefinePlugin:

    var webpack = require('webpack')
    module.exports = {
      // ...
      plugins: [
        // ...
        new webpack.DefinePlugin({
          'process.env': {
            NODE_ENV: JSON.stringify('production')
          }
        })
      ]
    }

 2. Rollup: 使用 rollup-plugin-replace:

    const replace = require('rollup-plugin-replace')
    rollup({
      // ...
      plugins: [
        replace({
          'process.env.NODE_ENV': JSON.stringify('production')
        })
      ]
    }).then(...)

 3. Browserify: 為你的包應用一次全局的 envify 轉換.

    NODE_ENV=production browserify -g envify -e main.js | uglifyjs -c -m > build.js

    也可以移步生產環境部署(5.4節) */


/* 1.1.10 CSP 環境

-有些環境, 如 Google Chrome Apps, 會強制應用 內容安全策略(CSP), 不能使用 new Function() 對表達式求值. 這時可以用 CSP 兼容版本.
 完整版本依賴於該功能來編譯模板, 所以無法在這些環境下使用.
-另一方面, 運行時版本則是完全兼容 CSP 的. 當通過 webpack + vue-loader 或者 Browserify + vueify 構建時, 模板將被預編譯為 render
 函數, 可以在 CSP 環境中完美運行 */


/* 1.1.11 開發版本

-GitHub 倉庫的 /dist 文件夾只有在新版本發佈時才會提交. 如果想要使用 GitHub 上 Vue 最新的源碼, 你需要自己構建！

    git clone https://github.com/vuejs/vue.git node_modules/vue
    cd node_modules/vue
    npm install
    npm run build
*/

/* 1.1.12 Bower: 只提供 UMD 版本

-最新稳定版本: $ bower install vue */


/* 1.1.13 AMD 模塊加載器:

-所有 UMD 版本都可以直接用作 AMD 模塊 */

