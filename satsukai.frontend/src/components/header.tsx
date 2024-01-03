import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';

interface HeaderComponentProps {
  toggleCartOverlay: () => void;
}


const HeaderComponent = ({toggleCartOverlay} : HeaderComponentProps) => {
  const router = useRouter();
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <nav className="bg-white bg-opacity-0 top-0 z-50">
      <div className="mx-10 py-5">
        <div className="relative flex h-16 items-center justify-between">
          <div className="flex-shrink-0">
            <div className="flex items-center">
              <img style={{width:"90px"}} src='logo.png'/>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Link href="/" className={`text-gray-500 hover:bg-gray-100 rounded-md px-3 py-2 text-sm font-medium`}>Home</Link>
            <Link href="/products" className={`text-gray-500 hover:bg-gray-100 rounded-md px-3 py-2 text-sm font-medium ${router.pathname.startsWith('/products') ? 'bg-gray-100' : ''}`}>Shop</Link>
            <Link href="/posts" className={`text-gray-500 hover:bg-gray-100 rounded-md px-3 py-2 text-sm font-medium ${router.pathname.startsWith('/posts') ? 'bg-gray-100' : ''}`}>Blog</Link>
            <Link href="/contact" className={`text-gray-500 hover:bg-gray-100 rounded-md px-3 py-2 text-sm font-medium ${router.pathname === '/contact' ? 'bg-gray-100' : ''}`}>Contact</Link>
            <button type="button" className="text-gray-500 hover:bg-gray-100 rounded-md px-3 py-2" onClick={toggleCartOverlay}>
              <span className="material-symbols-outlined">shopping_bag</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default HeaderComponent;
