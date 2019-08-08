import axios from "axios";

const url = "api/music/";
const header = {};
const token = window.localStorage.getItem("token");
class MusicService {
  static getMusic() {
    return axios.get(url, { "Content-Type": "application/json" }).then(res =>
      res.data.map(music => ({
        ...music
      }))
    );
  }
  static addMusic(data) {
    return axios.post(url, data, { "Content-Type": "application/json" });
  }
  static uploadMusic(data) {
    header["Authorization"] = token;
    header["Content-Type"] = "multipart/form-data";
    return axios({
      method: "post",
      url: `${url}upload`,
      data: data,
      headers: header
    });
    // axios.post(`${url}upload`, data, header);
  }
  static delMusic(id) {
    header["Authorization"] = token;
    return axios({
      method: "delete",
      url: `${url}${id}`,
      headers: header
    });
  }
}
export default MusicService;
