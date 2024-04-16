import { render, screen } from '@testing-library/react';
import { Button } from '.';

describe('Button.tsx', () => {
  test('should render', () => {
    render(<Button>Hello Test</Button>);

    expect(screen.getByText('Hello Test')).toBeInTheDocument();
  });
});
