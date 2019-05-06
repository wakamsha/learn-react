import { flow as flowOrigin } from 'mobx';

export function flow(_target: any, _propKey: string, descriptor: PropertyDescriptor) {
  const origin = descriptor.value;
  descriptor.value = flowOrigin(origin);
}
