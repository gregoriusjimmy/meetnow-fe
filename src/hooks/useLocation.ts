import { permissionLocationAtom } from '@src/rootState';
import * as Location from 'expo-location';
import { useSetAtom } from 'jotai';
import { useEffect, useState } from 'react';

export function useLocation() {
  const setPermissionLocation = useSetAtom(permissionLocationAtom);
  const [isLoading, setIsLoading] = useState(true);
  const [coords, setCoords] = useState<Location.LocationObjectCoords | null>(null);

  useEffect(() => {
    const getLocation = async () => {
      try {
        setIsLoading(true);
        const { coords } = await Location.getCurrentPositionAsync();
        setCoords(coords);
        setIsLoading(false);
      } catch (error) {
        console.warn(error);
        // block user for accessing the app
        setPermissionLocation(null);
      }
    };
    getLocation();
  }, []);

  return {
    isCoordsLoading: isLoading,
    coords,
  };
}
