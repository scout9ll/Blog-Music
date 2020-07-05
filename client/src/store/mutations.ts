import { State, Song, PlayState } from "./state";

export default {
  SET_CURRENT_SONG(state: State, payload: Song) {
    state.currentSong = { ...payload };
  },
  SET_PLAYSTATE(state: State, payload: PlayState) {
    state.playState = payload;
  },
  SET_SOUNDPUBLISHER(state: State, payload: any) {
    console.log(payload);
    state.soundPublisher = payload;
  },
  SET_PRESSED(state: State, payload: boolean) {
    state.pressed = payload;
  },
};

export enum MutationTypes {
  SET_CURRENT_SONG = "SET_CURRENT_SONG",
  SET_PLAYSTATE = "SET_PLAYSTATE",
  SET_PRESSED = "SET_PRESSED",
}
