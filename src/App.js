import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Home from "./pages/home/Home";
import Detail from "./pages/detail/Detail";
import Search from "./pages/search/Search";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import LoginPage from "./pages/AuthPage/LoginPage";
import RegisterPage from "./pages/AuthPage/RegisterPage";
import NotFound from "./pages/NotFound/NotFound";
import TransactionPage from "./pages/TransactionPage/TransactionPage";
import TestPage from "./pages/TestPage/TestPage";

function App() {
  const { isLogin } = useSelector((state) => state.authReducer);

  return (
    <BrowserRouter>
      <div style={{ backgroundColor: "#003580" }}>
        <Navbar />
      </div>

      {/* chia router page */}
      <Routes>
        <Route path="/" element={<Home />} />

        {/* kiểm tra user có đăng nhâp chưa */}
        <Route
          path="/login"
          element={isLogin ? <Navigate to="/" replace /> : <LoginPage />}
        />
        <Route
          path="/signup"
          element={isLogin ? <Navigate to="/" replace /> : <RegisterPage />}
        />
        <Route
          path="/transaction"
          element={!isLogin ? <Navigate to="/" replace /> : <TransactionPage />}
        />

        {/* User không cần đăng nhập cũng có thể vào những trang này */}
        <Route path="/search" element={<Search />} />
        <Route path="/detail/:id" element={<Detail />} />

        <Route path="/*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
