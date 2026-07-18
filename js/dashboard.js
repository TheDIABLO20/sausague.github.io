alert("APP CARGADA");
const supabaseUrl =
"https://awwynegmibntazfosfkb.supabase.co";
const supabaseKey =
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF3d3luZWdtaWJudGF6Zm9zZmtiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQzNjA1NDIsImV4cCI6MjA5OTkzNjU0Mn0.cw8_5Sx0VWmMTwFV2oKYYQbAvkAsVF2eLGge1rBbL70";
const supabaseClient = window.supabase.createClient(
    supabaseUrl,
    supabaseKey
);

const userEmail =
document.getElementById("userEmail");

const profileData =
document.getElementById("profileData");

const logoutBtn =
document.getElementById("logoutBtn");

async function loadUser() {

    const {
        data: { user }
    } = await supabaseClient.auth.getUser();

    if(!user){
        window.location.href = "index.html";
        return;
    }

    userEmail.textContent =
    `Correo: ${user.email}`;

    const { data, error } =
    await supabaseClient
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

    if(error){
        profileData.innerHTML =
        "No se pudo cargar el perfil.";
        return;
    }

    profileData.innerHTML = `
        <p><strong>Usuario:</strong> ${data.username}</p>
        <p><strong>Correo:</strong> ${data.email}</p>
        <p><strong>Creado:</strong> ${new Date(data.created_at).toLocaleDateString()}</p>
    `;
}

logoutBtn.addEventListener(
    "click",
    async () => {

        await supabaseClient.auth.signOut();

        window.location.href =
        "index.html";
    }
);

loadUser();
