# @learn-react/routing

This package provides a simple routing solution for React applications using React Router.

## Notes

React Router 6 より導入された Data APIs は `01-basic` でのみ使用している。この機能を使用するには、すべてのルートを前もって定義して `createBrowserRouter` に引数として渡す必要がある。つまり `Routes` モジュールを分割して定義し、ネストすることができない（同様に Code Splitting も不可）。したがって、すべてのルートを一箇所にまとめて定義している `01-basic` 以外のサンプルでは Data APIs を使用していない。

- [Make Routes component participate in data loading · remix-run/react-router · Discussion #9855](https://github.com/remix-run/react-router/discussions/9855)
