import React, {useState} from 'react';
import { Header } from '../organismos/Header'; 
import { BillonrouteTable } from '../organismos/tablas/RouteBillTable';
import { useAuth } from '../../context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { loadSelectedDocs } from '../../store/loadSelectedService';
import { useEffect } from 'react';

import {
    View,
    StyleSheet,
    Button,
    Alert,
    Text,
} from 'react-native';

export function BillStateTemplate() {
    const { user } = useAuth();
    const navigation = useNavigation();
    const [routeConsecutivo, setRouteConsecutivo] = useState(null);

    useEffect(() => {
      const fetchDocs = async () => {
        const result = await loadSelectedDocs(user.Token);
        if (result.success) {
          // Busca el documento con estado "En ruta" o "en ruta"
          const docEnRuta = result.documentos.find(
            (doc) => 
              doc.estadoDocumento === 'En ruta' ||
              doc.estadoDocumento === 'en ruta'
          );

          if (docEnRuta) {
            setRouteConsecutivo(docEnRuta.consecutivo);
          } else {
            Alert.alert('Aviso', 'No hay documentos en ruta disponibles.');
          }
        } else {
          Alert.alert('Error', result.descripcion || 'Error al cargar documentos.');
        }
      };

      fetchDocs();
    }, [user.Token]);

    return (
        <View style={styles.container}>
            <Header />
            <View style={styles.ContainerTable}>
              <Text style={{fontSize: 20, fontWeight: 'bold', textAlign: 'center'}}>
                              {"Documento en ruta"}
              </Text>
              <BillonrouteTable /> 
              <View style={styles.buttonContainer}>
                <Button 
                    title="Entregar" 
                    onPress={() => {
                      if (!routeConsecutivo) {
                        Alert.alert('Error', 'No se encontró un documento en ruta.');
                        return;
                      }
                      // Navegar a QRTemplate y pasar el consecutivo
                      console.log("Primer doc en ruta:", routeConsecutivo);
                      navigation.navigate('QRTemplate', { consecutivo: routeConsecutivo });
                    }}
                />
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
    width: "40%",
    alignSelf: "center",
  },
  ContainerTable: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
  }
});