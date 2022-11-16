import { css } from '@linaria/core';
import { Card } from '.';
import { FontSize, LineHeight } from '../../../constants/Style';
import { gutter } from '../../../helpers/Style';

export const Story = () => (
  <>
    <h2>Neutral</h2>
    <Card shadow="neutral">
      <Card.Body>
        <div className={styleInner}>
          <Content />
        </div>
      </Card.Body>
    </Card>

    <h2>Dialog</h2>
    <Card shadow="dialog">
      <Card.Body>
        <div className={styleInner}>
          <Content />
        </div>
      </Card.Body>
    </Card>

    <h2>Floating</h2>
    <Card shadow="floating">
      <Card.Body>
        <div className={styleInner}>
          <Content />
        </div>
      </Card.Body>
    </Card>

    <h2>Deep</h2>
    <Card shadow="deep">
      <Card.Body>
        <div className={styleInner}>
          <Content />
        </div>
      </Card.Body>
    </Card>

    <h2>Hover</h2>
    <Card hover>
      <Card.Body>
        <div className={styleInner}>
          <Content />
        </div>
      </Card.Body>
    </Card>

    <h2>Max Width = 200</h2>
    <Card shadow="neutral" maxWidth={200}>
      <Card.Body>
        <div className={styleInner}>
          <Content />
        </div>
      </Card.Body>
    </Card>

    <h2>Scrollable Body</h2>
    <Card shadow="dialog" maxHeight={360}>
      <Card.Header thickness="small">
        <h1>ポラーノの広場</h1>
      </Card.Header>
      <Card.Body thickness="small">
        {[...Array(8).keys()].map(index => (
          <Content key={index} />
        ))}
      </Card.Body>
      <Card.Footer thickness="small">
        <button>Submit</button>
        <button>Cancel</button>
      </Card.Footer>
    </Card>
  </>
);

const Content = () => (
  <p>
    あのイーハトーヴォのすきとおった風、夏でも底に冷たさをもつ青いそら、うつくしい森で飾られたモリーオ市、郊外のぎらぎらひかる草の波。
  </p>
);

const styleInner = css`
  padding: ${gutter(4)} 0;
  font-size: ${FontSize.Regular};
  line-height: ${LineHeight.Regular};
`;
