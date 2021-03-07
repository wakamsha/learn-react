import { Button } from '../../inputs/Button';
import { Preloader } from '.';

export const Story = () => (
  <>
    <h3>Basic</h3>
    <Preloader />

    <h3>Size</h3>
    <p>
      <Preloader size={80} />
    </p>
    <p>
      <Preloader size={200} />
    </p>

    <h3>Button</h3>
    <Button disabled>
      <Preloader size="button" theme="inverse" />
    </Button>
  </>
);
