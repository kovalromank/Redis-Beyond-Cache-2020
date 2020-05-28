export type IPlayMedia = {
  media: { track: SpotifyApi.TrackObjectFull; youtube: { id: string } };
  error: string;
};
