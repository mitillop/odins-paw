import Link from "next/link";
import Image from "next/image";
import { SignedIn, UserButton } from "@clerk/nextjs";
import { SignedOut, SignInButton } from "@clerk/nextjs";
import SimplificationLogo from "../../public/Simplification.svg";
import HistoryIcon from "../../public/history.svg"; // Importa tu SVG
import PetNavbar from "./PetNavbar";

export default function Navbar() {
  return (
    // <nav className="w-full shadow-md px-6 py-2 flex justify-between items-center ">
    //   <div className="text-xl flex items-center pl-6 ">
    //     <Image
    //       src={SimplificationLogo}
    //       alt="Odin's Paw Logo"
    //       width={60}
    //       height={60}
    //     />
    //     <span className=" px-3">Odin's Paw</span>
    //   </div>

    //   <PetNavbar />

    //   <ul className="flex items-center space-x-4">
    //     <li>
    //       <Link href="/history">
    //         <span className="pr-2">
    //           <Image
    //             src={HistoryIcon}
    //             alt="Icono personalizado"
    //             width={65}
    //             height={65}
    //             className="inline-block mb-2"
    //           />
    //         </span>
    //       </Link>
    //     </li>

    //   </ul>
    // </nav>
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <a className="btn btn-ghost text-xl">Odin's Paw</a>
      </div>
      <div className="navbar-center">
        <ul className="menu menu-horizontal px-1">
          <li>
            <details>
              <summary>Mascotas</summary>
              <ul className="bg-base-100 rounded-t-none p-2">
                <li>
                  <a>Link 1</a>
                </li>
                <li>
                  <a>Link 2</a>
                </li>
              </ul>
            </details>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        <ul className="menu menu-horizontal px-1">
          <li>
            <a>Historial</a>
          </li>
        </ul>
        <ul>
          <SignedIn>
            <li>
              <UserButton />
            </li>
          </SignedIn>
        </ul>
      </div>
    </div>
  );
}
