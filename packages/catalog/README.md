# @learn-react/catalog

> Story を一覧で表示し、実際に動作させます。

当該プロジェクトにある様々な `Story` コンポーネントを import することで、一覧表示および動作確認が出来ます。

## setup

```bash
yarn prepare-msw
```

[MSW](https://mswjs.io/) が使用する Service Worker を公開ディレクトリ（ `dist/` ）に生成します。

## Usage

### Development

```bash
yarn start
```

`http://localhost:4000` が立ち上がります。

### Build for publish

```bash
yarn build
```
