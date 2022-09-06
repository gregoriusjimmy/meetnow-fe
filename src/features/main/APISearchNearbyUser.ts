import { usePost } from '@hooks/usePost';

export type TMatchedUser = {
  firstName: string;
  lastName: string;
  nickname: string;
  interests: string[];
  gender: 'male' | 'female';
  instagramUsername: string;
  age: number;
  distance: number;
  coordinate: {
    lat: number;
    long: number;
  };
};

export type TSearchNearbyUserRes = {
  matchedUser: TMatchedUser;
};

export type TSearchNearbyUserSpec = {
  userId: number;
  coordinate: {
    lat: number;
    long: number;
  };
};

export const usePostSearchNearbyUser = usePost<TSearchNearbyUserRes, TSearchNearbyUserSpec>(
  '/searchers/searchNearbyUser'
);
