import React, { useState, useRef, useEffect } from "react";
import { View, Text, StyleSheet, Animated, Easing } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { validateQRService } from "../../store/validateQRService";
import { useAuth } from "../../context/AuthContext";
import { CustomAlert } from "../moleculas/AlertCustom";

export function QrScanner({ onSuccess, consecutivo }) {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const cameraRef = useRef(null);
  const scanAnim = useRef(new Animated.Value(0)).current;
  const { user } = useAuth();

  // Animación de línea de escaneo
  const startScanAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scanAnim, {
          toValue: 1,
          duration: 1500,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(scanAnim, {
          toValue: 0,
          duration: 1500,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  useEffect(() => {
    startScanAnimation();
  }, []);

  if (!permission) return <View />;
  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text>Se requiere permiso de cámara para escanear códigos.</Text>
        <Text style={{ color: "blue" }} onPress={requestPermission}>
          Conceder permiso
        </Text>
      </View>
    );
  }

  const handleBarCodeScanned = ({ data }) => {
    setScanned(true);
    try {
      // Buscar id
      const match = data.match(/id=([0-9a-fA-F-]+)(?=efa&re)/);

      if (match && match[1]) {
        const uuid = match[1];
        console.log("Token:", user.Token);
        console.log("Consecutivo:", consecutivo);
        console.log("UUID extraído:", uuid);
        validateQRService(
          user.Token,
          consecutivo,
          uuid
        ).then((result) => {
          if (result.success) {
            CustomAlert.show("Éxito", result.descripcion, () => {onSuccess(uuid)});
             // Enviar al template
            console.log(result.descripcion);
          } else {
            CustomAlert.show("Error", result.descripcion, () => {setScanned(false)});

          }
        });
        
      } else {
        CustomAlert.show("QR no válido", "No se encontró el UUID en el código escaneado.", () => {setScanned(false)});
      }
    } catch (error) {
      CustomAlert.show("Error", "Ocurrió un problema al procesar el QR.", () => {setScanned(false)});
    }
  };

  const translateY = scanAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-200, 200],
  });

  return (
    <View style={styles.containerQR}>
      <CameraView
        ref={cameraRef}
        style={styles.camera}
        facing="back"
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
        barcodeScannerSettings={{ barcodeTypes: ["qr"] }}
      />
      {!scanned && (
        <View style={styles.overlay}>
          <Animated.View
            style={[styles.scanLine, { transform: [{ translateY }] }]}
          />
          <Text style={styles.text}>Escaneando QR...</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  containerQR: {
    flex: 1,
    alignItems: "center",
    
  },
  camera: {
    width: "100%",
    height: "70%",
    borderRadius: 20,
    overflow: "hidden",
  },
  overlay: {
    position: "absolute",
    width: "100%",
    height: "70%",
    justifyContent: "center",
    alignItems: "center",
  },
  scanLine: {
    position: "absolute",
    width: "100%",
    height: 5,
    backgroundColor: "#fff",
    opacity: 0.8,
  },
  text: {
    position: "absolute",
    bottom: -30,
    color: "#000",
    fontWeight: "bold",
    fontSize: 16,
  },
});
