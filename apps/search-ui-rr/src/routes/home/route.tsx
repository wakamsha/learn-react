import { type ChangeEvent, type FC, useState } from 'react';
import { Form, type LoaderFunctionArgs, useLoaderData, useNavigation, useSubmit } from 'react-router';
import { getContacts } from '../../data';
import { useDebouncedCallback } from '../../hooks/useDebouncedCallback';

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);

  const q = url.searchParams.get('query');

  const contacts = await getContacts(q);

  return {
    contacts,
    q,
  };
}

/**
 * React Router 7 の機能を活用したインクリメンタルサーチ UI のデモ。
 *
 * Form コンポーネントと useSubmit フックを組み合わせることで、フォームの入力値が変更されるたびにサーバーにリクエストを送信し、結果を取得して表示することができる。
 *
 * また、自作した useDebouncedCallback フックを使用して、入力値の変更が一定時間続いた場合にのみサーバーにリクエストを送信するようにしている。
 * これにより、ユーザーが入力中にサーバーへのリクエストが過剰に送信されることを防ぎ、パフォーマンスの向上につながる。
 *
 * さらに、useNavigation フックを使用して現在のナビゲーション状態を取得し、検索中であることを示すインジケーターを表示することができる。
 * このように、React Router 7 の機能を活用することで、シンプルかつ効率的なインクリメンタルサーチ UI を実装することができる。
 */
export const Component: FC = () => {
  const { contacts, q } = useLoaderData<typeof loader>();

  const navigation = useNavigation();

  const submit = useSubmit();

  const [query, setQuery] = useState(q ?? '');

  const searching = (navigation.location && new URLSearchParams(navigation.location.search).has('query')) ?? false;

  const handleQueryChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const debouncedSubmit = useDebouncedCallback(async (form: HTMLFormElement) => {
    const isFirstSearch = q === null;

    await submit(form, {
      replace: !isFirstSearch,
    });
  }, 300);

  const handleFormChange = (event: ChangeEvent<HTMLFormElement>) => {
    debouncedSubmit(event.currentTarget);
  };

  return (
    <div>
      {/* MEMO: HTML 標準の form 要素でも期待どおりに動作する。 */}
      <Form onChange={handleFormChange}>
        <input name="query" value={query} onChange={handleQueryChange} />
        {searching ? <span>🔃</span> : null}
      </Form>

      {contacts.length > 0 ? (
        <ul>
          {contacts.map((contact) => (
            <li key={contact.id}>
              {contact.first || contact.last ? (
                <>
                  {contact.first} {contact.last}
                </>
              ) : (
                <i>No Name</i>
              )}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
};
