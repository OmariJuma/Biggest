"use client";
import { CustomButton, SectionTitle } from "@/components";
import axios from "axios";
import React, { useState } from "react";

interface Image {
  name: string;
  type: string;
  size: number;
  // Add other image properties as needed (e.g., preview data)
}
function page() {
  // slug,
  // title,
  // mainImage,
  // price,
  // description,
  // manufacturer,
  // categoryId,
  const [title, setTitle] = useState<string>();
  const [units, setUnits] = useState<number>();
  const [price, setPrice] = useState<number>();
  const [description, setDescription] = useState<string>();
  const [images, setImages] = useState<Image[]>([]);
  const [manufacturer, setManufacturer] = useState<string>();
  const [categoryId, setCategoryId] = useState<string>();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(title, price, units, description, images);
    try {
      const { data } = await axios.post(`http://localhost:8080/api/products`, {
        id: localStorage.getItem("id"),
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
    } catch (error) {}
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const images: Image[] = Array.from(e.target.files) as Image[];
    const validImages = [] as Image[];
    images.forEach((image) => {
      const allowedTypes = [
        "image/jpeg",
        "image/png",
        "image/gif",
        "image/jpg",
      ];
      if (allowedTypes.includes(image.type)) {
        validImages.push(image);
        console.log("Images is of correct type");
      } else {
        console.error(
          `Invalid file type: ${image.name} (expected "image/jpeg", "image/png", "image/gif", "image/jpg)`
        );
      }
    });
    setImages(validImages);
    console.log("Images uploaded successfully");
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
                  Price
                </label>
                <div className="mt-2">
                  <input
                    id="price"
                    name="price"
                    type="number"
                    onChange={(e) => setPrice(e.target.value)}
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
                    step={""}
                    onChange={(e) => setUnits(e.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <div>
                  <label
                    htmlFor="image"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Upload photos of the product
                  </label>
                  <input
                    id="image"
                    name="image"
                    type="file"
                    multiple
                    accept="image/jpeg, image/png, image/gif, image/jpg"
                    title="Upload Images"
                    onChange={handleImageUpload}
                    className="block w-full rounded-md h- 10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
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

export default page;
