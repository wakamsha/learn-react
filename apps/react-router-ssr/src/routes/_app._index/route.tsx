import { Template } from './Template';

/**
 * Sets the title of the page.
 */
export function meta() {
  return [
    {
      title: 'Address Book | React Router Tutorial',
    },
  ];
}

/**
 * Renders the home page.
 */
export default () => <Template />;
