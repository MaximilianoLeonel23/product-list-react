import { types } from '../types/types';

export const cartReducer = (state, action) => {
	switch (action.type) {
		case types.cart.setMenu:
			return {
				...state,
				menu: action.payload.menu,
			};
		case types.cart.addToCart:
			return {
				...state,
				cart: [...state.cart, action.payload.product],
			};
		case types.cart.updateCart:
			return {
				...state,
				cart: action.payload.cart,
			};

		case types.cart.confirmOrder:
			return {
				...state,
				showOrderConfirmation: true,
			};
		case types.cart.restartOrder:
			return {
				...state,
				cart: [],
				showOrderConfirmation: false,
			};
	}
};
