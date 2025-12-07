import mockLogin from "../assets/mock/login.json";

export async function loginAuth(usuario, password) {
   try {
      // Simular tiempo de red (opcional)
      await new Promise(resolve => setTimeout(resolve, 300));

      // *** VALIDACIÓN OFFLINE ***
      // Puedes cambiar esto según los usuarios que quieras permitir
      const usuarioValido = mockLogin.nombre.split(" ")[0].toLowerCase();
      
      if (usuario.toLowerCase() === usuarioValido && password !== "") {

         return {
            success: true,
            Token: mockLogin.token,
            Rol: mockLogin.rol,
            Nombre: mockLogin.nombre,
            Descripcion: mockLogin.descripcion,
         };
      }

      // ❌ Credenciales incorrectas (mismo comportamiento que tu API)
      return {
         success: false,
         Descripcion: "Credenciales incorrectas",
      };

   } catch (error) {
      return {
         success: false,
         Descripcion: "Error interno offline",
      };
   }
}
