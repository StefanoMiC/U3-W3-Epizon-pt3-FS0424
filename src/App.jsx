import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style/index.css";
import "./App.css";
import BookStore from "./components/BookStore";
import Cart from "./components/Cart";
import { Container } from "react-bootstrap";
import Footer from "./components/Footer";
import TopBar from "./components/TopBar";

const App = () => (
  <BrowserRouter>
    <Container fluid className="epizon-container">
      <TopBar />
      <Container>
        <Routes>
          <Route path="/" element={<BookStore />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </Container>
      <Footer className="mt-5" additionalProp="test" />
    </Container>
  </BrowserRouter>
);

export default App;
