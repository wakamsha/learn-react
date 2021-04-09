// module.exports = {
//   extends: ['@commitlint/config-conventional'],
// };
module.exports = {
  rules: {
    'type-enum': [
      2,
      'always',
      [
        // 新機能
        ':sparkles:',
        // バグ修正
        ':bug:',
        // カイゼン（UI変更あり）
        ':lipstick:',
        // カイゼン（UI変更なし）
        ':recycle:',
        // ドキュメント・コメント追加変更
        ':memo:',
        // ビルド設定、CI設定、開発環境変更など
        ':wrench:',
        // 依存ライブラリ更新
        ':pill:',
        // 仮
        ':construction:',
        // その他
        ':cyclone:',
      ],
    ],
    'body-leading-blank': [2, 'always'],
    'subject-case': [2, 'always', ['sentence-case']],
    'subject-empty': [2, 'never'],
    'subject-full-stop': [2, 'never', '.'],
    'type-empty': [2, 'never'],
  },
  parserPreset: {
    parserOpts: {
      headerPattern: /^(:\w+:) (.+)$/,
      headerCorrespondence: ['type', 'subject'],
    },
  },
};
