import { Container } from 'react-bootstrap';
import { Route, Routes } from 'react-router-dom';
import { About, Home, Store } from 'pages';

const App = () => {
   return (
      <Container>
         <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/store" element={<Store />} />
            <Route path="/about" element={<About />} />
         </Routes>
      </Container>
   );
};

export default App;
