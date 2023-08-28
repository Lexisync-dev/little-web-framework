// what if we want to fetch all the users from the api and we dont want to identifiy the id for the user

// heres the new solution

import axios, { AxiosResponse } from "axios";
import { Eeventing } from "./Eventing";

export class Collection<T, R> {
  models: T[] = [];
  events: Eeventing = new Eeventing();

  constructor(public rootUrl: string, public decerailize: (json: R) => T) {}

  get on() {
    return this.events.On;
  }

  get trigger() {
    return this.events.trigger;
  }

  fetch(): void {
    axios.get(this.rootUrl).then((res: AxiosResponse) => {
      res.data.forEach((value: R) => {
        this.models.push(this.decerailize(value));
      });
      this.trigger("change");
    });
  }
}
