export async function getCategories() {
  const ENDPOINT = 'https://api.mercadolibre.com/sites/MLB/categories';
  const request = await fetch(ENDPOINT);
  const response = await request.json();
  return response;
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  const ENDPOINTQUERY = `https://api.mercadolibre.com/sites/MLB/search?q=${query}`;
  const ENDPOINTCATEGORY = `https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}`;
  if (categoryId || categoryId === '') {
    const request = await fetch(ENDPOINTCATEGORY);
    const response = await request.json();
    return response;
  }
  if (query || query === '') {
    const request = await fetch(ENDPOINTQUERY);
    const response = await request.json();
    return response.results;
  }
}

export async function getProductById(productId) {
  const ENDPOINT = `https://api.mercadolibre.com/items/${productId}`;
  const request = await fetch(ENDPOINT);
  const response = await request.json();
  return response;
}
