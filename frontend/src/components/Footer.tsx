
import React from "react";
import Link from "next/link";
import { FaInstagram, FaYoutube, FaTwitter } from "react-icons/fa"; // Assuming you have react-icons installed

const Footer: React.FC = () => {
  return (
    <footer className="bg-white text-gray-800 py-16 px-4 md:px-8 lg:px-16 border-t border-gray-200">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {/* Section 1: FlashPost Info */}
        {/* On smaller screens (col-1), make text center. On larger, keep it left. */}
        <div className="flex flex-col space-y-4 items-center text-center md:items-start md:text-left">
          <h3 className="font-josefin text-2xl font-bold text-gray-900">
            FlashPost
          </h3>
          <p className="font-montserrat text-sm text-gray-600 leading-relaxed">
            Exprime-toi en un éclair⚡
          </p>
          <div className="flex space-x-5 mt-4">
            <Link
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <FaInstagram className="text-xl hover:text-orange-500 transition-colors duration-200" />
            </Link>
            <Link
              href="https://www.youtube.com/" // Corrected YouTube link
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
            >
              <FaYoutube className="text-xl hover:text-orange-500 transition-colors duration-200" />
            </Link>
            <Link
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
            >
              <FaTwitter className="text-xl hover:text-orange-500 transition-colors duration-200" />
            </Link>
          </div>
        </div>

       {/* Section 2: A propos Links */}
<div className="flex flex-col space-y-4 items-center text-center md:items-start md:text-left">
  <h4 className="font-josefin text-lg font-bold text-gray-900 mb-2">
    A propos
  </h4>
  <ul className="grid grid-cols-2 gap-x-8 gap-y-2">
    <li>
      <Link
        href="/"
        className="font-montserrat text-sm text-gray-600 hover:text-orange-500 transition-colors duration-200"
      >
        Home
      </Link>
    </li>
    <li>
      <Link
        href="/culture"
        className="font-montserrat text-sm text-gray-600 hover:text-orange-500 transition-colors duration-200"
      >
        Culture
      </Link>
    </li>
    <li>
      <Link
        href="/science&technologie"
        className="font-montserrat text-sm text-gray-600 hover:text-orange-500 transition-colors duration-200"
      >
        Science & technologie
      </Link>
    </li>
    <li>
      <Link
        href="/voyage"
        className="font-montserrat text-sm text-gray-600 hover:text-orange-500 transition-colors duration-200"
      >
        Voyage
      </Link>
    </li>
    <li>
      <Link
        href="/voiture"
        className="font-montserrat text-sm text-gray-600 hover:text-orange-500 transition-colors duration-200"
      >
        Voiture
      </Link>
    </li>
    <li>
      <Link
        href="/contact"
        className="font-montserrat text-sm text-gray-600 hover:text-orange-500 transition-colors duration-200"
      >
        Contact
      </Link>
    </li>
  </ul>
</div>


        {/* Section 3: Newsletter */}
        {/* On smaller screens (col-1), make text center. On larger, keep it left. */}
        <div className="flex flex-col space-y-4 items-center text-center md:items-start md:text-left">
          <h4 className="font-josefin text-lg font-bold text-gray-900 mb-2">
            Newsletter
          </h4>
          <p className="font-montserrat text-sm text-gray-600 leading-relaxed">
Abonnez-vous à ma newsletter pour plus d&apos;histoires et d&apos;expériences de ma vie.          </p>
          <form className="flex mt-4 w-full max-w-sm"> {/* Added w-full and max-w-sm for form */}
            <input
              type="email"
              placeholder="VOTRE EMAIL"
              className="grow p-3 rounded-l bg-gray-100 text-sm text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
              aria-label="Your email for newsletter"
            />
            <button
              type="submit"
              className="bg-black text-white font-semibold py-3 px-6 rounded-r hover:bg-gray-800 transition-colors duration-200"
            >
            S&apos;INSCRIRE
            </button>
          </form>
        </div>
      </div>
    </footer>
  );
};

export default Footer;