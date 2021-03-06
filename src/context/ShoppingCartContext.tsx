import { ShoppingCart } from 'components';
import { useLocalStorage } from 'hooks/useLocalStorage';
import { createContext, ReactNode, useContext, useState } from 'react';

type ShoppingCartProviderProps = {
   children: ReactNode;
};

type CartItem = {
   id: number;
   quantity: number;
};

type ShoppingCartContextProps = {
   getItemQuantity: (id: number) => number;
   increaseCartQuantity: (id: number) => void;
   decreaseCartQuantity: (id: number) => void;
   removeFromCart: (id: number) => void;
   openCart: () => void;
   closeCart: () => void;
   cartItems: CartItem[];
   cartQuantity: number;
};

const ShoppingCartContext = createContext({} as ShoppingCartContextProps);

export const useShoppingCart = () => useContext(ShoppingCartContext);

export const ShoppingCartProvider = ({
   children,
}: ShoppingCartProviderProps) => {
   const [cartItems, setCartItems] = useLocalStorage<CartItem[]>(
      'shopping-cart',
      []
   );
   const [isOpen, setIsOpen] = useState(false);

   const cartQuantity = cartItems.reduce(
      (quantity, item) => item.quantity + quantity,
      0
   );

   const openCart = () => setIsOpen(true);

   const closeCart = () => setIsOpen(false);

   function getItemQuantity(id: number) {
      return cartItems.find((item) => item.id === id)?.quantity || 0;
   }

   function increaseCartQuantity(id: number) {
      setCartItems((currentItems) => {
         if (currentItems.find((item) => item.id === id) == null) {
            return [...currentItems, { id, quantity: 1 }];
         } else {
            return currentItems.map((item) => {
               if (item.id === id) {
                  return { ...item, quantity: item.quantity + 1 };
               } else {
                  return item;
               }
            });
         }
      });
   }

   function decreaseCartQuantity(id: number) {
      setCartItems((currentItems) => {
         if (currentItems.find((item) => item.id === id)?.quantity === 1) {
            return currentItems.filter((item) => item.id !== id);
         } else {
            return currentItems.map((item) => {
               if (item.id === id) {
                  return { ...item, quantity: item.quantity - 1 };
               } else {
                  return item;
               }
            });
         }
      });
   }

   function removeFromCart(id: number) {
      setCartItems((currentItems) => {
         return currentItems.filter((item) => item.id !== id);
      });
   }

   return (
      <ShoppingCartContext.Provider
         value={{
            getItemQuantity,
            increaseCartQuantity,
            decreaseCartQuantity,
            removeFromCart,
            cartItems,
            cartQuantity,
            openCart,
            closeCart,
         }}
      >
         {children}
         <ShoppingCart isOpen={isOpen} />
      </ShoppingCartContext.Provider>
   );
};
