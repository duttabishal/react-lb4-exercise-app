export function ModifiedOn<T extends { new (...arg: any[]): {} }>(
  originalConstructor: T
) {
  return class extends originalConstructor {
    modifiedOn;
    constructor(...args: any[]) {
      super(...args);
      this.modifiedOn = new Date();
    }
  };
}

export function updateModifiedOn(target: any, propertyName: string | symbol) {
  console.log("target ", target);
  console.log("propertyName ", propertyName);
  Object.defineProperty(target, propertyName, {
    set(this: any, newValue: any) {
      console.log("Executed Setter", this, newValue);
      this[propertyName] = newValue;
      this.modifiedOn = new Date();
    },
    get(this: any) {
      return this[propertyName];
    },
  });
  console.log("target after => ", target);
}
