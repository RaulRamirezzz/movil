import { useEffect, useState } from "react";
import * as Location from "expo-location";

const useLocation = () => {
  const [errorMsg, setErrorMsg] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [latitude, setLatitude] = useState(null);

  const getUserLocation = async () => {
    try {
      // 1. Solicita permiso
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        setErrorMsg("Permiso para acceder a la ubicación denegado");
        return;
      }

      // 2. Obtiene ubicación actual
      const { coords } = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High, // mejor precisión para Android
      });

      if (coords) {
        const { latitude, longitude } = coords;
        setLatitude(latitude);
        setLongitude(longitude);

        // 3. Obtener dirección
        const address = await Location.reverseGeocodeAsync({
          latitude,
          longitude,
        });
      }
    } catch (error) {
      console.error("Error al obtener la ubicación:", error);
      setErrorMsg("No se pudo obtener la ubicación");
    }
  };

  useEffect(() => {
    getUserLocation();
  }, []);

  return { latitude, longitude, errorMsg };
};

export default useLocation;
