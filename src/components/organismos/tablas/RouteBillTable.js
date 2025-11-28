import React, { useEffect, useState, useCallback } from "react";
import { View, Text, FlatList, TouchableOpacity, useColorScheme, StyleSheet } from "react-native";
import { loadSelectedDocs } from "../../../store/loadSelectedService";
import { useAuth } from "../../../context/AuthContext";

export function BillonrouteTable({ onSelectionChange }) {
  const [selected, setSelected] = useState(null);
  const [data, setData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const { user } = useAuth();

  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

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
      borderColor: isDark ? "#000" : "#ddd",
    },
    rowSelected: {
      backgroundColor: isDark ? "#171719" : "#E3F2FD",
    },
    textEnRuta: {
      color: isDark ? "#1a4381" : "#0D47A1",
      fontWeight: "bold",
    },
    header: {
      backgroundColor: isDark ? "#1a4381" : "#2196F3",
      borderRadius: 8,
    },
    headerCell: {
      flex: 1,
      color: isDark ? "#fff" : "#fff",
      fontWeight: "bold",
      textAlign: "center",
    },
    cell: {
      flex: 1,
      textAlign: "center",
      color: isDark ? "#fff" : "#000",
    },
  });

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
    const isEnRuta = item.estadoDocumento === "En ruta";

    return (
      <TouchableOpacity
        style={[
          styles.row,
          isSelected && styles.rowSelected,
          isEnRuta && styles.rowEnRuta,
        ]}
        onPress={() => toggleSelect(item.consecutivo)}
      >
        <Text style={[styles.cell, isEnRuta && styles.textEnRuta]}>
          {item.consecutivo}
        </Text>
        <Text style={[styles.cell, isEnRuta && styles.textEnRuta]}>
          {item.nombreCliente}
        </Text>
        <Text style={[styles.cell, isEnRuta && styles.textEnRuta]}>
          {item.fechaDocumento.split("T")[0]}
        </Text>
        <Text style={styles.cell}>
          {isEnRuta ? (
            <Text style={{ color: "red", fontWeight: "bold" }}>
              {item.estadoDocumento}
            </Text>
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
        extraData={selected}
        refreshing={refreshing} 
        onRefresh={onRefresh}
      />
    </View>
  );
}

