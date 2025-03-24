import mongoose from "mongoose";
import Book from "./backend/models/Book.js";
import Review from "./backend/models/Review.js";
import User from "./backend/models/Users.js";

// MongoDB connection URL
const MONGO_URI =
  "mongodb+srv://admin:3lI9F7RunikJOPPN@bookreview-db.plnvr.mongodb.net/books?retryWrites=true&w=majority&appName=bookreview-db";

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error(err));

const booksData = [
  {
    id: "1",
    title: "The Midnight Library",
    author: "Matt Haig",
    coverImage:
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=687&auto=format&fit=crop",
    blurImage:
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=50&auto=format&fit=crop",
    description:
      "Between life and death there is a library, and within that library, the shelves go on forever. Every book provides a chance to try another life you could have lived. To see how things would be if you had made other choices.",
    rating: 4.2,
    reviews: [
      {
        id: "r1",
        userId: "u1",
        userName: "Alex Johnson",
        userAvatar: "https://randomuser.me/api/portraits/women/44.jpg",
        rating: 5,
        text: "This book changed my perspective on life. The concept is fascinating and execution is flawless.",
        date: "2023-03-15T18:25:43.511Z",
      },
      {
        id: "r2",
        userId: "u2",
        userName: "Michael Chen",
        userAvatar: "https://randomuser.me/api/portraits/men/46.jpg",
        rating: 4,
        text: "Beautifully written with a profound message about regret and possibility.",
        date: "2023-02-28T09:15:22.511Z",
      },
    ],
    genres: ["Fiction", "Fantasy", "Contemporary"],
    publicationDate: "2020-08-13",
    featured: true,
  },
  {
    id: "2",
    title: "Klara and the Sun",
    author: "Kazuo Ishiguro",
    coverImage:
      "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=687&auto=format&fit=crop",
    blurImage:
      "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=50&auto=format&fit=crop",
    description:
      "From the bestselling author of Never Let Me Go and The Remains of the Day, a stunning new novel that asks, what does it mean to love?",
    rating: 4.1,
    reviews: [
      {
        id: "r3",
        userId: "u3",
        userName: "Sarah Williams",
        userAvatar: "https://randomuser.me/api/portraits/women/64.jpg",
        rating: 4,
        text: "Ishiguro has a way of making you question what it means to be human.",
        date: "2023-01-10T14:25:43.511Z",
      },
    ],
    genres: ["Science Fiction", "Literary Fiction"],
    publicationDate: "2021-03-02",
  },
  {
    id: "3",
    title: "Project Hail Mary",
    author: "Andy Weir",
    coverImage:
      "https://images.unsplash.com/photo-1614332287897-cdc485fa562d?q=80&w=870&auto=format&fit=crop",
    blurImage:
      "https://images.unsplash.com/photo-1614332287897-cdc485fa562d?q=80&w=50&auto=format&fit=crop",
    description:
      "A lone astronaut must save the earth from disaster in this incredible new science-based thriller from the #1 New York Times bestselling author of The Martian.",
    rating: 4.6,
    reviews: [
      {
        id: "r4",
        userId: "u4",
        userName: "David Kim",
        userAvatar: "https://randomuser.me/api/portraits/men/51.jpg",
        rating: 5,
        text: "Even better than The Martian! The science is fascinating and the story is gripping from start to finish.",
        date: "2023-05-22T18:25:43.511Z",
      },
      {
        id: "r5",
        userId: "u5",
        userName: "Emily Rodriguez",
        userAvatar: "https://randomuser.me/api/portraits/women/12.jpg",
        rating: 4,
        text: "Weir has a gift for making complex science accessible and entertaining.",
        date: "2023-04-17T18:25:43.511Z",
      },
    ],
    genres: ["Science Fiction", "Adventure", "Space"],
    publicationDate: "2021-05-04",
    featured: true,
  },
  {
    id: "4",
    title: "The Song of Achilles",
    author: "Madeline Miller",
    coverImage:
      "https://images.unsplash.com/photo-1629992101753-56d196c8aabb?q=80&w=690&auto=format&fit=crop",
    blurImage:
      "https://images.unsplash.com/photo-1629992101753-56d196c8aabb?q=80&w=50&auto=format&fit=crop",
    description:
      "A tale of gods, kings, immortal fame, and the human heart, The Song of Achilles is a dazzling literary feat that brilliantly reimagines Homer's enduring masterwork, The Iliad.",
    rating: 4.7,
    reviews: [
      {
        id: "r6",
        userId: "u6",
        userName: "James Wilson",
        userAvatar: "https://randomuser.me/api/portraits/men/22.jpg",
        rating: 5,
        text: "Beautifully written and heartbreaking. Miller brings the ancient world to vivid life.",
        date: "2022-12-03T18:25:43.511Z",
      },
    ],
    genres: ["Historical Fiction", "Mythology", "LGBT"],
    publicationDate: "2012-03-06",
  },
  {
    id: "5",
    title: "Atomic Habits",
    author: "James Clear",
    coverImage:
      "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=773&auto=format&fit=crop",
    blurImage:
      "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=50&auto=format&fit=crop",
    description:
      "No matter your goals, Atomic Habits offers a proven framework for improving--every day. James Clear, one of the world's leading experts on habit formation, reveals practical strategies that will teach you exactly how to form good habits, break bad ones, and master the tiny behaviors that lead to remarkable results.",
    rating: 4.8,
    reviews: [
      {
        id: "r7",
        userId: "u7",
        userName: "Rebecca Taylor",
        userAvatar: "https://randomuser.me/api/portraits/women/32.jpg",
        rating: 5,
        text: "This book changed my approach to productivity and personal development. Highly recommend!",
        date: "2023-06-15T18:25:43.511Z",
      },
      {
        id: "r8",
        userId: "u8",
        userName: "Robert Martinez",
        userAvatar: "https://randomuser.me/api/portraits/men/36.jpg",
        rating: 4,
        text: "Clear, practical advice that you can implement immediately. A great resource.",
        date: "2023-05-30T18:25:43.511Z",
      },
    ],
    genres: ["Self-Help", "Psychology", "Personal Development"],
    publicationDate: "2018-10-16",
    featured: true,
  },
  {
    id: "6",
    title: "Circe",
    author: "Madeline Miller",
    coverImage:
      "https://images.unsplash.com/photo-1541963463532-d68292c34b19?q=80&w=688&auto=format&fit=crop",
    blurImage:
      "https://images.unsplash.com/photo-1541963463532-d68292c34b19?q=80&w=50&auto=format&fit=crop",
    description:
      "In the house of Helios, god of the sun and mightiest of the Titans, a daughter is born. But Circe is a strange child--not powerful, like her father, nor viciously alluring like her mother. Turning to the world of mortals for companionship, she discovers that she does possess power--the power of witchcraft.",
    rating: 4.5,
    reviews: [
      {
        id: "r9",
        userId: "u9",
        userName: "Olivia Turner",
        userAvatar: "https://randomuser.me/api/portraits/women/90.jpg",
        rating: 5,
        text: "Miller's prose is enchanting. She breathes new life into an ancient character.",
        date: "2023-04-05T18:25:43.511Z",
      },
    ],
    genres: ["Fantasy", "Mythology", "Historical Fiction"],
    publicationDate: "2018-04-10",
  },
  {
    id: "7",
    title: "The Lincoln Highway",
    author: "Amor Towles",
    coverImage:
      "https://images.unsplash.com/photo-1589998059171-988d887df646?q=80&w=876&auto=format&fit=crop",
    blurImage:
      "https://images.unsplash.com/photo-1589998059171-988d887df646?q=80&w=50&auto=format&fit=crop",
    description:
      "In June, 1954, eighteen-year-old Emmett Watson is driven home to Nebraska by the warden of the juvenile work farm where he has just served fifteen months for involuntary manslaughter.",
    rating: 4.3,
    reviews: [
      {
        id: "r10",
        userId: "u10",
        userName: "Thomas Jackson",
        userAvatar: "https://randomuser.me/api/portraits/men/67.jpg",
        rating: 4,
        text: "Towles creates such vivid characters and a compelling journey.",
        date: "2023-02-18T18:25:43.511Z",
      },
    ],
    genres: ["Historical Fiction", "Adventure", "Literary Fiction"],
    publicationDate: "2021-10-05",
  },
  {
    id: "8",
    title: "Educated",
    author: "Tara Westover",
    coverImage:
      "https://images.unsplash.com/photo-1550399105-c4db5fb85c18?q=80&w=1171&auto=format&fit=crop",
    blurImage:
      "https://images.unsplash.com/photo-1550399105-c4db5fb85c18?q=80&w=50&auto=format&fit=crop",
    description:
      "An unforgettable memoir about a young girl who, kept out of school, leaves her survivalist family and goes on to earn a PhD from Cambridge University.",
    rating: 4.7,
    reviews: [
      {
        id: "r11",
        userId: "u11",
        userName: "Sophia Lee",
        userAvatar: "https://randomuser.me/api/portraits/women/40.jpg",
        rating: 5,
        text: "One of the most powerful memoirs I've ever read. Westover's journey is extraordinary.",
        date: "2023-01-25T18:25:43.511Z",
      },
      {
        id: "r12",
        userId: "u12",
        userName: "Daniel Moore",
        userAvatar: "https://randomuser.me/api/portraits/men/42.jpg",
        rating: 4,
        text: "Inspiring and thought-provoking. A testament to the power of education.",
        date: "2022-12-15T18:25:43.511Z",
      },
    ],
    genres: ["Memoir", "Biography", "Nonfiction"],
    publicationDate: "2018-02-20",
  },
  {
    id: "9",
    title: "Dune",
    author: "Frank Herbert",
    coverImage:
      "https://images.unsplash.com/photo-1605902711622-cfb43c4437b5?q=80&w=687&auto=format&fit=crop",
    blurImage:
      "https://images.unsplash.com/photo-1605902711622-cfb43c4437b5?q=80&w=50&auto=format&fit=crop",
    description:
      "Set in the distant future amidst a feudal interstellar society, Dune tells the story of young Paul Atreides as he navigates political intrigue, prophecy, and survival on the desert planet Arrakis.",
    rating: 4.7,
    reviews: [
      {
        id: "r9a",
        userId: "u9",
        userName: "Emily Carter",
        userAvatar: "https://randomuser.me/api/portraits/women/25.jpg",
        rating: 5,
        text: "An absolute masterpiece of science fiction.",
        date: "2023-07-10T14:12:30.511Z",
      },
    ],
    genres: ["Science Fiction", "Adventure"],
    publicationDate: "1965-06-01",
    featured: true,
  },
  {
    id: "10",
    title: "1984",
    author: "George Orwell",
    coverImage:
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=687&auto=format&fit=crop",
    blurImage:
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=50&auto=format&fit=crop",
    description:
      "A dystopian novel that explores the dangers of totalitarianism, mass surveillance, and extreme political ideology.",
    rating: 4.5,
    reviews: [
      {
        id: "r10a",
        userId: "u10",
        userName: "James Smith",
        userAvatar: "https://randomuser.me/api/portraits/men/20.jpg",
        rating: 5,
        text: "A chilling vision of the future that feels more relevant than ever.",
        date: "2023-05-21T10:30:15.511Z",
      },
    ],
    genres: ["Dystopian", "Political Fiction"],
    publicationDate: "1949-06-08",
    featured: true,
  },
  {
    id: "11",
    title: "Brave New World",
    author: "Aldous Huxley",
    coverImage:
      "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=687&auto=format&fit=crop",
    blurImage:
      "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=50&auto=format&fit=crop",
    description:
      "A futuristic world where people are engineered into castes and conditioned for a painless, hedonistic life.",
    rating: 4.3,
    reviews: [
      {
        id: "r11a",
        userId: "u11",
        userName: "Samantha Doe",
        userAvatar: "https://randomuser.me/api/portraits/women/32.jpg",
        rating: 4,
        text: "Fascinating yet disturbing take on a possible future society.",
        date: "2023-04-14T17:45:12.511Z",
      },
    ],
    genres: ["Dystopian", "Science Fiction"],
    publicationDate: "1932-01-01",
    featured: false,
  },
  {
    id: "12",
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    coverImage:
      "https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=687&auto=format&fit=crop",
    blurImage:
      "https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=50&auto=format&fit=crop",
    description:
      "Bilbo Baggins embarks on an epic journey with dwarves to reclaim a stolen treasure from the dragon Smaug.",
    rating: 4.8,
    reviews: [
      {
        id: "r12a",
        userId: "u12",
        userName: "Mark Green",
        userAvatar: "https://randomuser.me/api/portraits/men/35.jpg",
        rating: 5,
        text: "A timeless adventure full of wonder and magic.",
        date: "2023-06-05T08:20:33.511Z",
      },
    ],
    genres: ["Fantasy", "Adventure"],
    publicationDate: "1937-09-21",
    featured: true,
  },
  {
    id: "13",
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    coverImage:
      "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?q=80&w=687&auto=format&fit=crop",
    blurImage:
      "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?q=80&w=50&auto=format&fit=crop",
    description:
      "A novel about racial injustice in the Deep South, told through the eyes of young Scout Finch.",
    rating: 4.9,
    reviews: [
      {
        id: "r13a",
        userId: "u13",
        userName: "Lucy White",
        userAvatar: "https://randomuser.me/api/portraits/women/40.jpg",
        rating: 5,
        text: "A poignant and powerful story that everyone should read.",
        date: "2023-03-18T22:15:50.511Z",
      },
    ],
    genres: ["Historical Fiction", "Drama"],
    publicationDate: "1960-07-11",
    featured: true,
  },
  {
    id: "14",
    title: "The Night Circus",
    author: "Erin Morgenstern",
    coverImage:
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=80&w=687&auto=format&fit=crop",
    blurImage:
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=80&w=50&auto=format&fit=crop",
    description:
      "A magical competition between two young illusionists unfolds within a mysterious traveling circus that only opens at night.",
    rating: 4.5,
    reviews: [
      {
        id: "r67",
        userId: "u23",
        userName: "Samantha Green",
        userAvatar: "https://randomuser.me/api/portraits/women/23.jpg",
        rating: 5,
        text: "Absolutely mesmerizing! The descriptions make you feel like you're inside the circus.",
        date: "2023-06-10T15:30:00.511Z",
      },
      {
        id: "r68",
        userId: "u24",
        userName: "Daniel Lee",
        userAvatar: "https://randomuser.me/api/portraits/men/24.jpg",
        rating: 4,
        text: "Beautifully written, though the plot meanders at times.",
        date: "2023-05-22T11:45:12.511Z",
      },
    ],
    genres: ["Fantasy", "Historical Fiction", "Magical Realism"],
    publicationDate: "2011-09-13",
    featured: false,
  },
  {
    id: "15",
    title: "Circe",
    author: "Madeline Miller",
    coverImage:
      "https://images.unsplash.com/photo-1589213651548-9e77c61a8127?q=80&w=687&auto=format&fit=crop",
    blurImage:
      "https://images.unsplash.com/photo-1589213651548-9e77c61a8127?q=80&w=50&auto=format&fit=crop",
    description:
      "A retelling of the story of Circe, the powerful witch from Greek mythology, as she forges her own path.",
    rating: 4.7,
    reviews: [
      {
        id: "r69",
        userId: "u25",
        userName: "Laura Martinez",
        userAvatar: "https://randomuser.me/api/portraits/women/25.jpg",
        rating: 5,
        text: "One of the best books I’ve read! Empowering and beautifully written.",
        date: "2023-04-19T08:12:45.511Z",
      },
      {
        id: "r70",
        userId: "u26",
        userName: "Chris Evans",
        userAvatar: "https://randomuser.me/api/portraits/men/26.jpg",
        rating: 4.5,
        text: "A powerful and poetic take on an overlooked figure in mythology.",
        date: "2023-03-30T17:10:33.511Z",
      },
    ],
    genres: ["Fantasy", "Historical Fiction", "Mythology"],
    publicationDate: "2018-04-10",
    featured: true,
  },
  {
    id: "16",
    title: "Project Hail Mary",
    author: "Andy Weir",
    coverImage:
      "https://images.unsplash.com/photo-1510511233900-1982d92bd835?q=80&w=687&auto=format&fit=crop",
    blurImage:
      "https://images.unsplash.com/photo-1510511233900-1982d92bd835?q=80&w=50&auto=format&fit=crop",
    description:
      "A lone astronaut wakes up on a spaceship with no memory and a mission to save Earth.",
    rating: 4.8,
    reviews: [
      {
        id: "r71",
        userId: "u27",
        userName: "Nathan Brown",
        userAvatar: "https://randomuser.me/api/portraits/men/27.jpg",
        rating: 5,
        text: "A thrilling and scientific masterpiece! Loved every page.",
        date: "2023-07-05T14:20:25.511Z",
      },
      {
        id: "r72",
        userId: "u28",
        userName: "Sophia Wilson",
        userAvatar: "https://randomuser.me/api/portraits/women/28.jpg",
        rating: 4.7,
        text: "Andy Weir does it again! A mix of science, adventure, and humor.",
        date: "2023-06-18T09:55:48.511Z",
      },
    ],
    genres: ["Science Fiction", "Thriller"],
    publicationDate: "2021-05-04",
    featured: true,
  },
  {
    id: "17",
    title: "The Invisible Life of Addie LaRue",
    author: "V.E. Schwab",
    coverImage:
      "https://images.unsplash.com/photo-1611605698812-8ac563e09ca3?q=80&w=687&auto=format&fit=crop",
    blurImage:
      "https://images.unsplash.com/photo-1611605698812-8ac563e09ca3?q=80&w=50&auto=format&fit=crop",
    description:
      "A woman makes a deal with the devil to live forever, but no one will ever remember her.",
    rating: 4.6,
    reviews: [
      {
        id: "r73",
        userId: "u29",
        userName: "Isabella Gomez",
        userAvatar: "https://randomuser.me/api/portraits/women/29.jpg",
        rating: 5,
        text: "Heartbreaking and beautifully written! Addie’s story will stay with me forever.",
        date: "2023-05-10T20:45:39.511Z",
      },
      {
        id: "r74",
        userId: "u30",
        userName: "James Carter",
        userAvatar: "https://randomuser.me/api/portraits/men/30.jpg",
        rating: 4.3,
        text: "Unique premise and a hauntingly beautiful story.",
        date: "2023-04-28T13:15:27.511Z",
      },
    ],
    genres: ["Fantasy", "Historical Fiction", "Romance"],
    publicationDate: "2020-10-06",
    featured: false,
  },
  {
    id: "18",
    title: "Daisy Jones & The Six",
    author: "Taylor Jenkins Reid",
    coverImage:
      "https://images.unsplash.com/photo-1603993097397-89ac9c76e677?q=80&w=687&auto=format&fit=crop",
    blurImage:
      "https://images.unsplash.com/photo-1603993097397-89ac9c76e677?q=80&w=50&auto=format&fit=crop",
    description:
      "The story of a fictional 1970s rock band told in an oral history format, exploring fame and music.",
    rating: 4.5,
    reviews: [
      {
        id: "r75",
        userId: "u31",
        userName: "Emily White",
        userAvatar: "https://randomuser.me/api/portraits/women/31.jpg",
        rating: 5,
        text: "This book felt so real! I wanted to listen to their music after finishing.",
        date: "2023-06-02T11:22:15.511Z",
      },
      {
        id: "r76",
        userId: "u32",
        userName: "Ryan Peterson",
        userAvatar: "https://randomuser.me/api/portraits/men/32.jpg",
        rating: 4.4,
        text: "Captivating and nostalgic. Feels like an actual documentary.",
        date: "2023-05-18T10:05:34.511Z",
      },
    ],
    genres: ["Historical Fiction", "Music", "Drama"],
    publicationDate: "2019-03-05",
    featured: true,
  },
  {
    id: "19",
    title: "The Book Thief",
    author: "Markus Zusak",
    coverImage:
      "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=687&auto=format&fit=crop",
    blurImage:
      "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=50&auto=format&fit=crop",
    description:
      "A young girl living in Nazi Germany steals books and shares them with others while Death narrates her story.",
    rating: 4.7,
    reviews: [
      {
        id: "r37",
        userId: "u12",
        userName: "Olivia Parker",
        userAvatar: "https://randomuser.me/api/portraits/women/12.jpg",
        rating: 5,
        text: "A heartbreaking and unforgettable story. One of the best books I've read.",
        date: "2023-03-10T14:32:20.511Z",
      },
      {
        id: "r38",
        userId: "u13",
        userName: "Ethan Roberts",
        userAvatar: "https://randomuser.me/api/portraits/men/13.jpg",
        rating: 4.5,
        text: "Beautifully written with deep emotions and memorable characters.",
        date: "2023-02-28T18:15:42.511Z",
      },
    ],
    genres: ["Historical Fiction", "Young Adult", "War"],
    publicationDate: "2005-03-14",
    featured: true,
  },
  {
    id: "20",
    title: "Where the Crawdads Sing",
    author: "Delia Owens",
    coverImage:
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=687&auto=format&fit=crop",
    blurImage:
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=50&auto=format&fit=crop",
    description:
      "A mystery and coming-of-age story about a girl who grows up alone in the marshlands of North Carolina.",
    rating: 4.6,
    reviews: [
      {
        id: "r39",
        userId: "u14",
        userName: "Sophia Adams",
        userAvatar: "https://randomuser.me/api/portraits/women/14.jpg",
        rating: 5,
        text: "A stunning and poetic novel with a gripping mystery at its core.",
        date: "2023-04-05T10:42:30.511Z",
      },
      {
        id: "r40",
        userId: "u15",
        userName: "Benjamin Clark",
        userAvatar: "https://randomuser.me/api/portraits/men/15.jpg",
        rating: 4.4,
        text: "Loved the immersive setting and the strong female protagonist.",
        date: "2023-03-22T15:25:17.511Z",
      },
    ],
    genres: ["Mystery", "Historical Fiction", "Drama"],
    publicationDate: "2018-08-14",
    featured: false,
  },
];

