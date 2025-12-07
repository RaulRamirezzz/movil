import { fakeBackend } from "../services/fakeBackend";

export async function startRouteService(consecutivo, token) {
   try {
      // Simular un pequeño delay como si fuera red
      await new Promise(resolve => setTimeout(resolve, 300));

      // 👉 Llamar al fake backend
      const response = await fakeBackend.iniciarRuta(consecutivo);

      // 👉 Responder EXACTAMENTE en el formato que tus pantallas esperan
      if (response.estatus === 2) {
         return {
            success: true,
            descripcion: response.descripcion,
            documentos: [], // API real tampoco regresaba documentos
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
