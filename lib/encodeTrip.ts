import LZString from 'lz-string';

export function encodeTripData(destinations: any[]) {
  const json = JSON.stringify(destinations);
  return LZString.compressToEncodedURIComponent(json); // much smaller code
}

export function decodeTripData(encoded: string) {
  const json = LZString.decompressFromEncodedURIComponent(encoded);
  return JSON.parse(json!);
}
