import { ThemedButton } from './ThemedButton';

// Before
// ----------------
// type Props = {
//   theme: Theme;
// };

// export const Toolbar = ({ theme }: Props) => {
//   // Toolbar コンポーネントは外部から "theme" プロパティを受け取り、
//   // プロパティを ThemedButton へ渡します。
//   // アプリ内の各ボタンがテーマを知る必要がある場合、
//   // プロパティは全てのコンポーネントを通して渡される為、面倒になります。
//   return (
//     <nav>
//       <ThemedButton theme={theme} />
//     </nav>
//   );
// };

// After
// ----------------
export const Toolbar = () => (
  <nav>
    <ThemedButton />
  </nav>
);
