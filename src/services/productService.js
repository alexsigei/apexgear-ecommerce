const API_URL = "http://localhost:3001/products";

export function getProducts() {
  return fetch(API_URL)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }

      return response.json();
    });
}

export function getProduct(id) {
  return fetch(`${API_URL}/${id}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch product");
      }

      return response.json();
    });
}

export function createProduct(product) {
  return fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(product)
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to create product");
      }

      return response.json();
    });
}

export function updateProduct(id, product) {
  return fetch(`${API_URL}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(product)
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to update product");
      }

      return response.json();
    });
}

export function deleteProduct(id) {
  return fetch(`${API_URL}/${id}`, {
    method: "DELETE"
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to delete product");
      }

      return response.json();
    });
}