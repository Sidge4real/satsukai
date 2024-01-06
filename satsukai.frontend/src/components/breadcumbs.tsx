import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ICategory } from '../../types/ICategory';

interface IBreadcrumbs{
    param?: string;
    category?: ICategory;
}

const Breadcrumbs = ({param, category} : IBreadcrumbs) => {
  const router = useRouter();
  let categoryPathSegement = "";
  let pathSegments = router.asPath.split('/').filter((segment) => segment !== '');
  if(category){
    categoryPathSegement = category.attributes.endpoint;
  }
  if (categoryPathSegement !== "") {
    pathSegments.splice(-1, 0, categoryPathSegement);
  }

  return (
    <nav className="text-sm font-medium text-gray-500 py-2" aria-label="Breadcrumb">
      <ol className="list-none p-0 inline-flex">
        <li className="flex items-center">
          <Link href="/">
            <p className="hover:text-gray-700">Home</p>
          </Link>
        </li>
        {pathSegments.map((segment, index) => (
          <li key={index} className="flex items-center">
            <span className="mx-1">{'＞'}</span>
            <Link
            href={
              categoryPathSegement === segment 
                ? `/products/${segment}`
                : pathSegments.length - 1 === index && category 
                ? `/${pathSegments[0]}/${segment}`
                : `/${pathSegments.slice(0, index + 1).join('/')}` // default
            }
          >
            <p className="hover:text-gray-700">{param && pathSegments.length - 1 === index ? param : segment}</p>
          </Link>

          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
