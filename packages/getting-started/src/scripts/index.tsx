import * as React from 'react';
import { Asyncable } from './xx-custom-hook/App';
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
  // <ContextApp />,
  // <HOCExample />,
  // <CustomTextInput />,
  // <HookApp count={10} />,
  // <EqualApp />,
  // <Bubbling />,
  <Asyncable />,
  document.getElementById('app'),
);
