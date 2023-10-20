import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000';

export const fetchSongs = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/songs`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch songs');
  }
};

export const createSong = async (songData: any) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/songs`, songData);
    return response.data;
  } catch (error) {
    throw new Error('Failed to create song');
  }
};

export const updateSong = async (songId: string, songData: any) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/songs/${songId}`, songData);
    return response.data;
  } catch (error) {
    throw new Error('Failed to update song');
  }
};

export const deleteSong = async (songId: string) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/songs/${songId}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to delete song');
  }
};