import { fakeBackend } from "../services/fakeBackend";

export async function chargeDocs(token) {
   try {
      // Simulación de delay
      await new Promise(resolve => setTimeout(resolve, 300));

      // Llamar al backend local
      const response = await fakeBackend.getDocumentosPendientes();

      if (response.estatus === 2) {
         return {
            success: true,
            descripcion: response.descripcion,
            documentos: response.documentos || [],
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
