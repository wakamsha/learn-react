import { css } from '@emotion/css';
import { Icon } from '@learn-react/core/src/components/dataDisplay/Icon';
import { TextField } from '@learn-react/core/src/components/inputs/TextField';
import { BorderRadius, Duration, FontFamily, FontSize, IconSize } from '@learn-react/core/src/constants/Style';
import { cssVar, gutter, square } from '@learn-react/core/src/helpers/Style';
import { useEffect, useMemo, useRef, useState, type FC, type RefObject } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { stories } from '../../constants/Stories';
import Logo from './logo192.png';

/**
 * Catalog の各ストーリーリンクを列挙します。
 * キーワードを入力することでリンク一覧を絞り込むことができます。
 */
export const Navigation = () => {
  const [keyword, setKeyword] = useState('');

  const query = useMemo(() => {
    const pattern = keyword.replaceAll(/[$()*+./?[\\]^{|}]/g, (replace) => `\\${replace}`).trim();

    return new RegExp(pattern, 'i');
  }, [keyword]);

  const bodyRef = useRef<HTMLElement>(null);

  useAdjustScroll(bodyRef);

  return (
    <div role="complementary" className={styleBase}>
      <header className={styleMasthead}>
        <img src={Logo as string} alt="React Logo" className={styleLogo} />
        <h1 className={styleTitle}>
          <Link to="/">Catalog | Learn React</Link>
        </h1>
      </header>

      <div role="form" className={styleForm}>
        <TextField
          clearable
          autoFocus
          name="search"
          type="search"
          icon="search"
          placeholder="Search..."
          value={keyword}
          onChange={setKeyword}
        />
      </div>

      <nav ref={bodyRef} className={styleBody}>
        {Object.entries(stories).map(([subPackageKey, subPackage]) => (
          <ul key={subPackageKey} className={styleNavigation} role="tree">
            <li>
              <div className={styleCaptionSubPackage}>@learn-react/{subPackageKey}</div>
              <Tree basePath={`/${subPackageKey}`} value={subPackage} query={query} />
            </li>
          </ul>
        ))}
      </nav>
    </div>
  );
};

/**
 * URL 遷移時にコンテナ要素のスクロールを調整し、アクティブとなっているナビゲーションリンクをビューポート内に収めます。
 *
 * 一覧の下の方にあるリンクはハードリロード時にビューポート外に追いやられてしまうことによるユーザビリティ低下の防止が期待できます。
 *
 * @param containerRef - スクロール操作するコンテナ要素
 */
function useAdjustScroll(containerRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const target = container.querySelector(`[aria-selected="true"]`);
    if (!target) return;

    const containerOffsetTop = container.getBoundingClientRect().top;
    const containerHeight = container.offsetHeight;
    const targetOffsetTop = target.getBoundingClientRect().top;
    const targetHeight = (target as HTMLElement).offsetHeight;

    if (targetOffsetTop + targetHeight >= containerOffsetTop + containerHeight) {
      container.scrollTo({
        top: targetOffsetTop - containerHeight + containerHeight / 2,
      });
    }
  }, [containerRef]);
}

const styleBase = css`
  display: grid;
  flex-shrink: 0;
  grid-template-rows: auto auto 1fr;
  height: 100%;
  overflow-y: auto;
  background-color: ${cssVar('TextureBody')};
`;

const styleMasthead = css`
  display: grid;
  gap: ${gutter(2)};
  padding: ${gutter(2)} ${gutter(4)} 0;
`;

const styleLogo = css`
  display: block;
  padding: ${gutter(1)};
  margin: auto;
  background-color: ${cssVar('ThemePrimaryDarker')};
  border-radius: ${BorderRadius.Circle};
  ${square(32)}
`;

const styleTitle = css`
  margin: 0;
  text-align: center;
  border-radius: ${BorderRadius.Small};
  transition:
    background-color ${Duration.Fade},
    border-color ${Duration.Fade};

  &:hover {
    background-color: ${cssVar('ThemePrimaryLight')};
  }

  > a {
    display: block;
    padding: ${gutter(1)};
    font-size: ${FontSize.Medium};
    background-image: linear-gradient(-125deg, #0af, #0080ff, #f0f);
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

const styleForm = css`
  padding: 0 ${gutter(4)};
  margin-top: ${gutter(4)};
`;

const styleBody = css`
  flex-grow: 1;
  padding: ${gutter(4)} ${gutter(4)} ${gutter(20)};
  overflow-y: auto;

  > :not(:first-child) {
    margin-top: ${gutter(4)};
  }
`;

const styleNavigation = css`
  padding: 0;
  margin: 0;
  font-size: ${FontSize.Regular};
  list-style: none;

  > :not(:first-child) {
    margin-top: ${gutter(8)};
  }
`;

const styleCaptionSubPackage = css`
  display: flex;
  align-items: center;
  margin: 0 0 ${gutter(4)};
  font-weight: bold;
  color: ${cssVar('TextSub')};
  text-transform: uppercase;
  letter-spacing: 1px;
  white-space: nowrap;

  &::after {
    flex: 1 0 auto;
    height: 1px;
    margin-left: ${gutter(2)};
    content: '';
    background-color: ${cssVar('LineNeutral')};
  }
`;

type TreeProps = {
  // oxlint-disable-next-line @typescript-eslint/consistent-indexed-object-style
  value: Record<string, { [key: string]: ValueOf<TreeProps['value']> }> | { Component: FC; sourceCode: string };
  basePath: string;
  query: RegExp;
  nestLevel?: number;
};

const Tree = ({ value, basePath, query, nestLevel = 1 }: TreeProps) => {
  const location = useLocation();

  const offset = 16 * nestLevel;

  return (
    <ul role="tree">
      {Object.entries(value).map(([key, subValue]: [string, TreeProps['value']]) => {
        const path = `${basePath}__${key}`;

        if (subValue.sourceCode) {
          return query.test(path) ? (
            <li key={key}>
              <Link
                to={path}
                className={styleLink}
                style={{ paddingLeft: offset + 2 }}
                aria-selected={path === location.pathname}
              >
                {key}
              </Link>
            </li>
          ) : null;
        }

        return (
          <li key={key}>
            <div
              className={styleTreeCaption}
              style={{ paddingLeft: offset }}
              aria-disabled={
                Object.keys(subValue).filter((subKey) => subKey.match(query)).length === 0 && !query.test(key)
              }
            >
              <Icon name="folder" />
              {key}
            </div>
            <Tree basePath={path} value={subValue} query={query} nestLevel={nestLevel + 1} />
          </li>
        );
      })}
    </ul>
  );
};

const styleTreeCaption = css`
  display: flex;
  gap: ${gutter(1)};
  align-items: center;
  margin: ${gutter(2)} 0;
  font-weight: bold;
  color: ${cssVar('TextSub')};

  &[aria-disabled='true'] {
    opacity: 0.32;
  }

  > svg {
    fill: ${cssVar('TextSub')};
    ${square(IconSize.Tiny)}
  }
`;

const styleLink = css`
  display: block;
  padding: ${gutter(1)} 0;
  font-family: ${FontFamily.Monospace};
  font-size: ${FontSize.Small};
  color: ${cssVar('TextNeutral')};

  &[aria-selected='true'] {
    font-weight: bold;
    color: ${cssVar('ThemeDangerNeutral')};
    pointer-events: none;
  }
`;
