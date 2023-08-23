import { AxiosPromise, AxiosResponse } from "axios";
import { promiseId } from "./Sync";

interface ModelAttributes<R> {
  get<T extends keyof R>(key: T): R[T];
  set(props: R): void;
  getAll(): R;
}

interface Sync<T extends promiseId> {
  fetch(id: string): AxiosPromise;
  save(data: T): AxiosPromise;
}

interface Events {
  On(eventName: string, callBack: () => void): void;
  trigger(eventName: string): void;
}

export interface hasId {
  id?: string;
}
export class Model<T extends hasId> {
  constructor(
    private attributes: ModelAttributes<T>,
    private events: Events,
    private sync: Sync<T>
  ) {}

  get on() {
    return this.events.On;
  }

  get trigger() {
    return this.events.trigger;
  }

  get get() {
    return this.attributes.get;
  }

  set(propUpdated: T): void {
    this.attributes.set(propUpdated);
    this.events.trigger("change");
  }

  fetch = (): void => {
    const id = this.get("id");

    if (typeof id !== "number") {
      throw new Error("Can't fetch with out id");
    }

    this.sync.fetch(id).then((res: AxiosResponse) => {
      this.set(res.data);
    });
  };

  save = (): void => {
    this.sync
      .save(this.attributes.getAll())
      .then((res: AxiosResponse) => {
        this.trigger("save");
      })
      .catch(() => {
        this.trigger("error");
      });
  };
}
