
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { products } from '@/data/products';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FeaturedProducts from '@/components/FeaturedProducts';

const Index = () => {
  const featuredProducts = products.filter(product => product.featured);
  const newArrivals = [...products].sort(() => 0.5 - Math.random()).slice(0, 4);

  return (
    <>
      <Header />
      <main className="pt-16">
        {/* Hero section */}
        <section className="relative h-[80vh] flex items-center overflow-hidden bg-gray-50">
          <div className="absolute inset-0 z-0 overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
              alt="Hero background"
              className="object-cover object-center w-full h-full"
            />
            <div className="absolute inset-0 bg-black/40"></div>
          </div>
          
          <div className="container relative z-10 px-4 mx-auto text-center text-white">
            <h1 className="text-4xl md:text-6xl font-medium mb-6 animate-slide-in">
              Элегантность в простоте
            </h1>
            <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto opacity-90 animate-slide-in" style={{ animationDelay: '100ms' }}>
              Откройте для себя нашу коллекцию минималистичных товаров, созданных для улучшения вашей повседневной жизни.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-in" style={{ animationDelay: '200ms' }}>
              <Button asChild size="lg" className="bg-white text-black hover:bg-gray-100">
                <Link to="/products">Купить сейчас</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                <Link to="/about">Узнать больше</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Categories section */}
        <section className="py-16 bg-white">
          <div className="container px-4 mx-auto">
            <h2 className="text-2xl font-medium mb-8 text-center">Магазин по категориям</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {[
                {name: 'Электроника', key: 'electronics'},
                {name: 'Мебель', key: 'furniture'},
                {name: 'Освещение', key: 'lighting'},
                {name: 'Декор для дома', key: 'home decor'}
              ].map((category) => (
                <Link 
                  key={category.key}
                  to={`/products?category=${category.key}`}
                  className="group relative overflow-hidden rounded-lg aspect-square bg-gray-100 transition-transform hover:scale-[1.02]"
                >
                  <img
                    src={`https://source.unsplash.com/random/600x600?${category.key}`}
                    alt={category.name}
                    className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/30 transition-opacity group-hover:bg-black/40">
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="text-white text-xl font-medium capitalize">{category.name}</h3>
                      <p className="text-white/80 text-sm mt-1 flex items-center">
                        Купить сейчас
                        <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Featured products */}
        <FeaturedProducts 
          title="Рекомендуемые товары" 
          products={featuredProducts} 
          viewAllLink="/products" 
        />

        {/* New arrivals */}
        <FeaturedProducts 
          title="Новые поступления" 
          products={newArrivals} 
          viewAllLink="/products" 
        />

        {/* CTA section */}
        <section className="py-20 bg-gray-50">
          <div className="container px-4 mx-auto text-center">
            <h2 className="text-3xl font-medium mb-4">Готовы преобразить своё пространство?</h2>
            <p className="text-gray-600 mb-8 max-w-xl mx-auto">
              Наша коллекция минималистичных товаров создана для того, чтобы привнести элегантность и функциональность в вашу повседневную жизнь.
            </p>
            <Button asChild size="lg">
              <Link to="/products">Посмотреть все товары</Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Index;
