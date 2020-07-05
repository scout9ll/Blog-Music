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
};
