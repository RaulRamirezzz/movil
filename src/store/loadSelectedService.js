import mockRuta from "../assets/mock/documentosRuta.json";

export async function loadSelectedDocs(token) {
   try {
      // Simular tiempo de red
      await new Promise(resolve => setTimeout(resolve, 300));

      const estatus = parseInt(mockRuta.estatus);

      if (estatus === 2) {
         return {
            success: true,
            descripcion: mockRuta.descripcion,
            documentos: mockRuta.documentos || [],
         };
      } else {
         return {
            success: false,
            descripcion: mockRuta.descripcion || "Error en la consulta",
         };
      }

   } catch (error) {
      return { success: false, descripcion: "Error interno offline" };
   }
}
