import PropTypes from 'prop-types';
import { useEffect, useReducer } from 'react';
import data from '../data.json';
import { CartContext } from '../contexts/CartContext';
import { cartReducer } from '../reducers/CartReducer';
import { types } from '../types/types';

const initialState = {
	menu: [],
	cart: [],
	showOrderConfirmation: false,
};

export const CartProvider = ({ children }) => {
	const [state, dispatch] = useReducer(cartReducer, initialState);

	useEffect(() => {
		const updatedProducts = data.map(product => {
			return { ...product, quantity: 1, totalPrice: 1 * product.price };
		});
		dispatch({
			type: types.cart.setMenu,
			payload: {
				menu: updatedProducts,
			},
		});
	}, []);

	const addProductToCart = product => {
		if (isInCart(product)) return;
		dispatch({
			type: types.cart.addToCart,
			payload: {
				product,
			},
		});
	};

	const removeProductFromCart = product => {
		if (isInCart(product)) {
			const updatedCartItems = state.cart.filter(item => {
				return item.name !== product.name;
			});
			dispatch({
				type: types.cart.updateCart,
				payload: {
					cart: updatedCartItems,
				},
			});
		}
	};

	const getProductQuantityInCart = product => {
		const item = state.cart.find(item => item.name === product.name);
		return item ? item.quantity : 0;
	};

	const incrementCartItemQuantity = product => {
		if (state.cart.length == 0) return;
		const updatedCartItems = state.cart.map(item => {
			if (item.name == product.name) {
				return { ...item, quantity: item.quantity + 1 };
			}
			return item;
		});
		dispatch({
			type: types.cart.updateCart,
			payload: {
				cart: updatedCartItems,
			},
		});
	};

	const decrementCartItemQuantity = product => {
		if (state.cart.length == 0) return;
		const updatedCartItems = state.cart
			.map(item => {
				if (item.name == product.name) {
					if (item.quantity - 1 === 0) {
						removeProductFromCart(product);
						return null;
					}
					return { ...item, quantity: item.quantity - 1 };
				}
				return item;
			})
			.filter(item => item !== null);
		dispatch({
			type: types.cart.updateCart,
			payload: {
				cart: updatedCartItems,
			},
		});
	};

	const isInCart = product => {
		const isInCart = state.cart.find(item => item.name == product.name);
		if (isInCart) {
			return true;
		} else {
			return false;
		}
	};

	const confirmOrder = () => {
		dispatch({
			type: types.cart.confirmOrder,
		});
	};

	const restartOrder = () => {
		dispatch({
			type: types.cart.restartOrder,
		});
	};

	return (
		<CartContext.Provider
			value={{
				state,
				addProductToCart,
				removeProductFromCart,
				getProductQuantityInCart,
				isInCart,
				incrementCartItemQuantity,
				decrementCartItemQuantity,
				confirmOrder,
				restartOrder,
			}}
		>
			{children}
		</CartContext.Provider>
	);
};

CartProvider.propTypes = {
	children: PropTypes.node,
};
