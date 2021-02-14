// import { css } from '@emotion/css';
// import { observer } from 'mobx-react';
// import { Component } from 'react';
// import { JSONPlaceholderStore } from '../stores/JSONPlaceholderStore';

// type Props = {
//   store: JSONPlaceholderStore;
// };

// @observer
// export class Log extends Component<Props> {
//   public render() {
//     const { store } = this.props;
//     return (
//       <figure className={baseStyle}>
//         <pre>
//           <code>{JSON.stringify({ ...store.users }, null, 2)}</code>
//         </pre>
//       </figure>
//     );
//   }
// }

// const baseStyle = css({
//   margin: 0,
//   background: '#0f192a',
//   height: '100%',
//   '> pre': {
//     height: '100%',
//     margin: 0,
//     padding: 16,
//     overflow: 'auto',
//     color: '#d1edff',
//     '> code': {
//       lineHeight: 1.3,
//       fontFamily: 'source-code-pro,Menlo,Monaco,Consolas,Courier New,monospace',
//       fontSize: '0.65rem',
//     },
//   },
// });
