# @learn-react/icon

> svg ファイルを Icon コンポーネント コードに置換します。

SVG ファイルを読み込み、そこから SVG アイコン の dom を返す React コンポーネント ( `FC` ) を生成します。

```tsx
// 使用例
<Icon name="account" />
<Icon name="angle-left" />
```

## Usage

```bash
pnpm codegen
```

`./src` ディレクトリにある `*.svg` ファイルから `TSX` コードを生成して下記ファイルを生成します。

```bash
./dist/
└── index.tsx
```
