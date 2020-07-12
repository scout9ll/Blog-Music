import SoundPublisher from "../visualPlayer/soundsPublisher.js";

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
  playState: PlayState;
  soundPublisher?: SoundPublisher;
  pressed: boolean;
  isAuthenticated: boolean;
  showEditor: boolean;
  editingSong: Song;
}

export const state: State = {
  currentSong: {
    _id: "",
    songImage: "",
    name: "",
    songUrl: "",
  },
  playState: PlayState.paused,
  pressed: false,
  isAuthenticated: true,
  showEditor: false,
  editingSong: {
    _id: "",
    songImage: "",
    name: "",
    songUrl: "",
  },
};
