import axios, { AxiosPromise } from "axios";

export interface promiseId {
  id?: string;
}

export class Sync<T extends promiseId> {
  constructor(public rootURL: string) {}

  fetch(id: string): AxiosPromise {
    return axios.get(`${this.rootURL}/${id}`);
  }

  save(data: T): AxiosPromise {
    const { id } = data;

    if (id) {
      return axios.put(`${this.rootURL}/${id}`, {
        ...data,
      });
    } else {
      return axios.post(`${this.rootURL}`, { ...data });
    }
  }
}
