/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable func-names */
/* eslint-disable no-param-reassign */

/**
 * 関数デコレータ
 *
 * @param target - 対象クラスの prototype
 *
 * @param propKey - 対象となるメソッド名
 *
 * @param descriptor - value: メソッドそのもの, writable: 上書きできるかどうか
 */
export function outputLog(target: any, propKey: string, descriptor: PropertyDescriptor) {
  const origin = descriptor.value;
  descriptor.value = function () {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
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

/**
 * Class Component 用デコレーター
 *
 * @param target - デコレート対象となるクラスコンポーネント
 */
export function classDecorator<T extends new (...args: any[]) => Record<string, unknown>>(target: T) {
  return class extends target {
    newProperty = 'new property';
    hello = 'override';
    constructor(...args: any[]) {
      super(...args);
      console.info('from class デコレータ');
    }
  };
}
