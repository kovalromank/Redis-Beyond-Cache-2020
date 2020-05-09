/**
 * [Details](https://developer.spotify.com/documentation/web-api/reference/object-model/#external-url-object)
 */
export type SpotifyExternalURLs = {
  [key: string]: string;
};

/**
 * [Details](https://developer.spotify.com/documentation/web-api/reference/object-model/#followers-object)
 */
export type SpotifyFollowers = {
  href: null;
  total: number;
};

/**
 * [Details](https://developer.spotify.com/documentation/web-api/reference/object-model/#image-object)
 */
export type SpotifyImage = {
  height?: number;
  width?: number;
  url: string;
};

/**
 * [Details](https://developer.spotify.com/documentation/web-api/reference/object-model/#user-object-private)
 */
export interface SpotifyUser {
  display_name: string;
  external_urls: SpotifyExternalURLs;
  followers: SpotifyFollowers;
  href: string;
  id: string;
  images: Array<SpotifyImage>;
  type: 'user';
  uri: string;
}

/**
 * [Details](https://developer.spotify.com/documentation/web-api/reference/object-model/#user-object-private)
 */
export interface SpotifyPrivateUser extends SpotifyUser {
  /**
   * Needs `user-read-private` scope
   */
  country?: string;
  /**
   * Needs `user-read-email` scope
   */
  email?: string;
  /**
   * Needs `user-read-private` scope
   */
  product?: 'premium' | 'free' | 'open' | string;
}

export type SpotifyAuthCodeResponse = {
  access_token: string;
  token_type: 'Bearer';
  scope: string;
  expires_in: number;
  refresh_token: string;
};

export type SpotifyAuthCodeCBQuery = {
  code?: string;
  state?: string;
  error?: string;
};
