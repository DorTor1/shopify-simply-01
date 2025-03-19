
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { formatCurrency, showSuccess } from '@/lib/utils';
import PaymentForm from '@/components/PaymentForm';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const shippingSchema = z.object({
  firstName: z.string().min(2, {
    message: "Имя должно содержать не менее 2 символов.",
  }),
  lastName: z.string().min(2, {
    message: "Фамилия должна содержать не менее 2 символов.",
  }),
  address: z.string().min(5, {
    message: "Адрес должен содержать не менее 5 символов.",
  }),
  city: z.string().min(2, {
    message: "Город должен содержать не менее 2 символов.",
  }),
  state: z.string().min(2, {
    message: "Область/край должны содержать не менее 2 символов.",
  }),
  zipCode: z.string().min(5, {
    message: "Почтовый индекс должен содержать не менее 5 символов.",
  }),
  country: z.string().min(2, {
    message: "Страна должна содержать не менее 2 символов.",
  }),
  phone: z.string().min(10, {
    message: "Номер телефона должен содержать не менее 10 символов.",
  }),
});

const CheckoutPage = () => {
  const { cartItems, getCartTotal, clearCart } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("shipping");
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  
  const form = useForm<z.infer<typeof shippingSchema>>({
    resolver: zodResolver(shippingSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      country: "RU",
      phone: "",
    },
  });
  
  // Redirect to login if not authenticated
  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login?redirect=checkout');
    }
    
    // Redirect to cart if cart is empty
    if (cartItems.length === 0) {
      navigate('/cart');
    }
  }, [isAuthenticated, cartItems, navigate]);
  
  const onSubmitShipping = (values: z.infer<typeof shippingSchema>) => {
    // Move to payment tab after shipping info is filled
    setActiveTab("payment");
  };
  
  const handlePayment = () => {
    setIsProcessingPayment(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessingPayment(false);
      
      // Place order and clear cart
      clearCart();
      
      // Show success message
      showSuccess("Ваш заказ успешно оформлен!");
      
      // Redirect to order confirmation
      navigate('/order-confirmation');
    }, 2000);
  };

  const subtotal = getCartTotal();
  const shipping = 10; // Flat shipping fee
  const tax = subtotal * 0.07; // 7% tax
  const total = subtotal + shipping + tax;

  return (
    <>
      <Header />
      <main className="pt-20 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-medium mb-8">Оформление заказа</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid grid-cols-2 mb-8">
                  <TabsTrigger value="shipping">Доставка</TabsTrigger>
                  <TabsTrigger value="payment" disabled={activeTab !== "payment"}>
                    Оплата
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="shipping" className="bg-white rounded-lg p-6 shadow-sm">
                  <h2 className="text-xl font-medium mb-6">Информация о доставке</h2>
                  
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmitShipping)} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="firstName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Имя</FormLabel>
                              <FormControl>
                                <Input placeholder="Иван" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="lastName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Фамилия</FormLabel>
                              <FormControl>
                                <Input placeholder="Иванов" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <FormField
                        control={form.control}
                        name="address"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Адрес</FormLabel>
                            <FormControl>
                              <Input placeholder="ул. Ленина, д. 123" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="city"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Город</FormLabel>
                              <FormControl>
                                <Input placeholder="Москва" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="state"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Область/Край</FormLabel>
                              <FormControl>
                                <Input placeholder="Московская область" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="zipCode"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Почтовый индекс</FormLabel>
                              <FormControl>
                                <Input placeholder="123456" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="country"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Страна</FormLabel>
                              <Select 
                                onValueChange={field.onChange} 
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Выберите страну" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="RU">Россия</SelectItem>
                                  <SelectItem value="BY">Беларусь</SelectItem>
                                  <SelectItem value="KZ">Казахстан</SelectItem>
                                  <SelectItem value="UA">Украина</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Номер телефона</FormLabel>
                            <FormControl>
                              <Input placeholder="+7 (123) 456-7890" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <Button type="submit" className="w-full">
                        Перейти к оплате
                      </Button>
                    </form>
                  </Form>
                </TabsContent>
                
                <TabsContent value="payment" className="bg-white rounded-lg p-6 shadow-sm">
                  <h2 className="text-xl font-medium mb-6">Информация об оплате</h2>
                  <PaymentForm onSubmit={handlePayment} isProcessing={isProcessingPayment} />
                </TabsContent>
              </Tabs>
            </div>
            
            <div>
              <div className="bg-gray-50 rounded-lg p-6 shadow-sm">
                <h2 className="text-lg font-medium mb-4">Сводка заказа</h2>
                
                <div className="space-y-4 mb-6">
                  {cartItems.map(item => (
                    <div key={item.product.id} className="flex justify-between">
                      <div className="flex items-start">
                        <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 mr-4">
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="h-full w-full object-cover object-center"
                          />
                        </div>
                        <div>
                          <h3 className="text-sm font-medium">{item.product.name}</h3>
                          <p className="text-sm text-gray-500">Кол-во: {item.quantity}</p>
                        </div>
                      </div>
                      <p className="text-sm font-medium">
                        {formatCurrency(item.product.price * item.quantity)}
                      </p>
                    </div>
                  ))}
                </div>
                
                <Separator className="mb-4" />
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <p>Промежуточный итог</p>
                    <p>{formatCurrency(subtotal)}</p>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <p>Доставка</p>
                    <p>{formatCurrency(shipping)}</p>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <p>Налог</p>
                    <p>{formatCurrency(tax)}</p>
                  </div>
                  
                  <Separator className="my-2" />
                  
                  <div className="flex justify-between text-base font-semibold">
                    <p>Итого</p>
                    <p>{formatCurrency(total)}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default CheckoutPage;
