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
        {/* Left Section: Logo + Search */}
        <div className="flex items-center gap-4 flex-1">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/assets/icons/logo.svg"
              width={48}
              height={48}
              alt={`${APP_NAME} logo`}
            />
            <span className="font-bold text-lg">{APP_NAME}</span>
          </Link>

          <div className="hidden md:block flex-1 max-w-md">
            <Search categories={categories} />
          </div>
        </div>

        {/* Right Section: Cart + User Button */}
        <Menu />
      </div>

      {/* Mobile Search */}
      <div className="md:hidden block px-5 pb-2">
        <Search categories={categories} />
      </div>
    </header>
  );
};

export default Header;
