/* eslint-disable no-param-reassign */

export const track = (trackObject: SpotifyApi.TrackObjectFull) => {
  if (trackObject.album.images.length) trackObject.album.images = [trackObject.album.images[0]];
  delete trackObject.available_markets;
  delete trackObject.album.available_markets;
};

export const trackSimple = (trackObject: SpotifyApi.TrackObjectSimplified) => {
  delete trackObject.available_markets;
};

export const artist = (artistObject: SpotifyApi.ArtistObjectFull) => {
  if (artistObject.images.length) artistObject.images = [artistObject.images[0]];
};

export const playlist = (playlistObject: SpotifyApi.PlaylistObjectSimplified) => {
  if (playlistObject.images.length) playlistObject.images = [playlistObject.images[0]];
};
