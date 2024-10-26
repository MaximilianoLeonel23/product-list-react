import { ProductCard } from './ProductCard';
import { useContext } from 'react';
import { CartContext } from '../contexts/CartContext';
export const Menu = () => {
	const { state } = useContext(CartContext);
	return (
		<div className='flex flex-col gap-8 '>
			<h1 className='text-rose-900 font-extrabold text-5xl'>Desserts</h1>
			<div className='grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8'>
				{state.menu.map(product => {
					return <ProductCard key={product.name} productData={product} />;
				})}
			</div>
		</div>
	);
};
