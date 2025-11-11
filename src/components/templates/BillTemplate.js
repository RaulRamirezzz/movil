import React, {useState} from 'react';
import { Header } from '../organismos/Header'; 
import { BillTable } from '../organismos/tablas/BillTable';
import { useAuth } from '../../context/AuthContext';
import { sendSelectedDocs } from '../../store/docSelectService';
import { useNavigation } from '@react-navigation/native';
import { CustomAlert } from '../moleculas/AlertCustom';

import {
    View,
    StyleSheet,
    Button,
    Text,
} from 'react-native';

export function BillTemplate() {
    const [selectedDocs, setSelectedDocs] = useState([]);
    const { user } = useAuth();
    const navigation = useNavigation();

    const handleSubmit = async () => {
        if (selectedDocs.length === 0) {
            CustomAlert.show('¡Error!', 'Lista vacia, por favor selecciona un documento');
            return;
        }
        else {
            CustomAlert.show('Aviso', 'Para continuar por favor indica el documento a entregar');
            navigation.navigate("BillonwayTemplate")

        }
        const result = await sendSelectedDocs(selectedDocs, user.Token);
        console.log(result);
    };

    return (
        <View style={styles.container}>
            <Header />
            <View style={styles.ContainerTable}>
              <Text style={{fontSize: 20, fontWeight: 'bold', textAlign: 'center'}}>
                {"Seleccion documentos"}
              </Text>
              <BillTable onSelectionChange={setSelectedDocs}/> 
              <View style={styles.buttonContainer}>
                <Button 
                    title="Entregar" 
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