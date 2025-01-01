import { matchSorter } from 'match-sorter';

type Member = {
  id: string;
  name: string;
  role: string;
  avatar_url: string;
  notes: string;
};

/**
 * Get the Zeppelin members.
 *
 * @param query - An optional query to filter members by.
 *
 * @returns Led Zeppelin members.
 */
export async function getZeppelin(query?: string) {
  await new Promise((resolve) => {
    setTimeout(resolve, 500);
  });

  if (query) {
    return matchSorter(data, query, {
      keys: ['id', 'name'],
    });
  }

  return data;
}

/**
 * Get a Zeppelin member by ID.
 *
 * @param id - The ID of the Zeppelin member to fetch.
 *
 * @returns The Zeppelin member.
 */
export async function getZeppelinMember(id: string) {
  await new Promise((resolve) => {
    setTimeout(resolve, 500);
  });

  return data.find((member) => member.id === id);
}

const data: Member[] = [
  {
    id: 'robert-plant',
    name: 'Robert Plant',
    role: 'Vocals',
    avatar_url: 'https://upload.wikimedia.org/wikipedia/commons/2/2d/Robert-Plant.jpg',
    notes: 'Led Zeppelinのリードボーカリスト。パワフルでエモーショナルな歌声が特徴で、バンドの象徴的なフロントマン。',
  },
  {
    id: 'jimmy-page',
    name: 'Jimmy Page',
    role: 'Guitar',
    avatar_url: 'https://upload.wikimedia.org/wikipedia/commons/5/51/Jimmy_Page_early.jpg',
    notes: 'バンドのギタリストで、主要な作曲者。独創的なギターテクニックと音楽プロデューサーとしても評価が高い。',
  },
  {
    id: 'john-paul-jones',
    name: 'John Paul Jones',
    role: 'Bass, Keyboards',
    avatar_url:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/John_Paul_Jones_-_2010.jpg/340px-John_Paul_Jones_-_2010.jpg',
    notes: 'ベースやキーボードを担当し、多彩なアレンジや音楽理論でバンドのサウンドを支えた縁の下の力持ち。',
  },
  {
    id: 'john-bonham',
    name: 'John Bonham',
    role: 'Drums',
    avatar_url: 'https://upload.wikimedia.org/wikipedia/commons/4/4c/John_Bonham_1975.jpg',
    notes: '爆発的で力強いドラムプレイが特徴のドラマー。ロック史上最も影響力のあるドラマーの一人とされる。',
  },
];
