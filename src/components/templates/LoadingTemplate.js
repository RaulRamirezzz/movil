import React, {useState} from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { loadSelectedDocs } from '../../store/loadSelectedService';
import { useEffect } from 'react';
import { CustomAlertExample } from '../moleculas/AlertCustom';

import {
    View,
    StyleSheet,
    Button,
    Alert,
    Text,
} from 'react-native';

export function LoadingTemplate() {
    const { user } = useAuth();
    const navigation = useNavigation();

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
          // Si exiiste un documento en ruta, navega a BillStateTemplate, si no a BillonwayTemplate
          if (docEnRuta) {
            CustomAlertExample('Aviso', 'Hay documentos en ruta, por favor verifique el estado del documento.');
            navigation.navigate("BillStateTemplate");
          } else {
            CustomAlertExample('Éxito', 'Documentos cargados correctamente.');
            navigation.navigate("BillonwayTemplate")
          }
          // Si no hay documentos en cargados, navega a BillTemplate
        } else {
          CustomAlertExample('Error', 'No hay documentos cargados.');
          navigation.navigate("BillTemplate")
        }
      };

      fetchDocs();
    }, [user.Token]);

    return (
        <View style={styles.container}>
            <Text style={{fontSize: 20, fontWeight: 'bold', textAlign: 'center'}}>
                            {"Cargando..."}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});