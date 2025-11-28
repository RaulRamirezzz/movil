import React, {useState} from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigation, useRoute } from '@react-navigation/native';
import { loadSelectedDocs } from '../../store/loadSelectedService';
import { useEffect } from 'react';
import { CustomAlert } from '../moleculas/AlertCustom';
import LottieView from 'lottie-react-native';


import {
    View,
    StyleSheet,
    useColorScheme,
    Text,
} from 'react-native';

export function LoadingTemplate() {
    const { user } = useAuth();
    const navigation = useNavigation();
    const route = useRoute();
    const fromQR = route.params?.fromQR || false;

    const colorScheme = useColorScheme();
    const isDark = colorScheme === 'dark';

    const styles = StyleSheet.create({
      container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: isDark ? "#000" : "#f5f5f5",
      },
    });

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
            if (fromQR) {
              CustomAlert.show("Aviso", "Ya existe un documento en ruta", () => {
                navigation.navigate("BillStateTemplate");
              });
            }
            else {
              navigation.navigate("BillStateTemplate");
            }
          } else {
            if (fromQR) {
              CustomAlert.show("Aviso", "Seleccione el siguiente documento a entregar", () => {
                navigation.navigate("BillonwayTemplate");
              });
            }
            else {
              navigation.navigate("BillonwayTemplate");
            }
          }
          // Si no hay documentos en cargados, navega a BillTemplate
        } else {
            if (fromQR) {
              CustomAlert.show("Aviso", "Haz finalizado las entregas seleccionadas, selecciona nuevos documentos para tu ruta", () => {
                navigation.navigate("BillTemplate");
              });
            }
            else {
              navigation.navigate("BillTemplate");
            }
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

