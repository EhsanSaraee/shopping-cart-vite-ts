import { useShoppingCart } from 'context/ShoppingCartContext';
import { Offcanvas, Stack } from 'react-bootstrap';
import { CartItem } from './CartItem';

type ShoppingCartProps = {
   isOpen: boolean;
};

export const ShoppingCart = ({ isOpen }: ShoppingCartProps) => {
   const { closeCart, cartItems } = useShoppingCart();

   return (
      <Offcanvas onHide={closeCart} show={isOpen} placement="end">
         <Offcanvas.Header closeButton>
            <Offcanvas.Title>Cart</Offcanvas.Title>
         </Offcanvas.Header>
         <Offcanvas.Body>
            <Stack gap={3}>
               {cartItems.map((item) => (
                  <CartItem key={item.id} {...item} />
               ))}
            </Stack>
         </Offcanvas.Body>
      </Offcanvas>
   );
};
