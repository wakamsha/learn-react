/**
 * @file
 * story のプレビュー用エントリポイント。
 * catalog アプリ内の `iframe` からの読み込みを前提としていますが、
 * URL `/preview.html?storyId=foo_bar_baz` にアクセスすることでプレビューのみの表示も可能です。
 */

import { applyGlobalStyle, applyResetStyle } from '@learn-react/core/src/helpers/Style';
import { createRoot } from 'react-dom/client';
import { Preview } from './components/Preview';

applyResetStyle();

applyGlobalStyle();

const root = createRoot(document.querySelector('#preview') as HTMLElement);
root.render(<Preview />);
