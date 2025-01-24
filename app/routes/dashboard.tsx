import { Link } from "react-router";
import { getSession } from "../lib/session.server";
import { redirect } from "react-router";
import { useLoaderData } from "react-router";
import type { Route } from "./+types/dashboard";
import { Navigation } from "../components/navigation";
import { Footer } from "../components/footer";

export async function loader({ request }: Route.LoaderArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  const user = session.get("user");

  if (!user) {
    return redirect("/auth/login");
  }
  console.log("Dashboard user", user);

  return { user };
}

export default function Route() {
  const { user } = useLoaderData<typeof loader>();

  return (
    <div className="mx-auto flex min-h-screen h-full w-full items-center flex-col px-6">
      {/* Navigation */}
      <Navigation />

      {/* Content */}
      <div className="mx-auto flex h-full w-full max-w-[280px] flex-col items-center justify-center gap-6">
        <div className="flex flex-col items-center">
          <span className="mb-4 h-full text-6xl animate-bounce transition text-center duration-200 hover:-translate-y-1">
            🥳
          </span>
          <div className="flex flex-col items-center gap-1">
            <h1 className="text-center text-2xl font-semibold tracking-tight">
              My account
            </h1>
            <p className="flex items-center whitespace-nowrap text-center text-base font-semibold text-gray-400">
              {user.email}
            </p>
          </div>
        </div>

        <div className="flex w-full flex-col gap-2">
          {/* Log out */}
          <Link to="/auth/logout">
            <button
              type="submit"
              className="flex h-9 w-full items-center justify-center rounded-xl bg-black font-semibold text-white"
            >
              Log out
            </button>
          </Link>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
