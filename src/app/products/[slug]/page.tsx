"use client";

import { gql, useQuery } from "@apollo/client";
import { useParams } from "next/navigation";

const GetProductBySlug = gql`
  query GetProductBySlug($slug: String!) {
    getProductBySlug(slug: $slug) {
      id
      title
      price
      description
      image
    }
  }
`;

export default function ProductPage() {
  const { slug } = useParams(); // Next.js App Router slug
  const { data, loading, error } = useQuery(GetProductBySlug, {
    variables: { slug },
    skip: !slug,
  });

  const product = data?.getProductBySlug;
  if (loading) return <p className="p-4">Loading...</p>;
  if (error ) return <p className="p-4">Product not found.</p>;
  // console.log(error, data)

  return (
    <div className="max-w-4xl mx-auto p-6">
      <img
        src={product.image}
        alt={product.title}
        className="w-full h-[400px] object-cover rounded-xl mb-4"
      />
      <h1 className="text-3xl font-bold">{product.title}</h1>
      <p className="text-xl text-gray-500 my-2">₹{product.price}</p>
      <p className="text-gray-700">{product.description}</p>
    </div>
  );
}
