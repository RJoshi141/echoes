import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import LetterCompose from "@/components/LetterCompose";
import Link from "next/link";
import Button from "@/components/ui/Button";

export const dynamic = "force-dynamic";

export default async function Home() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/auth");
  }

  return (
    <main className="min-h-screen p-4 md:p-8 lg:p-12">
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black mb-2">
              Echoes
            </h1>
            <p className="text-stone-brown text-sm sm:text-base">Write a letter to your future self</p>
          </div>
          <div className="flex flex-wrap gap-2 sm:gap-3 items-center w-full sm:w-auto">
            <span className="text-xs sm:text-sm text-stone-brown w-full sm:w-auto">{user.email}</span>
            <Link href="/letters" className="flex-1 sm:flex-initial">
              <Button variant="secondary" className="text-sm py-2 px-4 w-full sm:w-auto">
                My Letters
              </Button>
            </Link>
            <form action="/api/auth/logout" method="POST" className="flex-1 sm:flex-initial">
              <Button variant="secondary" type="submit" className="text-sm py-2 px-4 w-full sm:w-auto">
                Logout
              </Button>
            </form>
          </div>
        </header>

        <LetterCompose userEmail={user.email} />
      </div>
    </main>
  );
}
