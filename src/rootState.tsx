import * as Location from 'expo-location';
import { User } from 'firebase/auth';
import { atom } from 'jotai';

import { TSignUpForm } from './features/sign-up/atoms';

type TPermissionLocationAtom = Location.PermissionStatus | null;
// export type TUser = TSignUpForm;
export const permissionLocationAtom = atom<TPermissionLocationAtom>(null);

//auth
export const userAtom = atom<TSignUpForm | null>(null);
// export const userAtom = atom<TSignUpForm | null>({
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
// });
export const isLoadingAuthAtom = atom<boolean>(true);
export const errorAuthAtom = atom<Error | null>(null);
