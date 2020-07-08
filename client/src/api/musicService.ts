import axios from "./axios";
import { Song } from "../store/state";
const header = {};

export const getSongList = async () => {
  return axios({
    url: "/",
    method: "GET",
  });
};

export const upLoadSong = async (data: any, onUploadProgress: any) => {
  return axios({
    url: "/",
    method: "POST",
    data: data,
    onUploadProgress,
  });
};

export const delSong = (id: string) => {
  return axios({
    method: "DELETE",
    url: `/${id}`,
    headers: header,
  });
};
export const updateSong = (data: any) => {
  return axios({
    method: "PATCH",
    url: '/',
    headers: header,
    data:data,
  });
};
