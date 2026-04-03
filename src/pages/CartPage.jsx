import CartList from '@/components/cart/CartList';
import CartSummary from '@/components/cart/CartSummary';
import React from 'react'

const CartPage = () => {
  return (
    <div className="flex-1 min-h-0 flex flex-col w-full">
        <div className='w-full px-16 flex-1 min-h-0'>
            <div className='grid md:grid-cols-3 grid-cols-1 gap-12 pt-4 h-full min-h-0 w-full'>
                <div className='col-span-2 h-full min-h-0 flex flex-col'>
                    <CartList/> 
                </div>
                <div className='col-span-1 h-full min-h-0 flex flex-col w-full'>
                    <CartSummary/>
                </div>
            </div>
        </div>
    </div>
  );
}

export default CartPage