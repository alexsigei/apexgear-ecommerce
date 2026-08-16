const API_URL = "https://apexgear-api-aihc.onrender.com/products";

function handleResponse(response) {
  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }

  return response.json();
}

export function getProducts() {
  return fetch(API_URL).then(handleResponse);
}

export function getProduct(id) {
  return fetch(`${API_URL}/${id}`).then(handleResponse);
}

export function createProduct(product) {
  return fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(product)
  }).then(handleResponse);
}

export function updateProduct(id, product) {
  return fetch(`${API_URL}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(product)
  }).then(handleResponse);
}

export function deleteProduct(id) {
  return fetch(`${API_URL}/${id}`, {
    method: "DELETE"
  }).then((response) => {
    if (!response.ok) {
      throw new Error(`Request failed: ${response.status}`);
    }

    return true;
  });
}