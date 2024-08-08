"use client";
import { CustomButton, SectionTitle } from "@/components";
import { categoriessubCategories } from "@/lib/categoriesSubcategories";
import axios from "axios";
import React, { useEffect, useState } from "react";
import FileReadPreview from "@/components/FileReadPreview";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";

interface Subcategory {
  id: number;
  name: string;
}
function Page() {
  const [title, setTitle] = useState<string>("");
  const [units, setUnits] = useState<number>(1);
  const [price, setPrice] = useState<number>(0);
  const [description, setDescription] = useState<string>("");
  const [images, setImages] = useState<File[]>([]);
  const [manufacturer, setManufacturer] = useState<string>("");
  const [categoryId, setCategoryId] = useState<number>();
  const [subCategoryId, setSubCategoryId] = useState<number>();
  const [location, setLocation] = useState<string>("");
  const [condition, setCondition] = useState<string>("");
  const [filteredSubCategories, setFilteredSubCategories] = useState<
    Subcategory[]
  >([]);

  useEffect(() => {
    const filteredCategory = categoriessubCategories.categories.find(
      (category) => category.id === categoryId
    );
    setFilteredSubCategories(filteredCategory?.subCategories || []);
  }, [categoryId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let categoryName = "";
    let subCategoryName = "";

    // Find category object based on categoryId
    const selectedCategory = categoriessubCategories.categories.find(
      (category) => category.id === categoryId
    );

    if (selectedCategory) {
      categoryName = selectedCategory.name;

      // Find subcategory object based on subCategoryId within the selected category
      const selectedSubcategory = selectedCategory.subCategories.find(
        (subcategory) => subcategory.id === subCategoryId
      );

      if (selectedSubcategory) {
        subCategoryName = selectedSubcategory.name;
      }
    }

    console.log("Category Name:", categoryName);
    console.log("Subcategory Name:", subCategoryName);

    const formData: FormData = new FormData();
    formData.append("title", title || "");
    formData.append("units", units?.toString() || "");
    formData.append("price", price?.toString() || "");
    formData.append("description", description || "");
    formData.append("manufacturer", manufacturer || "");
    formData.append("categoryId", categoryId?.toString() || "");
    formData.append("category", categoryName);
    formData.append("subCategory", subCategoryName);
    formData.append("subCategoryId", subCategoryId?.toString() || "");
    formData.append("Location", location);
    formData.append("Condition", condition);
    images.forEach((image) => {
      formData.append("images", image, image.name); // Append each image with its name
    });

    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URI}/api/products`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success("Product created successfully, redirecting...")
      redirect("/")
    } catch (error) {
      toast.error("An error has occured please refresh and try again")
    }
  };

  return (
    <div className="bg-white">
      <SectionTitle title="Add Product Listing" path="Home | addProduct" />
      <div className="flex  flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8 bg-white">
        <div className="sm:mx-auto sm:w-full sm:max-w-md ">
          <h2 className="mt-6 text-center text-2xl font-normal leading-9 tracking-tight text-gray-900">
            Create a new product listing
          </h2>
        </div>

        <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-[480px]">
          <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Name of Product
                </label>
                <div className="mt-2">
                  <input
                    id="title"
                    name="title"
                    type="text"
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="manufacturer"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Manufacturer of product
                </label>
                <div className="mt-2">
                  <input
                    id="manufacturer"
                    name="manufacturer"
                    type="text"
                    onChange={(e) => setManufacturer(e.target.value)}
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="price"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Price of the Product
                </label>
                <div className="mt-2">
                  <input
                    id="price"
                    name="price"
                    type="number"
                    onChange={(e) => setPrice(parseInt(e.target.value))}
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <div>
                  <label
                    htmlFor="units"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Enter Product Units
                  </label>
                  <input
                    id="units"
                    name="units"
                    type="number"
                    min={1}
                    step={1}
                    onChange={(e) => setUnits(parseInt(e.target.value))}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <div>
                  <label
                    htmlFor="location"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Enter the product's condition
                  </label>
                  <input
                    id="condition"
                    name="condition"
                    type="text"
                    onChange={(e) => setCondition(e.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <div>
                  <label
                    htmlFor="location"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Enter the product's location
                  </label>
                  <input
                    id="location"
                    name="location"
                    type="text"
                    onChange={(e) => setLocation(e.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <FileReadPreview images={images} setImages={setImages} />
              <div>
                <label
                  htmlFor="category"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Select Category
                </label>
                <div className="mt-2">
                  <select
                    id="category"
                    name="category"
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                      setCategoryId(parseInt(e.target.value))
                    }
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  >
                    <option value="">Select Category</option>
                    {categoriessubCategories.categories.map(
                      (category: { id: number; name: string }) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      )
                    )}
                  </select>
                </div>
                <div className="mt-2">
                  <select
                    id="subCategory"
                    name="subCategory"
                    onChange={(e) => setSubCategoryId(parseInt(e.target.value))}
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  >
                    <option value="">Select Sub-Category</option>
                    {filteredSubCategories.length > 0
                      ? filteredSubCategories.map((subcategory) => (
                          <option key={subcategory.id} value={subcategory.id}>
                            {subcategory.name}
                          </option>
                        ))
                      : null}
                  </select>
                </div>
              </div>
              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Description
                </label>
                <div className="mt-2">
                  <textarea
                    id="description"
                    name="description"
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    rows={10}
                    maxLength={300}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 "
                  />
                </div>
              </div>

              <div>
                <CustomButton
                  buttonType="submit"
                  text="Upload product"
                  paddingX={3}
                  paddingY={1.5}
                  customWidth="full"
                  textSize="sm"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
