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
[ENV_TARGET=<target>] [ENV_VARIANT=<variant>] yarn start [--mode=<mode>]
```

`http://localhost:4001` が立ち上がります。

#### Options

| name        | value                       | description                             |
| :---------- | :-------------------------- | :-------------------------------------- |
| `<target>`  | `dev`, `stg`, `prod`        | 疎通する API サーバタイプを指定します。 |
| `<variant>` | number                      | specify Pull Request number.            |
| `<mode>`    | `development`, `production` | どんな用途でビルドするか指定する        |

### Build for publish

```bash
[ENV_TARGET=<target>] [ENV_VARIANT=<variant>] yarn build [--mode=<mode>]
```

## Deployment

### Requirement

- [AWS CLI](https://aws.amazon.com/jp/cli/)

```bash
yarn deploy
```
