import { Container } from 'react-bootstrap';
import { Route, Routes } from 'react-router-dom';
import { About, Home, Store } from 'pages';
import { NavbarComp } from 'components';
import { ShoppingCartProvider } from 'context/ShoppingCartContext';

const App = () => {
   return (
      <ShoppingCartProvider>
         <NavbarComp />
         <Container className="mb-4">
            <Routes>
               <Route path="/" element={<Home />} />
               <Route path="/store" element={<Store />} />
               <Route path="/about" element={<About />} />
            </Routes>
         </Container>
      </ShoppingCartProvider>
   );
};

export default App;
