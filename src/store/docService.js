export async function chargeDocs() {
   try {
      const response = await fetch("http://25.52.133.193:1451/api/movil/documentos", {
         method: "GET",
         headers: { "Content-Type": "application/json" },
      });

      const data = await response.json();
       
      const estatus  = parseInt(data.Estatus);

      if (estatus === 2) {
         // consulta exitoso
         return {
            success: true,
            descripcion: data.Descripcion,
            documentos: data.Documentos || [],
         };
      } else {
         // error de consulta
         return {
            success: false,
            descripcion: data.Descripcion || "Error en la consulta",
         };
      }
   } catch (error) {
      return { success: false, Descripcion: "Error de conexión con el servidor" };
   }
}