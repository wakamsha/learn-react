import { render } from 'react-dom';
import { SuspenseApp2 } from './xx-suspense2/App';

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
  // <ThemeApp />,
  <SuspenseApp2 />,
  document.getElementById('app'),
);
