import { iconElements, type IconName } from '@learn-react/icon';
import { css } from '@linaria/core';
import { useMemo, useReducer, useState, type ChangeEvent } from 'react';
import { Toast } from '.';
import { FontSize, LineHeight } from '../../../constants/Style';
import { gutter } from '../../../helpers/Style';

export const Story = () => {
  const [limit, setLimit] = useState(3);

  return (
    <Toast.Provider limit={limit}>
      <label className={styleFormControl}>
        <span>表示する上限数</span>
        <input type="number" min={1} max={10} value={limit} onChange={e => setLimit(Number(e.target.value))} />
      </label>

      <AddMessage />
    </Toast.Provider>
  );
};

const AddMessage = () => {
  console.info('render AddMessage');

  const { addToast } = Toast.useToast();

  const [{ message, icon, theme }, dispatch] = useReducer(reducer, { message: '' });

  const iconNames = useMemo(() => Object.keys(iconElements), []);

  const handleChangeTheme = (e: ChangeEvent<HTMLSelectElement>) => {
    dispatch({ type: 'theme', payload: e.target.value as Toast['theme'] });
  };

  const handleChangeIcon = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'icon', payload: iconNames.includes(e.target.value) ? (e.target.value as IconName) : undefined });
  };

  const handleInputMessage = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'message', payload: e.target.value });
  };

  const handleSubmit = () => {
    addToast({
      icon,
      theme,
      message: message || 'あのイーハトーヴォのすきとおった風、夏でも底に冷たさをもつ青いそら',
    });
  };

  return (
    <form className={styleForm} onSubmit={e => e.preventDefault()}>
      <div className={styleFormControl}>
        <select
          className={styleFormItem}
          style={{ padding: `5px ${gutter(1)}` }}
          value={theme}
          onChange={handleChangeTheme}
        >
          {['primary', 'danger'].map(label => (
            <option key={label} value={label}>
              {label}
            </option>
          ))}
        </select>
      </div>

      <div className={styleFormControl}>
        <input className={styleFormItem} list="icon-list" placeholder="アイコン" onChange={handleChangeIcon} />
        <datalist id="icon-list">
          {iconNames.map(iconName => (
            <option key={iconName} value={iconName}>
              {iconName}
            </option>
          ))}
        </datalist>
      </div>

      <div className={styleFormControl}>
        <input
          className={styleFormItem}
          value={message}
          onChange={handleInputMessage}
          placeholder="メッセージを入力してください"
        />
      </div>
      <button onClick={handleSubmit}>送信</button>
    </form>
  );
};

type Action =
  | {
      type: 'message';
      payload: Toast['message'];
    }
  | {
      type: 'icon';
      payload: Toast['icon'];
    }
  | {
      type: 'theme';
      payload: Toast['theme'];
    };

type State = Pick<Toast, 'message' | 'icon' | 'theme'>;

function reducer(state: State, action: Action) {
  return { ...state, ...{ [action.type]: action.payload } };
}

const styleForm = css`
  display: grid;
  grid-template-columns: auto auto 1fr auto;
  gap: ${gutter(2)};
  margin-top: ${gutter(4)};
`;

const styleFormItem = css`
  display: block;
  width: 100%;
  padding: ${gutter(1)};
  line-height: ${LineHeight.Regular};
`;

const styleFormControl = css`
  display: inline-flex;
  flex-direction: column;
  font-size: ${FontSize.Regular};

  > :not(:first-child) {
    margin-top: ${gutter(1)};
  }
`;
