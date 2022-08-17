import * as Location from 'expo-location';
import { User } from 'firebase/auth';
import { atom } from 'jotai';

type TPermissionLocationAtom = Location.PermissionStatus | null;

export const permissionLocationAtom = atom<TPermissionLocationAtom>(null);

//auth
export const userAtom = atom<User | null>(null);
export const isLoadingAuthAtom = atom<boolean>(true);
export const errorAuthAtom = atom<Error | null>(null);
