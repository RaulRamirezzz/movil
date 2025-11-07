import React, {useState} from 'react';
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
            navigation.navigate("BillStateTemplate");
          } else {
            navigation.navigate("BillonwayTemplate")
          }
          // Si no hay documentos en cargados, navega a BillTemplate
        } else {
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