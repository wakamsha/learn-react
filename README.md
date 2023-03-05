# learn-react

> The Sandbox for learning React.

| Sub package                                  | 概要                                                                                                        | 備考                                                                                                                                              |
| :------------------------------------------- | :---------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------ |
| [`catalog`](/tree/main/packages/catalog)     | 当該プロジェクトにある様々な `Story` コンポーネントを import することで、一覧表示および動作確認が出来ます。 | https://learn-react.wakamsha.net/                                                                                                                 |
| [`core`](/tree/main/packages/core)           | 当リポジトリ横断（共通）で使用する Components, Constants, Hooks, Helpers を管理します。                     |                                                                                                                                                   |
| [`icon`](/tree/main/packages/icon)           | SVG ファイルを読み込み、そこから SVG アイコン の dom を返す React コンポーネントを生成します。              |                                                                                                                                                   |
| [`routing`](/tree/main/packages/routing)     | ReactRouter を用いたアプリケーションの実装デモを管理します。                                                | https://reactrouter.com/                                                                                                                          |
| [`statement`](/tree/main/packages/statement) | 様々な状態管理ライブラリと React を組み合わせたアプリケーションの実装デモを管理します。                     | [MobX](https://mobx.js.org/)<br>[Unstated Next](https://github.com/jamiebuilds/unstated-next)<br>[Constate](https://github.com/diegohaz/constate) |
| [`try`](/tree/main/packages/try)             | React 単体の機能な振る舞いについての実装デモを管理します。                                                  |                                                                                                                                                   |

## Prerequisites

|  Module | Ver.                     |
| ------: | ------------------------ |
| Node.js | `./.node-version` を参照 |
|    pnpm | `./.package.json` を参照 |

### Node.js

本リポジトリで利用可能な Node.js のバージョンは `./.node-version` ファイルにて管理しているため、開発者にはこのファイルをサポートしている Node.js バージョン管理ツールの利用を推奨します。以下は推奨するバージョン管理ツールの例です。

- [nodenv](https://github.com/nodenv/nodenv)
- [n](https://github.com/tj/n)
- [asdf](https://github.com/asdf-vm/asdf)
- [NVS](https://github.com/jasongin/nvs)
- [fnm](https://github.com/Schniz/fnm)

### pnpm

本リポジトリではパッケージマネージャーに pnpm を使用します。corepack コマンドを実行して pnpm を有効化します。

```bash
corepack enable pnpm
```

## Install dependencies

```bash
pnpm install
```

## Setup

### Icon コードを生成する

`@learn-react/icon` パッケージで管理している SVG ファイルから SVG アイコンコンポーネント用のオブジェクトデータを生成します。以下のコマンドを実行します。

```bash
pnpm icon build
```

これで `@learn-react/core/components/dataDisplay/Icon` コンポーネントが使えるようになります。

## Develop

### Package (application) structure

アプリケーションとしてビルド・起動するパッケージは以下の通り:

- `@learn-react/catalog`
- `@learn-react/esnext`
- `@learn-react/routing`
- `@learn-react/statement`

上記以外は API や共通ライブラリの実装となっており、単独で利用することはありません。

### Run

```bash
pnpm (catalog|esnext|routing|statement) start
# e.g. pnpm catalog start
```

上記コマンドで指定のアプリケーションが起動し、web ブラウザも自動で立ち上がります。起動中はファイルの変更を検知して自動的にリビルド、リロードされます。

## Build

### Package (application) structure

アプリケーションとしてビルドするパッケージは以下の通り:

- `@learn-react/catalog`
- `@learn-react/doc`
- `@learn-react/esnext`
- `@learn-react/routing`
- `@learn-react/statement`

### Build

```bash
pnpm (catalog|doc|esnext|routing|statement) build
# e.g. pnpm catalog build
```

## Lint

```bash
pnpm lint
```

## Format

```bash
pnpm format
```
