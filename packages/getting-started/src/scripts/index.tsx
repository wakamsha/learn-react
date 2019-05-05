import * as React from 'react';
import { ContextApp } from './a1-context/App';
import { render } from 'react-dom';

render(
  // <HelloMessage name="wakamsha" />,
  // <Timer />,
  // <Todo />,
  // <MarkdownEditor />,
  // <LoginControl />,
  // <NumberList numbers={[1, 2, 3, 4, 5]} />,
  // <NameForm />,
  // <FlavorForm />,
  // <Reservation />,
  // <Calculator />,
  // <WelcomeDialog />,
  // <SignUpDialog />,
  // <FilterableProductTable products={PRODUCTS} />,
  <ContextApp />,
  // <CommentList />,
  // <CustomTextInput />,
  // <HookApp count={10} />,
  document.getElementById('app'),
);
