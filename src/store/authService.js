export async function loginAuth(usuario, password) {
   try {
      const response = await fetch("http://25.52.133.193:1451/api/movil/login", {
         method: "POST",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify({
            usuario,
            contraseña: password
         }),
      });

      const data = await response.json();
      const Estatus  = parseInt(data.Estatus);

      if (Estatus === 2) {
         // login exitoso
         return {
            success: true,
            Token: data.Token,
            Rol: data.Rol,
            Nombre: data.Nombre,
            Descripcion: data.Descripcion,
         };
      } else {
         // error de login
         return {
            success: false,
            Descripcion: data.Descripcion || "Error en las credenciales",
         };
      }
   } catch (error) {
      return { success: false, Descripcion: "Error de conexión con el servidor" };
   }
}