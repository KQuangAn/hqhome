import { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getCategoryBySlug,
  getAllProducts,
  getAttributeValuesByCategory,
} from "@/lib/actions/product.actions";
import ProductFilters from "@/components/shared/product/product-filters";
import MobileFilterDrawer from "@/components/shared/product/mobile-filter-drawer";
import ActiveFilters from "@/components/shared/product/active-filters";
import SortSelect from "@/components/shared/product/sort-select";
import ProductsGrid from "@/components/shared/product/products-grid";
import { getCategoryAttributes, getCategoryInfo } from "@/lib/constants";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const category = await getCategoryBySlug(params.slug);

  if (!category) {
    return {
      title: "Category Not Found",
    };
  }

  return {
    title: `${category.name} - Products`,
    description: `Browse our ${category.name} products`,
  };
}

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: {
    page?: string;
    sort?: string;
    [key: string]: string | string[] | undefined;
  };
}) {
  const category = await getCategoryBySlug(params.slug);

  if (!category) {
    notFound();
  }

  const page = Number(searchParams.page) || 1;
  const sort = (searchParams.sort as string) || "newest";

  // Get category info for display
  const categoryInfo = getCategoryInfo(params.slug);

  // Get category-specific attributes
  const categoryAttributeKeys = getCategoryAttributes(params.slug) as string[];

  // Get available filter values for this category
  const availableAttributes = await getAttributeValuesByCategory(params.slug);

  // Build attributes filter from search params
  const attributeFilters: Record<string, string | string[]> = {};
  let activeFilterCount = 0;
  categoryAttributeKeys.forEach((key) => {
    const value = searchParams[key];
    if (value && value !== "all") {
      if (typeof value === "string" && value.includes(",")) {
        attributeFilters[key] = value.split(",");
        activeFilterCount += value.split(",").length;
      } else {
        attributeFilters[key] = value as string;
        activeFilterCount += 1;
      }
    }
  });

  // Fetch products with filters
  const { data: products, totalPages } = await getAllProducts({
    query: "all",
    category: params.slug,
    page,
    sort,
    attributes: attributeFilters,
  });

  return (
    <div className="min-h-screen">
      {/* Category Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">{category.name}</h1>
        {categoryInfo?.description && (
          <p className="text-muted-foreground mb-4">
            {categoryInfo.description}
          </p>
        )}
      </div>

      {/* Mobile Filter Button */}
      <div className="mb-4 lg:hidden">
        <MobileFilterDrawer
          categorySlug={params.slug}
          availableAttributes={availableAttributes}
          categoryAttributeKeys={categoryAttributeKeys}
          activeFilterCount={activeFilterCount}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Filters Sidebar - Desktop */}
        <aside className="hidden lg:block lg:col-span-1">
          <div className="sticky top-4">
            <ProductFilters
              categorySlug={params.slug}
              availableAttributes={availableAttributes}
              categoryAttributeKeys={categoryAttributeKeys}
            />
          </div>
        </aside>

        {/* Products Grid */}
        <div className="lg:col-span-3">
          {/* Active Filters */}
          <ActiveFilters categoryAttributeKeys={categoryAttributeKeys} />

          {/* Sort Options and Results Count */}
          <SortSelect 
            currentSort={sort}
            productsCount={products.length}
            page={page}
          />

          {/* Products */}
          <ProductsGrid 
            products={products}
            page={page}
            totalPages={totalPages}
          />
        </div>
      </div>
    </div>
  );
}
