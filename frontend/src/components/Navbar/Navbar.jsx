import { PlusIcon } from "lucide-react";
import React from "react";
import { Link } from "react-router";
import { SignupButton } from "../SignupButton/SignupButton";
import { useAuth0 } from "@auth0/auth0-react";
import { LogoutButton } from "../LogoutButton/LogoutButton";
import { LoginButton } from "../LoginButton/LoginButton";

const Navbar = () => {
  const { isAuthenticated } = useAuth0();

  return (
    <header className="bg-secondary border-b border-base-content/10">
      <div className="mx-auto max-w-6xl p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-base-content font-mono tracking-tight">
            Budget Notes for Budget People
          </h1>
          <div className="flex items-center gap-4 sm:mr-10">
            {isAuthenticated && (
              <>
                <Link to={"/create"} className="btn btn-secondary">
                  <PlusIcon className="size-5" />
                  <span>Create Note</span>
                </Link>
                <LogoutButton />
              </>
            )}
            {!isAuthenticated && (
              <>
                <SignupButton />
                <LoginButton />
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
