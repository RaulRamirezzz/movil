import React, { useState } from "react";
import { View, Text, Modal, TouchableOpacity, StyleSheet, Button } from "react-native";

export default function CustomAlertExample(titulo, mensaje) {
  const [visible, setVisible] = useState(false);

  const showAlert = () => setVisible(true);
  const hideAlert = () => setVisible(false);

  return (
    <View style={styles.container}>
      <Button title="Mostrar alerta" onPress={showAlert} />

      <Modal
        animationType="fade"
        transparent={true}
        visible={visible}
        onRequestClose={hideAlert}
      >
        <View style={styles.overlay}>
          <View style={styles.alertBox}>
            <Text style={styles.title}>{titulo}</Text>
            <Text style={styles.message}>
                {mensaje}
            </Text>

            <TouchableOpacity style={styles.button} onPress={hideAlert}>
              <Text style={styles.buttonText}>Aceptar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  alertBox: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 24,
    width: "80%",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#007AFF",
  },
  message: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 16,
  },
  button: {
    backgroundColor: "#007AFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
