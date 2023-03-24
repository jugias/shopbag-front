import { Route, Routes } from "react-router-dom";
import "./App.css";

import Perfil from "./Components/perfil/perfil";
// import Header from "./Components/Headers/Header";
// import { Footer } from "./Components/footer/Footer";
import { CreateProducts } from "./Components/createProduct/CreateProducts";
import Home from "./Components/Home/Home-article";
import WishList from "./Components/WishList/wishList";
import LayoutUser from "./Components/Layout/LayoutUser";
import HomeAdmin from "../src/admin/pages/home/Home";
// import Login from '../src/admin/pages/login/Login';
import List from "../src/admin/pages/list/List";

import ResponseMP from "../src/Components/ResponseMP/responseMP";
// import { productInputs, userInputs } from "./formSource";
import LayoutAdmin from "./Components/Layout/LayoutAdmin";
import ListProduct from "../src/admin/pages/products/list/ListProduct";
import ListOrder from "../src/admin/pages/orders/listOrder/ListOrder";
import { OrderDetails } from "../src/admin/pages/orders/OrderDetails/OrderDetails";
import { ProductDetails } from "./admin/pages/products/ProductDetails/ProductDetails";
import { UserDetails } from "./admin/pages/Users/UserDetails";
import { LoginPage } from "./Components/Login/LoginPage";
import { ShoppingCart } from "./Components/ShoppingCart/ShoppingCart";

// import { UserInvoices } from './Components/UserInvoices/UserInvoices'
import { ListFacturas } from "./admin/pages/facturas/listFacturas/ListFacturas";
// import {EditUser} from './admin/pages/Users/EditUser/EditUser'
import { UserInvoices } from "./Components/UserInvoices/UserInvoices";
import { UserSales } from "./Components/UserSales/UserSales";
import { FormRegister } from "./Components/userForm/FormRegister";
import { Page404 } from "./pages/Page404/Page404";
import { FormRegisterAdmin } from "./admin/pages/Users/NewUserForm/FormRegister";
import { UserReviews } from "./Components/UserReviews/UserReviews";
import { SendEmail } from "./Components/forgotPassWord/sendEmail";
import RequireAuth from "./Components/hooks/RequireAuth";
import { ForgotPassword } from "./Components/forgotPassWord/forgotPassword";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LayoutUser />}>
          <Route index element={<Home />}></Route>
          <Route path="userRegister" element={<FormRegister />} />
          <Route path="cart" element={<ShoppingCart />} />
          <Route path="process-password" element={<SendEmail />}></Route>
          <Route path="forgotPassword" element={<ForgotPassword />}></Route>
          <Route element={<RequireAuth allowedRole={"user"} />}>
            <Route path="create" element={<CreateProducts />} />
            <Route path="userInvoices" element={<UserInvoices />} />
            <Route path="userSales" element={<UserSales />} />
            <Route path="userReviews" element={<UserReviews />} />
            <Route path="myWishes" element={<WishList />} />
            <Route path="perfil" element={<Perfil />} />
            <Route path="ResponseMP" element={<ResponseMP />} />
          </Route>
        </Route>

        <Route element={<RequireAuth allowedRole={"root"} />}>
          <Route path="admin" element={<LayoutAdmin />}>
            <Route index element={<HomeAdmin />} />
            <Route path="users">
              <Route index element={<List />} />
              <Route path=":userId" element={<UserDetails />} />
              <Route path="new" element={<FormRegisterAdmin />} />
              {/* <Route path="edit">
                <Route path=":userId" element={<EditUser />}/>
              </Route> */}
            </Route>
            <Route path="products">
              <Route index element={<ListProduct />} />
              <Route path=":productId" element={<ProductDetails />} />
              <Route path="new" element={<CreateProducts />} />
            </Route>
            <Route path="ordenes">
              <Route index element={<ListOrder />} />
              <Route path=":productId" element={<OrderDetails />} />
            </Route>
            <Route path="facturas">
              <Route index element={<ListFacturas />} />
            </Route>
          </Route>
        </Route>

        <Route path="login" element={<LoginPage />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </>
  );
}

export default App;
