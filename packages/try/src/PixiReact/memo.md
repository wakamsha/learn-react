# @pixi/react メモ

## `@pixi/react` について

- `@pixi/react` は、PixiJS を Rect のインターフェースのように使用するためのライブラリです。`@pixi/react` を使用すると、PixiJS のコンポーネントを React のコンポーネントのように扱うことができ、React のライフサイクルに合わせて描画を管理できます。
  - もともと `@inlet/react-pixi` という名前で公開されていましたが、PixiJS の公式ライブラリとして `@pixi/react` に改名されました。
- PixiJS の公式チュートリアルはそれなりに充実しているが `@pixi/react` に向けたものは殆ど無い。そのため、習得の際は PixiJS 向けのものを適宜読み替えながら写経することになる。
- PixiJS も Konva 同様に Canvas 2D API をラップしたライブラリーだが、WebGL を使った表現に主軸を置いているため、提供される API の多くが低レベルなものとなっている。したがって必然的に手続き型のコードが多くなるため、`@pixi/react` を使用しても React コンポーネントのような宣言的な実装は期待できず、実装の大半は `useEffect` 内に書かれることとなる。

## `eslint-plugin-react` との相性

- `@pixi/react` によって拡張された PixiJS コンポーネントの多くのプロパティに対して ESLint の `react/no-unknown-property` ルールがエラーを出してしまう。 `eslint-plugin-react` コアコミッターによると、 `react-dom` 以外のレンダラーによる拡張タグは HTML 標準と見做さないため、エラーとして処理すべきとのこと。これを回避したければ、 タグの命名規則を camelCase でなく PascalCase にしてカスタムコンポーネントとして認識させるべきとのこと。しかし `@pixi/react` は、PixiJS のコンポーネントは `<pixiGraphics>` といった camelCase で書かせる仕様のため、この問題を回避できない。
  - `@pixi/react` によると、この問題を解消する見通しはないため、`@pixi/react` に依存した tsx ファイルに対して ESLint の `react/no-unknown-property` ルールを無効化する必要がある。

### 参考文献

- [Bug: Cannot pass React ESLint rule `react/no-unknown-property` · Issue #569 · pixijs/pixi-react](https://github.com/pixijs/pixi-react/issues/569)
- [[react/no-unknown-property] rule conflicts with `@react-three/fiber` on `<mesh />` and other tags · Issue #3423 · jsx-eslint/eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react/issues/3423)

## 参考文献

- [PixiJS React | PixiJS React](https://react.pixijs.io/)

## 提案: Konva (React Konva)

ライブラリの特性、学習コスト、メンテナンス性、弊チームのスキルセットといった観点から当該要件におけるライブラリとして [React Konva](https://konvajs.org/docs/react/index.html) の採用を提案する。

### Konva が適している理由

- **Easy かつ豊富な API:**
  - 図形、ライン、テキストといった要素の描画を簡単に実現するための API が豊富に提供されている。
  - そのため、例えば注釈機能（矢印、テキスト、図形の描画が必要）のような機能も比較的簡単に実装できる。
- **イベント処理:**
  - ドラッグ&ドロップやポインタ操作による描画といった処理を容易に実装できる。
  - これにより、例えばユーザーが GUI 上に注釈を追加したり編集するといった機能を低コストで実装できる。
- **必要にして十分なパフォーマンス性能:**
  - WebGL を用いた高度グラフィックス処理は苦手だが、シンプルな 2D グラフィックス処理であれば十分にワークする。
  - だたし、React の特性から再レンダリングの頻度は高まる傾向にあるため、Composition パターンを駆使するなど設計には十分に配慮する必要がある。

### PixiJS が不向きな理由

- **ゲームやジェネラティブアート向け:**
  - PixiJS が提供する API の多くがゲームやジェネラティブアートの開発を想定したものとなっており、画像編集アプリのような用途にはそぐわない。
- **基本的なユーザーアクション機能からスクラッチする必要がある:**
  - ドラッグ、リサイズ、オブジェクトの回転、ポインタ操作による描画といった基本的なアクション機能から自前で実装する必要がある。
  - 低レベルなイベントモデルのため、React のような宣言的 UI とは全く異なる思考の設計スキルが要求される。

### 総括

Konva は、画像の表示と注釈、簡単な編集機能を提供するアプリの開発に適した API を多数提供しているため、当該要件に適していると判断した。

一方で、PixiJS は「**映像や演出を滑らかに描画したい**」用途には最適だが「**図形を操作する**」ツールの開発には向かない。

_※ PixiJS での実現も不可能ではなく、[そのような事例](https://github.com/YunYouJun/pixi-painter)も存在するが、弊チームのスキルレベルでそこまで到達できるとは言い難い。_
