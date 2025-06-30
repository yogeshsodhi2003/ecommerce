// src/app/products/page.tsx
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useQuery, gql } from '@apollo/client';

const GET_PRODUCTS = gql`
  query GetProducts {
    products {
      id
      title
      slug
      price
      image
    }
  }
`;

export default function ProductsPage() {
  const { data, loading, error } = useQuery(GET_PRODUCTS);

  if (loading) return <p className="text-center p-8">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error.message}</p>;

  const products = data.products;

  return (
    <main className="bg-white min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-center mb-10">All Products</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product: any) => (
          <Link
            key={product.id}
            href={`/products/${product.slug}`}
            className="border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
          >
            <div className="relative aspect-square">
              <Image
                src={product.image}
                alt={product.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <h2 className="font-semibold text-lg line-clamp-2">{product.title}</h2>
              <p className="text-gray-500 mt-1">${product.price.toFixed(2)}</p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
