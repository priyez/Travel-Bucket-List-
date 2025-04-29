import LZString from 'lz-string';
import { Destination } from '@/types/types';

export function encodeTripData(destinations: Destination[]) {
  const json = JSON.stringify(destinations);
  return LZString.compressToEncodedURIComponent(json); // much smaller code
}

export function decodeTripData(encoded: string) {
  const json = LZString.decompressFromEncodedURIComponent(encoded);
  return JSON.parse(json!);
}
