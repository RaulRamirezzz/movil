import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Button,
  Text,
  useColorScheme,
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
  const { latitude, longitude} = useLocation();
  const [loading, setLoading] = useState(false);

  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: isDark ? "#000" : "#f5f5f5",
    },
    ContainerTable: {
      backgroundColor: isDark ? "#0f0f0f" : '#fff',
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
      color: isDark ? "#fff" : "#000",
    },
    loadingContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    buttonContainer: {
      marginTop: 16,
      width: '40%',
      alignSelf: 'center',
    },
  });

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
    consolesLogs();

    try {
      setLoading(true);
      const [result] = await Promise.all([
        validateDeliveryService(user.Token, consecutivo, longitude, latitude, fecha),
        new Promise((resolve) => setTimeout(resolve, 2000)),
      ]);

      if (result.success) {
        CustomAlert.show("Éxito", result.descripcion, () => {
          navigation.navigate("LoadingTemplate", { fromQR: true });
        });
      } else {
        CustomAlert.show("Error", result.descripcion);
      }
    } catch (error) {
      CustomAlert.show("Error", "No se pudo validar el documento.");
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

          </View>
        ) : (
          <QrScanner onSuccess={handleQrSuccess} consecutivo={consecutivo} />
        )}

        {!loading && (
          <View style={styles.buttonContainer}>
            <Button title="Regresar" maxHei color={isDark ? "#1a4381" : "#2196F3"} onPress={() => navigation.goBack() } />
          </View>
        )}
      </View>
    </View>
  );
}


