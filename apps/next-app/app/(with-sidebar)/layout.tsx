import { type FC, type ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

/**
 * The layout component.
 */
const Layout: FC<Props> = ({ children }) => <div id="wrapper">{children}</div>;

export default Layout;
