# IH12B332 12番 神保恒介 - JS23 No.02

## 概要
- このリポジトリは、JS23 No.02の課題を管理するためのものです。
- このリポジトリは、cloudflare Pagesを用いて、[こちらのページ](https://deploy.kosuke.dev/local-map)で公開しています。
- 今回はNext.jsのAppRouer、Tailwind CSSを用いて、Google Maps APIを用いた地図アプリを作成しました。


## こだわったところ
- 設定画面でマップのコントロール・テーマを設定できます。
- マップ上をクリックすると、ピンを追加するフォームが表示されます、未完成です。(無念...)
- おすすめリストは、JSONファイルに記述したデータを読み込んで表示しています。
- ローカルストレージに設定を保存しています。
- マップの表示は、googlemaps-reactWrapperを用いています。
- 複数のリストに対応できるよう、リストはタグにて分けられるようにしています。
- APIKEYは、環境変数に設定しています。


## 使用した技術
- [Node.js](https://nodejs.org/ja/)  
- [Next.js](https://nextjs.org/)  
- [Tailwind CSS](https://tailwindcss.com/)  
- [Cloudflare Pages](https://pages.cloudflare.com/)  


## ローカルでの実行方法
1. このリポジトリをクローンする
2. `npm install`を実行する
3. `.env`ファイルを作成し、`NEXT_PUBLIC_GOOGLEMAP_APIKEY`にGoogleのAPIキーを設定する
3. `npm run dev`を実行する
4. [http://localhost:3000](http://localhost:3000)にアクセスする


## 主要なファイル構成
```
.
├── README.md
├── src
│   ├── components/
│   │   ├── CreatePlace.tsx     // マップ上をクリックすると呼び出されるピン追加用フォーム (未完成)
│   │   ├── GoogleMaps.tsx      // Google Maps APIを用いたマップ表示
│   │   ├── Header.tsx          // ヘッダー
│   │   ├── LocationList.tsx    // おすすめリストを表示するコンポーネント
│   │   └── ThemeSwitch.tsx     // テーマ切り替えセレクトのコンポーネント
│   ├── hooks/
│   │   └── useLocalStorage.ts  // ローカルストレージをstate管理するためのフック
│   ├── app/
│   │   ├── layout.tsx            // ルートコンポーネント
│   │   ├── page.tsx              // メインページ (htmlファイル+jsファイルを統合したファイル)
│   │   ├── global.css            // グローバルCSS (tailwindの指定等)
│   │   └── settings/
│   │       └── page.tsx          // 設定ページ (画面上のコントロール等の設定)
│   └── static/
│       └── data.json             // 聖地巡礼のロケーションデータを格納したJSON
└── .env                          // 環境変数 (NEXT_PUBLIC_GOOGLEMAP_APIKEY をGoogleのAPIキーに設定)
```

