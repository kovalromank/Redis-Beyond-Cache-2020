type RedisSpotifyQueueTrack = { uri: string };

type RedisSpotifySession = {
  accessToken: string;
  tokenType: string;
  scope: string;
  expiresIn: number;
  refreshToken?: string;
  current?: { uri: string };
  queue: RedisSpotifyQueueTrack[];
  user: SpotifyApi.CurrentUsersProfileResponse;
};
