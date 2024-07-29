import { useEffect } from 'react';

type Props = Partial<{
  title: string;
  baseTitle: string;
}>;

/**
 * web ページのタイトル ( `<title>` ) をセットします。
 */
export const DocumentTitle = ({ title, baseTitle = 'Learn React' }: Props) => {
  useEffect(() => {
    document.title = title ? `${title} | ${baseTitle}` : baseTitle;
  }, [baseTitle, title]);

  return null;
};
