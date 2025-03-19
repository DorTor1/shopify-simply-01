
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
  name: z.string().min(2, {
    message: "Имя должно содержать не менее 2 символов.",
  }),
  email: z.string().email({
    message: "Пожалуйста, введите действительный адрес электронной почты.",
  }),
  password: z.string().min(6, {
    message: "Пароль должен содержать не менее 6 символов.",
  }),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Пароли не совпадают",
  path: ["confirmPassword"],
});

const RegisterPage = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    
    // Simulate API delay
    setTimeout(() => {
      const success = register(values.email, values.password, values.name);
      
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
            <h1 className="text-3xl font-medium">Создать аккаунт</h1>
            <p className="text-gray-600 mt-2">Зарегистрируйтесь, чтобы начать</p>
          </div>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Полное имя</FormLabel>
                    <FormControl>
                      <Input placeholder="Иван Иванов" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
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
                    <FormLabel>Пароль</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Подтвердите пароль</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Создание аккаунта..." : "Создать аккаунт"}
              </Button>
            </form>
          </Form>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Уже есть аккаунт?{" "}
              <Link to="/login" className="text-black font-medium hover:underline">
                Войти
              </Link>
            </p>
          </div>
          
          <div className="mt-6 text-center text-sm text-gray-500">
            <p>
              Регистрируясь, вы соглашаетесь с нашими{" "}
              <Link to="/terms" className="underline">
                Условиями использования
              </Link>{" "}
              и{" "}
              <Link to="/privacy" className="underline">
                Политикой конфиденциальности
              </Link>
              .
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default RegisterPage;
