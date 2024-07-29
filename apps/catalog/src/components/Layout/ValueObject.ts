/**
 * メインコンテンツとナビゲーションのレイアウトを定義した型。
 */
export const LayoutMode = {
  /**
   * ナビゲーションが展開された状態でメインコンテンツに並んで表示される。
   * 初期値。
   */
  Neutral: 1,
  /**
   * メインコンテンツの表示領域を広く確保するモード。
   * ナビゲーションが折りたたまれた状態で表示される。
   */
  Zen: 2,
} as const;

/**
 * メインコンテンツとナビゲーションのレイアウトを定義した型。
 */
export type LayoutMode = ValueOf<typeof LayoutMode>;