const seedDatabase = async () => {
  try {
    await Book.deleteMany({});
    await Review.deleteMany({});
    await User.deleteMany({});

    for (const book of booksData) {
      for (const review of book.reviews) {
        let user = await User.findOne({ id: review.userId });
        if (!user) {
          user = await User.create({
            id: review.userId,
            name: review.userName,
            avatar: review.userAvatar,
          });
        }
      }

      const insertedReviews = await Promise.all(
        book.reviews.map(async (review) => {
          return await Review.create({
            id: review.id,
            userId: review.userId,
            userName: review.userName,
            userAvatar: review.userAvatar,
            rating: review.rating,
            text: review.text,
            date: review.date,
          });
        })
      );

      const newBook = await Book.create({
        id: book.id,
        title: book.title,
        author: book.author,
        coverImage: book.coverImage,
        blurImage: book.blurImage,
        description: book.description,
        rating: book.rating,
        reviews: insertedReviews.map((review) => review._id),
        genres: book.genres,
        publicationDate: book.publicationDate,
        featured: book.featured || false,
      });

      console.log(`Inserted book: ${newBook.title}`);
    }

    console.log("Database seeding completed!");
    mongoose.connection.close();
  } catch (error) {
    console.error("Error seeding database:", error);
    mongoose.connection.close();
  }
};

seedDatabase();
