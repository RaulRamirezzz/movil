import React, { useEffect, useState } from "react";
import Checkbox from "expo-checkbox";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { chargeDocs } from "../../../store/docService";


export function BillTable({onSelectionChange}) {
    const [selected, setSelected] = useState([]);
    const [data, setData] = useState([]);

    useEffect(() => {
      async function loadDocs() {
        const result = await chargeDocs();
        if (result.success) {
          setData(result.documentos);
        } else {
          console.log("Error al cargar documentos:", result.descripcion);
        }
      }
      loadDocs();
    }, []);

    const toggleSelect = (id) => {
      let updatedSelection;
      if (selected.includes(id)) {
        updatedSelection = selected.filter((item) => item !== id);
      } else {
        updatedSelection = [...selected, id];
      }
      setSelected(updatedSelection);
      onSelectionChange && onSelectionChange(updatedSelection);
    };

    const renderItem = ({ item }) => {
    const isSelected = selected.includes(item.consecutivo);

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
        
        <Text style={styles.headerCell}>Factura</Text>
        <Text style={styles.headerCell}>Cliente</Text>
        <Text style={styles.headerCell}>Fecha</Text>
      </View>

      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.consecutivo}
        style={{ maxHeight: 500 }}
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
