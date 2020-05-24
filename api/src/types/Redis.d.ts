type RedisSpotifySession = {
  accessToken: string;
  tokenType: string;
  scope: string;
  expiresIn: number;
  refreshToken?: string;
  user: SpotifyApi.CurrentUsersProfileResponse;
};
