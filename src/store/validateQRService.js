export async function validateQRService(
   token,
   consecutivo,
   uuid
) {
   try {
      // Simular delay
      await new Promise(resolve => setTimeout(resolve, 300));

      // 👉 UUID válido para TODOS los documentos (como pediste)
      const UUID_VALIDO = "036c2ae3-b009-4ec1-b507-3990d83d5";

      // 🔍 Validamos el UUID
      if (uuid === UUID_VALIDO) {
         return {
            success: true,
            descripcion: "Folio encontrado",
         };
      } else {
         return {
            success: false,
            descripcion: "No se encontró el folio timbrado",
         };
      }

   } catch (error) {
      return { success: false, descripcion: "Error interno offline" };
   }
}
