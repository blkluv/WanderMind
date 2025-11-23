import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { googleLogout } from "@react-oauth/google";
import axios from "axios";
import { FcGoogle } from "react-icons/fc";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useGoogleLogin } from "@react-oauth/google";
import ThemeToggle from "./ThemeToggle";
import AnimatedLogo from "./AnimatedLogo";

function Header() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    console.log("User:", user);
  }, [user]);

  const handleLogout = () => {
    googleLogout();
    localStorage.clear();
    setUser(null);
    window.location.reload();
  };

  const login = useGoogleLogin({
    onSuccess: (tokenInfo) => {
      console.log(tokenInfo);
      GetUserProfile(tokenInfo);
    },
    onError: (error) => console.log(error),
  });

  const GetUserProfile = (tokenInfo) => {
    axios
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenInfo.access_token}`,
            Accept: "application/json",
          },
        }
      )
      .then((resp) => {
        console.log(resp.data);
        localStorage.setItem("user", JSON.stringify(resp.data));
        setOpenDialog(false);
        window.location.reload();
      });
  };

  return (
    <div className="flex flex-wrap items-center gap-2 p-3 px-5 transition-colors bg-white border-b border-gray-200 shadow-sm sm:flex-nowrap dark:bg-gray-900 dark:border-gray-700">
      {/* Clickable Logo - Redirects to Home */}
      <a href="/" className="flex items-center gap-2 transition-opacity cursor-pointer hover:opacity-80">
        <AnimatedLogo className="w-8 h-8 sm:w-10 sm:h-10" />
        <h2 className="font-bold text-[20px] sm:text-[25px] md:text-[30px] text-[#2196f3] dark:text-[#42a5f5]">
          IRL.<span className="text-gray-900 dark:text-white">TRAVEL</span>
        </h2>
      </a>
      <div className="flex items-center gap-3 ml-auto">
        {/* Quick Feature Access - Hidden on mobile */}
        <div className="items-center hidden gap-2 lg:flex">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => window.location.href = '/create-trip?tab=inspire'}
            className="text-xs text-gray-700 bg-white border-gray-300 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            🎯 Inspire Me
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => window.location.href = '/create-trip?tab=persona'}
            className="text-xs text-gray-700 bg-white border-gray-300 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            🤖 AI Plan
          </Button>
        </div>

        {/* Theme Toggle */}
        <ThemeToggle />
        
        {user ? (
          <div className="flex items-center gap-2 sm:gap-3">
            <a href="/create-trip">
              <Button variant="outline" className="px-2 py-1 text-xs rounded-full sm:text-sm sm:px-4 sm:py-2">
                <span className="hidden sm:inline">+ Create Trip</span>
                <span className="sm:hidden">+ Trip</span>
              </Button>
            </a>
            <a href="/my-trips" className="hidden sm:block">
              <Button variant="outline" className="px-2 py-1 text-xs rounded-full sm:text-sm sm:px-4 sm:py-2">
                My Trips
              </Button>
            </a>
            <Popover>
              <PopoverTrigger>
                <img
                  src={user?.picture}
                  className="h-[30px] w-[30px] sm:h-[35px] sm:w-[35px] rounded-full cursor-pointer border-2 border-gray-200 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-400 transition-colors"
                  alt={user?.name}
                />
              </PopoverTrigger>
              <PopoverContent className="w-48">
                <div className="space-y-2">
                  <div className="px-2 py-1.5">
                    <p className="text-sm font-medium">{user?.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{user?.email}</p>
                  </div>
                  <hr className="border-gray-200 dark:border-gray-600" />
                  <a href="/my-trips" className="block sm:hidden">
                    <button className="w-full text-left px-2 py-1.5 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors">
                      My Trips
                    </button>
                  </a>
                  <button 
                    className="w-full text-left px-2 py-1.5 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
                    onClick={handleLogout}
                  >
                    Sign Out
                  </button>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        ) : (
          <Button
            onClick={() => {
              setOpenDialog(true);
            }}
            className="px-3 py-1 text-xs sm:text-sm sm:px-4 sm:py-2"
          >
            Sign In
          </Button>
        )}
      </div>

      {/* Sign-In Modal with proper close functionality */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="sr-only">Sign In</DialogTitle>
            <DialogDescription>
              <div className="flex items-center justify-center gap-3 mb-6">
                <AnimatedLogo className="w-12 h-10" />
                <h2 className="font-bold text-2xl text-[#2196f3] dark:text-[#42a5f5]">
                  IRL.<span className="text-gray-900 dark:text-white">TRAVEL</span>
                </h2>
              </div>
              <h2 className="mt-5 text-xl font-bold text-center text-gray-900 dark:text-white">
                Sign In With Google
              </h2>
              <p className="mt-2 text-center text-gray-600 dark:text-gray-400">
                Sign in to the app with secure Google authentication.
              </p>
              <Button
                onClick={login}
                className="flex items-center justify-center w-full gap-4 py-3 mt-6 text-gray-900 transition-all bg-white border border-gray-300 rounded-lg hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-white dark:border-gray-600"
              >
                <FcGoogle className="w-6 h-6" />
                <span className="font-semibold">Sign In With Google</span>
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Header;
