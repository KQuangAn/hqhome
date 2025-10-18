import UserButton from "./user-button";
import CartButton from "./cart-button";
import LanguageSwitcher from "@/components/shared/language-switcher";

const Menu = () => {
  return (
    <div className="flex items-center gap-2">
      <LanguageSwitcher />
      <CartButton />
      <UserButton />
    </div>
  );
};

export default Menu;
