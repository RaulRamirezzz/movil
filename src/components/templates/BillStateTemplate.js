import React, {useState} from 'react';
import { Header } from '../organismos/Header'; 
import { BillonwayTable } from '../organismos/tablas/SelectedBillTable';
import { BillonrouteTable } from '../organismos/tablas/RouteBillTable';
import { useAuth } from '../../context/AuthContext';
import { sendSelectedDocs } from '../../store/docSelectService';
import { useNavigation } from '@react-navigation/native';
import useLocation from '../../hooks/useLocation';

import {
    View,
    StyleSheet,
    Button,
    Alert,
    Text,
} from 'react-native';

export function BillStateTemplate() {
    const [selectedDocs, setSelectedDocs] = useState([]);
    const { user } = useAuth();
    const navigation = useNavigation();
    const { latitude, longitude, errorMsg } = useLocation();

    const handleSubmit = async () => {
        if (selectedDocs.length === 0) {
            Alert.alert('Para continuar por favor indica el documento a entregar');
            return;
        }
        const result = await sendSelectedDocs(selectedDocs, user.Token);
        console.log(result);
    };

    const handleShowCoords = () => {
      if (errorMsg) {
        Alert.alert("Error", errorMsg);
        return;
      }

      if (latitude && longitude) {
        console.log("Latitud:", latitude, "Longitud:", longitude);
        Alert.alert("Coordenadas", `Lat: ${latitude}\nLng: ${longitude}`);
      } else {
        Alert.alert("Obteniendo ubicación...", "Por favor espera un momento.");
      }
    };

    return (
        <View style={styles.container}>
            <Header />
            <View style={styles.ContainerTable}>
              <Text style={{fontSize: 20, fontWeight: 'bold', textAlign: 'center'}}>
                              {"Documento en ruta"}
              </Text>
              <BillonrouteTable onSelectionChange={setSelectedDocs}/> 
              <View style={styles.buttonContainer}>
                <Button 
                    title="Comenzar" 
                    onPress={handleShowCoords}
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