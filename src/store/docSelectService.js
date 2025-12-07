import mockSeleccion from "../assets/mock/seleccion.json";

export async function sendSelectedDocs(consecutivo, token) {
   try {
      // Simular tiempo de red
      await new Promise(resolve => setTimeout(resolve, 300));

      // *** Si quieres validar algo, aquí ***
      if (!Array.isArray(consecutivo) && typeof consecutivo !== "number") {
         return {
            estatus: -1,
            descripcion: "Formato de consecutivo inválido"
         };
      }

      // Retornar el mock tal cual lo espera tu frontend
      return {
         estatus: mockSeleccion.estatus,
         descripcion: mockSeleccion.descripcion
      };

   } catch (error) {
      return { success: false, descripcion: "Error interno offline" };
   }
}
