/* eslint-disable func-names */
/* eslint-disable no-param-reassign */
/**
 * 関数デコレータ
 * @param target 対象クラスの prototype
 * @param propKey 対象となるメソッド名
 * @param descriptor value: メソッドそのもの, writable: 上書きできるかどうか
 */
export function outputLog(target: any, propKey: string, descriptor: PropertyDescriptor) {
  const origin = descriptor.value;
  descriptor.value = function () {
    const key = `${target.constructor.name}#${propKey}`;
    console.info(`${key}: start`);
    console.time(key);
    // eslint-disable-next-line prefer-rest-params
    const ret = Reflect.apply(origin, this, arguments);
    if (ret) {
      return ret.then((ret: any) => {
        console.timeEnd(key);
        return ret;
      });
    }
    console.timeEnd(key);
    return ret;
  };
}

export function classDecorator<T extends { new (...args: any[]): {} }>(target: T) {
  return class extends target {
    newProperty = 'new property';
    hello = 'override';
    constructor(...args: any[]) {
      super(...args);
      console.info('from class デコレータ');
    }
  };
}
