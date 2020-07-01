import axios from "./axios";

const url = "api/music/";
const header = {};

class MusicService {
  static getMusic() {
    return axios.get(url, { "Content-Type": "application/json" }).then((res) =>
      res.data.map((music) => ({
        ...music,
      }))
    );
  }
  static addMusic(data) {
    return axios.post(url, data, { "Content-Type": "application/json" });
  }
  static uploadMusic(data,onUploadProgress) {
    header["Content-Type"] = "multipart/form-data";
    return axios({
      method: "post",
      url: `${url}upload`,
      data: data,
      headers: header,
      onUploadProgress
    });
    // axios.post(`${url}upload`, data, header);
  }
  static delMusic(id) {
    return axios({
      method: "delete",
      url: `${url}${id}`,
      headers: header,
    });
  }
  static updateMusic(data) {
    header["content-type"] = "application/json";
    return axios({
      method: "PATCH",
      url: url,
      headers: header,
      data: JSON.stringify(data)
    });
  }
}
export default MusicService;
