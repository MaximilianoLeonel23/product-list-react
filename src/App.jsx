import { useContext } from 'react';
import { Cart } from './components/Cart';
import { Menu } from './components/Menu';
import { OrderConfirmation } from './components/OrderConfirmation';
import { CartContext } from './contexts/CartContext';

function App() {
	const { state } = useContext(CartContext);
	return (
		<>
			<main className='relative px-4 sm:px-4 md:px-8 lg:px-[10%] py-8 flex flex-col lg:flex-row gap-8'>
				<Menu />
				<Cart />
			</main>

			{state.showOrderConfirmation && (
				<div className='fixed inset-0 flex items-end sm:items-center justify-center z-50'>
					{/* Fondo oscuro */}
					<div className='fixed inset-0 bg-black opacity-60'></div>

					<div className='w-full max-w-md bg-white rounded-t-xl overflow-hidden shadow-lg sm:rounded-xl sm:m-4 max-h-[80%] z-10'>
						<OrderConfirmation />
					</div>
				</div>
			)}
		</>
	);
}

export default App;
