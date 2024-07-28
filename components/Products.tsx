// *********************
// Role of the component: Showing products on the shop page with applied filter and sort
// Name of the component: Products.tsx
// Developer: Aleksandar Kuzmanovic
// Version: 1.0
// Component call: <Products slug={slug} />
// Input parameters: { slug }: any
// Output: products grid
// *********************
"use client"
import React, {useEffect, useState} from "react";
import ProductItem from "./ProductItem";
import axios from "axios";

const Products = ({ slug }: any) => {
  // getting all data from URL slug and preparing everything for sending GET request
  const inStockNum = slug?.searchParams?.inStock === "true" ? 1 : 0;
  const outOfStockNum = slug?.searchParams?.outOfStock === "true" ? 1 : 0;
  const page = slug?.searchParams?.page ? Number(slug?.searchParams?.page) : 1;
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  let stockMode: string = "lte";
  
  // preparing inStock and out of stock filter for GET request
  // If in stock checkbox is checked, stockMode is "equals"
  if (inStockNum === 1) {
    stockMode = "equals";
  }
 // If out of stock checkbox is checked, stockMode is "lt"
  if (outOfStockNum === 1) {
    stockMode = "lt";
  }
   // If in stock and out of stock checkboxes are checked, stockMode is "lte"
  if (inStockNum === 1 && outOfStockNum === 1) {
    stockMode = "lte";
  }
   // If in stock and out of stock checkboxes aren't checked, stockMode is "gt"
  if (inStockNum === 0 && outOfStockNum === 0) {
    stockMode = "gt";
  }

  // sending API request with filtering, sorting and pagination for getting all products
  useEffect(()=>{
    const getDataUsingFilters = async()=>{
      setLoading(true);
      try {
        const data = await axios(
          `${process.env.BACKEND_URI}/api/products?filters[price][$lte]=${
            slug?.searchParams?.price || 1
          }&filters[rating][$gte]=${
            Number(slug?.searchParams?.rating) || 0
          }&filters[inStock][$${stockMode}]=1&${
            slug?.params?.slug?.length > 0
              ? `filters[category][$equals]=${slug?.params?.slug}&`
              : ""
          }sort=${slug?.searchParams?.sort}&page=${page}`
        );
        setProducts(data.data)

      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
      finally{
        setLoading(false); 
      }
     
    }
    getDataUsingFilters()
  }, [slug])

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="grid grid-cols-3 justify-items-center gap-x-2 gap-y-5 max-[1300px]:grid-cols-3 max-lg:grid-cols-2 max-[500px]:grid-cols-1">
      {products.length > 0 ? (
        products.map((product: Product) => (
          <ProductItem key={product.id} product={product} color="black" />
        ))
      ) : (
        <h3 className="text-3xl mt-5 text-center w-full col-span-full max-[1000px]:text-2xl max-[500px]:text-lg">
          No products found for specified query
        </h3>
      )}
    </div>
  );
};

export default Products;
