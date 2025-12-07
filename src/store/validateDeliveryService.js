import { fakeBackend } from "../services/fakeBackend";

export async function validateDeliveryService(
   token,
   consecutivo,
   latitud,
   longitud,
   fecha
) {
   try {
      // Simular delay
      await new Promise(resolve => setTimeout(resolve, 300));

      // 👉 Llamar al backend fake para entregar
      const response = await fakeBackend.entregarDocumento(consecutivo);

      // 👉 Convertir a la estructura que tu UI ya usa
      if (response.estatus === 2) {
         return {
            success: true,
            descripcion: response.descripcion,
         };
      } else {
         return {
            success: false,
            descripcion: response.descripcion || "Error en la consulta",
         };
      }

   } catch (error) {
      return { success: false, descripcion: "Error interno offline" };
   }
}
