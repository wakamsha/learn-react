import { About } from './Template';

/**
 * Sets the title of the page.
 */
export function meta() {
  return [
    {
      title: 'About | Address Book',
    },
  ];
}

/**
 * Renders the about page.
 */
export default () => <About />;
