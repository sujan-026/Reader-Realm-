import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from 'sonner';

// User types
export type UserRole = 'user' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: UserRole;
}

// Mock users for demonstration
const MOCK_USERS = [
  {
    id: 'admin-1',
    email: 'admin@example.com',
    password: 'admin123', // In a real app, this would be hashed
    name: 'Admin User',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    role: 'admin' as UserRole
  },
  {
    id: 'user-1',
    email: 'user@example.com',
    password: 'user123', // In a real app, this would be hashed
    name: 'Regular User',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    role: 'user' as UserRole
  }
];

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  signUp: (name: string, email: string, password: string) => Promise<boolean>;
  loginWithGoogle: () => Promise<boolean>;
  resetPassword: (email: string) => Promise<boolean>;
  likedBooks: string[];
  toggleLikeBook: (bookId: string) => void;
  isBookLiked: (bookId: string) => boolean;
}

const UserContext = createContext<AuthContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [likedBooks, setLikedBooks] = useState<string[]>([]);

  useEffect(() => {
    // Check for saved user in localStorage
    const savedUser = localStorage.getItem('user');
    const savedLikedBooks = localStorage.getItem('likedBooks');
    
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    
    if (savedLikedBooks) {
      setLikedBooks(JSON.parse(savedLikedBooks));
    }
    
    setIsLoading(false);
  }, []);

  // Save user to localStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  // Save liked books to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('likedBooks', JSON.stringify(likedBooks));
  }, [likedBooks]);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Find user with matching credentials
      const matchedUser = MOCK_USERS.find(
        u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
      );
      
      if (matchedUser) {
        const { password: _, ...userWithoutPassword } = matchedUser;
        setUser(userWithoutPassword);
        toast.success('Successfully logged in!');
        return true;
      } else {
        toast.error('Invalid email or password');
        return false;
      }
    } catch (error) {
      toast.error('Login failed. Please try again.');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    toast.success('Successfully logged out');
  };

  const signUp = async (name: string, email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check if user already exists
      if (MOCK_USERS.some(u => u.email.toLowerCase() === email.toLowerCase())) {
        toast.error('User with this email already exists');
        return false;
      }
      
      // In a real app, we would create the user in the database
      // For now, we'll just log them in
      const newUser: User = {
        id: `user-${Date.now()}`,
        name,
        email,
        role: 'user'
      };
      
      setUser(newUser);
      toast.success('Account created successfully!');
      return true;
    } catch (error) {
      toast.error('Sign up failed. Please try again.');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithGoogle = async (): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // Simulate Google authentication
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const googleUser: User = {
        id: `google-user-${Date.now()}`,
        name: 'Google User',
        email: 'google.user@example.com',
        avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
        role: 'user'
      };
      
      setUser(googleUser);
      toast.success('Successfully logged in with Google!');
      return true;
    } catch (error) {
      toast.error('Google login failed. Please try again.');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const resetPassword = async (email: string): Promise<boolean> => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const userExists = MOCK_USERS.some(
        u => u.email.toLowerCase() === email.toLowerCase()
      );
      
      if (userExists) {
        toast.success('Password reset link sent to your email');
        return true;
      } else {
        toast.error('No account found with this email');
        return false;
      }
    } catch (error) {
      toast.error('Password reset failed. Please try again.');
      return false;
    }
  };

  const toggleLikeBook = (bookId: string) => {
    if (!user) {
      toast.error('Please log in to like books');
      return;
    }
    
    setLikedBooks(prev => {
      if (prev.includes(bookId)) {
        toast.success('Book removed from favorites');
        return prev.filter(id => id !== bookId);
      } else {
        toast.success('Book added to favorites');
        return [...prev, bookId];
      }
    });
  };

  const isBookLiked = (bookId: string): boolean => {
    return likedBooks.includes(bookId);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
        signUp,
        loginWithGoogle,
        resetPassword,
        likedBooks,
        toggleLikeBook,
        isBookLiked
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): AuthContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
