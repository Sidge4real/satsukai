import Link from 'next/link';
import React from 'react';

const Footer = () => {
  return (
    <footer className="p-5 flex md:flex-row flex-col-reverse items-center justify-center text-gray-500 border-t md:border-t-0">
      <div className="pt-5 md:pt-0 md:pb-0 text-center md:pr-5">
        <span className='expr'>Satsukai</span> &copy;2023
      </div>
      <div className="flex flex-col md:flex-row text-center">
        <Link href="/terms-of-service" className="mr-2 mb-2 md:mb-0 hover:text-green-500">Terms of Service</Link>
        <Link href="/privacy-policy" className="mx-2 mb-2 md:mb-0 hover:text-green-500">Privacy Policy</Link>
        <Link href="/manage-cookies" className="mx-2 mb-2 md:mb-0 hover:text-green-500">Manage Cookies</Link>
        <Link href="/other-legal-docs" className="mx-2 mb-2 md:mb-0 hover:text-green-500">Other Legal Docs</Link>
        <Link href="/payment" className="mx-2 hover:text-green-500">Payment</Link>
      </div>
    </footer>
  );
};

export default Footer;
