import React, { useEffect, useState } from 'react';
import { Header } from '../organismos/Header';
import { BillonrouteTable } from '../organismos/tablas/RouteBillTable';
import { useAuth } from '../../context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { loadSelectedDocs } from '../../store/loadSelectedService';
import { CustomAlert } from '../moleculas/AlertCustom';
import useLocation from "../../hooks/useLocation";
import { View, StyleSheet, Button, Text } from 'react-native';

export function BillStateTemplate() {
  const { user } = useAuth();
  const navigation = useNavigation();
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [docs, setDocs] = useState([]);
  const { latitude, longitude} = useLocation();

  useEffect(() => {
    const fetchDocs = async () => {
      const result = await loadSelectedDocs(user.Token);
      if (result.success) {
        setDocs(result.documentos);
      } else {
        CustomAlert.show('Error', result.descripcion || 'Error al cargar documentos.');
      }
    };
    fetchDocs();
  }, [user.Token]);

  const handleEntregar = () => {
    if (!selectedDoc) {
      CustomAlert.show('Error', 'Por favor selecciona un documento.');
      return;
    }
    // Buscar el documento seleccionado en la lista
    const doc = docs.find(d => d.consecutivo === selectedDoc);

    // Validar que esté en ruta
    if (!doc || doc.estadoDocumento !== 'En ruta') {
      CustomAlert.show('Error', 'Solo puedes entregar documentos que estén en ruta.');
      return;
    }

    // Validar ubicación
    if (!latitude || !longitude) {
      CustomAlert.show("Ubicación no disponible", "Por favor, espera un momento.");
      return;
    }
    // Si está en ruta, proceder
    console.log('Documento en ruta listo para entrega:', doc.consecutivo);
    navigation.navigate('QRTemplate', { consecutivo: doc.consecutivo });
  };

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.ContainerTable}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center' }}>
          Documento en ruta
        </Text>

        <BillonrouteTable onSelectionChange={setSelectedDoc} />

        <View style={styles.buttonContainer}>
          <Button title="Entregar" onPress={handleEntregar} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  buttonContainer: {
    marginTop: 16,
    width: '40%',
    alignSelf: 'center',
  },
  ContainerTable: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    width: "100%",
    height: "80%",
  },
});
