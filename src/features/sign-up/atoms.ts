import { atom } from 'jotai';
import { focusAtom } from 'jotai/optics';

export type TSignUpForm = {
  firstName: string;
  lastName: string;
  nickname: string;
  birthDate: { day: number; month: number; year: number } | null;
  gender: 'male' | 'female' | null;
  photo: string;
  instagramUsername: string;
  interests: string[];
  phoneNumber: string;
};

export const signUpFormAtom = atom<TSignUpForm>({
  firstName: '',
  lastName: '',
  nickname: '',
  birthDate: null,
  gender: null,
  photo: '',
  instagramUsername: '',
  interests: [],
  phoneNumber: '',
});

export const firstNameAtom = focusAtom(signUpFormAtom, (optic) => optic.prop('firstName'));
export const lastNameAtom = focusAtom(signUpFormAtom, (optic) => optic.prop('lastName'));
export const nicknameAtom = focusAtom(signUpFormAtom, (optic) => optic.prop('nickname'));
export const birthDateAtom = focusAtom(signUpFormAtom, (optic) => optic.prop('birthDate'));
export const genderAtom = focusAtom(signUpFormAtom, (optic) => optic.prop('gender'));
export const instagramUsernameAtom = focusAtom(signUpFormAtom, (optic) =>
  optic.prop('instagramUsername')
);
export const photoAtom = focusAtom(signUpFormAtom, (optic) => optic.prop('photo'));
export const interestsAtom = focusAtom(signUpFormAtom, (optic) => optic.prop('interests'));
export const phoneNumberAtom = focusAtom(signUpFormAtom, (optic) => optic.prop('phoneNumber'));
