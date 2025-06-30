'use client';

import { gql, useQuery } from '@apollo/client';
import { useParams } from 'next/navigation';

const GET_PRODUCT_BY_SLUG = gql`
  query GetProductBySlug($slug: String!) {
    product(slug: $slug) {
      id
      title
      price
      description
      images
    }
  }
`;

export default function ProductPage() {
  const { slug } = useParams(); // Next.js App Router slug
 console.log(slug)
  const { data, loading, error } = useQuery(GET_PRODUCT_BY_SLUG, {
    variables: { slug },
    skip: !slug,
  });

  if (loading) return <p className="p-4">Loading...</p>;
  if (error || !data?.product) return <p className="p-4">Product not found.</p>;

  const product = data.product;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <img
        src={product.images?.[0]}
        alt={product.title}
        className="w-full h-[400px] object-cover rounded-xl mb-4"
      />
      <h1 className="text-3xl font-bold">{product.title}</h1>
      <p className="text-xl text-gray-500 my-2">₹{product.price}</p>
      <p className="text-gray-700">{product.description}</p>
    </div>
  );
}
