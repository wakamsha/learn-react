# @learn-react/catalog

> Story を一覧で表示し、実際に動作させます。

当該プロジェクトにある様々な `Story` コンポーネントを自動的に収集することで、一覧表示および実際の動作確認が出来ます。

<!-- ## setup

```bash
pnpm prepare-msw
```

[MSW](https://mswjs.io/) が使用する Service Worker を公開ディレクトリ（ `dist/` ）に生成します。 -->

## Usage

### Development

```bash
[ENV_TARGET=<target>] [ENV_VARIANT=<variant>] pnpm start [--mode=<mode>]
```

`http://localhost:3010` が立ち上がります。

#### Options

| name        | value                       | description                             | default     |
| :---------- | :-------------------------- | :-------------------------------------- | :---------- |
| `<target>`  | `dev`, `stg`, `prod`        | 疎通する API サーバタイプを指定します。 | `dev`       |
| `<variant>` | number                      | specify Pull Request number.            | `undefined` |
| `<mode>`    | `development`, `production` | どのような用途でビルドするか指定する    | `undefined` |

### Build for publish

```bash
[ENV_TARGET=<target>] [ENV_VARIANT=<variant>] pnpm build [--mode=<mode>]
```

## Deployment

### Requirement

- [AWS CLI](https://aws.amazon.com/jp/cli/)
  - デプロイスクリプトは aws cli に依存するため、予めインストールしておきます。

### Setup

`~/.aws/` ディレクトリ配下に S3 と CloudFront へのアクセス権を持つ `profile` を設定します。

### Deploy

```bash
pnpm deploy
```

デプロイに成功すると `https://learn-react.wakamsha.net` に反映されます。
