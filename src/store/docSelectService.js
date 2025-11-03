export async function sendSelectedDocs(consecutivo, token) {
   try {
      const response = await fetch("http://25.52.133.193:1451/api/movil/documentos/seleccion", {
         method: "POST",
         headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ consecutivo }),
      });

      const data = await response.json();
      return data;

   } catch (error) {
      return { success: false, Descripcion: "Error de conexión con el servidor" };
   }
}