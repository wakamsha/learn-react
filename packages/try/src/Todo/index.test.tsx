import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { TodoApp } from '.';

describe('Todo', () => {
  test('should add todo items', async () => {
    const user = userEvent.setup();

    render(<TodoApp />);

    const input = screen.getByRole('textbox');
    await user.type(input, 'new todo');

    const addButton = screen.getByRole('button', { name: 'add' });
    await user.click(addButton);

    const removeButtons = screen.getAllByRole('button', { name: '削除' });

    expect(removeButtons).toHaveLength(2);
  });

  test('should remove todo items', async () => {
    const user = userEvent.setup();

    render(<TodoApp />);

    const input = screen.getByRole('textbox');
    await user.type(input, 'new todo');

    const addButton = screen.getByRole('button', { name: 'add' });
    await user.click(addButton);

    const removeButtons = screen.getAllByRole('button', { name: '削除' });
    await user.click(removeButtons[0]);

    expect(screen.getAllByRole('button', { name: '削除' })).toHaveLength(1);
  });
});
