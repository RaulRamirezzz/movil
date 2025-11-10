import React, {useState} from "react";
import { View, StyleSheet, Button, Alert, Text, ActivityIndicator } from "react-native";
import { Header } from "../organismos/Header";
import { useAuth } from "../../context/AuthContext";
import { useNavigation, useRoute } from "@react-navigation/native";
import useLocation from "../../hooks/useLocation";
import { QrScanner } from "../organismos/QrScanner";
import { validateDeliveryService } from "../../store/validateDeliveryService";
import { getFormattedDate } from '../../utils/getFormattedDate';

export function QRTemplate() {
  const { user } = useAuth();
  const navigation = useNavigation();
  const route = useRoute();
  const consecutivo = route.params?.consecutivo;
  const { latitude, longitude, errorMsg } = useLocation();
  const [loading, setLoading] = useState(false);
  

  const consolesLogs =() =>{
    const fecha = getFormattedDate();

    console.log("Latitud:", latitude);
    console.log("Longitud:", longitude);
    console.log("Consecutivo en QRTemplate:", consecutivo);
    console.log("User:", user.Token);
    console.log("fecha:", fecha);
  }

  const handleQrSuccess = async (uuid) => {
    const fecha = getFormattedDate();
    console.log("UUID recibido en QRTemplate:", uuid);

    if (!latitude || !longitude) {
      Alert.alert("Ubicación no disponible", "Por favor, espera un momento.");
      return;
    }

    try {
      setLoading(true);

      const result = await validateDeliveryService(
        user.Token,
        consecutivo,
        longitude,
        latitude,
        fecha
      );

      if (result.success) {
        Alert.alert("Éxito", result.descripcion);
        navigation.navigate("LoadingTemplate");
      } else {
        Alert.alert("Error", result.descripcion);
      }
    } catch (error) {
      Alert.alert("Error", "No se pudo validar el documento.");
    } finally {
      setLoading(false);
      consolesLogs();
    }
  };

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.ContainerTable}>
        <Text style={styles.title}>"Escanee el documento {consecutivo} para continuar con la entrega" </Text>
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#007AFF" />
            <Text style={styles.loadingText}>Validando entrega...</Text>
          </View>
        ) : (
          <QrScanner onSuccess={handleQrSuccess} consecutivo={consecutivo} />
        )}
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
