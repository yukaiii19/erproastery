import { ErpLayout } from '@/layout';
import CreateItem from '@/modules/ErpPanelModule/CreateItem';
import PurchaseInvoiceForm from '@/modules/PurchaseInvoiceModule/Forms/PurchaseInvoiceForm';

export default function CreatePurchaseInvoiceModule({ config }) {
  return (
    <ErpLayout>
      <CreateItem config={config} CreateForm={PurchaseInvoiceForm} />
    </ErpLayout>
  );
}
