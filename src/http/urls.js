const localhost = "http://127.0.0.1:8000";

const apiURL = "/api";

export const endpoint = `${localhost}${apiURL}`;

export const productListURL = `${endpoint}/products/`;
export const categoryListURL = `http://localhost:8000/api/categories/`;
export const categoryDetailURL = (slug) => `http://localhost:8000/api/categories/${slug}`;
export const favoritesListURL = `http://localhost:8000/api/favorites/`;
export const addToFavorite = `http://localhost:8000/api/add-to-favorite/`;
export const removeFromFavorite = `http://localhost:8000/api/remove-from-favorite/`;