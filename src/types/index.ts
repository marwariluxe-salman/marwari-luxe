export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  inStock: boolean;
  featured?: boolean;
  affiliateLink?: string;
}

export interface Blog {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  heroImage: string;
  images: string[];
  category: 'Health' | 'Beauty' | 'Evergreen Health' | 'Evergreen Beauty';
  author: string;
  publishedAt: string;
  readTime: number;
  featured?: boolean;
  products?: {
    id: string;
    title: string;
    description: string;
    price: number;
    image: string;
    category: string;
  }[];
  shareButtons?: {
    facebook: string;
    twitter: string;
    linkedin: string;
    whatsapp: string;
  };
}

export interface Tool {
  id: string;
  title: string;
  description: string;
  category: 'Health' | 'Beauty' | 'General';
  icon: string;
  featured?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface NewsletterForm {
  email: string;
}

export interface CheckoutForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  paymentMethod: 'paypal' | 'stripe' | 'wise' | 'bank-transfer' | 'card';
}

export interface PaymentMethod {
  id: string;
  name: string;
  icon: string;
  description: string;
}