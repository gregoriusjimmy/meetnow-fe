import { PermissionStatus } from 'expo-location';
import { atom } from 'jotai';

type TPermissionLocationAtom = PermissionStatus | null;

export const permissionLocationAtom = atom<TPermissionLocationAtom>(null);
