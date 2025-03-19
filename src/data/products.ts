
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
    name: "Minimal Desk Lamp",
    description: "A sleek, adjustable desk lamp with warm lighting for your workspace.",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    category: "lighting",
    rating: 4.7,
    reviews: [
      {
        id: 1,
        userId: 2,
        username: "Jane Smith",
        rating: 5,
        comment: "Perfect for my minimalist workspace. The light is warm and adjustable.",
        date: "2023-05-15"
      },
      {
        id: 2,
        userId: 3,
        username: "Alex Johnson",
        rating: 4,
        comment: "Great quality, but I wish it had more brightness levels.",
        date: "2023-06-02"
      }
    ],
    stock: 15,
    featured: true
  },
  {
    id: 2,
    name: "Ergonomic Office Chair",
    description: "Designed for comfort during long work sessions with adjustable lumbar support.",
    price: 299.99,
    image: "https://images.unsplash.com/photo-1505843490701-5be5d0b19d32?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    category: "furniture",
    rating: 4.9,
    reviews: [
      {
        id: 3,
        userId: 1,
        username: "John Doe",
        rating: 5,
        comment: "Best investment for my home office. My back thanks me every day.",
        date: "2023-04-23"
      }
    ],
    stock: 8,
    featured: true
  },
  {
    id: 3,
    name: "Wireless Earbuds",
    description: "High-quality sound with noise cancellation and 24-hour battery life.",
    price: 149.99,
    image: "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    category: "electronics",
    rating: 4.5,
    reviews: [
      {
        id: 4,
        userId: 4,
        username: "Emily Chen",
        rating: 4,
        comment: "Great sound quality, but they could fit better.",
        date: "2023-07-10"
      },
      {
        id: 5,
        userId: 5,
        username: "Michael Brown",
        rating: 5,
        comment: "Amazing noise cancellation! Perfect for my commute.",
        date: "2023-07-05"
      }
    ],
    stock: 20,
    featured: false
  },
  {
    id: 4,
    name: "Minimalist Wall Clock",
    description: "Simple, elegant wall clock with silent movement.",
    price: 59.99,
    image: "https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    category: "home decor",
    rating: 4.2,
    reviews: [
      {
        id: 6,
        userId: 2,
        username: "Jane Smith",
        rating: 4,
        comment: "Looks great on my wall. Very minimalist and sleek.",
        date: "2023-06-18"
      }
    ],
    stock: 12,
    featured: false
  },
  {
    id: 5,
    name: "Smart Home Hub",
    description: "Control all your smart devices from one central hub with voice commands.",
    price: 199.99,
    image: "https://images.unsplash.com/photo-1558002038-1055e2ffad41?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    category: "electronics",
    rating: 4.8,
    reviews: [
      {
        id: 7,
        userId: 3,
        username: "Alex Johnson",
        rating: 5,
        comment: "Integrated perfectly with all my devices. Setup was a breeze.",
        date: "2023-05-30"
      }
    ],
    stock: 7,
    featured: true
  },
  {
    id: 6,
    name: "Ceramic Coffee Mug Set",
    description: "Set of 4 handcrafted ceramic mugs in minimalist design.",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1530373239006-a52d8c0bc1b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    category: "kitchen",
    rating: 4.6,
    reviews: [
      {
        id: 8,
        userId: 5,
        username: "Michael Brown",
        rating: 5,
        comment: "Beautiful mugs! They keep my coffee warm for much longer than expected.",
        date: "2023-07-12"
      },
      {
        id: 9,
        userId: 1,
        username: "John Doe",
        rating: 4,
        comment: "Great quality but slightly smaller than I expected.",
        date: "2023-07-08"
      }
    ],
    stock: 25,
    featured: false
  },
  {
    id: 7,
    name: "Portable Bluetooth Speaker",
    description: "Waterproof, rugged design with 360° sound and 20-hour battery life.",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    category: "electronics",
    rating: 4.4,
    reviews: [
      {
        id: 10,
        userId: 4,
        username: "Emily Chen",
        rating: 4,
        comment: "Great sound for its size. Battery life is impressive.",
        date: "2023-07-03"
      }
    ],
    stock: 18,
    featured: false
  },
  {
    id: 8,
    name: "Wool Throw Blanket",
    description: "Soft, cozy blanket made from 100% merino wool.",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    category: "home decor",
    rating: 4.7,
    reviews: [
      {
        id: 11,
        userId: 2,
        username: "Jane Smith",
        rating: 5,
        comment: "So soft and warm! Perfect for chilly evenings.",
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
    name: "John Doe",
    orders: []
  },
  {
    id: 2,
    email: "jane@example.com",
    password: "password123",
    name: "Jane Smith",
    orders: []
  }
];

// Categories derived from products
export const getCategories = (): string[] => {
  const categoriesSet = new Set(products.map(product => product.category));
  return Array.from(categoriesSet);
};
