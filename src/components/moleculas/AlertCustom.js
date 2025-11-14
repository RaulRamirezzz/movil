import React, { useState } from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native";


let alertRef = null;

export function CustomAlertProvider({ children }) {
  const [visible, setVisible] = useState(false);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [onConfirm, setOnConfirm] = useState(null);

  const show = (title, message, onConfirmCallback) => {
    setTitle(title);
    setMessage(message);
    setOnConfirm(() => onConfirmCallback || null);
    setVisible(true);
  };

  const hide = () => setVisible(false);
  alertRef = { show, hide };

  const handleConfirm = () => {
    hide();
    if (onConfirm) onConfirm();
  }

  return (
    <>
      {children}
      <Modal
        transparent
        visible={visible}
        animationType="fade"
        onRequestClose={hide}
      >
        <View style={styles.overlay}>
          <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.message}>{message}</Text>

            <TouchableOpacity onPress={handleConfirm} style={styles.button}>
              <Text style={styles.buttonText}>Aceptar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
}


export const CustomAlert = {
  show: (title, message, onConfirm) => {
    if (alertRef) alertRef.show(title, message, onConfirm);
    else console.warn("Error CustomAlertProvider.");
  },
  hide: () => {
    if (alertRef) alertRef.hide();
  },
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  message: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#007AFF",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
