// import * as React from 'react';

// type State = {
//   data: string[] | string;
// };

// function withSubscription(WrappedComponent: any, selectData: () => any) {
//   return class extends React.Component<{}, State> {
//     constructor(props: {}) {
//       super(props);
//       this.state = {
//         data: selectData(),
//       };
//     }

//     public render() {
//       return <WrappedComponent data={this.state.data} {...this.props} />;
//     }
//   };
// }
