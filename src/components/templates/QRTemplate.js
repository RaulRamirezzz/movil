import React, {useState} from "react";
import { View, StyleSheet, Button, Alert, Text } from "react-native";
import { Header } from "../organismos/Header";
import { useAuth } from "../../context/AuthContext";
import { useNavigation, useRoute } from "@react-navigation/native";
import useLocation from "../../hooks/useLocation";
import { QrScanner } from "../organismos/QrScanner";
import { validateDeliveryService } from "../../store/validateDeliveryService";
import { validateQRService } from "../../store/validateQRService";


export function QRTemplate() {
  const { user } = useAuth();
  const navigation = useNavigation();
  const { latitude, longitude, errorMsg } = useLocation();
  const route = useRoute();
  const consecutivo = route.params?.consecutivo;


  const handleShowCoords = () => {
      if (errorMsg) {
          Alert.alert("Error", errorMsg);
          return;
      }
  
      if (latitude && longitude) {
          console.log("Latitud:", latitude, "Longitud:", longitude);
          Alert.alert("Coordenadas", `Lat: ${latitude}\nLng: ${longitude}`);
      } else {
          Alert.alert("Obteniendo ubicación...", "Por favor espera un momento.");
      }
    };

  const handleQrSuccess = async (uuid) => {
    if (!latitude || !longitude) {
      Alert.alert("Ubicación no disponible", "Por favor, espera un momento.");
      return;
    }

    try {
      const result = await validateDeliveryService(
        user.token,
        "12345", // ejemplo de consecutivo
        uuid,
        latitude,
        longitude,
        "5",
        new Date().toISOString()
      );

      if (result.success) {
        Alert.alert("Éxito", result.descripcion);
        navigation.navigate("BillStateTemplate");
      } else {
        Alert.alert("Error", result.descripcion);
      }
    } catch (error) {
      Alert.alert("Error", "No se pudo validar el documento.");
    }
  };

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.ContainerTable}>
        <Text style={styles.title}>"Escanee el documento {consecutivo} para continuar con el proceso" </Text>
        <QrScanner onSuccess={handleQrSuccess} />
        <Button title="Regresar" 
            onPress={() => navigation.goBack()}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  ContainerTable: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    width: "100%",
    height: "80%",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 8,
  },
});
