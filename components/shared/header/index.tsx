import Image from "next/image";
import Link from "next/link";
import { APP_NAME } from "@/lib/constants";
import { getAllCategories } from "@/lib/actions/product.actions";
import Menu from "./menu";
import Search from "./search";

const Header = async () => {
  const categories = await getAllCategories();

  return (
    <header className="w-full border-b">
      <div className="wrapper flex items-center justify-between py-3">
        {/* Left Section: Logo */}
        <div className="flex items-center gap-2 sm:gap-4 flex-1 min-w-0">
          <Link href="/" className="flex items-center gap-2 min-w-0">
            <Image
              src="/assets/icons/logo.svg"
              width={40}
              height={40}
              alt={`${APP_NAME} logo`}
              className="sm:w-12 sm:h-12"
            />
            <span className="font-bold text-base sm:text-lg truncate">{APP_NAME}</span>
          </Link>

          <div className="hidden lg:block flex-1 max-w-md ml-4">
            <Search categories={categories} />
          </div>
        </div>

        {/* Right Section: Cart + User Button */}
        <Menu />
      </div>

      {/* Mobile Search */}
      <div className="lg:hidden block px-5 pb-2">
        <Search categories={categories} />
      </div>
    </header>
  );
};

export default Header;
