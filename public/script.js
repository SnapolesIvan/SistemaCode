// Redirección automática después del login basado en rol (si se quiere usar con fetch más adelante)
document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.querySelector("form[action='/auth/login']");
  if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const formData = new FormData(loginForm);
      const email = formData.get("email");
      const password = formData.get("password");

      const res = await fetch("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: {
          "Content-Type": "application/json"
        }
      });

      if (res.ok) {
        const data = await res.json();
        if (data.rol === "admin") {
          window.location.href = "/admin.html";
        } else if (data.rol === "atleta") {
          window.location.href = "/atletas.html";
        }
      } else {
        alert("Credenciales incorrectas o error de servidor.");
      }
    });
  }
});
