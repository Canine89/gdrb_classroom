import { Header } from "@/components/header";
import { BookContent } from "@/components/book-content";
import { Footer } from "@/components/footer";
import { fetchResources, fetchReferences } from "@/lib/fetch-sheet";
import { books } from "@/config/books";

export const revalidate = 60;

export default async function Home() {
  // Fetch all books' data in parallel
  const booksData = await Promise.all(
    books.map(async (book) => {
      const [resources, references] = await Promise.all([
        fetchResources(book),
        fetchReferences(book),
      ]);
      return { book, resources, references };
    })
  );

  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden bg-white">
      <Header />
      <BookContent booksData={booksData} />
      <Footer />
    </div>
  );
}
