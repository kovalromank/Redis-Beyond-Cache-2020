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
