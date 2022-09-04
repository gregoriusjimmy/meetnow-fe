import { atom } from 'jotai';

import { TMatchedUser } from './APISearchNearbyUser';

export interface IMatchedUserAtom extends TMatchedUser {
  coordinate: {
    lat: number;
    long: number;
  };
}

export const matchedUserAtom = atom<IMatchedUserAtom | null>(null);
