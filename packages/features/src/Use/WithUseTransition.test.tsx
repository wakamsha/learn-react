import { type User, type requestGetUser } from '@learn-react/core/src/api/user';
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { Story as WithUseTransitionStory } from './WithUseTransition.story';

const { users } = vi.hoisted(() => {
  const users: Record<string, User> = {
    '1': {
      id: 1,
      name: 'John Doe',
      username: 'john',
      email: 'john@example.com',
      phone: '123-456-7890',
      website: 'example.com',
      address: {
        street: 'Main Street',
        suite: 'Apt. 100',
        city: 'Boston',
        zipcode: '02108',
        geo: { lat: '42.3601', lng: '-71.0589' },
      },
      company: {
        name: 'Alpha Inc',
        catchPhrase: 'Simple and fast',
        bs: 'software solutions',
      },
    },
    '2': {
      id: 2,
      name: 'Jane Smith',
      username: 'jane',
      email: 'jane@example.com',
      phone: '987-654-3210',
      website: 'example.net',
      address: {
        street: 'Park Avenue',
        suite: 'Suite 200',
        city: 'New York',
        zipcode: '10001',
        geo: { lat: '40.7128', lng: '-74.0060' },
      },
      company: {
        name: 'Beta LLC',
        catchPhrase: 'Innovate today',
        bs: 'cloud services',
      },
    },
    '3': {
      id: 3,
      name: 'Alice Johnson',
      username: 'alice',
      email: 'alice@example.org',
      phone: '555-019-2831',
      website: 'example.org',
      address: {
        street: 'Broadway',
        suite: 'Suite 300',
        city: 'Chicago',
        zipcode: '60601',
        geo: { lat: '41.8781', lng: '-87.6298' },
      },
      company: {
        name: 'Gamma Corp',
        catchPhrase: 'Build the future',
        bs: 'digital products',
      },
    },
  };

  return { users };
});

vi.mock(import('@learn-react/core/src/api/user'), () => ({
  requestGetUser: vi.fn<typeof requestGetUser>(({ path }: { path: string }) => {
    const user = users[path] ?? users['1'];
    const promise = Promise.resolve(user) as Promise<User> & { status?: string; value?: User };
    promise.status = 'fulfilled';
    promise.value = user;
    return promise;
  }),
}));

describe('withUseTransition', () => {
  it('初回のデータ読み込み完了後に User 1 の情報が表示される', async () => {
    render(<WithUseTransitionStory delayTime={0} />);

    expect(screen.getByText(/John Doe/)).toBeInTheDocument();
    expect(screen.getByText(/john/)).toBeInTheDocument();
  });

  it('useTransition が有効な場合、ユーザー切り替え後にデータが更新される', async () => {
    const user = userEvent.setup();
    render(<WithUseTransitionStory delayTime={0} />);

    expect(screen.getByText(/John Doe/)).toBeInTheDocument();

    const select = screen.getByRole('combobox');
    await user.selectOptions(select, '2');

    expect(screen.getByText(/Jane Smith/)).toBeInTheDocument();
  });

  it('useTransition を無効にした場合、ユーザー切り替え時に直接データ更新が行われる', async () => {
    const user = userEvent.setup();
    render(<WithUseTransitionStory delayTime={0} />);

    expect(screen.getByText(/John Doe/)).toBeInTheDocument();

    const checkbox = screen.getByRole('checkbox');
    await user.click(checkbox);

    const select = screen.getByRole('combobox');
    await user.selectOptions(select, '3');

    expect(screen.getByText(/Alice Johnson/)).toBeInTheDocument();
  });
});
