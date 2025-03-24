import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

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
  addReview: (
    bookId: string,
    review: Omit<Review, "id" | "date">
  ) => Promise<void>;
  getBook: (id: string) => Book | undefined;
  getAllGenres: () => string[];
};

const BookContext = createContext<BookContextType | undefined>(undefined);

export const BookProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);

  // Fetch books from API
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/books");
        if (!response.ok) throw new Error("Failed to fetch books");
        const jsonResponse = await response.json();

        // Extract books array from response's "data" field
        if (jsonResponse && Array.isArray(jsonResponse.data)) {
          setBooks(jsonResponse.data);
        } else {
          console.error(
            "API response does not contain a valid books array:",
            jsonResponse
          );
          setBooks([]);
        }
      } catch (error) {
        console.error("Error fetching books:", error);
        setBooks([]); // Ensure books is always an array
      }
    };

    fetchBooks();
  }, []);



  // Derived state
  const featuredBooks = books.filter((book) => book.featured);
  const filteredBooks = books.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesGenres =
      selectedGenres.length === 0 ||
      selectedGenres.some((genre) => book.genres.includes(genre));

    return matchesSearch && matchesGenres;
  });

  // Add review and update database
  const addReview = async (
    bookId: string,
    review: Omit<Review, "id" | "date">
  ) => {
    const newReview: Review = {
      ...review,
      id: Math.random().toString(36).substring(2, 9),
      date: new Date().toISOString(),
    };

    try {
      const response = await fetch(
        `http://localhost:5000/api/books/${bookId}/reviews`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newReview),
        }
      );

      if (!response.ok) throw new Error("Failed to add review");

      setBooks((prevBooks) =>
        prevBooks.map((book) =>
          book.id === bookId
            ? {
                ...book,
                reviews: [newReview, ...book.reviews],
                rating: calculateAverageRating([...book.reviews, newReview]),
              }
            : book
        )
      );
    } catch (error) {
      console.error("Error adding review:", error);
    }
  };

  // Calculate new average rating
  const calculateAverageRating = (reviews: Review[]): number => {
    if (reviews.length === 0) return 0;
    const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
    return parseFloat((sum / reviews.length).toFixed(1));
  };

  // Get book by ID
  const getBook = (id: string): Book | undefined => {
    return books.find((book) => book.id === id);
  };

  // Get all unique genres
  const getAllGenres = (): string[] => {
    const genresSet = new Set<string>();
    books.forEach((book) =>
      book.genres.forEach((genre) => genresSet.add(genre))
    );
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
        getAllGenres,
      }}
    >
      {children}
    </BookContext.Provider>
  );
};

export const useBooks = (): BookContextType => {
  const context = useContext(BookContext);
  if (!context) {
    throw new Error("useBooks must be used within a BookProvider");
  }
  return context;
};
