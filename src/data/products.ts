export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  rating: number;
  reviews: Review[];
  stock: number;
  featured: boolean;
}

export interface Review {
  id: number;
  userId: number;
  username: string;
  rating: number;
  comment: string;
  date: string;
}

export interface User {
  id: number;
  email: string;
  password: string;
  name: string;
  orders: Order[];
}

export interface Order {
  id: number;
  userId: number;
  products: { productId: number; quantity: number }[];
  totalAmount: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  date: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

// Sample product data
export const products: Product[] = [
  {
    id: 1,
    name: "Минималистичная настольная лампа",
    description: "Стильная регулируемая настольная лампа с теплым освещением для вашего рабочего пространства.",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    category: "lighting",
    rating: 4.7,
    reviews: [
      {
        id: 1,
        userId: 2,
        username: "Яна Смирнова",
        rating: 5,
        comment: "Идеально подходит для моего минималистичного рабочего пространства. Свет теплый и регулируемый.",
        date: "2023-05-15"
      },
      {
        id: 2,
        userId: 3,
        username: "Алексей Иванов",
        rating: 4,
        comment: "Отличное качество, но хотелось бы больше уровней яркости.",
        date: "2023-06-02"
      }
    ],
    stock: 15,
    featured: true
  },
  {
    id: 2,
    name: "Эргономичное офисное кресло",
    description: "Разработано для комфорта во время длительной работы с регулируемой поддержкой поясницы.",
    price: 299.99,
    image: "https://dxstore.ru/wp-content/uploads/2023/03/ergonomichnoe-kompyuternoe-kreslo-eureka-norn-seryj-01.jpg",
    category: "furniture",
    rating: 4.9,
    reviews: [
      {
        id: 3,
        userId: 1,
        username: "Иван Петров",
        rating: 5,
        comment: "Лучшее вложение для моего домашнего офиса. Моя спина благодарит меня каждый день.",
        date: "2023-04-23"
      }
    ],
    stock: 8,
    featured: true
  },
  {
    id: 3,
    name: "Беспроводные наушники",
    description: "Высококачественный звук с шумоподавлением и 24-часовым временем автономной работы.",
    price: 149.99,
    image: "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    category: "electronics",
    rating: 2,
    reviews: [
      {
        id: 4,
        userId: 4,
        username: "Дмитрий Якушин",
        rating: 2,
        comment: "Отличное качество звука, но они могли бы лучше подойти для моего уха.",
        date: "2023-07-10"
      },
      {
        id: 5,
        userId: 5,
        username: "Александр Петров",
        rating: 2,
        comment: "Отличное шумоподавление! Идеально для моего поездки.",
        date: "2023-07-05"
      }
    ],
    stock: 20,
    featured: false
  },
  {
    id: 4,
    name: "Минималистичные настенные часы",
    description: "Простой, элегантный настенные часы с бесшумным движением.",
    price: 59.99,
    image: "https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    category: "home decor",
    rating: 4.2,
    reviews: [
      {
        id: 6,
        userId: 2,
        username: "Елена Иванова",
        rating: 4,
        comment: "Выглядит великолепно на моей стене. Очень минималистично и стильно.",
        date: "2023-06-18"
      }
    ],
    stock: 12,
    featured: false
  },
  {
    id: 5,
    name: "Умный домашний центр",
    description: "Управление всеми вашими умными устройствами из одного центра с голосовыми командами.",
    price: 199.99,
    image: "https://images.unsplash.com/photo-1621274147744-cfb5694bb233?q=80&w=2060&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "electronics",
    rating: 4.8,
    reviews: [
      {
        id: 7,
        userId: 3,
        username: "Александр Петров",
        rating: 5,
        comment: "Интегрировался идеально со всеми моими устройствами. Настройка была легкой.",
        date: "2023-05-30"
      }
    ],
    stock: 7,
    featured: true
  },
  {
    id: 6,
    name: "Керамический кофейный набор",
    description: "Набор из 4 ручной работы керамических чашек в минималистичном дизайне.",
    price: 49.99,
    image: "https://plus.unsplash.com/premium_photo-1714675739730-9d1f46b775c7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "kitchen",
    rating: 4.6,
    reviews: [
      {
        id: 8,
        userId: 5,
        username: "Александр Петров",
        rating: 5,
        comment: "Красивые чашки! Они сохраняют мой кофе теплым намного дольше, чем я ожидал.",
        date: "2023-07-12"
      },
      {
        id: 9,
        userId: 1,
        username: "Иван Петров",
        rating: 4,
        comment: "Отличное качество, но немного меньше, чем я ожидал.",
        date: "2023-07-08"
      }
    ],
    stock: 25,
    featured: false
  },
  {
    id: 7,
    name: "Портативная Bluetooth-колонка",
    description: "Водонепроницаемый, прочный дизайн с 360° звуком и 20-часовым временем автономной работы.",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    category: "electronics",
    rating: 4.4,
    reviews: [
      {
        id: 10,
        userId: 4,
        username: "Дмитрий Якушин",
        rating: 4,
        comment: "Отличный звук для своего размера. Время автономной работы впечатляет.",
        date: "2023-07-03"
      }
    ],
    stock: 18,
    featured: false
  },
  {
    id: 8,
    name: "Шерстяная покрывало",
    description: "Мягкое, теплое покрывало из 100% шерсти.",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    category: "home decor",
    rating: 4.7,
    reviews: [
      {
        id: 11,
        userId: 2,
        username: "Елена Иванова",
        rating: 5,
        comment: "Очень мягкое и теплое! Идеально для холодных вечеров.",
        date: "2023-06-25"
      }
    ],
    stock: 10,
    featured: false
  }
];

// Sample users
export const users: User[] = [
  {
    id: 1,
    email: "john@example.com",
    password: "password123",
    name: "Иван Петров",
    orders: []
  },
  {
    id: 2,
    email: "jane@example.com",
    password: "password123",
    name: "Елена Иванова",
    orders: []
  }
];

// Categories derived from products
export const getCategories = (): string[] => {
  const categoriesSet = new Set(products.map(product => product.category));
  return Array.from(categoriesSet);
};
