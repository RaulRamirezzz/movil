import { fakeBackend } from "../services/fakeBackend";

export async function loadSelectedDocs(token) {
   try {
      // Simular tiempo de red
      await new Promise(resolve => setTimeout(resolve, 300));

      // 👉 Llamar al fake backend que devuelve CARGADOS + EN RUTA
      const response = await fakeBackend.getDocumentosRuta();

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
