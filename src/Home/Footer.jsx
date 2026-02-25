import React from 'react';
import { Mail, Phone, MapPin, Facebook, Instagram, Linkedin } from 'lucide-react';
import { Link } from 'react-router';

const Footer = () => {
  const links = [
    { name: 'Home', path: '/' },
    { name: 'Books', path: '/books' },
    { name: 'Dashboard', path: '/dashboard' },
  ];

  return (
    <footer className="dark:bg-black/50 mt-auto w-full overflow-hidden">
      <div className="w-full px-4 py-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <img
                className="w-10 h-10 rounded-xl shadow-md shrink-0"
                src="/Librisgo.jpg"
                alt="LibrisGo logo"
              />
              <span className="text-xl dark:text-white font-semibold">LibrisGo</span>
            </Link>
            <p className="text-sm text-gray-600 dark:text-white">
              Bringing books to your doorstep. Your trusted library delivery service.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold dark:text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {links.map(link => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-gray-600 hover:text-blue-600 dark:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="col-span-2 md:col-span-1">
            <h3 className="font-semibold dark:text-white mb-4">Contact Us</h3>
            <ul className="space-y-2 text-gray-600 dark:text-white">
              <li className="flex items-start gap-2 text-sm">
                <Mail className="h-4 w-4 mt-0.5 shrink-0" />
                <span className="break-all">sabbirhosain209@gmail.com</span>
              </li>
              <li className="flex items-center gap-2 text-sm">
                <Phone className="h-4 w-4 shrink-0" />
                <span>018****3771</span>
              </li>
              <li className="flex items-center gap-2 text-sm">
                <MapPin className="h-4 w-4 shrink-0" />
                <span>123 Khilgaon, Dhaka</span>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-semibold mb-4 dark:text-white">Follow Us</h3>
            <div className="flex gap-4 text-gray-600 dark:text-white flex-wrap">
              <a href="https://facebook.com" className="hover:text-blue-600 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="https://x.com" className="hover:text-foreground transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
                  fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
                  <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
                </svg>
              </a>
              <a href="https://instagram.com" className="hover:text-pink-500 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"
                className="hover:text-blue-700 transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

        </div>

        {/* Copyright */}
        <div className="border-t mt-8 pt-8 text-center dark:text-white">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} BookCourier. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;