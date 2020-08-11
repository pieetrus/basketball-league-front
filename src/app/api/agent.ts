import axios, { AxiosResponse } from "axios";
import { IPlayer } from "../models/player";
import { history } from "../..";
import { toast } from "react-toastify";
import { IUser, IUserFormValues } from "../models/user";
import { IProfile, IPhoto } from "../models/profile";
import { ITeam } from "../models/team";
import { IDivision } from "../models/division";
import { IMatch } from "../models/match";
import { IMatchDetailed } from "../models/matchDetailed";

axios.defaults.baseURL = "http://localhost:5000/api";

axios.interceptors.request.use(
  (config) => {
    const token = window.localStorage.getItem("jwt");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(undefined, (error) => {
  if (error.message === "Network Error" && !error.response) {
    toast.error("Network error - make sure API is running");
  }

  const { status, data, config } = error.response;

  if (status === 404) {
    history.push("/notfound");
  }
  if (
    status === 400 &&
    config.method === "get" &&
    data.errors.hasOwnPreoperty("id")
  ) {
    history.push("notfound");
  }
  if (status === 500) {
    toast.error("Server error - check the terimnal for more info!");
  }
  throw error.response;
});

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
  postForm: (url: string, file: Blob) => {
    let formData = new FormData();
    formData.append("File", file);
    return axios
      .post(url, formData, {
        headers: { "Content-type": "multipart/form-data" },
      })
      .then(responseBody);
  },
};

const Players = {
  list: (params: URLSearchParams): Promise<IPlayer[]> =>
    axios
      .get("/player", { params: params })
      .then(sleep(1000))
      .then(responseBody),
  details: (id: number): Promise<IPlayer> => request.get(`/player/${id}`),
  create: (player: IPlayer) => request.post("/player", player),
  update: (player: IPlayer) => request.put(`/player/${player.id}`, player),
  delete: (id: number) => request.del(`/player/${id}`),
};

const Teams = {
  list: (): Promise<ITeam[]> => request.get(`/team`),
  details: (id: number): Promise<ITeam> => request.get(`/team/${id}`),
  create: (team: ITeam) => request.post("/team", team),
  update: (team: ITeam) => request.put(`/team/${team.id}`, team),
  delete: (id: number) => request.del(`/team/${id}`),
};

const Divisions = {
  list: (): Promise<IDivision[]> => request.get(`/division`),
  details: (id: number): Promise<IDivision> => request.get(`/division/${id}`),
  create: (division: IDivision) => request.post("/division", division),
  update: (division: IDivision) =>
    request.put(`/division/${division.id}`, division),
  delete: (id: number) => request.del(`/division/${id}`),
};

const Matches = {
  list: (): Promise<IMatch[]> => request.get(`/match`),
  listDetailed: (): Promise<IMatchDetailed[]> => request.get(`/match/detailed`),
  details: (id: number): Promise<IMatchDetailed> => request.get(`/match/${id}`),
  create: (match: IMatch) => request.post("/match", match),
  update: (match: IMatch) => request.put(`/match/${match.id}`, match),
  delete: (id: number) => request.del(`/match/${id}`),
};

const User = {
  current: (): Promise<IUser> => request.get("/user"),
  login: (user: IUserFormValues): Promise<IUser> =>
    request.post("/user/login", user),
  register: (user: IUserFormValues): Promise<IUser> =>
    request.post("/user/register", user),
};

const Profiles = {
  get: (username: string): Promise<IProfile> =>
    request.get(`/profile/${username}`),
  uploadPhoto: (photo: Blob): Promise<IPhoto> =>
    request.postForm(`photo`, photo),
  setMainPhoto: (id: string) => request.post(`/photo/${id}/setMain`, {}),
  deletePhoto: (id: string) => request.del(`/photo/${id}`),
};

export default {
  Players,
  Teams,
  User,
  Profiles,
  Divisions,
  Matches,
};
