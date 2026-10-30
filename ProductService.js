const API_URL = "https://panda-market-api-crud.vercel.app";

async function request(url, options, functionName) {
  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(
        `${functionName} 실패: ${response.status} ${response.statusText}`,
      );
    }

    return await response.json();
  } catch (error) {
    console.error(`${functionName} 오류:`, error.message);
    throw error;
  }
}

export async function getProductList(page = 1, pageSize = 10, keyword = "") {
  const params = new URLSearchParams({
    page,
    pageSize,
    keyword,
  });

  return await request(
    `${API_URL}/products?${params}`,
    { method: "GET" },
    "getProductList",
  );
}

export async function getProduct(productId) {
  return await request(
    `${API_URL}/products/${productId}`,
    { method: "GET" },
    "getProduct",
  );
}

export async function createProduct({
  name,
  description,
  price,
  tags,
  images,
}) {
  return await request(
    `${API_URL}/products`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, description, price, tags, images }),
    },
    "createProduct",
  );
}

export async function patchProduct(productId, product) {
  return await request(
    `${API_URL}/products/${productId}`,
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    },
    "patchProduct",
  );
}

export async function deleteProduct(productId) {
  return await request(
    `${API_URL}/products/${productId}`,
    { method: "DELETE" },
    "deleteProduct",
  );
}
