# Workspace: Packages

このワークスペースには以下のものが含まれます。

| パッケージ名 | 概要                                                                                           | 備考                |
| -----------: | :--------------------------------------------------------------------------------------------- | :------------------ |
|    `builder` | 各サブパッケージをビルドするためのスクリプトを管理します。ビルドには Vite を使います。         | https://vitejs.dev/ |
|       `core` | 当リポジトリ横断（共通）で使用する Components, Constants, Hooks, Helpers を管理します。        |                     |
|       `icon` | SVG ファイルを読み込み、そこから SVG アイコン の dom を返す React コンポーネントを生成します。 |                     |
|        `try` | React 単体の機能な振る舞いについての実装デモを管理します。                                     |                     |
|   `tsconfig` | 各サブパッケージが参照する `tsconfig.json` を管理します。                                      |                     |

各パッケージは原則として単体でのアプリケーションビルドはせず、 Apps ワークスペース配下のパッケージをはじめ他のパッケージから依存されることを前提としています。
