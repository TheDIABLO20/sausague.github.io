alert("APP CARGADA");
import { createClient }
from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const supabaseUrl =
"https://awnynegmibntazfosfkb.supabase.co";

const supabaseKey =
"sb_publishable__pmKerifkN5bj2DsYjI1kQ_79q0kgGe";

const supabase = createClient(
    supabaseUrl,
    supabaseKey
);

let registerMode = false;

const title = document.getElementById("title");
const actionBtn = document.getElementById("actionBtn");
const switchMode = document.getElementById("switchMode");
const message = document.getElementById("message");

switchMode.addEventListener("click", () => {

    registerMode = !registerMode;

    title.textContent = registerMode
        ? "Crear Cuenta"
        : "Iniciar Sesión";

    actionBtn.textContent = registerMode
        ? "Registrarme"
        : "Iniciar Sesión";

    switchMode.textContent = registerMode
        ? "¿Ya tienes cuenta? Inicia sesión"
        : "¿No tienes cuenta? Regístrate";
});

actionBtn.addEventListener("click", async () => {

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {

        if(registerMode){

            const { error } =
            await supabase.auth.signUp({
                email,
                password
            });

            if(error) throw error;

            message.innerHTML =
            "✅ Cuenta creada correctamente.";

        }else{

            const { error } =
            await supabase.auth.signInWithPassword({
                email,
                password
            });

            if(error) throw error;

            message.innerHTML =
            "🎉 Bienvenido.";

            setTimeout(() => {
                window.location.href =
                "dashboard.html";
            }, 1000);
        }

    } catch(error){

        message.innerHTML =
        `❌ ${error.message}`;
    }

});
