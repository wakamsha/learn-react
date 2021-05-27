import { Preloader } from '.';
import { Button } from '../../inputs/Button';

export const Story = () => (
  <>
    <h2>Basic</h2>
    <Preloader />

    <h2>Button</h2>
    <Button disabled>
      <Preloader size="button" theme="inverse" />
    </Button>
  </>
);
