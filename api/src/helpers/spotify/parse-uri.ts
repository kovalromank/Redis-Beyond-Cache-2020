export type ParseURIResponse = {
  uri: string;
  type: 'playlist' | 'artist' | 'track' | 'album';
  id: string;
};

const types = ['playlist', 'artist', 'track', 'album'];

const parseURI = (uri: string): ParseURIResponse => {
  const arr = uri.split(':') as ['spotify', ParseURIResponse['type'], string];

  if (arr.length !== 3) return null;

  const [spotify, type, id] = arr;

  if (spotify !== 'spotify') return null;
  if (!types.includes(type)) return null;

  return { uri, type, id };
};

export default parseURI;
