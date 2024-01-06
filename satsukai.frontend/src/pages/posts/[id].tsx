import { useRouter } from "next/router";
import { IBlogPost } from "../../../types/IBlogPost";
import Breadcrumbs from "@/components/breadcumbs";
import { ParsedUrlQuery } from "querystring";
import { GetStaticPaths, GetStaticProps } from "next";

interface Paths extends ParsedUrlQuery {
    id: string
}
interface ProductProps {
    post: IBlogPost;
}

const DetailPage = ({ post }: { post: IBlogPost }) => {
    const router = useRouter();

    if (!post || post == null || undefined) {
        router.replace('/404');
        return null;
    }

    return (
        <div className="container mx-auto mt-8 text-center max-w-screen-lg px-5 pb-10">
            <nav className="flex gap-4 my-3">
                <Breadcrumbs param={post.attributes.title} />
            </nav>
            <img src={post.attributes.banner.data.attributes.url} alt={post.attributes.title} className="mx-auto mb-8 rounded-lg" />
            <p className="text-sm text-gray-500 mb-4">  {post.attributes.author} on {new Date(post.attributes.published).toLocaleDateString('en-GB')}</p>
            <h1 className="text-4xl font-bold mb-4">{post.attributes.title}</h1>
            <p className="text-gray-600">{post.attributes.text}</p>
        </div>
    );
};

export const getStaticPaths: GetStaticPaths<Paths> = async () => {
    const response = await fetch(`http://localhost:1337/api/blogposts?populate=*`);
    const posts = await response.json();
    const paths = posts.data.map((post: IBlogPost) => ({
        params: { id: post.id.toString() },
    }));

    return {
        paths: paths,
        fallback: false,
    };
}

export const getStaticProps: GetStaticProps<ProductProps, Paths> = async (context) => {
    const response = await fetch(
        `http://localhost:1337/api/blogposts?populate=deep&filters[id][$eq]=${context.params?.id}`
    );
    const post = await response.json();

    return {
        props: {
            post: post.data[0],
        },
    };
};
export default DetailPage;
