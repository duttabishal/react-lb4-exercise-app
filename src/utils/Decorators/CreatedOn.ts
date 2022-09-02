export function CreatedOn<T extends { new (...arg: any[]): {} }>(
  originalConstructor: T
) {
  return class extends originalConstructor {
    createdOn;
    constructor(...args: any[]) {
      super(...args);
      this.createdOn = new Date();
    }
  };
}
