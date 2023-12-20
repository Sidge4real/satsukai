import { useRouter } from "next/router";
import { IBlogPost } from "../../../types/IBlogPost";

const DetailPage = ({ post }: { post: IBlogPost }) => {
    const router = useRouter();

    if (!post || post == null || undefined) {
        router.replace('/404');
        return null;
    }
  
    return (
        <div className="container mx-auto mt-8 text-center max-w-screen-lg px-5 pb-10">
            <img src={post.attributes.banner.data.attributes.url} alt={post.attributes.title} className="mx-auto mb-8 rounded-lg" />
            <h1 className="text-4xl font-bold mb-4">{post.attributes.title}</h1>
            <p className="text-gray-600">{post.attributes.text}</p>
        </div>
    );
};

export async function getServerSideProps({ params }: { params: { id: string }, res: any }) {
    try {
        const response = await fetch(
            `http://localhost:1337/api/blogposts?populate=*&filters[id][$eq]=${params.id}`
        );
    
        if (response.ok) {
            const data = await response.json();
            const [post] = data.data;
    
            if (!post) {
                return { props: { post: null } }
            }
    
            return { props: { post } };
        } else {
            console.error("Failed to fetch data");
            return { props: { post: null } };
        }
    } catch (error) {
        console.error("Error fetching data:", error);
        return { props: { post: null } };
    }
}

export default DetailPage;
