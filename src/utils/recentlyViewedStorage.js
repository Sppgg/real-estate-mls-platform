/**
 * Manejo de almacenamiento de propiedades vistas recientemente en sessionStorage.
 * Cumple con el requisito de guardar y consultar las propiedades consultadas
 * durante la sesión actual del usuario.
 */

export const RECENTLY_VIEWED_STORAGE_KEY = "portal_inmobiliario_recently_viewed";
export const RECENTLY_VIEWED_MAX_ITEMS = 20;

/**
 * Obtiene la lista completa de propiedades vistas en la sesión actual.
 * @returns {Array} Lista de propiedades ordenadas de más reciente a más antigua.
 */
export function getRecentlyViewedFromSession() {
  if (typeof window === "undefined" || !window.sessionStorage) {
    return [];
  }
  try {
    const raw = window.sessionStorage.getItem(RECENTLY_VIEWED_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    console.error("Error al leer recently viewed de sessionStorage:", err);
    return [];
  }
}

/**
 * Guarda o actualiza una propiedad en la lista de vistas de sessionStorage.
 * Evita duplicados moviendo la propiedad al inicio (índice 0).
 * @param {Object} property Objeto con los datos de la propiedad visualizada.
 */
export function recordPropertyView(property) {
  if (typeof window === "undefined" || !window.sessionStorage || !property) {
    return;
  }

  const propId = property._id || property.reference || property.extref;
  if (!propId) return;

  try {
    const currentList = getRecentlyViewedFromSession();

    // Filtra la propiedad actual si ya existía para evitar duplicados
    const filtered = currentList.filter((item) => {
      const itemId = item._id || item.reference || item.extref;
      return (
        itemId !== propId &&
        item._id !== property._id &&
        item.reference !== property.reference &&
        (!property.extref || item.extref !== property.extref)
      );
    });

    // Guardamos una copia limpia y completa de la propiedad para que pueda renderizarse
    // directamente incluso si no está en la memoria caché
    const propertySnapshot = {
      _id: property._id || propId,
      reference: property.reference || propId,
      extref: property.extref,
      title: property.title,
      titles: property.titles,
      descriptions: property.descriptions,
      description: property.description,
      price: property.price,
      pics: Array.isArray(property.pics) ? property.pics : [],
      beds: property.beds,
      baths: property.baths,
      built: property.built,
      type: property.type,
      new_build: property.new_build,
      address: property.address,
      area: property.area,
      subarea: property.subarea,
      agency: property.agency,
      pool: property.pool,
      terrace: property.terrace,
      garden: property.garden,
      garage: property.garage,
      views: property.views,
      viewedAt: Date.now(),
    };

    // La nueva visualización queda en primer lugar (más reciente)
    const updated = [propertySnapshot, ...filtered].slice(0, RECENTLY_VIEWED_MAX_ITEMS);
    window.sessionStorage.setItem(
      RECENTLY_VIEWED_STORAGE_KEY,
      JSON.stringify(updated)
    );

    // Notificar a componentes en tiempo real
    window.dispatchEvent(
      new CustomEvent("recently_viewed_updated", { detail: updated })
    );
  } catch (err) {
    console.error("Error al registrar visualización en sessionStorage:", err);
  }
}

/**
 * Obtiene las últimas tres propiedades vistas en sessionStorage,
 * excluyendo opcionalmente la propiedad que se está visualizando en este momento.
 * @param {string|number|null} currentPropertyId ID o referencia de la propiedad actual
 * @returns {Array} Máximo 3 propiedades vistas recientemente
 */
export function getLastThreeViewed(currentPropertyId = null) {
  const all = getRecentlyViewedFromSession();
  if (!currentPropertyId) {
    return all.slice(0, 3);
  }

  const strCurrent = String(currentPropertyId).toLowerCase();

  return all
    .filter((p) => {
      const pId = p._id ? String(p._id).toLowerCase() : "";
      const pRef = p.reference ? String(p.reference).toLowerCase() : "";
      const pExt = p.extref ? String(p.extref).toLowerCase() : "";
      return pId !== strCurrent && pRef !== strCurrent && pExt !== strCurrent;
    })
    .slice(0, 3);
}

/**
 * Limpia el historial de visualizaciones en sessionStorage.
 */
export function clearRecentlyViewedSession() {
  if (typeof window !== "undefined" && window.sessionStorage) {
    try {
      window.sessionStorage.removeItem(RECENTLY_VIEWED_STORAGE_KEY);
      window.dispatchEvent(
        new CustomEvent("recently_viewed_updated", { detail: [] })
      );
    } catch (err) {
      console.error("Error al limpiar sessionStorage:", err);
    }
  }
}
