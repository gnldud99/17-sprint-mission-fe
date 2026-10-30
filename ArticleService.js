const API_URL = "https://panda-market-api-crud.vercel.app";

function request(url, options, functionName) {
  return fetch(url, options)
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          `${functionName} 실패: ${response.status} ${response.statusText}`,
        );
      }

      return response.json();
    })
    .catch((error) => {
      console.error(`${functionName} 오류:`, error.message);
      throw error;
    });
}

export function getArticleList(page = 1, pageSize = 10, keyword = "") {
  const params = new URLSearchParams({
    page,
    pageSize,
    keyword,
  });

  return request(
    `${API_URL}/articles?${params}`,
    { method: "GET" },
    "getArticleList",
  );
}

export function getArticle(articleId) {
  return request(
    `${API_URL}/articles/${articleId}`,
    { method: "GET" },
    "getArticle",
  );
}

export function createArticle({ title, content, image }) {
  return request(
    `${API_URL}/articles`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content, image }),
    },
    "createArticle",
  );
}

export function patchArticle(articleId, article) {
  return request(
    `${API_URL}/articles/${articleId}`,
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(article),
    },
    "patchArticle",
  );
}

export function deleteArticle(articleId) {
  return request(
    `${API_URL}/articles/${articleId}`,
    { method: "DELETE" },
    "deleteArticle",
  );
}
