import { type ChangeEvent, type FC, Suspense, use, useEffect, useState } from 'react';
import { type ContactRecord, getContacts } from '../data';
import { useDebouncedState } from '../hooks/useDebouncedValue';

/**
 * React の標準機能を活用したインクリメンタルサーチ UI のデモ。
 *
 * use と Suspense を組み合わせることで useEffect を使用せずに非同期データを取得し、結果を表示することができる。
 *
 * また、自作した useDebouncedState フックを使用して、入力値の変更が一定時間続いた場合にのみサーバーにリクエストを送信するようにしている。
 * これにより、ユーザーが入力中にサーバーへのリクエストが過剰に送信されることを防ぎ、パフォーマンスの向上につながる。
 *
 * このように、React の標準機能を活用することで、シンプルかつ効率的なインクリメンタルサーチ UI を実装することができる。
 */
export const Value: FC = () => {
  const [dataPromise, setDataPromise] = useState(() => getContacts());

  const [query, debouncedQuery, setQuery] = useDebouncedState('', 300);

  const handleQueryChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  useEffect(() => {
    setDataPromise(getContacts(debouncedQuery));
  }, [debouncedQuery]);

  return (
    <div>
      <form>
        <input name="query" value={query} onChange={handleQueryChange} />
      </form>

      <Suspense fallback={<div>Loading...</div>}>
        <Contacts dataPromise={dataPromise} />
      </Suspense>
    </div>
  );
};

type ContactsProps = {
  dataPromise: Promise<ContactRecord[]>;
};

const Contacts: FC<ContactsProps> = ({ dataPromise }) => {
  const data = use(dataPromise);

  return data.length > 0 ? (
    <ul>
      {data.map((contact) => (
        <li key={contact.id}>
          {contact.first || contact.last ? (
            <>
              {contact.first} {contact.last}
            </>
          ) : (
            <i>No name</i>
          )}
        </li>
      ))}
    </ul>
  ) : (
    <div>No contacts</div>
  );
};
