import mockEntrega from "../assets/mock/entregar.json";

export async function validateDeliveryService(
    token, 
    consecutivo, 
    latitud, 
    longitud, 
    fecha
) {
   try {
      // Simular delay como si fuera una petición real
      await new Promise(resolve => setTimeout(resolve, 300));

      const estatus = parseInt(mockEntrega.estatus);

      if (estatus === 2) {
         return {
            success: true,
            descripcion: mockEntrega.descripcion,
         };
      } else {
         return {
            success: false,
            descripcion: mockEntrega.descripcion || "Error en la consulta",
         };
      }

   } catch (error) {
      return { success: false, descripcion: "Error interno offline" };
   }
}
