export type Product = {
  id: string;
  name: string;
  creatorId: string;
  creator: string;
  price: number;
  images: string[];
  description: string;
  category: string;
};

export type Creator = {
  id: string;
  name: string;
  bio: string;
  avatar: string;
};

export const featuredCreators: Creator[] = [
  {
    id: "creator-1",
    name: "Pixel Pundit",
    bio: "Exploring the universe of gaming, one pixel at a time. Join the adventure!",
    avatar: "https://placehold.co/100x100.png",
  },
  {
    id: "creator-2",
    name: "Style Maven",
    bio: "Your daily dose of fashion, beauty, and lifestyle inspiration.",
    avatar: "https://placehold.co/100x100.png",
  },
  {
    id: "creator-3",
    name: "Fit Fanatic",
    bio: "Crushing fitness goals and sharing my journey. Let's get strong together!",
    avatar: "https://placehold.co/100x100.png",
  },
  {
    id: "creator-4",
    name: "Tech Guru",
    bio: "Unboxing the future of technology. Gadgets, reviews, and how-to's.",
    avatar: "https://placehold.co/100x100.png",
  },
];

export const allProducts: Product[] = [
  {
    id: "prod-1",
    name: "Pixel Pundit Classic Tee",
    creatorId: "creator-1",
    creator: "Pixel Pundit",
    price: 24.99,
    images: ["https://placehold.co/600x600.png", "https://placehold.co/600x600.png", "https://placehold.co/600x600.png"],
    description: "The official classic tee of the Pixel Pundit community. Made from 100% premium cotton for a soft, comfortable fit. Perfect for long gaming sessions or everyday wear. Features the iconic Pixel Pundit logo on the chest.",
    category: "Apparel",
  },
  {
    id: "prod-2",
    name: "Gamer's Delight Hoodie",
    creatorId: "creator-1",
    creator: "Pixel Pundit",
    price: 59.99,
    images: ["https://placehold.co/600x600.png"],
    description: "Stay cozy with this ultra-soft hoodie. Features a unique design inspired by classic 8-bit games. Limited edition!",
    category: "Apparel",
  },
  {
    id: "prod-3",
    name: "Chic 'Maven' Tote Bag",
    creatorId: "creator-2",
    creator: "Style Maven",
    price: 34.99,
    images: ["https://placehold.co/600x600.png"],
    description: "The perfect accessory for any fashion-forward individual. This spacious and durable tote bag carries all your essentials in style.",
    category: "Accessories",
  },
  {
    id: "prod-4",
    name: "Signature 'Maven' Scarf",
    creatorId: "creator-2",
    creator: "Style Maven",
    price: 29.99,
    images: ["https://placehold.co/600x600.png"],
    description: "A luxurious and versatile scarf designed by Style Maven herself. Elevate any outfit with this timeless piece.",
    category: "Accessories",
  },
  {
    id: "prod-5",
    name: "Fit Fanatic Performance Leggings",
    creatorId: "creator-3",
    creator: "Fit Fanatic",
    price: 49.99,
    images: ["https://placehold.co/600x600.png"],
    description: "Engineered for maximum comfort and flexibility, these leggings will be your new workout essential. Sweat-wicking and squat-proof.",
    category: "Fitness",
  },
  {
    id: "prod-6",
    name: "Workout Warrior Tank Top",
    creatorId: "creator-3",
    creator: "Fit Fanatic",
    price: 22.99,
    images: ["https://placehold.co/600x600.png"],
    description: "A lightweight, breathable tank to keep you cool during your most intense workouts. Features the 'Crush It' motto.",
    category: "Fitness",
  },
  {
    id: "prod-7",
    name: "Tech Guru 'Future is Now' Mug",
    creatorId: "creator-4",
    creator: "Tech Guru",
    price: 15.99,
    images: ["https://placehold.co/600x600.png"],
    description: "Power up your morning with the Tech Guru mug. A perfect gift for the tech enthusiast in your life.",
    category: "Home Goods",
  },
  {
    id: "prod-8",
    name: "Minimalist Tech Desk Mat",
    creatorId: "creator-4",
    creator: "Tech Guru",
    price: 25.99,
    images: ["https://placehold.co/600x600.png"],
    description: "Upgrade your setup with this sleek and functional desk mat. Provides a smooth surface for your mouse and keyboard.",
    category: "Accessories",
  },
];

export const featuredProducts = allProducts.slice(0, 4);

export const findCreatorById = (id: string) => featuredCreators.find(c => c.id === id);
export const findProductById = (id: string) => allProducts.find(p => p.id === id);
export const findProductsByCreatorId = (creatorId: string) => allProducts.filter(p => p.creatorId === creatorId);
