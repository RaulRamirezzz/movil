import React, { useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  Animated,
  useColorScheme,
} from "react-native";
import Zegnal from "../../assets/zegnal.png"; 

export function SplashScreen({ onFinish }) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 3,
        useNativeDriver: true,
      }),
    ]).start();

    const timer = setTimeout(() => {
      onFinish(); 
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const dynamicStyles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: isDark ? "#121212" : "#F5F5F5",
    },
    logo: {
      width: 150,
      height: 150,
      resizeMode: "contain",
      marginBottom: 20,
    },
    title: {
      fontSize: 28,
      fontWeight: "bold",
      color: isDark ? "#121562" : "#121562",
    },
  });

  return (
    <View style={dynamicStyles.container}>
      <Animated.Image
        source={Zegnal}
        style={[
          dynamicStyles.logo,
          { opacity: fadeAnim, transform: [{ scale: scaleAnim }] },
        ]}
      />
      <Animated.Text style={[dynamicStyles.title, { opacity: fadeAnim }]}>
        ZENTREGO
      </Animated.Text>
    </View>
  );
}