import HomePage from '../pages/index';
import AboutPage from '../pages/about';
import CategoryPage from '../pages/category';
import ProductPage from '../pages/product';
import ContactPage from '../pages/contact';
import LoginPage from '../pages/auth/login';
import RegisterPage from '../pages/auth/register';
import ForgotPasswordPage from '../pages/auth/forgot-password';
import MyAccountPage from '../pages/account/my-account';
import EditAccountPage from '../pages/account/edit-account';
import EditBillingPage from '../pages/account/edit-billing';
import EditShippingPage from '../pages/account/edit-shipping';
import OrderSummaryPage from '../pages/account/order-summary';
import OrderDetailsPage from '../pages/account/order-details';
import CartPage from '../pages/shopping/cart';
import PaymentPage from '../pages/shopping/payment';
import TermsPage from '../pages/shopping/terms';
import NotFoundPage from '../pages/system/NotFoundPage';

export const APP_ROUTES = [
  { path: '/', element: <HomePage /> },
  { path: '/about', element: <AboutPage /> },
  { path: '/category', element: <CategoryPage /> },
  { path: '/products', element: <CategoryPage /> },
  { path: '/product', element: <ProductPage /> },
  { path: '/contact', element: <ContactPage /> },
  { path: '/auth/login', element: <LoginPage /> },
  { path: '/auth/register', element: <RegisterPage /> },
  { path: '/auth/forgot-password', element: <ForgotPasswordPage /> },
  { path: '/account/my-account', element: <MyAccountPage /> },
  { path: '/account/edit-account', element: <EditAccountPage /> },
  { path: '/account/edit-billing', element: <EditBillingPage /> },
  { path: '/account/edit-shipping', element: <EditShippingPage /> },
  { path: '/account/order-summary', element: <OrderSummaryPage /> },
  { path: '/account/order-details', element: <OrderDetailsPage /> },
  { path: '/shopping/cart', element: <CartPage /> },
  { path: '/cart', element: <CartPage /> },
  { path: '/shopping/payment', element: <PaymentPage /> },
  { path: '/checkout', element: <PaymentPage /> },
  { path: '/shopping/terms', element: <TermsPage /> },
  { path: '/terms', element: <TermsPage /> }
];

export const NOT_FOUND_ELEMENT = <NotFoundPage />;
