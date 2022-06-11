import { createRoot } from 'react-dom/client';
import { SuspenseApp2 } from './xx-suspense2/App';

const root = createRoot(document.getElementById('app') as HTMLElement);

root.render(
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
);
