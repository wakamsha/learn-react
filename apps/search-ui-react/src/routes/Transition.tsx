import { Suspense, use, useState, useTransition, type ChangeEvent, type FC } from 'react';
import { getContacts, type ContactRecord } from '../data';
import { useDebouncedCallback } from '../hooks/useDebouncedCallback';

/**
 * React の標準機能を活用したインクリメンタルサーチ UI のデモ。
 *
 * use と Suspense を組み合わせることで useEffect を使用せずに非同期データを取得し、結果を表示することができる。
 *
 * また、自作した useDebouncedCallback フックを使用して、入力値の変更が一定時間続いた場合にのみサーバーにリクエストを送信するようにしている。
 * これにより、ユーザーが入力中にサーバーへのリクエストが過剰に送信されることを防ぎ、パフォーマンスの向上につながる。
 *
 * さらに、useTransition フックを使用して、データの再取得が完了するまで更新前のデータを表示し続けることができる。
 * これにより、ユーザーが入力中に表示がちらつくことを防ぎ、UX の向上につながる。
 *
 * このように、React の標準機能を活用することで、シンプルかつ効率的なインクリメンタルサーチ UI を実装することができる。
 */
export const Transition: FC = () => {
  const [dataPromise, setDataPromise] = useState(() => getContacts());

  const [query, setQuery] = useState('');

  const [isPending, startTransition] = useTransition();

  const handleQueryChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const debouncedSubmit = useDebouncedCallback(() => {
    startTransition(() => {
      setDataPromise(getContacts(query));
    });
  }, 300);

  return (
    <div>
      <form onChange={debouncedSubmit}>
        <input name="query" value={query} onChange={handleQueryChange} />
      </form>

      <Suspense fallback={<div>Loading...</div>}>
        <div style={{ opacity: isPending ? 0.4 : 1 }}>
          <Contacts dataPromise={dataPromise} />
        </div>
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
