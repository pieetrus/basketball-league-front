import axios, { AxiosResponse } from "axios";
import { IPlayer } from "../models/player";
import { history } from "../..";
import { toast } from "react-toastify";
import { IUser, IUserFormValues } from "../models/user";
import { IProfile, IPhoto } from "../models/profile";
import { ITeam } from "../models/team";
import { IDivision } from "../models/division";
import { IMatch } from "../models/match";
import { IMatchDetailed, IMatchDetailedSquads } from "../models/matchDetailed";
import { ISeason } from "../models/season";
import { ITeamSeason } from "../models/teamSeason";
import { IPlayerSeason } from "../models/playerSeason";
import { IShot } from "../models/shot";
import { IIncident } from "../models/incident";
import { IFoul } from "../models/foul";

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
  listSeason: (params: URLSearchParams): Promise<IPlayerSeason[]> =>
    axios
      .get("/playerseason", { params: params })
      .then(sleep(1000))
      .then(responseBody),
  details: (id: number): Promise<IPlayer> => request.get(`/player/${id}`),
  create: (player: IPlayer) => request.post("/player", player),
  createPlayerSeason: (player: IPlayer) =>
    request.post("/playerseason", player),
  update: (player: IPlayer) => request.put(`/player/${player.id}`, player),
  delete: (id: number) => request.del(`/player/${id}`),
  deletePlayerSeason: (id: number) => request.del(`/playerseason/${id}`),
};

const Teams = {
  list: (): Promise<ITeam[]> => request.get(`/team`),
  listSeason: (params: URLSearchParams): Promise<ITeam[]> =>
    axios
      .get("/teamSeason", { params: params })
      .then(sleep(1000))
      .then(responseBody),
  details: (id: number): Promise<ITeam> => request.get(`/team/${id}`),
  detailsSeason: (id: number): Promise<ITeam> =>
    request.get(`/teamseason/${id}`),
  create: (team: ITeam) => request.post("/team", team),
  createTeamSeason: (team: ITeamSeason) => request.post("/teamseason", team),
  update: (team: ITeam) => request.put(`/team/${team.id}`, team),
  updateTeamSeason: (team: ITeamSeason) =>
    request.put(`/teamseason/${team.id}`, team),
  delete: (id: number) => request.del(`/team/${id}`),
  deleteTeamSeason: (id: number) => request.del(`/teamseason/${id}`),
  uploadLogo: (photo: Blob, teamId: number): Promise<IPhoto> =>
    request.postForm(`photo/team/${teamId}`, photo),
};

const Divisions = {
  list: (): Promise<IDivision[]> => request.get(`/division`),
  details: (id: number): Promise<IDivision> => request.get(`/division/${id}`),
  create: (division: IDivision) => request.post("/division", division),
  update: (division: IDivision) =>
    request.put(`/division/${division.id}`, division),
  delete: (id: number) => request.del(`/division/${id}`),
};

const Seasons = {
  list: (): Promise<ISeason[]> => request.get(`/season`),
  details: (id: number): Promise<ISeason> => request.get(`/season/${id}`),
  create: (season: ISeason) => request.post("/season", season),
  update: (season: ISeason) => request.put(`/season/${season.id}`, season),
  delete: (id: number) => request.del(`/season/${id}`),
};

const Matches = {
  list: (): Promise<IMatch[]> => request.get(`/match`),
  listDetailed: (): Promise<IMatchDetailed[]> => request.get(`/match/detailed`),
  details: (id: number): Promise<IMatchDetailed> => request.get(`/match/${id}`),
  detailsDetailed: (id: number): Promise<IMatchDetailedSquads> =>
    request.get(`/match/detailed/${id}`),
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

const Incidents = {
  createShot: (shot: IShot) => request.post("/shot", shot),
  createFoul: (foul: IFoul) => request.post("/foul", foul),
  list: (matchId: number): Promise<IIncident[]> =>
    request.get("/incident?matchId=" + matchId),
  delete: (id: number) => request.del(`/incident/${id}`),

  // listDetailed: (): Promise<IMatchDetailed[]> => request.get(`/match/detailed`),
  // details: (id: number): Promise<IMatchDetailed> => request.get(`/match/${id}`),
  // detailsDetailed: (id: number): Promise<IMatchDetailedSquads> =>
  //   request.get(`/match/detailed/${id}`),
  // create: (match: IMatch) => request.post("/match", match),
  // update: (match: IMatch) => request.put(`/match/${match.id}`, match),
  // delete: (id: number) => request.del(`/match/${id}`),
};

export default {
  Players,
  Teams,
  User,
  Profiles,
  Divisions,
  Matches,
  Seasons,
  Incidents,
};
