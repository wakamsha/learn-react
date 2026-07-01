// oxlint-disable vitest/no-hooks
import { act, renderHook } from '@testing-library/react';
import { useDebouncedState } from './useDebouncedValue';

describe(useDebouncedState, () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('初期値が即時値・デバウンス値の両方に反映される', () => {
    const { result } = renderHook(() => useDebouncedState('initial', 1000));

    const [value, debouncedValue] = result.current;

    expect(value).toBe('initial');
    expect(debouncedValue).toBe('initial');
  });

  it('即時値は setValue 直後に更新される', () => {
    const { result } = renderHook(() => useDebouncedState('initial', 1000));

    act(() => {
      result.current[2]('updated');
    });

    expect(result.current[0]).toBe('updated');
  });

  it('デバウンス値は delay 経過前は更新されない', () => {
    const { result } = renderHook(() => useDebouncedState('initial', 1000));

    act(() => {
      result.current[2]('updated');
    });

    act(() => {
      vi.advanceTimersByTime(999);
    });

    expect(result.current[1]).toBe('initial');
  });

  it('デバウンス値は delay 経過後に更新される', () => {
    const { result } = renderHook(() => useDebouncedState('initial', 1000));

    act(() => {
      result.current[2]('updated');
    });

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(result.current[1]).toBe('updated');
  });

  it('delay 内に連続更新した場合は最後の値のみが反映される', () => {
    const { result } = renderHook(() => useDebouncedState('initial', 1000));

    act(() => {
      result.current[2]('first');
    });

    act(() => {
      vi.advanceTimersByTime(500);
      result.current[2]('second');
    });

    act(() => {
      vi.advanceTimersByTime(500);
    });

    // 最初の更新から 1000ms 経過しているが、途中で再更新されたため未反映。
    expect(result.current[1]).toBe('initial');

    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(result.current[1]).toBe('second');
  });

  it('delay 未指定 ( 0 ) の場合はタイマー経過で即反映される', () => {
    const { result } = renderHook(() => useDebouncedState('initial'));

    act(() => {
      result.current[2]('updated');
    });

    act(() => {
      vi.advanceTimersByTime(0);
    });

    expect(result.current[1]).toBe('updated');
  });

  it('setValue に更新関数を渡せる', () => {
    const { result } = renderHook(() => useDebouncedState(0, 1000));

    act(() => {
      result.current[2]((prev) => prev + 1);
    });

    expect(result.current[0]).toBe(1);

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(result.current[1]).toBe(1);
  });
});
