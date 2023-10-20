import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchSongs, createSong, updateSong, deleteSong } from '../../api/songs'

interface Song {
  id: string;
  title: string;
  artist: string;
  album: string;
  genre: string;
}

interface SongsState {
  loading: boolean;
  error: string | null;
  songs: Song[];
}

const initialState: SongsState = {
  loading: false,
  error: null,
  songs: [],
};

const songsSlice = createSlice({
  name: 'songs',
  initialState,
  reducers: {
    fetchSongsStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchSongsSuccess(state, action: PayloadAction<Song[]>) {
      state.loading = false;
      state.error = null;
      state.songs = action.payload;
    },
    fetchSongsFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    createSongStart(state) {
      state.loading = true;
      state.error = null;
    },
    createSongSuccess(state, action: PayloadAction<Song>) {
      state.loading = false;
      state.error = null;
      state.songs.push(action.payload);
    },
    createSongFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    updateSongStart(state) {
      state.loading = true;
      state.error = null;
    },
    updateSongSuccess(state, action: PayloadAction<Song>)
     {
      state.loading = false;
      state.error = null;
      const updatedSong = action.payload;
      const index = state.songs.findIndex((song) => song.id === updatedSong.id);
      if (index !== -1) {
        state.songs[index] = updatedSong;
      }
    },
    updateSongFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    deleteSongStart(state) {
      state.loading = true;
      state.error = null;
    },
    deleteSongSuccess(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = null;
      state.songs = state.songs.filter((song) => song.id !== action.payload);
    },
    deleteSongFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchSongsStart,
  fetchSongsSuccess,
  fetchSongsFailure,
  createSongStart,
  createSongSuccess,
  createSongFailure,
  updateSongStart,
  updateSongSuccess,
  updateSongFailure,
  deleteSongStart,
  deleteSongSuccess,
  deleteSongFailure,
} = songsSlice.actions;

export default songsSlice.reducer;

// Redux Thunk actions
// export const fetchSongs = () => async (dispatch: any) => {
//   try {
//     dispatch(fetchSongsStart());
//     const songs = await fetchSongs();
//     dispatch(fetchSongsSuccess(songs));
//   } catch (error) {
//     dispatch(fetchSongsFailure(error.message));
//   }
// };

// export const createSong = (songData: any) => async (dispatch: any) => {
//   try {
//     dispatch(createSongStart());
//     const song = await createSong(songData);
//     dispatch(createSongSuccess(song));
//   } catch (error) {
//     dispatch(createSongFailure(error.message));
//   }
// };

// export const updateSong = (songId: string, songData: any) => async (dispatch: any) => {
//   try {
//     dispatch(updateSongStart());
//     const song = await updateSong(songId, songData);
//     dispatch(updateSongSuccess(song));
//   } catch (error) {
//     dispatch(updateSongFailure(error.message));
//   }
// };

// export const deleteSong = (songId: string) => async (dispatch: any) => {
//   try {
//     dispatch(deleteSongStart());
//     await deleteSong(songId);
//     dispatch(deleteSongSuccess(songId));
//   } catch (error) {
//     dispatch(deleteSongFailure(error.message));
