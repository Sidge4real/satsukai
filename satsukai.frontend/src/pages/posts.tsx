import Link from "next/link";
import { IBlogPost } from "../../types/IBlogPost";
import { useState } from "react";
import Breadcrumbs from "@/components/breadcumbs";
import TuneModal from "@/components/FilterModel";
import { IPostFilters } from "../../types/IPostFilters";

const PostsPage = ({ blogData, filters }: { blogData: IBlogPost[], filters: IPostFilters[] }) => {
  const [isTuneModalOpen, setTuneModalOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);

  const openTuneModal = () => {
    if (isTuneModalOpen) {
      closeTuneModal();
    }
    setTuneModalOpen(true);
  };

  const closeTuneModal = () => {
    setTuneModalOpen(false);
  };

  const applyFilter = (filter: string | null) => {
    setSelectedFilter(filter);
    closeTuneModal();
  };

  let filteredBlogData = blogData;
  if (selectedFilter && selectedFilter !== "Show all") {
    filteredBlogData = blogData.filter((post) => post.attributes.category === selectedFilter);
  }

  return (
    <div className="container mx-auto mt-8 my-12 text-center">
      <div className="flex justify-center">
        <img src="blogBanner.png" className="h-80" alt="Blog Banner" />
      </div>
      <h1 className="text-4xl font-bold mb-4 expr expr-post-page">Whispers of Wisdom</h1>
      <p className="mb-4">Where Imagination Meets Expression</p>
      <nav className="flex gap-4 my-3 mx-5">
        <div className="flex gap-4">
          <button onClick={openTuneModal} className="material-symbols-outlined">
            tune
          </button>
          <Breadcrumbs />
        </div>
      </nav>
      {filteredBlogData && filteredBlogData.length === 0 ? (
        <div className="min-h-[500px] flex items-center justify-center flex-col">
          <p>No posts found.</p>
          <button onClick={() => applyFilter("Show all")} className="bg-green-500 text-white p-2 mt-2">
            Show All
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBlogData && filteredBlogData.map((post) => (
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
      )}
      <TuneModal selectedFilter={selectedFilter} onApplyFilter={applyFilter} categories={filters} isOpen={isTuneModalOpen} onClose={closeTuneModal} />
    </div>
  );
};


export async function getStaticProps() {
  try {
    const blogResponse = await fetch("http://localhost:1337/api/blogposts?populate=*");
    const blogData = await blogResponse.json();

    const filterResponse = await fetch("http://localhost:3000/api/filters");
    const filters = await filterResponse.json();

    if (blogResponse.ok && filterResponse.ok) {
      console.log(blogData, filters);
      return { props: { blogData: blogData.data, filters } };
    } else {
      console.error("Failed to fetch data");
      return { props: { blogData: [], filters: [] } };
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    return { props: { blogData: [], filters: [] } };
  }
}


export default PostsPage;
