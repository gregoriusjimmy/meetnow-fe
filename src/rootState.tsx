import * as Location from 'expo-location';
import { User } from 'firebase/auth';
import { atom } from 'jotai';

import { TSignUpForm } from './features/sign-up/atoms';

type TPermissionLocationAtom = Location.PermissionStatus | null;

export interface IUser extends TSignUpForm {
  matched: boolean;
}

export const permissionLocationAtom = atom<TPermissionLocationAtom>(null);

//auth
export const userAtom = atom<IUser | null>(null);
// export const userAtom = atom<IUser | null>({
//   birthDate: {
//     day: 8,
//     month: 2,
//     year: 2000,
//   },
//   firstName: 'Ghzx',
//   gender: 'male',
//   instagramUsername: 'h j',
//   interests: ['xx'],
//   lastName: 'Xx',
//   nickname: 'Ghzx',
//   phoneNumber: '6266',
//   photo: '',
//   matched: false,
// });
export const isLoadingAuthAtom = atom<boolean>(true);
export const errorAuthAtom = atom<Error | null>(null);
export const isSearchingMate = atom(false);
