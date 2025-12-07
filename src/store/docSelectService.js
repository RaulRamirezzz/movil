import { fakeBackend } from "../services/fakeBackend";

export async function sendSelectedDocs(consecutivo, token) {
   try {
      // Simular tiempo de red
      await new Promise(resolve => setTimeout(resolve, 300));

      // Validación mínima
      if (!Array.isArray(consecutivo)) {
         return {
            estatus: -1,
            descripcion: "Formato de consecutivo inválido"
         };
      }

      // 👉 Llamar al fake backend
      const response = await fakeBackend.cargarDocumentos(consecutivo);

      // 👉 Responder EXACTAMENTE como tu frontend lo espera
      return {
         estatus: response.estatus,
         descripcion: response.descripcion
      };

   } catch (error) {
      return { estatus: -1, descripcion: "Error interno offline" };
   }
}
