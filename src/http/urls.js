const localhost = "http://127.0.0.1:8000";

const apiURL = "/api";

export const endpoint = `${localhost}${apiURL}`;

export const productListURL = `${endpoint}/products/`;
export const categoryListURL = `http://localhost:8000/api/categories/`;
export const favoritesListURL = `http://localhost:8000/api/favorites/`;
// export const productDetailURL = id => `${endpoint}/products/${id}/`;