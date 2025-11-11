import React, {useState} from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { loadSelectedDocs } from '../../store/loadSelectedService';
import { useEffect } from 'react';
import { CustomAlert } from '../moleculas/AlertCustom';
import LottieView from 'lottie-react-native';

import {
    View,
    StyleSheet,
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
            //CustomAlert.show("¡Atención!", "Tu sesión ha expirado 😅");
            navigation.navigate("BillStateTemplate");
          } else {
            //CustomAlert.show("¡Atención!", "Tu sesión ha expirado 😅");
            navigation.navigate("BillonwayTemplate")
          }
          // Si no hay documentos en cargados, navega a BillTemplate
        } else {
          //CustomAlert.show("¡Atención!", "Tu sesión ha expirado 😅");
          navigation.navigate("BillTemplate")
        }
      };

      fetchDocs();
    }, [user.Token]);

    return (
      <View style={styles.container}>
        <LottieView
          source={require("../../assets/Loader.json")}
          autoPlay
          loop
          style={{ width: 300, height: 300 }}
        />
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});