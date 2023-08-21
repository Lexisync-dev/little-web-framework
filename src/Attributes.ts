export class Attributes<R extends object> {
  constructor(private data: R) {}

  getAll = (): R => {
    return this.data;
  };

  get = <T extends keyof R>(key: T): R[T] => {
    return this.data[key];
  };

  set = (propUpdated: R): void => {
    Object.assign(this.data, propUpdated);
  };
}
