import { RouterProvider, createRouter, createRoute, createRootRoute, Outlet } from '@tanstack/react-router';
import SiteLayout from './components/layout/SiteLayout';
import HomePage from './pages/HomePage';
import BrandsPage from './pages/BrandsPage';
import CatalogPage from './pages/CatalogPage';
import ProductsPage from './pages/ProductsPage';
import LaptopDetailPage from './pages/LaptopDetailPage';
import AboutUsPage from './pages/AboutUsPage';
import ContactPage from './pages/ContactPage';
import ChatPage from './pages/ChatPage';

const rootRoute = createRootRoute({
  component: () => (
    <SiteLayout>
      <Outlet />
    </SiteLayout>
  ),
});

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: HomePage,
});

const brandsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/brands',
  component: BrandsPage,
});

const catalogRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/catalog',
  component: CatalogPage,
});

const productsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/products',
  component: ProductsPage,
});

const laptopDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/laptop/$brandName/$modelName',
  component: LaptopDetailPage,
});

const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/about',
  component: AboutUsPage,
});

const contactRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/contact',
  component: ContactPage,
});

const chatRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/chat',
  component: ChatPage,
});

const routeTree = rootRoute.addChildren([
  homeRoute,
  brandsRoute,
  catalogRoute,
  productsRoute,
  laptopDetailRoute,
  aboutRoute,
  contactRoute,
  chatRoute,
]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
