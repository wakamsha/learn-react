import { generatePath, NavLink, Outlet } from 'react-router-dom';
import { Router } from '../constants/Router';

export const Invoices = () => (
  <main>
    <h1>Invoices page</h1>
    <ul>
      {data.map(({ name, number }) => (
        <li key={number}>
          {/* Link と違い NavLink は style と className に `isActive` を引数に取る関数を渡せるようになる */}
          <NavLink
            to={generatePath(Router.Invoice, { id: `${number}` })}
            style={({ isActive }) => ({ color: isActive ? 'red' : 'inherit' })}
          >
            {name}
          </NavLink>
        </li>
      ))}
    </ul>
    <Outlet />
  </main>
);

const data = [
  {
    name: 'Mick Jagger',
    number: 1995,
    amount: '$10,800',
    due: '12/05/1995',
  },
  {
    name: 'Keith Richards',
    number: 2000,
    amount: '$8,000',
    due: '10/31/2000',
  },
  {
    name: 'Ronnie Wood',
    number: 2003,
    amount: '$9,500',
    due: '07/22/2003',
  },
  {
    name: 'Charlie Watts',
    number: 1997,
    amount: '$14,000',
    due: '09/01/1997',
  },
];
