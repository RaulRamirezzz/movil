import React, {useState} from 'react';
import { Header } from '../organismos/Header'; 
import { BillonwayTable } from '../organismos/tablas/SelectedBillTable';
import { BillStateTemplate } from './BillStateTemplate';
import { useAuth } from '../../context/AuthContext';
import { startRouteService } from '../../store/startRouteService';
import { useNavigation } from '@react-navigation/native';
import { CustomAlert } from '../moleculas/AlertCustom';

import {
    View,
    StyleSheet,
    Button,
    Text,
} from 'react-native';

export function BillonwayTemplate() {
    const [selectedDocs, setSelectedDocs] = useState([]);
    const navigation = useNavigation();
    const { user } = useAuth();

    const handleSubmit = async () => {
        if (selectedDocs.length === 0) {
            CustomAlert.show('¡Error!', 'Lista vacia, por favor selecciona un documento');
            return;
        }
        else {
            CustomAlert.show('Aviso', 'Para continuar por favor indica el documento a entregar');
            navigation.navigate("BillStateTemplate")
        }
        const result = await startRouteService(selectedDocs, user.Token);
        console.log(result);

    };

    return (
        <View style={styles.container}>
            <Header />
            <View style={styles.ContainerTable}>
              <Text style={{fontSize: 20, fontWeight: 'bold', textAlign: 'center'}}>
                              {"Documentos Asignados"}
              </Text>
              <BillonwayTable onSelectionChange={setSelectedDocs}/> 
              <View style={styles.buttonContainer}>
                <Button 
                    title="Comenzar" 
                    onPress={() => {
                        handleSubmit();
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
    width: "100%",
    height: "80%",
  }
});