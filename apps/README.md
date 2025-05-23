# Workspace: Apps

このワークスペースには以下のものが含まれます。

|       パッケージ名 | 概要                                                                                                                      | 備考                                                                                                                                              |
| -----------------: | :------------------------------------------------------------------------------------------------------------------------ | :------------------------------------------------------------------------------------------------------------------------------------------------ |
|          `catalog` | 当該プロジェクトにある様々な `Story` コンポーネントを import することで、一覧表示および動作確認が出来ます。               | https://learn-react.wakamsha.net/                                                                                                                 |
|              `doc` | 各種サブパッケージ・コードベースの JSDoc コメントからドキュメントページを生成します。生成処理には TypDoc を使っています。 | https://typedoc.org/                                                                                                                              |
|           `esnext` | ECMAScript 2015 以降の機能の実装デモを管理します。                                                                        |                                                                                                                                                   |
| `react-router-lib` | React Router をライブラリーとして用いた SPA の実装デモを管理します。                                                      | https://reactrouter.com/6.28.0/start/tutorial#jsx-routes                                                                                          |
| `react-router-spa` | React Router (ex-Remix) をフレームワークとして用いた SPA の実装デモを管理します。                                         | https://reactrouter.com/tutorials/address-book                                                                                                    |
| `react-router-ssr` | React Router (ex-Remix) をフレームワークとして用いたアプリ（SSR）の実装デモを管理します。                                 | https://reactrouter.com/tutorials/address-book                                                                                                    |
|          `routing` | ReactRouter を用いたアプリケーションの実装デモを管理します。                                                              | https://reactrouter.com/                                                                                                                          |
|        `statement` | 様々な状態管理ライブラリと React を組み合わせたアプリケーションの実装デモを管理します。                                   | [MobX](https://mobx.js.org/)<br>[Unstated Next](https://github.com/jamiebuilds/unstated-next)<br>[Constate](https://github.com/diegohaz/constate) |

このワークスペースにあるパッケージは、全て単体のアプリケーションとしてビルド、デプロイ可能なものです。各パッケージは必要に応じて Packages ワークスペース配下のパッケージに依存します。
