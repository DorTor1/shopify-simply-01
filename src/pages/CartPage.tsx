
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, ShoppingCart } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import CartItem from '@/components/CartItem';
import { formatCurrency } from '@/lib/utils';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const CartPage = () => {
  const { cartItems, clearCart, getCartTotal } = useCart();
  const navigate = useNavigate();
  
  const handleCheckout = () => {
    navigate('/checkout');
  };
  
  return (
    <>
      <Header />
      <main className="pt-20 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-medium mb-8">Ваша корзина</h1>
          
          {cartItems.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <div className="flow-root">
                    <ul className="-my-6 divide-y">
                      {cartItems.map(item => (
                        <li key={item.product.id} className="py-6">
                          <CartItem item={item} />
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div className="mt-6 flex justify-between items-center">
                  <Button variant="outline" onClick={() => clearCart()}>
                    Очистить корзину
                  </Button>
                  <Button asChild variant="outline">
                    <Link to="/products" className="inline-flex items-center">
                      Продолжить покупки
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-6 shadow-sm h-fit">
                <h2 className="text-lg font-medium mb-4">Сводка заказа</h2>
                
                <div className="space-y-4">
                  <div className="flex justify-between text-base">
                    <p>Промежуточный итог</p>
                    <p>{formatCurrency(getCartTotal())}</p>
                  </div>
                  
                  <div className="flex justify-between text-base">
                    <p>Доставка</p>
                    <p>Рассчитывается при оформлении</p>
                  </div>
                  
                  <div className="flex justify-between text-base">
                    <p>Налог</p>
                    <p>Рассчитывается при оформлении</p>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex justify-between text-lg font-semibold">
                    <p>Итого</p>
                    <p>{formatCurrency(getCartTotal())}</p>
                  </div>
                </div>
                
                <Button
                  className="w-full mt-6"
                  onClick={handleCheckout}
                  disabled={cartItems.length === 0}
                >
                  Оформить заказ
                </Button>
                
                <div className="mt-4 text-center text-sm text-gray-500">
                  <p>Безопасная оплата с помощью Stripe</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="mx-auto w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center mb-6">
                <ShoppingCart className="h-12 w-12 text-gray-400" />
              </div>
              <h2 className="text-xl font-medium mb-4">Ваша корзина пуста</h2>
              <p className="text-gray-500 mb-8">Похоже, вы еще не добавили товары в корзину.</p>
              <Button asChild>
                <Link to="/products">Начать покупки</Link>
              </Button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default CartPage;
