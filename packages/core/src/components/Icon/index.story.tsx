import { css } from '@emotion/css';
import { IconName, iconElements } from '@learn-react/icon';
import { FontSize } from '../../constants/Style';
import { gutter, square } from '../../helpers/Style';
import { Icon } from '.';

export const Story = () => (
  <ul className={styleBase}>
    {Object.keys(iconElements).map(iconName => (
      <li key={iconName}>
        <Icon name={iconName as IconName} />
        <span>{iconName}</span>
      </li>
    ))}
  </ul>
);

const styleBase = css`
  display: flex;
  flex-wrap: wrap;
  padding: 0;
  margin: 0;
  list-style: none;

  > li {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    margin: 0 ${gutter(4)} ${gutter(16)};
    ${square(96)}

    > svg {
      ${square(64)}
    }

    > span {
      font-size: ${FontSize.Small};
    }
  }
`;
