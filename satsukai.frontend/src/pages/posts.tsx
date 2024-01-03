import Link from "next/link";
import { IBlogPost } from "../../types/IBlogPost";
import { useContext, useState } from "react";
import Breadcrumbs from "@/components/breadcumbs";
import { ShopContext } from "@/ShopContext";


const PostsPage = ({ blogData }: { blogData: IBlogPost[] }) => {
  const {items} = useContext(ShopContext);

  return (
    <div className="container mx-auto mt-8 my-12 text-center">
      <div className="flex justify-center">
        <img src="blogBanner.png" className="h-80" alt="Blog Banner" />
      </div>
      <h1 className="text-4xl font-bold mb-4 expr expr-post-page">Whispers of Wisdom</h1>
      <p className="mb-4">Where Imagination Meets Expression</p>
      <nav className="flex gap-4 my-3 mx-5">
        <Breadcrumbs />
      </nav>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogData.map((post) => (
          <div key={post.id} className="max-w-md mx-auto flex flex-col h-full">
            <Link href={`/posts/${post.id}`}>
              <div className="flex flex-col h-full">
                <div className="bg-white p-4 rounded-lg shadow-md transition-shadow duration-300 hover:shadow-lg hover:bg-gray-100 flex-grow">
                  <div className="flex justify-center h-40">
                    <img
                      src={post.attributes.banner.data.attributes.url}
                      alt={post.attributes.title}
                      className="mb-4 rounded-md object-cover w-full h-full"
                    />
                  </div>
                  <h2 className="text-xl font-bold py-5">{post.attributes.title}</h2>
                  <p>{post.attributes.category}</p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export async function getServerSideProps() {
  try {
    const response = await fetch("http://localhost:1337/api/blogposts?populate=*");

    if (response.ok) {
      const data = await response.json();
      return { props: { blogData: data.data } };
    } else {
      console.error("Failed to fetch data");
      return { props: { blogData: [] } };
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    return { props: { blogData: [] } };
  }
}

export default PostsPage;
