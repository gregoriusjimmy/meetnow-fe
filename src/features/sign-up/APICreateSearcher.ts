import { usePost } from '@hooks/usePost';

export type TCreateSearcherRes = {
  firstName: string;
  lastName: string;
  nickname: string;
  interests: string[];
  gender: 'male' | 'female';
  birthdate: string;
  instagramUsername: string;
  age: number;
  id: number;
};

export type TCreateSearcherSpec = {
  firstName: string;
  lastName: string;
  nickname: string;
  birthdate: {
    day: number;
    month: number;
    year: number;
  };
  gender: 'male' | 'female';
  instagramUsername: string;
  interests: string[];
  phoneNumber: string;
};

export const usePostCreateSearcher = usePost<TCreateSearcherRes, TCreateSearcherSpec>(
  '/searchers/create'
);
