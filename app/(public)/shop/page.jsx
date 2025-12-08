// 'use client'
// import { Suspense } from "react"
// import ProductCard from "@/components/ProductCard"
// import { MoveLeftIcon } from "lucide-react"
// import { useRouter, useSearchParams } from "next/navigation"
// import { useSelector } from "react-redux"

//  function ShopContent() {

//     // get query params ?search=abc
//     const searchParams = useSearchParams()
//     const search = searchParams.get('search')
//     const router = useRouter()

//     const products = useSelector(state => state.product.list)

//     const filteredProducts = search
//         ? products.filter(product =>
//             product.name.toLowerCase().includes(search.toLowerCase())
//         )
//         : products;

//     return (
//         <div className="min-h-[70vh] mx-6">
//             <div className=" max-w-7xl mx-auto">
//                 <h1 onClick={() => router.push('/shop')} className="text-2xl text-slate-500 my-6 flex items-center gap-2 cursor-pointer"> {search && <MoveLeftIcon size={20} />}  All <span className="text-slate-700 font-medium">Products</span></h1>
//                 <div className="grid grid-cols-2 sm:flex flex-wrap gap-6 xl:gap-12 mx-auto mb-32">
//                     {filteredProducts.map((product) => <ProductCard key={product.id} product={product} />)}
//                 </div>
//             </div>
//         </div>
//     )
// }


// export default function Shop() {
//   return (
//     <Suspense fallback={<div>Loading shop...</div>}>
//       <ShopContent />
//     </Suspense>
//   );
// }









"use client";

import { Suspense } from "react";
import ProductCard from "@/components/ProductCard";
import { MoveLeftIcon, BoxIcon } from "lucide-react"; // only keep MoveLeftIcon & BoxIcon
import { useRouter, useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";

function ShopContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const search = searchParams.get("search") || "";
  const category = searchParams.get("category") || "";

  const products = useSelector((state) => state.product.list);

  const categories = [
    { name: "Fruits & Vegetables" },
    { name: "Dairy & Eggs" },
    { name: "Meat, Fish & Poultry" },
    { name: "Bakery & Bread" },
    { name: "Beverages" },
    { name: "Snacks & Packaged Foods" },
    { name: "Grains, Rice & Pulses" },
    { name: "Cooking Essentials & Spices" },
    { name: "Frozen & Ready-to-Eat" },
    { name: "Others" },
  ];

  // FILTERING LOGIC
  let filtered = products;

  if (search) {
    filtered = filtered.filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase())
    );
  }

  if (category) {
    filtered = filtered.filter((p) => p.category === category);
  }

  const handleCategoryClick = (cat) => {
    const params = new URLSearchParams(searchParams.toString());
    if (cat) params.set("category", cat);
    else params.delete("category");
    router.push(`/shop?${params.toString()}`);
  };

  return (
    <div className="min-h-[70vh] mx-3 sm:mx-6">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row gap-8">

        {/* ------------------ SIDEBAR (DESKTOP) ------------------ */}
        <aside className="w-full sm:w-64 hidden sm:block">
          <div className="bg-white border border-green-200 shadow-sm rounded-xl p-5 sticky top-4">

            <h2 className="text-lg font-semibold mb-4 text-green-700">
              Categories
            </h2>

            <ul className="space-y-2">
              {/* All Products Button */}
              <li
                onClick={() => handleCategoryClick("")}
                className={`cursor-pointer px-4 py-2 rounded-lg border transition-all flex items-center gap-2 ${
                  !category
                    ? "bg-green-600 text-white border-green-600 shadow"
                    : "bg-white text-gray-700 border-gray-200 hover:border-green-400 hover:text-green-700"
                }`}
              >
                All Products
              </li>

              {/* Category Buttons */}
              {categories.map((cat) => (
                <li
                  key={cat.name}
                  onClick={() => handleCategoryClick(cat.name)}
                  className={`cursor-pointer px-4 py-2 rounded-lg border transition-all flex items-center gap-2 ${
                    category === cat.name
                      ? "bg-green-600 text-white border-green-600 shadow"
                      : "bg-white text-gray-700 border-gray-200 hover:border-green-400 hover:text-green-700"
                  }`}
                >
                  {cat.name}
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* ------------------ MOBILE DROPDOWN ------------------ */}
        <div className="sm:hidden w-full">
          <select
            value={category}
            className="w-full border border-green-300 px-3 py-2 rounded-lg text-green-700 bg-white focus:outline-none focus:ring-2 focus:ring-green-400"
            onChange={(e) => handleCategoryClick(e.target.value)}
          >
            <option value="">All Products</option>
            {categories.map((cat) => (
              <option key={cat.name} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* ------------------ PRODUCT GRID ------------------ */}
        <div className="flex-1">
          <h1
            onClick={() => router.push("/shop")}
            className="text-xl sm:text-2xl text-slate-500 my-4 flex items-center gap-2 cursor-pointer"
          >
            {(search || category) && <MoveLeftIcon size={20} />}
            All <span className="text-slate-700 font-medium">Products</span>
          </h1>

          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 mb-20">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}

            {filtered.length === 0 && (
              <p className="text-slate-500 text-center w-full mt-10">
                No products found.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div>Loading shop...</div>}>
      <ShopContent />
    </Suspense>
  );
}
