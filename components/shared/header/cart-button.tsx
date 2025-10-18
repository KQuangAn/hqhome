import { getMyCart } from "@/lib/actions/cart.actions";
import CartButtonClient from "./cart-button-client";

export default async function CartButton() {
  const cart = await getMyCart();
  const itemCount = cart && cart.items.length > 0 
    ? cart.items.reduce((a, c) => a + c.qty, 0)
    : 0;
    
  return <CartButtonClient itemCount={itemCount} />;
}
