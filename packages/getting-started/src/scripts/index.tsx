import * as React from 'react';
// import { HookApp } from './components/hooks/HookApp';
import { render } from 'react-dom';
// import { NumberList } from './components/NumberList';
import { Calculator } from './components/liftings/Calculator';
// import { WelcomeDialog } from './components/compositions/WelcomeDialog';
// import { SignUpDialog } from './components/compositions/SignupDialog';
// import { FilterableProductTable, PRODUCTS } from './components/thinking/FilterableProductTable';
// import { ContextApp } from './components/contexts/ContextApp';
// import { CommentList } from './components/hoc/CommentList';
// import { CustomTextInput } from './components/ref/CustomTextInput';
// import { NameForm } from './components/NameForm';
// import { FlavorForm } from './components/FlavorForm';
// import { Reservation } from './components/Reservation';
// import { Timer } from './components/Timer';
// import { MarkdownEditor } from './components/Markdowneditor';
// import { HelloMessage } from './components/HelloMessage';
// import { Todo } from './components/Todo';
// import { LoginControl } from './components/LoginControl';

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
  <Calculator />,
  // <WelcomeDialog />,
  // <SignUpDialog />,
  // <FilterableProductTable products={PRODUCTS} />,
  // <ContextApp />,
  // <CommentList />,
  // <CustomTextInput />,
  // <HookApp count={10} />,
  document.getElementById('app'),
);
