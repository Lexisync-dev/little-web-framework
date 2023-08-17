export type Callback = () => void;

// event listender on the element
export class Eeventing {
  events: { [key: string]: Callback[] } = {};
  On = (eventName: string, callBack: Callback): void => {
    const handler = this.events[eventName] || [];
    handler.push(callBack);
    this.events[eventName] = handler;
  };

  trigger = (eventName: string): void => {
    const handler = this.events[eventName];

    if (!handler || handler.length === 0) {
      return;
    }

    handler.forEach((callback: Callback) => {
      callback();
    });
  };
}
