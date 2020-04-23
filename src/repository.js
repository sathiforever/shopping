import axios from 'axios';
import * as data from './components/data/cart.json';

console.log("dsfdsfds="+data.items)

// export function getProducts() {
// 	return JSON.stringify(data.items);
// }

// export function getCartProducts(cart) {
// 	return axios.post(`${BASE_URL}/api/products`, {cart})
// 		.then(response => response.data);
// }

/*const BASE_URL = 'https://api.jsonbin.io/b/5e8c3ad0ff9c906bdf1d5380';

export function getProducts() {
	return axios.get(`${BASE_URL}`)
		.then(response => response.data.items)
}

export function getCartProducts(cart) {
	return axios.post(`${BASE_URL}`, {cart})
		.then(response => response.data);
}
 */
