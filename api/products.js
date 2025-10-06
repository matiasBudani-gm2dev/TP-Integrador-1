const URL_API_FAKE_STORE = 'https://fakestoreapi.com'

export async function fetchProducts() {
    try {
        const response = await fetch(`${URL_API_FAKE_STORE}/products`)
        let data = await response.json();
        if (data.length === 0) return [];
        return data;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw new Error(`Error: ${error}`);
    }
}
