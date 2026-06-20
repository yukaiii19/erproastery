import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Drawer, Layout, Menu } from 'antd';

import { useAppContext } from '@/context/appContext';

import useLanguage from '@/locale/useLanguage';
import logoIcon from '@/logo-icon.svg';

import useResponsive from '@/hooks/useResponsive';

import {
  SettingOutlined,
  CustomerServiceOutlined,
  ContainerOutlined,
  FileSyncOutlined,
  DashboardOutlined,
  TagOutlined,
  TagsOutlined,
  UserOutlined,
  CreditCardOutlined,
  MenuOutlined,
  FileOutlined,
  ShopOutlined,
  FilterOutlined,
  WalletOutlined,
  ReconciliationOutlined,
  AppstoreOutlined,
  BankOutlined,
} from '@ant-design/icons';

const { Sider } = Layout;

export default function Navigation() {
  const { isMobile } = useResponsive();

  return isMobile ? <MobileSidebar /> : <Sidebar collapsible={false} />;
}

function Sidebar({ collapsible, isMobile = false }) {
  let location = useLocation();

  const { state: stateApp, appContextAction } = useAppContext();
  const { isNavMenuClose } = stateApp;
  const { navMenu } = appContextAction;
  const [showLogoApp, setLogoApp] = useState(isNavMenuClose);
  const [currentPath, setCurrentPath] = useState(location.pathname.slice(1));

  const translate = useLanguage();
  const navigate = useNavigate();

  const activeRole = localStorage.getItem('demo_role') || 'owner';
  const hasAccess = (allowedRoles) => {
    if (activeRole === 'owner' || activeRole === 'admin') return true;
    return allowedRoles.includes(activeRole);
  };

  const rawItems = [
    {
      key: 'dashboard',
      icon: <DashboardOutlined />,
      label: <Link to={'/'}>{translate('dashboard')}</Link>,
    },
    {
      key: 'customer',
      icon: <CustomerServiceOutlined />,
      label: <Link to={'/customer'}>{translate('customers')}</Link>,
    },

    {
      key: 'invoice',
      icon: <ContainerOutlined />,
      label: <Link to={'/invoice'}>{translate('invoices')}</Link>,
    },
    {
      key: 'quote',
      icon: <FileSyncOutlined />,
      label: <Link to={'/quote'}>{translate('quote')}</Link>,
    },
    {
      key: 'payment',
      icon: <CreditCardOutlined />,
      label: <Link to={'/payment'}>{translate('payments')}</Link>,
    },

    {
      key: 'paymentMode',
      label: <Link to={'/payment/mode'}>{translate('payments_mode')}</Link>,
      icon: <WalletOutlined />,
    },
    {
      key: 'taxes',
      label: <Link to={'/taxes'}>{translate('taxes')}</Link>,
      icon: <ShopOutlined />,
    },
    {
      key: 'generalSettings',
      label: <Link to={'/settings'}>{translate('settings')}</Link>,
      icon: <SettingOutlined />,
    },
    {
      key: 'product',
      icon: <AppstoreOutlined />,
      label: <Link to={'/product'}>{translate('Product') || 'Product'}</Link>,
      roles: ['inventory_manager', 'sales_manager', 'sales_representative', 'purchasing_manager'],
    },
    {
      key: 'warehouse',
      icon: <BankOutlined />,
      label: <Link to={'/warehouse'}>{translate('Warehouse') || 'Warehouse'}</Link>,
      roles: ['inventory_manager'],
    },
    {
      key: 'supplier',
      icon: <CustomerServiceOutlined />,
      label: <Link to={'/supplier'}>{translate('Supplier') || 'Supplier'}</Link>,
      roles: ['purchasing_manager', 'inventory_manager', 'ap_analyst'],
    },
    {
      key: 'salesOrder',
      icon: <FileOutlined />,
      label: <Link to={'/sales-order'}>{translate('Sales Order') || 'Sales Order'}</Link>,
      roles: ['sales_manager', 'sales_representative', 'inventory_manager', 'ar_analyst'],
    },
    {
      key: 'fulfillment',
      icon: <ShopOutlined />,
      label: <Link to={'/fulfillment'}>{translate('Fulfillment') || 'Fulfillment (Pick/Pack/Ship)'}</Link>,
      roles: ['inventory_manager'],
    },
    {
      key: 'purchaseOrder',
      icon: <ContainerOutlined />,
      label: <Link to={'/purchase-order'}>{translate('Purchase Order') || 'Purchase Order'}</Link>,
      roles: ['purchasing_manager', 'accounting_manager', 'inventory_manager'],
    },
    {
      key: 'goodsReceipt',
      icon: <FileSyncOutlined />,
      label: <Link to={'/goods-receipt'}>{translate('Goods Receipt') || 'Goods Receipt'}</Link>,
      roles: ['inventory_manager'],
    },
    {
      key: 'purchaseInvoice',
      icon: <WalletOutlined />,
      label: <Link to={'/purchase-invoice'}>{translate('Bill') || 'Bill (Purchase Invoice)'}</Link>,
      roles: ['ap_analyst', 'accounting_manager'],
    },
    {
      key: 'stockTransfer',
      icon: <FileSyncOutlined />,
      label: <Link to={'/stock-transfer'}>{translate('Stock Transfer') || 'Stock Transfer'}</Link>,
      roles: ['inventory_manager'],
    },
    {
      key: 'stockAdjustment',
      icon: <FileSyncOutlined />,
      label: <Link to={'/stock-adjustment'}>{translate('Stock Adjustment') || 'Stock Adjustment'}</Link>,
      roles: ['inventory_manager'],
    },
    // {
    //   key: 'about',
    //   label: <Link to={'/about'}>{translate('about')}</Link>,
    //   icon: <ReconciliationOutlined />,
    //   roles: [], // everyone can see about, or we handle it via filter logic
    // },
  ];

  const items = rawItems
    .filter((item) => {
      // If no roles specified, or if it's the about/dashboard, show it
      if (item.key === 'dashboard' /*|| item.key === 'about'*/) return true;

      // Default roles for existing items if not explicitly set
      const defaultRoles = {
        customer: ['sales_manager', 'sales_representative', 'ar_analyst'],
        invoice: ['ar_analyst', 'accounting_manager', 'sales_manager'],
        quote: ['sales_manager', 'sales_representative'],
        payment: ['ar_analyst', 'accounting_manager'],
        paymentMode: ['accounting_manager'],
        taxes: ['accounting_manager'],
        generalSettings: [], // Only admin/owner
      };

      const allowedRoles = item.roles || defaultRoles[item.key] || [];
      return hasAccess(allowedRoles);
    })
    .map(({ roles, ...rest }) => rest); // Remove the custom roles property for Ant Design Menu

  useEffect(() => {
    if (location)
      if (currentPath !== location.pathname) {
        if (location.pathname === '/') {
          setCurrentPath('dashboard');
        } else setCurrentPath(location.pathname.slice(1));
      }
  }, [location, currentPath]);

  useEffect(() => {
    if (isNavMenuClose) {
      setLogoApp(isNavMenuClose);
    }
    const timer = setTimeout(() => {
      if (!isNavMenuClose) {
        setLogoApp(isNavMenuClose);
      }
    }, 200);
    return () => clearTimeout(timer);
  }, [isNavMenuClose]);
  const onCollapse = () => {
    navMenu.collapse();
  };

  return (
    <Sider
      collapsible={collapsible}
      collapsed={collapsible ? isNavMenuClose : collapsible}
      onCollapse={onCollapse}
      className="navigation"
      width={256}
      style={{
        overflow: 'auto',
        height: '100vh',

        position: isMobile ? 'absolute' : 'relative',
        bottom: '20px',
        ...(!isMobile && {
          // border: 'none',
          ['left']: '20px',
          top: '20px',
          // borderRadius: '8px',
        }),
      }}
      theme={'light'}
    >
      <div
        className="logo"
        onClick={() => navigate('/')}
        style={{
          cursor: 'pointer',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '20px 0',
        }}
      >
        <img src={logoIcon} alt="Logo" style={{ height: '100px', maxWidth: '100%', objectFit: 'contain' }} />
      </div>
      <Menu
        items={items}
        mode="inline"
        theme={'light'}
        selectedKeys={[currentPath]}
        style={{
          width: 256,
        }}
      />
    </Sider>
  );
}

function MobileSidebar() {
  const [visible, setVisible] = useState(false);
  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };

  return (
    <>
      <Button
        type="text"
        size="large"
        onClick={showDrawer}
        className="mobile-sidebar-btn"
        style={{ ['marginLeft']: 25 }}
      >
        <MenuOutlined style={{ fontSize: 18 }} />
      </Button>
      <Drawer
        width={250}
        // style={{ backgroundColor: 'rgba(255, 255, 255, 1)' }}
        placement={'left'}
        closable={false}
        onClose={onClose}
        open={visible}
      >
        <Sidebar collapsible={false} isMobile={true} />
      </Drawer>
    </>
  );
}
