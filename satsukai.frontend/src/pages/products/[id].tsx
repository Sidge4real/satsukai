import { useRouter } from 'next/router';
import { ShopItem } from '../../../types/IShopItem';
import Detail from '@/components/detail';

const ProductDetailPage = ({ product }: { product: ShopItem }) => {
  const router = useRouter();

  if (!product || product == null || undefined) {
    router.replace('/404');
    return null;
  }

  return (
    <>
      <Detail />
    </>
  );
};

export async function getServerSideProps({ params }: { params: { id: string }, res: any }) {
  try {
    const response = await fetch(
      `http://localhost:1337/api/shops?filters[id][$eq]=${params.id}`
    );

    if (response.ok) {
      const data = await response.json();
      const [product] = data.data;

      if (!product) {
        return { props: { product: null } }
      }

      return { props: { product } };
    } else {
      console.error("Failed to fetch data");
      return { props: { product: null } };
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    return { props: { product: null } };
  }
}

export default ProductDetailPage;
