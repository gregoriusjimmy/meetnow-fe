import { atom } from 'jotai';
import { focusAtom } from 'jotai/optics';

type TSignUpForm = {
  firstName: string;
  lastName: string;
  nickname: string;
  gender: 'male' | 'female';
  photo: string;
};

export const signUpFormAtom = atom<TSignUpForm>({
  firstName: '',
  lastName: '',
  nickname: '',
  gender: 'male',
  photo: '',
});

export const firstNameAtom = focusAtom(signUpFormAtom, (optic) => optic.prop('firstName'));
export const lastNameAtom = focusAtom(signUpFormAtom, (optic) => optic.prop('lastName'));
export const nicknameAtom = focusAtom(signUpFormAtom, (optic) => optic.prop('nickname'));
