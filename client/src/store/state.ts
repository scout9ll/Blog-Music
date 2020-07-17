import SoundPublisher from "../helper/visualPlayer/soundsPublisher.js";

export interface Song {
  _id: string;
  name: string;
  songImage: string;
  songUrl: string;
}
export enum PlayState {
  paused,
  resumed,
}
// export type playState = boolean

export interface State {
  currentSong: Song;
  songList: Song[];
  playState: PlayState;
  soundPublisher?: SoundPublisher;
  pressed: boolean;
  isAuthenticated: boolean;
  showList: boolean;
  showEditor: boolean;
  editingSong: Song;
  showUploader: boolean;
}

export const state: State = {
  currentSong: {
    _id: "",
    songImage: "",
    name: "",
    songUrl: "",
  },
  songList: [],
  playState: PlayState.paused,
  pressed: false,
  isAuthenticated: true,
  showList: false,
  showEditor: false,
  editingSong: {
    _id: "",
    songImage: "",
    name: "",
    songUrl: "",
  },
  showUploader: false,
};
