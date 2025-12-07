import mockDocumentos from "../assets/mock/documentos.json";
import KEYS, { getDocs } from "../offline/offlineDB";

export async function chargeDocs(token) {
   try {
      // Simular tiempo de red
      await new Promise(resolve => setTimeout(resolve, 300));

      // *** OFFLINE MOCK ***
      const estatus = parseInt(mockDocumentos.estatus);

      if (estatus === 2) {
         return {
            success: true,
            descripcion: mockDocumentos.descripcion,
            documentos: mockDocumentos.documentos || [],
         };
      } else {
         return {
            success: false,
            descripcion: mockDocumentos.descripcion || "Error en la consulta",
         };
      }
      
   } catch (error) {
      return { success: false, descripcion: "Error interno offline" };
   }
}
