import { render, screen } from '@testing-library/react';
import { Button } from '.';

describe('button.tsx', () => {
  it('should render', () => {
    render(<Button>Hello Test</Button>);

    expect(screen.getByText('Hello Test')).toBeInTheDocument();
  });
});
