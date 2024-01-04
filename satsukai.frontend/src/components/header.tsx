import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';

interface HeaderComponentProps {
  toggleCartOverlay: () => void;
}

const HeaderComponent = ({ toggleCartOverlay }: HeaderComponentProps) => {
  const router = useRouter();
  const [cartOpen, setCartOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleToggleMenu = () => {
    setMenuOpen(!menuOpen);
    document.body.style.overflow = "hidden";
  };

  return (
    <nav className="bg-white bg-opacity-0 top-0 z-50">
      <div className="mx-10 py-5">
        <div className="relative flex h-16 items-center justify-between">
          <div className="flex-shrink-0">
            <div className="flex items-center">
              <img style={{ width: "90px" }} src='brand.png' alt='logo' />
              <p style={{fontSize:"30px", color:"#999"}} className='expr'>Satsukai</p>
            </div>
          </div>

          <div className="lg:hidden">
            <button
              type="button"
              className="text-gray-500 hover:bg-gray-100 rounded-md px-3 py-2"
              onClick={handleToggleMenu}
            >
              <span className="material-symbols-outlined">menu</span>
            </button>
          </div>

          <div className="hidden lg:flex items-center space-x-4">
            <Link href="/" className={`text-gray-500 hover:bg-gray-100 rounded-md px-3 py-2 text-sm font-medium`}>Home</Link>
            <Link href="/products" className={`text-gray-500 hover:bg-gray-100 rounded-md px-3 py-2 text-sm font-medium ${router.pathname.startsWith('/products') ? 'bg-gray-100' : ''}`}>Shop</Link>
            <Link href="/posts" className={`text-gray-500 hover:bg-gray-100 rounded-md px-3 py-2 text-sm font-medium ${router.pathname.startsWith('/posts') ? 'bg-gray-100' : ''}`}>Blog</Link>
            <button type="button" className="block text-gray-500 hover:bg-gray-100 rounded-md px-3 py-2" onClick={toggleCartOverlay}>
              <span className="material-symbols-outlined text-3xl">shopping_bag</span>
            </button>
          </div>

          {menuOpen && (
            <div className="lg:hidden fixed top-0 left-0 bg-white border rounded-md shadow-md p-2 z-50 w-full h-full flex flex-col items-center justify-center">
              <button
                type="button"
                className="text-gray-500 hover:bg-gray-100 rounded-md mx-[43px] my-[32px] absolute top-2 right-2 px-3 py-2"
                onClick={handleToggleMenu}
              >
                <span className="material-symbols-outlined">close</span>
              </button>
              <Link href="/" className="block text-gray-500 hover:bg-gray-100 rounded-md px-3 py-2 text-2xl font-medium" onClick={handleToggleMenu}>Home</Link>
              <Link href="/products" className={`block text-gray-500 hover:bg-gray-100 rounded-md px-3 py-2 text-2xl font-medium ${router.pathname.startsWith('/products') ? 'bg-gray-100' : ''}`} onClick={handleToggleMenu}>Shop</Link>
              <Link href="/posts" className={`block text-gray-500 hover:bg-gray-100 rounded-md px-3 py-2 text-2xl font-medium ${router.pathname.startsWith('/posts') ? 'bg-gray-100' : ''}`} onClick={handleToggleMenu}>Blog</Link>
              <Link href="/contact" className={`block text-gray-500 hover:bg-gray-100 rounded-md px-3 py-2 text-2xl font-medium ${router.pathname === '/contact' ? 'bg-gray-100' : ''}`} onClick={handleToggleMenu}>Contact</Link>
              <button type="button" className="block text-gray-500 hover:bg-gray-100 rounded-md px-3 py-2" onClick={() => { handleToggleMenu(); toggleCartOverlay(); }}>
                <span className="material-symbols-outlined text-3xl">shopping_bag</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default HeaderComponent;
