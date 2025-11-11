import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import React, { useState } from "react";
import { LoginTemplate } from "./src/components/templates/LoginTemplate";
import { SplashScreen } from "./src/components/organismos/SplashScreen";
import { BillTable } from "./src/components/organismos/tablas/BillTable";
import { DeliveryTable } from "./src/components/organismos/tablas/SelectedBillTable";
import { Header } from "./src/components/organismos/Header";
import { BillTemplate } from "./src/components/templates/BillTemplate";
import { BillonwayTemplate } from "./src/components/templates/BillonwayTemplate";
import { AuthProvider } from "./src/context/AuthContext";
import { ProtectedRoute } from "./src/hooks/ProtectedRoute";
import { NavigationContainer } from "@react-navigation/native";
import { CustomAlertProvider } from "./src/components/moleculas/AlertCustom";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  if (isLoading) {
    return <SplashScreen onFinish={() => setIsLoading(false)} />;
  }

  return (
    <AuthProvider>
      <CustomAlertProvider>
        <NavigationContainer>
          <ProtectedRoute />
        </NavigationContainer>
      </CustomAlertProvider>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});