import React from "react";
import { useAuth } from "../context/AuthContext";
import { createStackNavigator } from "@react-navigation/stack";
import { LoginTemplate } from "../components/templates/LoginTemplate";
import { BillTemplate } from "../components/templates/BillTemplate";
import { BillonwayTemplate } from "../components/templates/BillonwayTemplate";
import { BillStateTemplate } from "../components/templates/BillStateTemplate";
import { QRTemplate } from "../components/templates/QRTemplate";

const Stack = createStackNavigator();

export function ProtectedRoute(){

    const { user } = useAuth();

    return(
        <Stack.Navigator screenOptions={{headerShown: false}}>
            {user == null ? (
                <Stack.Screen name="Login" component={LoginTemplate} />
            ) : (
                <>
                    {/*<Stack.Screen name="BillTemplate" component={BillTemplate} />*/}
                    {/*<Stack.Screen name="BillonwayTemplate" component={BillonwayTemplate} />*/}
                    <Stack.Screen name="BillStateTemplate" component={BillStateTemplate} />
                    <Stack.Screen name="QRTemplate" component={QRTemplate} />
                </>
            )}
        </Stack.Navigator>
    );
}