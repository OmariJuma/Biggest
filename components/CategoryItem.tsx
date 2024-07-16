// *********************
// Role of the component: Category Item that will display category icon, category name and link to the category
// Name of the component: CategoryItem.tsx
// Developer: Aleksandar Kuzmanovic
// Version: 1.0
// Component call: <CategoryItem title={title} href={href} ><Image /></CategoryItem>
// Input parameters: CategoryItemProps interface
// Output: Category icon, category name and link to the category
// *********************

import Image from "next/image";
import Link from "next/link";
import React, { type ReactNode } from "react";

interface CategoryItemProps {
  title: string;
  href: string;
  image: string;
}

const CategoryItem = ({ title, image, href }: CategoryItemProps) => {
  return (
    <Link href={href}>
      <div className="flex flex-col items-center gap-y-2 cursor-pointer bg-white py-5 text-black hover:bg-gray-100">
        <Image
          src={image}
          width={200}
          height={100}
          alt={title}
          style={{ aspectRatio: 1, objectFit: "cover" }}
        />
        <h3 className="font-semibold text-xl">{title}</h3>
      </div>
    </Link>
  );
};

export default CategoryItem;
