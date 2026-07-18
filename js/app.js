console.log("APP CARGADA");
const supabaseUrl =
"https://awwynegmibntazfosfkb.supabase.co";
const supabaseKey =
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF3d3luZWdtaWJudGF6Zm9zZmtiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQzNjA1NDIsImV4cCI6MjA5OTkzNjU0Mn0.cw8_5Sx0VWmMTwFV2oKYYQbAvkAsVF2eLGge1rBbL70";
const supabaseClient = window.supabase.createClient(
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
            await supabaseClient.auth.signUp({
                email,
                password
            });

            if(error) throw error;

            message.innerHTML =
            "✅ Cuenta creada correctamente.";

        }else{

            const { error } =
            await supabaseClient.auth.signInWithPassword({
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
