import { usePost } from '@hooks/usePost';

export type TSearchNearbyUserRes = {
  matchedUser: {
    firstName: string;
    lastName: string;
    nickname: string;
    interests: string[];
    gender: 'MALE' | 'FEMALE';
    instagramUsername: string;
    age: number;
  };
};

export type TSearchNearbyUserSpec = {
  firstName: string;
  lastName: string;
  nickname: string;
  birthdate: {
    year: number;
    month: number;
    day: number;
  };
  gender: 'male' | 'female';
  instagramUsername: string;
  interests: string[];
  phoneNumber: string;
  coordinate: {
    lat: number;
    long: number;
  };
};

export const usePostSearchNearbyUser = usePost<TSearchNearbyUserRes, TSearchNearbyUserSpec>(
  '/searchers/searchNearbyUser'
);
