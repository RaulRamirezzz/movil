import Zegnal from "../../assets/zegnal.png"
import {
    View,
    Image,
    StyleSheet,
    Text,
} from 'react-native';
import { useAuth } from "../../context/AuthContext";

export function Header() {
  const { user } = useAuth();
    return (
      
        <View style={styles.container}>
            <Text style={styles.welcome}>
               {"Bienvenido \n" }
               {user.Nombre ? `${user.Nombre}` : "Usuario"}
            </Text>
            <Image
                source={Zegnal}
                style={styles.logo}
            />
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 10,
    flexDirection: "row",
    
  },
  welcome: {
    flex: 1,
    color: "black",
    fontWeight: "bold",
    alignItems: "left",
    fontSize: 18,
    marginTop: 15,

  },
  logo: {
    alignItems: "right",
    width: 60,
    height: 60,
  },
});