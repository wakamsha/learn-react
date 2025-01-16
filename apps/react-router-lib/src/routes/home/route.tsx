import { DocumentTitle } from '@learn-react/core/src/components/utils/DocumentTitle';
import { type FC } from 'react';
import { Template } from './template';

/**
 * The Home page.
 */
export const Component: FC = () => (
  <>
    <DocumentTitle title="React Router Contacts" />

    <Template />
  </>
);
