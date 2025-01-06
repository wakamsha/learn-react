import { type Metadata } from 'next';
import { About } from './Template';

/**
 * Sets the title of the page.
 */
export const metadata: Metadata = {
  title: 'About | Address Book',
};

/**
 * Renders the about page.
 */
export default () => <About />;
