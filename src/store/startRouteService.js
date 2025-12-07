import mockIniciarRuta from "../assets/mock/iniciarRuta.json";

export async function startRouteService(consecutivo, token) {
   try {
      // Simula un pequeño delay como si fuera red
      await new Promise(resolve => setTimeout(resolve, 300));

      const estatus = parseInt(mockIniciarRuta.estatus);

      if (estatus === 2) {
         return {
            success: true,
            descripcion: mockIniciarRuta.descripcion,
            documentos: [], // API real tampoco regresaba documentos
         };
      } else {
         return {
            success: false,
            descripcion: mockIniciarRuta.descripcion || "Error en la consulta",
         };
      }

   } catch (error) {
      return { success: false, descripcion: "Error interno offline" };
   }
}
