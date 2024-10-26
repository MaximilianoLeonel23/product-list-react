import { useContext } from 'react';
import { icons } from '../utils/icons';
import { CartItem } from './CartItem';
import { CartContext } from '../contexts/CartContext';

export const Cart = () => {
	const { state, confirmOrder } = useContext(CartContext);

	const orderTotal = state.cart.reduce((acc, curr) => acc + curr.quantity * curr.price, 0);
	const totalItems = state.cart.reduce((acc, curr) => acc + curr.quantity, 0);
	return (
		<div className='min-w-[25%] h-fit flex flex-col gap-8 bg-white rounded-xl p-4'>
			<h2 className='text-2xl sm:text-xl text-red-custom font-bold'>Your Cart ({totalItems})</h2>
			{state.cart.length > 0 ? (
				<>
					<div className='flex flex-col'>
						{state.cart.map(item => {
							return <CartItem key={item.name} itemData={item} />;
						})}
					</div>
					<div className='flex items-center justify-between'>
						<p className='text-sm text-rose-900'>Order Total</p>
						<h3 className='text-rose-900 text-lg font-bold'>${orderTotal.toFixed(2)}</h3>
					</div>

					<div className='bg-rose-50 flex items-center justify-center p-4 gap-2 rounded-xl'>
						<span>
							<img src={icons.carbonNeutral} />
						</span>
						<p className='text-sm text-rose-900'>
							This is a <b>carbon-neutral</b> delivery
						</p>
					</div>
					<button
						onClick={confirmOrder}
						className='w-full bg-red-custom text-white text-base py-3 rounded-full hover:brightness-90 transition duration-150'
					>
						Confirm Order
					</button>
				</>
			) : (
				<div className='flex flex-col items-center justify-center py-8'>
					<img src={icons.emptyCart} />
					<p className='text-sm text-rose-500 font-bold'>Your added items will appear here</p>
				</div>
			)}
		</div>
	);
};
