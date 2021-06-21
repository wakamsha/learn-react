import { MouseEvent } from 'react';

export const Bubbling = () => {
  const handleClickOuter = (e: MouseEvent<HTMLDivElement>) => {
    console.info('outer', e);
  };

  const handleClickInner = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    console.info('inner', e);
  };

  const handleClickLabel = (e: MouseEvent<HTMLLabelElement>) => e.stopPropagation();

  return (
    <div
      role="button"
      style={{
        padding: 24,
        background: 'pink',
      }}
      onClick={handleClickOuter}
    >
      <p>Outer</p>
      <button onClick={handleClickInner}>Inner</button>
      <label onClick={handleClickLabel}>
        <input type="checkbox" />
        Inner 2
      </label>
    </div>
  );
};
