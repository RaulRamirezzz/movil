import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { loadSelectedDocs } from "../../../store/loadSelectedService";
import { useAuth } from "../../../context/AuthContext";

export function BillonrouteTable() {
  const [data, setData] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    async function loadSelDocs() {
      const result = await loadSelectedDocs(user.Token);
      if (result.success) {
        setData(result.documentos);
      } else {
        console.log("Error al cargar documentos:", result.descripcion);
      }
    }
    loadSelDocs();
  }, []);

  const renderItem = ({ item }) => {
    const isEnRuta = item.estadoDocumento === "En ruta";

    return (
      <TouchableOpacity
        style={[styles.row, isEnRuta && styles.rowEnRuta]} 
      >
        <Text style={[styles.cell, isEnRuta && styles.textEnRuta]}>{item.consecutivo}</Text>
        <Text style={[styles.cell, isEnRuta && styles.textEnRuta]}>{item.nombreCliente}</Text>
        <Text style={[styles.cell, isEnRuta && styles.textEnRuta]}>
          {item.fechaDocumento.split("T")[0]}
        </Text>
        <Text style={styles.cell}>
          {isEnRuta ? (
            <Text style={{ color: "red", fontWeight: "bold" }}>{item.estadoDocumento}</Text>
            ) : (
          item.estadoDocumento
          )}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={[styles.row, styles.header]}>
        <Text style={styles.headerCell}>Documento</Text>
        <Text style={styles.headerCell}>Cliente</Text>
        <Text style={styles.headerCell}>Fecha</Text>
        <Text style={styles.headerCell}>Estado</Text>
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
  
  rowEnRuta: {
    backgroundColor: "#BBDEFB",
  },
  textEnRuta: {
    color: "#0D47A1",
    fontWeight: "bold",

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
