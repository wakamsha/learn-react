import * as React from 'react';

export function Logger(inject: string, message: string) {
  // Wrap する React Component引数
  return (WrappedComponent: React.ComponentType<any>) =>
    class extends React.Component<{ inject: string }> {
      // 処理をフックする
      render() {
        console.log(message);
        // propsにinject属性追加
        return <WrappedComponent {...this.props} inject={inject} />;
      }
    };
}
