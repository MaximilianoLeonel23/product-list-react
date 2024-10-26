import PropTypes from 'prop-types';

export const OrderItem = ({ itemData }) => {
	return (
		<article className='flex items-center py-4 gap-4 border-b border-rose-100'>
			<div className='w-1/5'>
				<img src={itemData.image.thumbnail} className='rounded-md' />
			</div>
			<div className='flex flex-col gap-2 w-3/5 '>
				<p className='text-rose-900 text-xs font-bold md:text-sm'>{itemData.name}</p>
				<div className='flex gap-2'>
					<span className='text-red-custom text-xs md:text-sm'>{itemData.quantity}x</span>
					<p className='text-rose-500 text-xs md:text-sm'>@${itemData.price}</p>
				</div>
			</div>
			<div className='w-1/5'>
				<span className='text-rose-900 text-xs font-medium md:text-sm'>
					${(itemData.quantity * itemData.price).toFixed(2)}
				</span>
			</div>
		</article>
	);
};

OrderItem.propTypes = {
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
