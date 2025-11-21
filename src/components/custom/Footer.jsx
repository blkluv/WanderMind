import React from "react"; 
import { Link } from "react-router-dom";
import { FaTiktok } from "react-icons/fa";

function Footer() {
  const socialIcons = [
    { 
      name: "TikTok", 
      icon: <FaTiktok />, 
      link: "https://tiktok.com/@irlugc" 
    },
  ];

  return (
    <>
      {/* Full-width horizontal line */}
      <div className="w-full">
        <hr className="w-full border-t border-gray-200 dark:border-gray-700" />
      </div>

      {/* Footer Content */}
      <div className="flex flex-col items-center justify-center w-full py-4">
        <p className="text-lg font-semibold text-gray-600">Made by ⚡ Wizard of Hahz</p>
        <div className="flex items-center justify-center gap-5 mt-2">
          {socialIcons.map((item, index) => (
            <Link 
              key={index} 
              to={item.link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-2xl text-gray-600 dark:text-gray-400 hover:text-[#ff0050] dark:hover:text-[#ff0050] transition-colors transform hover:scale-110"
            >
              {item.icon}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

export default Footer;