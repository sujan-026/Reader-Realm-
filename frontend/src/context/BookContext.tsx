
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { books as initialBooks } from '../data/books';

export type Book = {
  id: string;
  title: string;
  author: string;
  coverImage: string;
  blurImage?: string;
  description: string;
  rating: number;
  reviews: Review[];
  genres: string[];
  publicationDate: string;
  featured?: boolean;
};

export type Review = {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  text: string;
  date: string;
};

type BookContextType = {
  books: Book[];
  featuredBooks: Book[];
  filteredBooks: Book[];
  searchTerm: string;
  selectedGenres: string[];
  setSearchTerm: (term: string) => void;
  setSelectedGenres: (genres: string[]) => void;
  addReview: (bookId: string, review: Omit<Review, 'id' | 'date'>) => void;
  getBook: (id: string) => Book | undefined;
  getAllGenres: () => string[];
};

const BookContext = createContext<BookContextType | undefined>(undefined);

export const BookProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [books, setBooks] = useState<Book[]>(initialBooks);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);

  // Derived state
  const featuredBooks = books.filter(book => book.featured);
  
  const filteredBooks = books.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          book.author.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesGenres = selectedGenres.length === 0 || 
                          selectedGenres.some(genre => book.genres.includes(genre));
    
    return matchesSearch && matchesGenres;
  });

  const addReview = (bookId: string, review: Omit<Review, 'id' | 'date'>) => {
    const newReview: Review = {
      ...review,
      id: Math.random().toString(36).substring(2, 9),
      date: new Date().toISOString()
    };

    setBooks(prevBooks => 
      prevBooks.map(book => 
        book.id === bookId 
          ? { 
              ...book, 
              reviews: [newReview, ...book.reviews],
              rating: calculateAverageRating([...book.reviews, newReview])
            } 
          : book
      )
    );
  };

  const calculateAverageRating = (reviews: Review[]): number => {
    if (reviews.length === 0) return 0;
    const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
    return parseFloat((sum / reviews.length).toFixed(1));
  };

  const getBook = (id: string): Book | undefined => {
    return books.find(book => book.id === id);
  };

  const getAllGenres = (): string[] => {
    const genresSet = new Set<string>();
    books.forEach(book => {
      book.genres.forEach(genre => genresSet.add(genre));
    });
    return Array.from(genresSet);
  };

  return (
    <BookContext.Provider
      value={{
        books,
        featuredBooks,
        filteredBooks,
        searchTerm,
        selectedGenres,
        setSearchTerm,
        setSelectedGenres,
        addReview,
        getBook,
        getAllGenres
      }}
    >
      {children}
    </BookContext.Provider>
  );
};

export const useBooks = (): BookContextType => {
  const context = useContext(BookContext);
  if (!context) {
    throw new Error('useBooks must be used within a BookProvider');
  }
  return context;
};
