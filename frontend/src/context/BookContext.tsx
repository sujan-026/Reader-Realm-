import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

export type Book = {
  _id: string;
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
  fetchBookById: (bookId: string) => Promise<Book | null>;
  submitReview: (reviewData: Omit<Review, "id" | "date">) => Promise<any>;
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
       const response = await fetch(`http://localhost:5000/api/books`);
       if (!response.ok) throw new Error("Failed to fetch books");

       const data = await response.json();
       if (!data.success) throw new Error("Failed to fetch books");

       // Fetch reviews for each book
       const booksWithReviews = await Promise.all(
         data.data.map(async (book) => {
           const reviewResponse = await fetch(
             `http://localhost:5000/api/reviews?bookId=${book._id}`
           );
           if (!reviewResponse.ok) return book; // Keep book as is if reviews fail

           const reviewData = await reviewResponse.json();
           return {
             ...book,
             reviews: reviewData.success ? reviewData.data : [],
           };
         })
       );

       setBooks(booksWithReviews);
     } catch (error) {
       console.error("Error fetching books:", error);
     }
   };


    fetchBooks();
  }, []);

  // Fetch a single book by ID
  const fetchBookById = async (bookId: string) => {
    try {
      const response = await fetch(`http://localhost:5000/api/books/${bookId}`);
      if (!response.ok) throw new Error("Failed to fetch book");
      const data = await response.json();
      console.log(data.data);
      return data.data; // Ensure we return the book object from API response
    } catch (error) {
      console.error("Error fetching book:", error);
      return null;
    }
  };

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
    review: Omit<Review, "_id" | "date">
  ) => {
    const reviewPayload = {
      ...review,
      bookId,
      date: new Date().toISOString(),
    };

    try {
      const response = await fetch(`http://localhost:5000/api/reviews/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reviewPayload),
      });

      if (!response.ok) throw new Error("Failed to add review");

      const data = await response.json();
      if (!data.success) throw new Error("Failed to add review");

      const newReview = data.data; // Get the new review from the response

      setBooks((prevBooks) =>
        prevBooks.map((book) =>
          book._id === bookId
            ? {
                ...book,
                reviews: [newReview, ...book.reviews], // Add new review
                rating: calculateAverageRating([...book.reviews, newReview]),
              }
            : book
        )
      );
    } catch (error) {
      console.error("Error adding review:", error);
    }
  };

  const submitReview = async (reviewData) => {
    try {
      const response = await fetch(`/api/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reviewData), // Ensure bookId is sent
      });

      if (!response.ok) {
        throw new Error("Failed to submit review");
      }

      return await response.json();
    } catch (error) {
      console.error("Error submitting review:", error);
      throw error;
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
        fetchBookById,
        submitReview,
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
