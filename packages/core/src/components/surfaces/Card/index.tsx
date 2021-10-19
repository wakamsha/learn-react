import { css, cx } from '@emotion/css';
import { ReactNode } from 'react';
import { Color, Duration, Easing, Shadow } from '../../../constants/Style';
import { gutter } from '../../../helpers/Style';

type ShadowType = 'neutral' | 'dialog' | 'floating' | 'deep';

type Props = Partial<{
  children: ReactNode;
  shadow: ShadowType;
  width: number | string;
  maxWidth: number | string;
  hover: boolean;
}>;

/**
 * @example
 * <Card>
 *   <Card.Header>
 *     <h1 className={styleTitle}>Title</h1>
 *   <Card.Header>
 *
 *   <Card.Body>
 *     <p>hello world!</p>
 *     <p>Goodbye world!</p>
 *   </Card.Body>
 *
 *   <Card.Footer>
 *     <Button>Submit</Button>
 *     <Button variant="ghost">Cancel</Button>
 *   </Card.Footer>
 * </Card>
 */
export const Card = ({ children, shadow = 'neutral', width, maxWidth, hover }: Props) => (
  <article className={cx(styleCard[shadow], hover && styleHover)} style={{ width, maxWidth }}>
    {children}
  </article>
);

const styleBase = css`
  display: grid;
  grid-template-areas:
    'header'
    'body'
    'footer';
  grid-template-rows: auto 1fr auto;
  min-height: 240px;
  overflow: hidden;
  background-color: ${Color.TexturePaper};
`;

const styleCard: Record<ShadowType, string> = {
  neutral: cx(
    styleBase,
    css`
      box-shadow: ${Shadow.Neutral};
    `,
  ),
  dialog: cx(
    styleBase,
    css`
      box-shadow: ${Shadow.Dialog};
    `,
  ),
  floating: cx(
    styleBase,
    css`
      box-shadow: ${Shadow.Floating};
    `,
  ),
  deep: cx(
    styleBase,
    css`
      box-shadow: ${Shadow.Deep};
    `,
  ),
};

const styleHover = css`
  transition: box-shadow ${Duration.Fade} ${Easing.Enter};

  &:hover {
    box-shadow: ${Shadow.Hover};
  }
`;

type Thickness = 'neutral' | 'small' | 'thin';

type HeaderProps = {
  children: ReactNode;

  /**
   * - neutral: padding 24px
   * - small: padding: 16px
   * - thin: padding 0
   *
   * @default 'neutral'
   */
  thickness?: Thickness;
};

/**
 * Card 用のヘッダーコンポーネント。
 *
 * @param {HeaderProps} headerProps
 *
 * @example
 * <Card>
 *   <Card.Header>
 *     <h1 className={styleTitle}>Title</h1>
 *   </Card.Header>
 *   ...
 * </Card>
 */
Card.Header = ({ children, thickness = 'neutral' }: HeaderProps) => (
  <header className={styleHeader[thickness]}>{children}</header>
);

const styleHeaderBase = css`
  display: flex;
  grid-area: header;
  align-items: center;
`;

const styleHeader: Record<Thickness, string> = {
  neutral: cx(
    styleHeaderBase,
    css`
      padding: ${gutter(6)};
    `,
  ),
  small: cx(
    styleHeaderBase,
    css`
      padding: ${gutter(2)} ${gutter(4)};
    `,
  ),
  thin: styleHeaderBase,
};

type BodyProps = {
  children: ReactNode;

  /**
   * - neutral: padding 24px
   * - small: padding: 16px
   * - thin: padding 0
   *
   * @default 'neutral'
   */
  thickness?: Thickness;
};

/**
 * Card 用のボディコンポーネント。
 *
 * @param {BodyProps}} bodyProps
 *
 * @example
 * <Card>
 *   ...
 *   <Card.Body>
 *     <p>hello world!</p>
 *     <p>Goodbye world!</p>
 *   </Card.Body>
 *   ...
 * </Card>
 */
Card.Body = ({ children, thickness = 'neutral' }: BodyProps) => <div className={styleBody[thickness]}>{children}</div>;

const styleBodyBase = css`
  grid-area: body;
  overflow: auto;
`;

const styleBody: Record<Thickness, string> = {
  neutral: cx(
    styleBodyBase,
    css`
      padding: 0 ${gutter(6)};
    `,
  ),
  small: cx(
    styleBodyBase,
    css`
      padding: 0 ${gutter(4)};
    `,
  ),
  thin: styleBodyBase,
};

type FooterProps = {
  children: ReactNode;

  /**
   * - neutral: padding 24px
   * - small: padding: 16px
   * - thin: padding 0
   *
   * @default 'neutral'
   */
  thickness?: Thickness;
};

/**
 * Card 用のフッターコンポーネント。
 *
 * @param {FooterProps}} footerProps
 *
 * @example
 * <Card>
 *   ...
 *   <Card.Footer>
 *     <Button>Submit</Button>
 *     <Button variant="ghost">Cancel</Button>
 *   </Card.Footer>
 * </Card>
 */
Card.Footer = ({ children, thickness = 'neutral' }: FooterProps) => (
  <footer className={styleFooter[thickness]}>{children}</footer>
);

const styleFooterBase = css`
  display: flex;
  grid-area: footer;
  gap: ${gutter(8)};
  align-items: center;
  justify-content: flex-end;
`;

const styleFooter: Record<Thickness, string> = {
  neutral: cx(
    styleFooterBase,
    css`
      padding: ${gutter(6)};
    `,
  ),
  small: cx(
    styleFooterBase,
    css`
      padding: ${gutter(4)};
    `,
  ),
  thin: styleFooterBase,
};
