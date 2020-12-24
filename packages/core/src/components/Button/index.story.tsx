import { Button } from '.';

export const Story = () => (
  <>
    <h3>Basic</h3>
    <Button onClick={console.info}>Hello world</Button>
    <Button theme="inverse" onClick={console.info}>
      Hello world
    </Button>
    <h3>Ghost</h3>
    <Button ghost onClick={console.info}>
      Hello world
    </Button>
    <Button theme="inverse" ghost onClick={console.info}>
      Hello world
    </Button>
    <h3>Noop</h3>
    <Button noop>Hello world</Button>
    <Button noop theme="inverse">
      Hello world
    </Button>
    <Button noop ghost>
      Hello world
    </Button>
    <Button noop ghost theme="inverse">
      Hello world
    </Button>
  </>
);
