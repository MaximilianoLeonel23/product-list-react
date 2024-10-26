import PropTypes from 'prop-types';
import { icons } from '../utils/icons';
import { useContext } from 'react';
import { CartContext } from '../contexts/CartContext';

export const CartItem = ({ itemData }) => {
	const { removeProductFromCart } = useContext(CartContext);

	return (
		<div className='flex items-center justify-between border-b border-rose-100 py-4'>
			<div className='flex flex-col items-start gap-2'>
				<h4 className='text-sm text-rose-900 font-bold'>{itemData.name}</h4>
				<div className='grid grid-cols-3 items-start gap-2 text-left '>
					<p className='text-sm text-red-custom font-bold flex-1'>{itemData.quantity}x</p>
					<p className='text-sm text-rose-400 font-light flex-1'>@${itemData.price.toFixed(2)}</p>
					<p className='text-sm text-rose-500 font-bold flex-1'>
						${(itemData.quantity * itemData.price).toFixed(2)}
					</p>
				</div>
			</div>
			<button
				onClick={() => removeProductFromCart(itemData)}
				className='flex items-center justify-center p-1 border border-rose-500 rounded-full'
			>
				<img src={icons.removeItem} />
			</button>
		</div>
	);
};

CartItem.propTypes = {
	itemData: PropTypes.shape({
		name: PropTypes.string,
		category: PropTypes.string,
		price: PropTypes.number,
		quantity: PropTypes.number,
		totalPrice: PropTypes.number,
		image: PropTypes.shape({
			mobile: PropTypes.string,
			desktop: PropTypes.string,
			thumbnail: PropTypes.string,
			tablet: PropTypes.string,
		}),
	}),
};
