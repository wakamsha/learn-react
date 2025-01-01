import { matchSorter } from 'match-sorter';

type Member = {
  id: string;
  name: string;
  birth_date: string;
  avatar_url: string;
  notes: string;
};

/**
 * Get the Beatles members.
 *
 * @param query - An optional query to filter members by.
 *
 * @returns The Beatles members.
 */
export async function getBeatles(query?: string) {
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
 * Get a Beatles member by ID.
 *
 * @param id - The ID of the Beatles member to fetch.
 *
 * @returns The Beatles member.
 */
export async function getBeatlesMember(id: string) {
  await new Promise((resolve) => {
    setTimeout(resolve, 500);
  });

  return data.find((member) => member.id === id);
}

const data: Member[] = [
  {
    id: 'john-lennon',
    name: 'John Lennon',
    birth_date: '1940-10-09',
    avatar_url:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/John_Lennon_at_the_Ed_Sullivan_Show_in_1964_%28cropped%29.jpg/440px-John_Lennon_at_the_Ed_Sullivan_Show_in_1964_%28cropped%29.jpg',
    notes:
      'Founding member, co-lead vocalist, and rhythm guitarist. Known for his activism and partnership with Yoko Ono.',
  },
  {
    id: 'paul-mccartney',
    name: 'Paul McCartney',
    birth_date: '1942-06-18',
    avatar_url:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Paul_McCartney_2022.jpg/440px-Paul_McCartney_2022.jpg',
    notes: 'Co-lead vocalist and bassist. Prolific songwriter and known for his post-Beatles band Wings.',
  },
  {
    id: 'george-harrison',
    name: 'George Harrison',
    birth_date: '1943-02-25',
    avatar_url:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/George_Harrison_1974_%28cropped%29.jpg/440px-George_Harrison_1974_%28cropped%29.jpg',
    notes: "Lead guitarist, known as 'The Quiet Beatle.' Embraced Indian music and spirituality.",
  },
  {
    id: 'ringo-starr',
    name: 'Ringo Starr',
    birth_date: '1940-07-07',
    avatar_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Ringo_Starr.png/440px-Ringo_Starr.png',
    notes: 'Drummer and occasional vocalist. Known for his steady beat and solo career post-Beatles.',
  },
];
