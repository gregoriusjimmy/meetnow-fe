import { atom } from 'jotai';
import { focusAtom } from 'jotai/optics';

type TSignUpForm = {
  firstName: string;
  lastName: string;
  nickname: string;
  birthDate: string;
  gender: 'male' | 'female' | null;
  photo: string;
};

export const signUpFormAtom = atom<TSignUpForm>({
  firstName: '',
  lastName: '',
  nickname: '',
  birthDate: '',
  gender: null,
  photo: '',
});

export const firstNameAtom = focusAtom(signUpFormAtom, (optic) => optic.prop('firstName'));
export const lastNameAtom = focusAtom(signUpFormAtom, (optic) => optic.prop('lastName'));
export const nicknameAtom = focusAtom(signUpFormAtom, (optic) => optic.prop('nickname'));
export const birthDateAtom = focusAtom(signUpFormAtom, (optic) => optic.prop('birthDate'));
export const genderAtom = focusAtom(signUpFormAtom, (optic) => optic.prop('gender'));
