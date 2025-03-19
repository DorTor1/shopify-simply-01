
import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const OrderConfirmation = () => {
  const orderNumber = Math.floor(100000 + Math.random() * 900000);
  const orderDate = new Date().toLocaleDateString('ru-RU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <>
      <Header />
      <main className="pt-20 min-h-screen">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
          <div className="text-center mb-10">
            <div className="inline-flex h-24 w-24 items-center justify-center rounded-full bg-green-100 mb-6">
              <CheckCircle className="h-16 w-16 text-green-600" />
            </div>
            <h1 className="text-3xl font-medium mb-2">Заказ подтвержден!</h1>
            <p className="text-gray-600">
              Спасибо за покупку! Ваш заказ принят.
            </p>
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow-sm mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h2 className="text-sm font-medium uppercase tracking-wider text-gray-500 mb-2">
                  Информация о заказе
                </h2>
                <p className="text-sm mb-1">
                  <span className="font-medium">Номер заказа:</span> #{orderNumber}
                </p>
                <p className="text-sm mb-1">
                  <span className="font-medium">Дата:</span> {orderDate}
                </p>
                <p className="text-sm mb-1">
                  <span className="font-medium">Способ оплаты:</span> Кредитная карта
                </p>
                <p className="text-sm">
                  <span className="font-medium">Статус:</span>{" "}
                  <span className="text-green-600">В обработке</span>
                </p>
              </div>
              
              <div>
                <h2 className="text-sm font-medium uppercase tracking-wider text-gray-500 mb-2">
                  Информация о доставке
                </h2>
                <p className="text-sm mb-1">
                  <span className="font-medium">Способ доставки:</span> Стандартная доставка
                </p>
                <p className="text-sm mb-1">
                  <span className="font-medium">Ожидаемая доставка:</span>{" "}
                  {new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString('ru-RU', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow-sm mb-8">
            <h2 className="text-lg font-medium mb-4">Что будет дальше?</h2>
            <ol className="space-y-4">
              <li className="flex">
                <div className="flex-shrink-0 mr-3">
                  <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center">
                    <span className="text-gray-600 font-medium">1</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-base font-medium">Обработка заказа</h3>
                  <p className="text-sm text-gray-600">
                    Ваш заказ сейчас обрабатывается. Вскоре вы получите подтверждение по электронной почте.
                  </p>
                </div>
              </li>
              
              <li className="flex">
                <div className="flex-shrink-0 mr-3">
                  <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center">
                    <span className="text-gray-600 font-medium">2</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-base font-medium">Отправка заказа</h3>
                  <p className="text-sm text-gray-600">
                    Как только ваш заказ будет готов, мы отправим его вам и отправим подтверждение по электронной почте с информацией для отслеживания.
                  </p>
                </div>
              </li>
              
              <li className="flex">
                <div className="flex-shrink-0 mr-3">
                  <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center">
                    <span className="text-gray-600 font-medium">3</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-base font-medium">Доставка</h3>
                  <p className="text-sm text-gray-600">
                    Ваш заказ будет доставлен по указанному адресу. Ожидайте!
                  </p>
                </div>
              </li>
            </ol>
          </div>
          
          <div className="text-center">
            <p className="text-gray-600 mb-4">
              Есть вопросы по вашему заказу? Проверьте статус заказа в своем аккаунте или свяжитесь с нашей службой поддержки.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild>
                <Link to="/products">Продолжить покупки</Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/account">Мой аккаунт</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default OrderConfirmation;
