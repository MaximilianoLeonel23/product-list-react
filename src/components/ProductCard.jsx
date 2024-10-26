import { useContext } from 'react';
import { icons } from '../utils/icons';
import PropTypes from 'prop-types';
import { CartContext } from '../contexts/CartContext';
export const ProductCard = ({ productData }) => {
	const {
		addProductToCart,
		isInCart,
		incrementCartItemQuantity,
		decrementCartItemQuantity,
		getProductQuantityInCart,
	} = useContext(CartContext);

	const productQuantity = getProductQuantityInCart(productData);

	const handleAddToCart = () => {
		addProductToCart(productData);
	};

	if (!productData) return;
	return (
		<article className='flex flex-col gap-8'>
			<div className='relative'>
				<img
					src={productData.image.mobile}
					alt={productData.name}
					className={
						isInCart(productData) ? 'rounded-xl border-2 border-red-custom' : 'rounded-xl border-0'
					}
				/>
				<div className='w-full absolute -bottom-4 left-1/2 -translate-x-1/2 flex justify-center'>
					{isInCart(productData) && productQuantity != 0 ? (
						<div className='w-2/3 flex items-center justify-between text-base p-3 rounded-full text-white bg-red-custom border border-red-custom'>
							<button
								onClick={() => decrementCartItemQuantity(productData)}
								className='border border-white rounded-full flex items-center justify-center cursor-pointer'
							>
								<img src={icons.iconDecrement} className='p-1 w-5 h-5' />
							</button>
							<span>{productQuantity}</span>
							<button
								onClick={() => incrementCartItemQuantity(productData)}
								className='border border-white rounded-full flex items-center justify-center cursor-pointer'
							>
								<img src={icons.iconIncrement} className='p-1 w-5 h-5 ' />
							</button>
						</div>
					) : (
						<button
							onClick={handleAddToCart}
							className='w-2/3 flex items-center justify-center gap-2 p-3 rounded-full bg-white border border-rose-500 cursor-pointer'
						>
							<span>
								<img src={icons.addToCart} />
							</span>
							<p className='font-bold text-rose-900'>Add to cart</p>
						</button>
					)}
				</div>
			</div>
			<div>
				<p className='text-sm text-rose-400'>{productData.category}</p>
				<h4 className='text-base text-rose-900 font-bold'>{productData.name}</h4>
				<p className='text-base text-red-custom font-bold'>${productData.price.toFixed(2)}</p>
			</div>
		</article>
	);
};

ProductCard.propTypes = {
	productData: PropTypes.shape({
		image: PropTypes.shape({
			mobile: PropTypes.string,
			desktop: PropTypes.string,
			thumbnail: PropTypes.string,
			tablet: PropTypes.string,
		}),
		name: PropTypes.string,
		category: PropTypes.string,
		price: PropTypes.number,
	}),
};
