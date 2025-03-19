
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useAuth } from '@/context/AuthContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const formSchema = z.object({
  email: z.string().email({
    message: "Пожалуйста, введите действительный адрес электронной почты.",
  }),
  password: z.string().min(6, {
    message: "Пароль должен содержать не менее 6 символов.",
  }),
});

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    
    // Simulate API delay
    setTimeout(() => {
      const success = login(values.email, values.password);
      
      if (success) {
        navigate('/');
      }
      
      setIsLoading(false);
    }, 1000);
  };

  return (
    <>
      <Header />
      <main className="pt-20 min-h-screen flex items-center justify-center">
        <div className="max-w-md w-full mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-medium">Добро пожаловать</h1>
            <p className="text-gray-600 mt-2">Войдите в свой аккаунт</p>
          </div>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Электронная почта</FormLabel>
                    <FormControl>
                      <Input placeholder="вы@пример.ру" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center justify-between">
                      <FormLabel>Пароль</FormLabel>
                      <Link to="/forgot-password" className="text-sm text-gray-600 hover:text-black">
                        Забыли пароль?
                      </Link>
                    </div>
                    <FormControl>
                      <Input type="password" placeholder="••••••" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Вход..." : "Войти"}
              </Button>
            </form>
          </Form>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Нет аккаунта?{" "}
              <Link to="/register" className="text-black font-medium hover:underline">
                Зарегистрироваться
              </Link>
            </p>
          </div>
          
          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Или продолжить с</span>
              </div>
            </div>
            
            <div className="mt-6 grid grid-cols-2 gap-3">
              <Button variant="outline" className="w-full">
                Google
              </Button>
              <Button variant="outline" className="w-full">
                Apple
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default LoginPage;
