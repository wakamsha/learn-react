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
  };

  return { users };
});

// Story が実ネットワークへ到達しないようモック化する。
vi.mock(import('@learn-react/core/src/api/user'), () => ({
  requestGetUser: vi.fn<typeof requestGetUser>(({ path }) => Promise.resolve(users[path] ?? users['1'])),
}));

describe('withUseTransition', () => {
  it('初期表示では Suspense のフォールバックが表示される', () => {
    render(<WithUseTransitionStory />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('useTransition の有効・無効を切り替えられる', async () => {
    const user = userEvent.setup();
    render(<WithUseTransitionStory />);

    const checkbox = screen.getByRole('checkbox');

    expect(checkbox).toBeChecked();

    await user.click(checkbox);

    expect(checkbox).not.toBeChecked();
  });

  it('useTransition が有効なときにユーザーを切り替えると Pending インジケータが表示される', async () => {
    const user = userEvent.setup();
    render(<WithUseTransitionStory />);

    const select = screen.getByRole('combobox');
    await user.selectOptions(select, '2');

    // トランジション中は isPending が真になり、フォールバックへ切り替えず Pending を表示する
    expect(screen.getByText('Pending...')).toBeInTheDocument();
  });

  it('useTransition が無効なときにユーザーを切り替えても Pending インジケータは表示されない', async () => {
    const user = userEvent.setup();
    render(<WithUseTransitionStory />);

    const checkbox = screen.getByRole('checkbox');
    await user.click(checkbox);

    const select = screen.getByRole('combobox');
    await user.selectOptions(select, '2');

    // トランジションを使わない更新なので isPending は偽のまま
    expect(screen.queryByText('Pending...')).not.toBeInTheDocument();
  });
});
