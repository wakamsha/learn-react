import { DocumentTitle } from '@learn-react/core/src/components/utils/DocumentTitle';
import { type FC } from 'react';
import { Template } from './template';

/**
 * The about page.
 */
export const Component: FC = () => (
  <>
    <DocumentTitle title="About React Router Contacts" />

    <Template />
  </>
);
