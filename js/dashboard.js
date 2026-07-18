alert("APP CARGADA");
const supabaseUrl =
"https://awnynegmibntazfosfkb.supabase.co";
const supabaseKey =
"sb_publishable__pmKerifkN5bj2DsYjI1kQ_79q0kgGe";
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
    await supabase
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
