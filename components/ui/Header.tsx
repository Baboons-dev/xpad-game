import { User } from "@/lib/types";
import axios from "axios";
import React, { useEffect, useState } from "react";
import LoadingSpinner from "./LoadingSpinner";

interface HeaderProps {
  loading: boolean;
  loggedInUser: User;
}

export default function Header(props: HeaderProps) {
  const { loading, loggedInUser } = props;
  return (
    <>
      {loading ? (
        <div
          style={{ border: "1px solid redx" }}
          className="flex items-center justify-center  w-full"
        >
          <LoadingSpinner />
        </div>
      ) : (
        <header className="flex items-center justify-between p-4 bg-foreground text-white">
          <div className="flex items-center">
            <span className="font-bold text-lg">My Game</span>
          </div>

          <nav className="hidden md:flex space-x-6">
            <a href="#" className="hover:text-gray-200">
              Home
            </a>
            <a href="#" className="hover:text-gray-200">
              About
            </a>
            <a href="#" className="hover:text-gray-200">
              Contact
            </a>
          </nav>

          <div className="flex items-center space-x-4">
            <span className="font-semibold">{loggedInUser?.username}</span>
            {/* <img src="https://via.placeholder.com/30" alt="User Avatar" className="w-8 h-8 rounded-full"> */}
          </div>
        </header>
      )}
    </>
  );
}
