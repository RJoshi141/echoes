import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { getLettersByUserId } from "@/lib/storage/db";
import LetterList from "@/components/LetterList";
import Link from "next/link";
import Button from "@/components/ui/Button";

export const dynamic = "force-dynamic";

export default async function LettersPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/auth");
  }

  const letters = await getLettersByUserId(user.id);
  // Sort by delivery date, most recent first
  letters.sort((a, b) => new Date(b.deliveryDate).getTime() - new Date(a.deliveryDate).getTime());

  return (
    <main className="min-h-screen p-4 md:p-8 lg:p-12">
      <div className="max-w-4xl mx-auto">
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black mb-2">
              Your Letters
            </h1>
            <p className="text-stone-brown text-sm sm:text-base">
              {letters.length} {letters.length === 1 ? "letter" : "letters"} scheduled
            </p>
          </div>
          <div className="flex flex-wrap gap-2 sm:gap-3 w-full sm:w-auto">
            <Link href="/" className="flex-1 sm:flex-initial">
              <Button variant="secondary" className="text-sm py-2 px-4 w-full sm:w-auto">
                Write New
              </Button>
            </Link>
            <form action="/api/auth/logout" method="POST" className="flex-1 sm:flex-initial">
              <Button variant="secondary" type="submit" className="text-sm py-2 px-4 w-full sm:w-auto">
                Logout
              </Button>
            </form>
          </div>
        </header>

        <LetterList letters={letters} />
      </div>
    </main>
  );
}

