import React from 'react';

import { BookOpen, Mail, Phone, MapPin, Facebook, Instagram, Linkedin } from 'lucide-react';
import { Link } from 'react-router';

const Footer = () => {
  const links = [
    { name: 'Home', path: '/' },
    { name: 'Books', path: '/books' },
    { name: 'Dashboard', path: '/dashboard' },
  ];
    return (
        <footer className="dark:bg-black/50 mt-auto">
      <div className="container mx-auto px-4 lg:px-0  py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

          {/* Brand */}
          <div className="col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
            
              <div>
                        <img className="w-10 h-10 rounded-xl text-white flex items-center justify-center transform group-hover:scale-105 group-hover:rotate-3 transition-all duration-500 shadow-md" src='https://i.ibb.co.com/sdDsNMSx/download.jpg' />
              </div>
              <span className="text-xl dark:text-white font-semibold">LibrisGo</span>
            </Link>
            <p className="text-sm text-gray-600 dark:text-white">
              Bringing books to your doorstep. Your trusted library delivery service.
            </p>
          </div>

          {/*  Links */}
          <div>
            <h3 className="font-semibold  dark:text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
          
              {
                links.map(link => (
                  <li key={link.path}>
                    <Link to={link.path} className="text-sm text-gray-600 hover:text-blue-600 dark:text-white transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold  dark:text-white mb-4">Contact Us</h3>
            <ul className="space-y-2 text-gray-600 dark:text-white">
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4 " />
                <span>sabbirhosain209@gmail.com</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span>018****3771</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>123 Khilgaon, Dhaka</span>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-semibold mb-4 dark:text-white">Follow Us</h3>
            <div className="flex gap-4 text-gray-600 dark:text-white">
              <a
                href="https://facebook.com"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://x.com"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
                  <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
                </svg>
              </a>
              <a
                href="https://instagram.com"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

      

        {/* Copyright */}
        <div className=" border-t mt-8 pt-8 text-center dark:text-white">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} BookCourier. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
    
    );
};

export default Footer;