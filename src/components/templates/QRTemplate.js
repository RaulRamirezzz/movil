import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Button,
  Alert,
  Text,
} from "react-native";
import { Header } from "../organismos/Header";
import { useAuth } from "../../context/AuthContext";
import { useNavigation, useRoute } from "@react-navigation/native";
import useLocation from "../../hooks/useLocation";
import { QrScanner } from "../organismos/QrScanner";
import { validateDeliveryService } from "../../store/validateDeliveryService";
import { getFormattedDate } from "../../utils/getFormattedDate";
import { CustomAlert } from "../moleculas/AlertCustom";
import LottieView from "lottie-react-native";

export function QRTemplate() {
  const { user } = useAuth();
  const navigation = useNavigation();
  const route = useRoute();
  const consecutivo = route.params?.consecutivo;
  const { latitude, longitude } = useLocation();
  const [loading, setLoading] = useState(false);

  const consolesLogs = () => {
    const fecha = getFormattedDate();
    console.log("Latitud:", latitude);
    console.log("Longitud:", longitude);
    console.log("Consecutivo en QRTemplate:", consecutivo);
    console.log("User:", user.Token);
    console.log("fecha:", fecha);
  };

  const handleQrSuccess = async (uuid) => {
    const fecha = getFormattedDate();
    console.log("UUID recibido en QRTemplate:", uuid);

    if (!latitude || !longitude) {
      Alert.alert("Ubicación no disponible", "Por favor, espera un momento.");
      return;
    }

    try {
      setLoading(true);
      const [result] = await Promise.all([
        validateDeliveryService(user.Token, consecutivo, longitude, latitude, fecha),
        new Promise((resolve) => setTimeout(resolve, 2000)), // ⏱ Espera mínima
      ]);

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
        <Text style={styles.title}>
          Escanee el documento {consecutivo} para continuar con la entrega
        </Text>

        {loading ? (
          <View style={styles.loadingContainer}>
            <LottieView
              source={require("../../assets/Loader.json")}
              autoPlay
              loop
              style={{ width: 300, height: 300 }}
            />
            <Text style={styles.loadingText}>Validando entrega...</Text>
          </View>
        ) : (
          <QrScanner onSuccess={handleQrSuccess} consecutivo={consecutivo} />
        )}

        {!loading && (
          <Button title="Regresar" onPress={() => navigation.goBack()} />
        )}
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
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 12,
    fontSize: 18,
    fontWeight: "600",
    color: "#4F46E5",
  },
});

