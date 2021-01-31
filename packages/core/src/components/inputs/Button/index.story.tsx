import { css } from '@emotion/css';
import { gutter } from '../../../helpers/Style';
import { Icon } from '../../dataDisplay/Icon';
import { Button } from '.';

const themes = ['primary', 'danger'] as const;

export const Story = () => (
  <>
    <h3>Solid</h3>
    <div className={styleRow}>
      {themes.map(theme => (
        <div key={theme} className={styleCell}>
          <Button theme={theme}>{theme}</Button>
        </div>
      ))}
      <div className={styleCell}>
        <Button disabled>disabled</Button>
      </div>
    </div>

    <h3>Ghost</h3>
    <div className={styleRow}>
      {themes.map(theme => (
        <div key={theme} className={styleCell}>
          <Button variant="ghost" theme={theme}>
            {theme}
          </Button>
        </div>
      ))}
      <div className={styleCell}>
        <Button variant="ghost" disabled>
          disabled
        </Button>
      </div>
    </div>

    <h3>Bare</h3>
    <div className={styleRow}>
      {themes.map(theme => (
        <div key={theme} className={styleCell}>
          <Button variant="bare" theme={theme}>
            {theme}
          </Button>
        </div>
      ))}
      <div className={styleCell}>
        <Button variant="bare" disabled>
          disabled
        </Button>
      </div>
    </div>

    <h3>With Icon</h3>
    <div className={styleRow}>
      {(['solid', 'ghost', 'bare'] as const).map(variant => (
        <div key={variant} className={styleCell}>
          <Button variant={variant}>
            <Icon name="plus" />
            {variant}
          </Button>
        </div>
      ))}
    </div>
    <div className={styleRow}>
      {(['solid', 'ghost', 'bare'] as const).map(variant => (
        <div key={variant} className={styleCell}>
          <Button variant={variant}>
            {variant}
            <Icon name="plus" />
          </Button>
        </div>
      ))}
    </div>

    <h3>Block</h3>
    <div className={styleCell}>
      <Button block>Solid</Button>
    </div>
    <div className={styleCell}>
      <Button variant="ghost" block>
        Ghost
      </Button>
    </div>

    <h3>Noop</h3>
    <div className={styleRow}>
      <div className={styleCell}>
        <Button noop>Solid</Button>
      </div>
      <div className={styleCell}>
        <Button variant="ghost" noop>
          Ghost
        </Button>
      </div>
      <div className={styleCell}>
        <Button variant="bare" noop>
          disabled
        </Button>
      </div>
      <div className={styleCell}>
        <Button noop disabled>
          disabled
        </Button>
      </div>
    </div>
  </>
);

const styleRow = css`
  display: flex;
  flex-wrap: wrap;
`;

const styleCell = css`
  padding: ${gutter(1)};
`;
