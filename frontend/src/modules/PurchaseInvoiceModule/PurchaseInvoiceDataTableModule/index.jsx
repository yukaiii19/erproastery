import { ErpLayout } from '@/layout';
import ErpPanel from '@/modules/ErpPanelModule';
import useLanguage from '@/locale/useLanguage';
import { CreditCardOutlined } from '@ant-design/icons';

export default function PurchaseInvoiceDataTableModule({ config }) {
  const translate = useLanguage();
  return (
    <ErpLayout>
      <ErpPanel
        config={config}
        extra={[
          {
            label: translate('Record PurchasePayment'),
            key: 'recordPayment',
            icon: <CreditCardOutlined />,
          },
        ]}
      ></ErpPanel>
    </ErpLayout>
  );
}
