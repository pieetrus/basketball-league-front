import axios, { AxiosResponse } from "axios";
import { IPlayer } from "../models/player";

axios.defaults.baseURL = "http://localhost:5000/api";

const responseBody = (response: AxiosResponse) => response.data;

const sleep = (ms: number) => (response: AxiosResponse) =>
  new Promise<AxiosResponse>((resolve) =>
    setTimeout(() => resolve(response), ms)
  );

const request = {
  get: (url: string) => axios.get(url).then(sleep(1000)).then(responseBody),
  post: (url: string, body: {}) =>
    axios.post(url, body).then(sleep(1000)).then(responseBody),
  put: (url: string, body: {}) =>
    axios.put(url, body).then(sleep(1000)).then(responseBody),
  del: (url: string) => axios.delete(url).then(sleep(1000)).then(responseBody),
};

const Players = {
  list: (): Promise<IPlayer[]> => request.get("/player"),
  details: (id: number): Promise<IPlayer> => request.get(`/player/${id}`),
  create: (player: IPlayer) => request.post("/player", player),
  update: (player: IPlayer) => request.put(`/player/${player.id}`, player),
  delete: (id: number) => request.del(`/player/${id}`),
};

export default {
  Players,
};
