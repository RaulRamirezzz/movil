import AsyncStorage from "@react-native-async-storage/async-storage";

const KEYS = {
  PENDING: "PENDING_DOCS",
  LOADED: "LOADED_DOCS",
  ROUTE: "ROUTE_DOCS",
  DELIVERED: "DELIVERED_DOCS"
};

// CARGAR
export async function getDocs(key) {
  const data = await AsyncStorage.getItem(key);
  return data ? JSON.parse(data) : [];
}

// GUARDAR
export async function setDocs(key, value) {
  await AsyncStorage.setItem(key, JSON.stringify(value));
}

// INICIALIZAR MOCK (solo la primera vez)
export async function initOfflineDB(mockPendingDocs) {
  const existing = await AsyncStorage.getItem(KEYS.PENDING);
  if (!existing) {
    await setDocs(KEYS.PENDING, mockPendingDocs);
    await setDocs(KEYS.LOADED, []);
    await setDocs(KEYS.ROUTE, []);
    await setDocs(KEYS.DELIVERED, []);
  }
}

export default KEYS;
