// oxlint-disable vitest/no-hooks
import { act, renderHook } from '@testing-library/react';

import { useDebouncedCallback } from './useDebouncedCallback';

describe(useDebouncedCallback, () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('delay 経過前はコールバックが実行されない', () => {
    const callback = vi.fn<(...args: unknown[]) => void>();
    const { result } = renderHook(() => useDebouncedCallback(callback, 1000));

    act(() => {
      result.current();
    });

    act(() => {
      vi.advanceTimersByTime(999);
    });

    expect(callback).not.toHaveBeenCalled();
  });

  it('delay 経過後にコールバックが実行される', () => {
    const callback = vi.fn<(...args: unknown[]) => void>();
    const { result } = renderHook(() => useDebouncedCallback(callback, 1000));

    act(() => {
      result.current();
    });

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(callback).toHaveBeenCalledOnce();
  });

  it('引数がコールバックへ渡される', () => {
    const callback = vi.fn<(...args: unknown[]) => void>();
    const { result } = renderHook(() => useDebouncedCallback(callback, 1000));

    act(() => {
      result.current('foo', 42);
    });

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(callback).toHaveBeenCalledWith('foo', 42);
  });

  it('delay 内の連続呼び出しは最後の 1 回だけ実行される', () => {
    const callback = vi.fn<(...args: unknown[]) => void>();
    const { result } = renderHook(() => useDebouncedCallback(callback, 1000));

    act(() => {
      result.current('first');
      vi.advanceTimersByTime(500);
      result.current('second');
      vi.advanceTimersByTime(500);
    });

    // 直近の呼び出しから 1000ms 経過していないため未実行。
    expect(callback).not.toHaveBeenCalled();

    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(callback).toHaveBeenCalledExactlyOnceWith('second');
  });

  it('実行時点で最新のコールバックが呼ばれる', () => {
    const first = vi.fn<() => void>();
    const second = vi.fn<() => void>();
    const { result, rerender } = renderHook(({ cb }) => useDebouncedCallback(cb, 1000), {
      initialProps: { cb: first },
    });

    act(() => {
      result.current();
    });

    rerender({ cb: second });

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(first).not.toHaveBeenCalled();
    expect(second).toHaveBeenCalledOnce();
  });

  it('アンマウント時に保留中のタイマーが破棄される', () => {
    const callback = vi.fn<() => void>();
    const { result, unmount } = renderHook(() => useDebouncedCallback(callback, 1000));

    act(() => {
      result.current();
    });

    unmount();

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(callback).not.toHaveBeenCalled();
  });
});
