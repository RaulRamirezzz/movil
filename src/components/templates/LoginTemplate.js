import Zegnal from "../../assets/zegnal.png"
import React, { useState, useEffect, useRef } from 'react';
import { loginAuth } from "../../store/authService";
import { useAuth} from "../../context/AuthContext";

import {
    View,
    TextInput,
    StyleSheet,
    Button,
    Alert,
    Image,
    useColorScheme,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    TouchableWithoutFeedback,
    Keyboard,
    Animated,
    Easing,
} from 'react-native';

export function LoginTemplate() {
    const [number, onChangeText] = useState('');
    const [password, onChangePassword] = useState('');
    const { login } = useAuth();

    const colorScheme = useColorScheme();
    const isDark = colorScheme === 'dark';

    const logoScale = useRef(new Animated.Value(1)).current;  
    const logoTranslateY = useRef(new Animated.Value(0)).current; 

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(logoTranslateY, {
                    toValue: -10,
                    duration: 1500,
                    useNativeDriver: true,
                    easing: Easing.inOut(Easing.ease),
                }),
                Animated.timing(logoTranslateY, {
                    toValue: 0,
                    duration: 1500,
                    useNativeDriver: true,
                    easing: Easing.inOut(Easing.ease),
                }),
            ])
        ).start();

        // Detectar teclado
        const showSub = Keyboard.addListener("keyboardDidShow", () => {
            Animated.timing(logoScale, {
                toValue: 0.7,
                duration: 300,
                useNativeDriver: true,
            }).start();
        });

        const hideSub = Keyboard.addListener("keyboardDidHide", () => {
            Animated.timing(logoScale, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
            }).start();
        });

        return () => {
            showSub.remove();
            hideSub.remove();
        };
    }, []);

    const logear = async () => {
        const result = await loginAuth(number, password);
        if (result.success) {
            login(result);
            Alert.alert("Bienvenido", `Hola ${result.Nombre} (${result.Rol})`);
        } else {
            Alert.alert("Error", result.Descripcion);
        }
    };

    const dynamicStyles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: isDark ? "#121212" : "#F5F5F5",
        },
        inner: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            padding: 16,
        },
        logo: {
            marginBottom: 32,
            width: 120,
            height: 120,
            resizeMode: "contain",
        },
        textInput: {
            width: "100%",
            height: 50,
            borderColor: isDark ? "#BB86FC" : "#6200EE",
            borderWidth: 1,
            borderRadius: 10,
            paddingHorizontal: 16,
            color: isDark ? "#FFFFFF" : "#000000",
            backgroundColor: isDark ? "#1E1E1E" : "#FFFFFF",
            marginBottom: 16,
        },
        button: {
            marginTop: 16,
            width: "100%",
        }
    });

    return (
        <KeyboardAvoidingView
            style={dynamicStyles.container}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <ScrollView
                    contentContainerStyle={{ flexGrow: 1 }}
                    keyboardShouldPersistTaps="handled"
                >
                    <View style={dynamicStyles.inner}>
                        <Animated.Image
                            source={Zegnal}
                            style={[
                                dynamicStyles.logo,
                                {
                                    transform: [
                                        { scale: logoScale },
                                        { translateY: logoTranslateY }
                                    ]
                                }
                            ]}
                        />

                        <TextInput
                            style={dynamicStyles.textInput}
                            onChangeText={onChangeText}
                            placeholder="Número de usuario"
                            placeholderTextColor={isDark ? "#AAAAAA" : "#666666"}
                            value={number}
                            keyboardType="number-pad" 
                        />

                        <TextInput
                            style={dynamicStyles.textInput}
                            onChangeText={onChangePassword}
                            placeholder="Password"
                            placeholderTextColor={isDark ? "#AAAAAA" : "#666666"}
                            secureTextEntry
                            value={password}
                            autoCapitalize="none"
                            autoCorrect={false}
                        />

                        <View style={dynamicStyles.button}>
                            <Button
                                title="Login"
                                color={isDark ? "#BB86FC" : "#6200EE"}
                                onPress={logear}
                            />
                        </View>
                    </View>
                </ScrollView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}
