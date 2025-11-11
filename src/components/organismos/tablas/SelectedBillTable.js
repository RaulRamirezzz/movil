import React, { useEffect, useState, useCallback } from "react";
import Checkbox from "expo-checkbox";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { loadSelectedDocs } from "../../../store/loadSelectedService";
import { useAuth } from '../../../context/AuthContext';

export function BillonwayTable({onSelectionChange}) {
    const [selected, setSelected] = useState(null);
    const [data, setData] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const { user } = useAuth();

  const fetchDocs = useCallback(async () => {
    try {
      const result = await loadSelectedDocs(user.Token);
      if (result.success) {
        setData(result.documentos);
      } else {
        console.log("Error al cargar documentos:", result.descripcion);
      }
    } catch (error) {
      console.log("Error en la carga:", error);
    }
  }, [user.Token]);

  useEffect(() => {
    fetchDocs();
  }, [fetchDocs]);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchDocs();
    setRefreshing(false);
  };

    const toggleSelect = (id) => {
      const newSelection = selected === id ? null : id;
      setSelected(newSelection);
      onSelectionChange && onSelectionChange(newSelection);
    };

    const renderItem = ({ item }) => {
      const isSelected = selected === item.consecutivo;

    return (
      <TouchableOpacity
        style={[styles.row, isSelected && styles.rowSelected]}
        onPress={() => toggleSelect(item.consecutivo)}
      >
        <Checkbox
          value={isSelected}
          onValueChange={() => toggleSelect(item.consecutivo)}
          color={isSelected ? "#2196F3" : undefined}
        />
        <Text style={styles.cell}>{item.consecutivo}</Text>
        <Text style={styles.cell}>{item.nombreCliente}</Text>
        <Text style={styles.cell}>{item.fechaDocumento.split("T")[0]}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={[styles.row, styles.header]}>
        
        <Text style={styles.headerCell}>Documento</Text>
        <Text style={styles.headerCell}>Cliente</Text>
        <Text style={styles.headerCell}>Fecha</Text>
      </View>

      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.consecutivo}
        style={{ maxHeight: 500 }}
        refreshing={refreshing}  
        onRefresh={onRefresh} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    paddingHorizontal: 10,

  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  rowSelected: {
    backgroundColor: "#E3F2FD",
  },
  header: {
    backgroundColor: "#2196F3",
    borderRadius: 8,
  },
  headerCell: {
    flex: 1,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  cell: {
    flex: 1,
    textAlign: "center",
  },
});
