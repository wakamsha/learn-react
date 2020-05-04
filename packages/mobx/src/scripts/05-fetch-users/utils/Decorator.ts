/* eslint-disable prefer-rest-params */
/* eslint-disable no-prototype-builtins */
/* eslint-disable no-param-reassign */
/* eslint-disable func-names */
/* eslint-disable no-underscore-dangle */
import { flow as flowOrigin } from 'mobx';

export type TransactionStatus = 'Idling' | 'Running' | 'Error' | 'Success';

export function transaction<T extends string>(name: T) {
  function decorate(fn: Function) {
    return flowOrigin(function* (this: any) {
      this.setState({
        [name]: 'Running',
      });
      try {
        yield* fn.apply(this, arguments);

        !this._unmount &&
          this.setState({
            [name]: 'Success',
          });
      } catch (e) {
        console.error(`@transaction`, e);
      }
      !this._unmount &&
        this.setState({
          [name]: 'Error',
        });
    });
  }

  return function (
    target: { state: { [name in T]: TransactionStatus } },
    propKey: string,
    descriptor: PropertyDescriptor,
  ) {
    let fn = decorate(descriptor.value);
    let definingProperty = false;
    return {
      get() {
        if (
          definingProperty ||
          this === (target as any).prototype ||
          this.hasOwnProperty(propKey) ||
          typeof fn !== 'function'
        ) {
          return fn;
        }
        const unmount = (this as any).componentWillUnmount;
        if (!unmount || !unmount._transaction) {
          const cb = function (this: any) {
            this._unmount = true;
            unmount && unmount.call(this);
          }.bind(this);
          cb._transaction = true;
          (this as any).componentWillUnmount = cb;
        }
        const boundFn = fn.bind(this);
        definingProperty = true;
        Object.defineProperty(this, propKey, {
          configurable: true,
          get() {
            return boundFn;
          },
          set(value) {
            fn = decorate(value);
            delete this[propKey];
          },
        });
        definingProperty = false;
        return boundFn;
      },
      set(value: any) {
        fn = decorate(value);
      },
    };
  };
}

export function flow(_target: any, _propKey: string, descriptor: PropertyDescriptor) {
  const origin = descriptor.value;
  descriptor.value = flowOrigin(origin);
}
