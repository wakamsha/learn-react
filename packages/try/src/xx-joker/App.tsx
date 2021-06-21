import { css } from '@emotion/css';

export const JokerApp = () => {
  const handleDoubleClick = () => {
    console.info('double click');
  };

  const handleMouseDown = () => {
    console.info('mouse down');
  };

  const handleMouseUp = () => {
    console.info('mouse up');
  };

  return (
    <div
      role="button"
      className={styleBase}
      onDoubleClick={handleDoubleClick}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      Click Me!
    </div>
  );
};

const styleBase = css`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 400px;
  height: 400px;
  text-align: center;
  user-select: none;
  background-color: gray;
`;
