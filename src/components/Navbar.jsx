import Link from "next/link";
import Image from "next/image";
import { SignedIn, UserButton } from "@clerk/nextjs";
import { SignedOut, SignInButton } from "@clerk/nextjs";
import SimplificationLogo from "../../public/Simplification.svg";
import HistoryIcon from "../../public/history.svg"; // Importa tu SVG
import PetNavbar from "./PetNavbar";

export default function Navbar() {
  return (
    <nav className="w-full shadow-md px-6 py-2 flex justify-between items-center bg-[var(--foreground)]">
      <div className="text-xl text-[var(--floral-white)] flex items-center pl-6 ">
        <Image
          src={SimplificationLogo}
          alt="Odin's Paw Logo"
          width={60}
          height={60}
        />
        <span className=" px-3 text-[var(--background)]">Odin's Paw</span>
      </div>

      <PetNavbar />

      <ul className="flex items-center space-x-4 text-[var(--floral-white)]">
        <li>
          <Link href="/history" className="hover:text-[var(--accent)]">
            <span className="pr-2">
              <Image
                src={HistoryIcon}
                alt="Icono personalizado"
                width={65}
                height={65}
                className="inline-block mb-2"
              />
            </span>
          </Link>
        </li>

        <SignedIn>
          <li>
            <UserButton
              appearance={{
                elements: {
                  userButtonAvatarBox: {
                    width: "50px",
                    height: "50px",
                  },
                },
              }}
            />
          </li>
        </SignedIn>

        <SignedOut>
          <li>
            <SignInButton afterSignInUrl="/dashboard" mode="modal">
              <span className="cursor-pointer hover:text-[var(--foreground)]">
                Iniciar sesión
              </span>
            </SignInButton>
          </li>
        </SignedOut>
      </ul>
    </nav>
  );
}
