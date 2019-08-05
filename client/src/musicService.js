import axios from "axios";

const url = "api/music/";

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
    return axios.post(`${url}upload`, data, {
      "Content-Type": "multipart/form-data"
    });
  }
  static delMusic(id) {
    return axios.delete(`${url}${id}`);
  }
}
export default MusicService;
