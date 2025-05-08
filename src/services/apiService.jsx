// Configuramos API BASE URL y headers para las peticiones a la API

const API_TOKEN = import.meta.env.VITE_API_TOKEN;
// const API_BASE_URL = import.meta.env.VITE_API_BASE;
const API_ASSOC = import.meta.env.VITE_API_ASSOCIATION;

// Hacemos una petición asíncrona con fetch para obtener los datos de la API

export async function fetchWithToken(path) {
  const url = `${path}`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      // Le pasamos el token de la API en los headers
      "API-TOKEN": API_TOKEN,
    },
  });
  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  }
  return response.json();
}
