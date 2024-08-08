// *********************
// Role of the component: Category wrapper that will contain title and category items
// Name of the component: CategoryMenu.tsx
// Developer: Aleksandar Kuzmanovic
// Version: 1.0
// Component call: <CategoryMenu />
// Input parameters: no input parameters
// Output: section title and category items
// *********************

import React from "react";
import CategoryItem from "./CategoryItem";
import { categoriessubCategories } from "@/lib/categoriesSubcategories";
import { FaCirclePlus } from "react-icons/fa6";

const CategoryMenu = () => {
  return (
    <div className="py-10 bg-white">
      <div className="max-w-screen-2xl mx-auto py-10 gap-x-5 px-16 max-md:px-10 gap-y-5 grid grid-cols-5 max-lg:grid-cols-3 max-md:grid-cols-2 max-[450px]:grid-cols-1">
        <a href="/addProduct" className="flex flex-col justify-center items-center p-2 cursor-pointer hover:bg-gray-200">
                   <FaCirclePlus size={100} />
          <h2 className="text-xl mt-2 font-bold text-center">Add a Product</h2>
        </a>
        {categoriessubCategories.categories.map((item) => (
          <CategoryItem title={item.name} key={item.id} href={item.href} image={item.image}/>
         
        ))}
      </div>
    </div>
  );
};

export default CategoryMenu;
