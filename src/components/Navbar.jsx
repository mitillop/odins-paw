import Link from "next/link";
import Image from "next/image";
import { SignedIn, UserButton } from "@clerk/nextjs";
import { SignedOut, SignInButton } from "@clerk/nextjs";
import SimplificationLogo from "../../public/Simplification.svg";
import HistoryIcon from "../../public/history.svg"; 
import PetNavbar from "./PetNavbar"; 
import { PawPrint } from "lucide-react";

export default function Navbar() {
  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <PawPrint />
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
