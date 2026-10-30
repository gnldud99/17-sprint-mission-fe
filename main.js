import {
  getArticleList,
  getArticle,
  createArticle,
  patchArticle,
  deleteArticle,
} from "./ArticleService.js";

import {
  getProductList,
  getProduct,
  createProduct,
  patchProduct,
  deleteProduct,
} from "./ProductService.js";

getArticleList(1, 10, "")
  .then((data) => {
    const article = data.list[0];

    if (!article) {
      console.log("게시글이 없어요.");
      return;
    }

    return getArticle(article.id).then((detail) => {
      console.log("게시글 상세:", detail);
    });
  })
  .catch((error) => {
    console.error("게시글 조회 실패:", error);
  });

async function showProductDetail() {
  try {
    const data = await getProductList(1, 10, "");
    const product = data.list[0];

    if (!product) {
      console.log("상품이 없어요.");
      return;
    }

    const detail = await getProduct(product.id);
    console.log("상품 상세:", detail);
  } catch (error) {
    console.error("상품 조회 실패:", error);
  }
}

showProductDetail();

createArticle({
  title: "API 연습용 게시글",
  content: "게시글 생성, 수정, 삭제를 확인하기 위한 글입니다.",
  image: "https://example.com/article-demo.jpg",
})
  .then((article) => {
    console.log("게시글 생성:", article);

    return patchArticle(article.id, {
      title: "수정된 API 연습용 게시글",
    });
  })
  .then((article) => {
    console.log("게시글 수정:", article);

    return deleteArticle(article.id);
  })
  .then((result) => {
    console.log("게시글 삭제:", result);
  })
  .catch((error) => {
    console.error("게시글 생성·수정·삭제 확인 실패:", error);
  });

async function testProductCrud() {
  try {
    const product = await createProduct({
      name: "API 연습 상품",
      description: "상품 생성, 수정, 삭제를 확인하기 위한 상품입니다.",
      price: 1000,
      tags: ["연습"],
      images: ["https://example.com/product-demo.jpg"],
    });

    console.log("상품 생성:", product);

    const updatedProduct = await patchProduct(product.id, {
      description: "수정된 API 연습 상품입니다.",
    });

    console.log("상품 수정:", updatedProduct);

    const result = await deleteProduct(product.id);
    console.log("상품 삭제:", result);
  } catch (error) {
    console.error("상품 생성·수정·삭제 확인 실패:", error);
  }
}

testProductCrud();
