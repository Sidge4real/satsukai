import { Post } from "../../types/IBlogPost";

const postsPage = ({ posts }: { posts: Post[] }) => {
    return <>
        {posts.map(post => <p>{post.attributes.title}</p>)}
    </>
}

export async function getServerSideProps() {
    try {
      const response = await fetch("http://localhost:1337/api/blogs?populate=image");
  
      if (response.ok) {
        const data = await response.json();
        return { props: { posts: data.data } };
      } else {
        console.error("Failed to fetch data");
        return { props: { posts: [] } };
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      return { props: { posts: [] } };
    }
  }

export default postsPage