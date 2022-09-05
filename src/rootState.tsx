import * as Location from 'expo-location';
import { User } from 'firebase/auth';
import { atom } from 'jotai';

type TPermissionLocationAtom = Location.PermissionStatus | null;

export interface IUser {
  userId: number;
  matched: boolean;
}

export const permissionLocationAtom = atom<TPermissionLocationAtom>(null);

//auth
export const userAtom = atom<IUser | null>(null);
// export const userAtom = atom<IUser>({
//   userId: 215,
//   matched: false,
// });

export const isLoadingAuthAtom = atom<boolean>(true);
export const errorAuthAtom = atom<Error | null>(null);
export const isSearchingMate = atom(false);
