import { useEffect } from 'react';

type Props = Partial<{
  title: string;
  baseTitle: string;
}>;

/**
 * web ページのタイトル ( `<title>` ) をセットします。
 *
 * @param props
 */
export const DocumentTitle = ({ title, baseTitle = 'Learn React' }: Props) => {
  useEffect(() => {
    if (title) {
      document.title = `${title} | ${baseTitle}`;
    } else {
      document.title = baseTitle;
    }
  }, [baseTitle, title]);

  return null;
};
