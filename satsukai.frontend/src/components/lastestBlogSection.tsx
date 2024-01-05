import Link from "next/link"
import { IBlogPost } from "../../types/IBlogPost"

interface ILatestBlogSection{
    blogs: IBlogPost[];
    windowWidth: number;
}

const LatestBlogs = ({blogs, windowWidth} : ILatestBlogSection) => {
    return <section className="flex flex-col justify-center mt-8 p-20">
    <h2 className='text-center text-2xl font-bold text-gray-500 mb-4'>Latest blog posts</h2>
    <div className={`flex gap-10 ${windowWidth < 1500 ? "flex-col" : "flex-row"}`}>
    {blogs && blogs.map((post) => (
      <div key={post.id} className={`max-w-md flex flex-col items-center justify-center h-full min-w-[420px]`}>
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
  </section>
}


export default LatestBlogs;