import React, { Component, ComponentType } from 'react';

export function Logger(inject: string, message: string) {
  // Wrap する React Component引数
  return (WrappedComponent: ComponentType<any>) =>
    // eslint-disable-next-line react/prefer-stateless-function
    class extends Component<{ inject: string }> {
      // 処理をフックする
      render() {
        console.info(message);
        // propsにinject属性追加
        return <WrappedComponent {...this.props} inject={inject} />;
      }
    };
}
