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
  SET_SHOW_EDITOR(state: State, payload: boolean) {
    state.showEditor = payload;
  },
  SET_EDITING_SONG(state: State, payload: Song) {
    state.editingSong = { ...payload };
  },
};

export enum MutationTypes {
  SET_CURRENT_SONG = "SET_CURRENT_SONG",
  SET_PLAYSTATE = "SET_PLAYSTATE",
  SET_PRESSED = "SET_PRESSED",
  SET_SHOW_EDITOR = "SET_SHOW_EDITOR",
  SET_EDITING_SONG = "SET_EDITING_SONG",
}
