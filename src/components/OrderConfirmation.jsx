import { useContext } from 'react';
import { icons } from '../utils/icons';
import { OrderItem } from './OrderItem';
import { CartContext } from '../contexts/CartContext';

export const OrderConfirmation = () => {
	const { state, restartOrder } = useContext(CartContext);

	const orderTotal = state.cart.reduce((acc, curr) => acc + curr.quantity * curr.price, 0);

	return (
		<div className='flex flex-col gap-8 p-8 bg-white rounded-t-xl h-full'>
			<div className='flex flex-col gap-4'>
				<span className='w-8'>
					<img src={icons.orderConfirmed} alt='Order Confirmed Icon' />
				</span>
				<div>
					<h2 className='text-rose-900 text-4xl sm:text-3xl font-bold'>Order Confirmed</h2>
					<p className='text-rose-500 text-sm'>We hope you enjoy your food!</p>
				</div>

				<div className='bg-rose-50 flex flex-col px-4 py-2 rounded-xl max-h-60 overflow-y-auto'>
					{state.cart.map(item => (
						<OrderItem key={item.name} itemData={item} />
					))}
					<div className='flex items-center justify-between py-4'>
						<p className='text-rose-500 text-sm font-medium'>Order Total</p>
						<span className='text-rose-900 text-2xl font-bold'>${orderTotal.toFixed(2)}</span>
					</div>
				</div>

				<button
					className='bg-red-custom text-white text-sm font-medium p-4 rounded-full'
					onClick={restartOrder}
				>
					Start New Order
				</button>
			</div>
		</div>
	);
};
