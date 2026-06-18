import { lazy } from 'react';

import { Navigate } from 'react-router-dom';

const Logout = lazy(() => import('@/pages/Logout.jsx'));
const NotFound = lazy(() => import('@/pages/NotFound.jsx'));


const Customer = lazy(() => import('@/pages/Customer'));
const Invoice = lazy(() => import('@/pages/Invoice'));
const InvoiceCreate = lazy(() => import('@/pages/Invoice/InvoiceCreate'));

const InvoiceRead = lazy(() => import('@/pages/Invoice/InvoiceRead'));
const InvoiceUpdate = lazy(() => import('@/pages/Invoice/InvoiceUpdate'));
const InvoiceRecordPayment = lazy(() => import('@/pages/Invoice/InvoiceRecordPayment'));

const Payment = lazy(() => import('@/pages/Payment/index'));
const PaymentRead = lazy(() => import('@/pages/Payment/PaymentRead'));
const PaymentUpdate = lazy(() => import('@/pages/Payment/PaymentUpdate'));

const Settings = lazy(() => import('@/pages/Settings/Settings'));


const Profile = lazy(() => import('@/pages/Profile'));

const About = lazy(() => import('@/pages/About'));

const PaymentMode = lazy(() => import('@/pages/PaymentMode'));
const Taxes = lazy(() => import('@/pages/Taxes'));

const Product = lazy(() => import('@/pages/Product'));
const Warehouse = lazy(() => import('@/pages/Warehouse'));

const Supplier = lazy(() => import('@/pages/Supplier'));
const PurchaseOrder = lazy(() => import('@/pages/PurchaseOrder'));
const GoodsReceipt = lazy(() => import('@/pages/GoodsReceipt'));
const PurchaseInvoice = lazy(() => import('@/pages/PurchaseInvoice'));

const SalesOrder = lazy(() => import('@/pages/SalesOrder'));
const Fulfillment = lazy(() => import('@/pages/Fulfillment'));

const StockTransfer = lazy(() => import('@/pages/StockTransfer'));
const StockAdjustment = lazy(() => import('@/pages/StockAdjustment'));

let routes = {
  expense: [],
  default: [
    {
      path: '/login',
      element: <Navigate to="/" />,
    },
    {
      path: '/logout',
      element: <Logout />,
    },
    {
      path: '/about',
      element: <About />,
    },
    {
      path: '/',
      element: <Invoice />,
    },
    {
      path: '/customer',
      element: <Customer />,
    },

    {
      path: '/invoice',
      element: <Invoice />,
    },
    {
      path: '/invoice/create',
      element: <InvoiceCreate />,
    },
    {
      path: '/invoice/read/:id',
      element: <InvoiceRead />,
    },
    {
      path: '/invoice/update/:id',
      element: <InvoiceUpdate />,
    },
    {
      path: '/invoice/pay/:id',
      element: <InvoiceRecordPayment />,
    },
    // {
    //   path: '/quote',
    //   element: <Quote />,
    // },
    // {
    //   path: '/quote/create',
    //   element: <QuoteCreate />,
    // },
    // {
    //   path: '/quote/read/:id',
    //   element: <QuoteRead />,
    // },
    // {
    //   path: '/quote/update/:id',
    //   element: <QuoteUpdate />,
    // },
    {
      path: '/payment',
      element: <Payment />,
    },
    {
      path: '/payment/read/:id',
      element: <PaymentRead />,
    },
    {
      path: '/payment/update/:id',
      element: <PaymentUpdate />,
    },

    {
      path: '/settings',
      element: <Settings />,
    },
    {
      path: '/settings/edit/:settingsKey',
      element: <Settings />,
    },
    {
      path: '/payment/mode',
      element: <PaymentMode />,
    },
    {
      path: '/taxes',
      element: <Taxes />,
    },
    {
      path: '/product',
      element: <Product />,
    },
    {
      path: '/warehouse',
      element: <Warehouse />,
    },
    {
      path: '/supplier',
      element: <Supplier />,
    },
    {
      path: '/purchase-order',
      element: <PurchaseOrder />,
    },
    {
      path: '/goods-receipt',
      element: <GoodsReceipt />,
    },
    {
      path: '/purchase-invoice',
      element: <PurchaseInvoice />,
    },
    {
      path: '/sales-order/*',
      element: <SalesOrder />,
    },
    {
      path: '/fulfillment/*',
      element: <Fulfillment />,
    },
    {
      path: '/stock-transfer/*',
      element: <StockTransfer />,
    },
    {
      path: '/stock-adjustment/*',
      element: <StockAdjustment />,
    },

    {
      path: '/profile',
      element: <Profile />,
    },
    {
      path: '*',
      element: <NotFound />,
    },
  ],
};

export default routes;
