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
