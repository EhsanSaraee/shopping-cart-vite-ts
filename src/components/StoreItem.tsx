import { useShoppingCart } from 'context/ShoppingCartContext';
import { Button, Card } from 'react-bootstrap';
import { formatCurrency } from 'utilities/formatCurrency';

type StoreItemProps = {
   id: number;
   name: string;
   price: number;
   imgUrl: string;
};

export const StoreItem = ({ id, name, price, imgUrl }: StoreItemProps) => {
   const {
      getItemQuantity,
      decreaseCartQuantity,
      increaseCartQuantity,
      removeFromCart,
   } = useShoppingCart();

   const quantity = getItemQuantity(id);

   return (
      <Card className="h-100">
         <Card.Img
            src={imgUrl}
            variant="top"
            height="200px"
            style={{ objectFit: 'cover' }}
         />
         <Card.Body className="d-flex flex-column">
            <Card.Title className="d-flex justify-content-between align-items-baseline mb-4">
               <span className="fs-2">{name}</span>
               <span className="ms-2 text-muted">{formatCurrency(price)}</span>
            </Card.Title>
            <section className="mt-auto">
               {quantity === 0 ? (
                  <Button
                     onClick={() => increaseCartQuantity(id)}
                     className="w-100"
                  >
                     + Add To Cart
                  </Button>
               ) : (
                  <section
                     className="d-flex flex-column align-items-center"
                     style={{ gap: '.5rem' }}
                  >
                     <div
                        className="d-flex justify-content-center align-items-center"
                        style={{ gap: '.5rem' }}
                     >
                        <Button onClick={() => decreaseCartQuantity(id)}>
                           -
                        </Button>
                        <div>
                           <span className="fs-3">{quantity}</span> in cart
                        </div>
                        <Button onClick={() => increaseCartQuantity(id)}>
                           +
                        </Button>
                     </div>
                     <Button
                        onClick={() => removeFromCart(id)}
                        variant="danger"
                        size="sm"
                     >
                        Remove
                     </Button>
                  </section>
               )}
            </section>
         </Card.Body>
      </Card>
   );
};
