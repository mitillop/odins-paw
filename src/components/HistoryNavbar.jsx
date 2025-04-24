import Link from "next/link";
import Image from "next/image";
import { SignedIn, UserButton } from "@clerk/nextjs";
import { SignedOut, SignInButton } from "@clerk/nextjs";
import SimplificationLogo from "../../public/Simplification.svg";

export default function Navbar() {
  return (
    <nav className="w-full shadow-md px-6 py-4 flex justify-between items-center bg-[var(--foreground)]">
      <div className="text-xl text-[var(--floral-white)] flex items-center pl-6 ">
        <Image
          src={SimplificationLogo}
          alt="Odin's Paw Logo"
          width={60}
          height={60}
        />
        <span className=" px-3 text-[var(--background)]">
          Odin's Paw
        </span>
      </div>

      <ul className="flex items-center space-x-4 text-[var(--floral-white)]">
        <li>
          <Link href="/dashboard" className="hover:text-[var(--accent)]">
            Dashboard
          </Link>
        </li>

        <SignedIn>
          <li>
            <UserButton 
              appearance={{
                elements:{
                  userButtonAvatarBox: "w-30 h-30",
                }
              }}/>
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
