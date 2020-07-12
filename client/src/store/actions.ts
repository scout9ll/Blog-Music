import { ActionContext } from "vuex";
import { State, Song, PlayState } from "./state";
import { MutationTypes } from "./mutations";
import * as musicService from "../api/musicService";
export default {
  handlePress(
    { state, commit, dispatch }: ActionContext<State, State>,
    payload: Song
  ) {
    if (!state.soundPublisher) return;
    if (!state.pressed) commit(MutationTypes.SET_PRESSED, payload);
    // toggle play state when same song ,otherwise play new song
    const isSameSong = payload._id == state.currentSong._id;
    if (isSameSong) {
      switch (state.playState) {
        case PlayState.paused:
          dispatch("playSong");
          break;
        case PlayState.resumed:
        default:
          dispatch("pauseSong");
          break;
      }
    } else {
      commit(MutationTypes.SET_CURRENT_SONG, payload);
    }
  },
  playSong({ state, commit }: ActionContext<State, State>) {
    if (!state.soundPublisher) return;
    state.soundPublisher.play().then(() => {
      commit(MutationTypes.SET_PLAYSTATE, PlayState.resumed);
    });
  },
  pauseSong({ state, commit }: ActionContext<State, State>) {
    if (!state.soundPublisher) return;
    state.soundPublisher.pause();
    commit(MutationTypes.SET_PLAYSTATE, PlayState.paused);
  },
};
