import { SetStateAction, useState, Dispatch, useEffect } from 'react';
import { IShopItem } from "../../types/IShopItem";
import { IBlogPost } from '../../types/IBlogPost';
import router from 'next/router';
import Team from '@/components/teamSection';
import LatestBlogs from '@/components/lastestBlogSection';
import { ITeam } from '../../types/ITeam';

export default function Home({ products, blogs, members }: { setShoppingList: Dispatch<SetStateAction<IShopItem[]>>, products: IShopItem[], blogs: IBlogPost[], members: ITeam[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + products.length) % products.length);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    const intervalId = setInterval(() => {
      nextSlide();
    }, 9000);

    return () => {
      clearInterval(intervalId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      <main className='h-auto w-full flex flex-col justify-center items-center relative'>
        <section className='relative w-full h-[85vh] m-10'>
          {products && (
            <article className={`flex ${windowWidth < 1200 ? "flex-col" : "flex-row"} justify-center items-center md:p-4 h-full`}>
              <div className={`${windowWidth < 1200 ? "text-center" : "text-left"} md:mr-20`}>
                <span className={products[currentIndex].attributes.color == "green" ? "text-green-500" : ""}>{products[currentIndex].attributes.category.data.attributes.endpoint}</span>
                <h1 className='text-gray-500 font-bold cursor-pointer hover:text-gray-400' style={{ fontSize: "40px" }} onClick={() => router.replace(`products/${products[currentIndex].id}`)}>{products[currentIndex].attributes.name}</h1>
                <p className='text-gray-400'>{products[currentIndex].attributes.slogan.replace(/[.,;]$/, '')}</p>
              </div>
              <img style={{ maxWidth: "100%", height: "auto" }} src={products[currentIndex].attributes.image.data[0].attributes.url} alt="" className='mt-4 cursor-pointer' onClick={() => router.replace(`products/${products[currentIndex].id}`)} />
            </article>
          )}
          <button className={`absolute ${windowWidth < 1200 ? "left-[5px]" : "left-[30px]"} top-1/2 transform -translate-y-1/2`} onClick={prevSlide}>
            <span style={{ fontSize: "50px" }} className="material-symbols-outlined text-gray-300">
              arrow_back_ios
            </span>
          </button>
          <button className={`absolute ${windowWidth < 1200 ? "right-[5px]" : "right-[30px]"} top-1/2 transform -translate-y-1/2`} onClick={nextSlide}>
            <span style={{ fontSize: "50px" }} className="material-symbols-outlined text-gray-300">
              arrow_forward_ios
            </span>
          </button>
        </section>

        <LatestBlogs blogs={blogs} windowWidth={windowWidth}  />
        <Team members={members} />
      </main>
    </>
  );
}

export async function getStaticProps() {
  const response = await fetch(`http://localhost:1337/api/products?populate=*&filters[$and][0][showroom][$eq]=true`);
  const data = await response.json();

  const blogResp = await fetch(`http://localhost:1337/api/blogposts?populate=*&pagination[limit]=3&sort=id:DESC`);
  const latestBlogPosts = await blogResp.json();

  const teamResp = await fetch("http://localhost:1337/api/employees?populate=*");
  const teamMembers = await teamResp.json();

  const products = data.data;
  const latest = latestBlogPosts.data;
  const team = teamMembers.data;

  return {
    props: {
      products,
      blogs: latest,
      members: team
    },
  };
}
