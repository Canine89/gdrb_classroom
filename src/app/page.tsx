import { Header } from "@/components/header";
import { BookContent } from "@/components/book-content";
import { Footer } from "@/components/footer";
import { fetchResources, fetchReferences, fetchPrompts, fetchPromotions } from "@/lib/fetch-sheet";
import { books } from "@/config/books";
import { siteConfig } from "@/config/site";

export const revalidate = 60;

export default async function Home() {
  const [booksData, promotions] = await Promise.all([
    Promise.all(
      books.map(async (book) => {
        const [resources, references, prompts] = await Promise.all([
          fetchResources(book),
          fetchReferences(book),
          fetchPrompts(book),
        ]);
        return { book, resources, references, prompts };
      })
    ),
    fetchPromotions(siteConfig.sheetId, siteConfig.promotionGid),
  ]);

  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden bg-white">
      <Header />
      <BookContent booksData={booksData} promotions={promotions} />
      <Footer />
    </div>
  );
}
