import useLanguage from '@/locale/useLanguage';
import RecordPaymentModule from '@/modules/PurchaseInvoiceModule/RecordPaymentModule';

export default function PurchaseInvoiceRecordPayment() {
  const entity = 'purchaseInvoice';
  const translate = useLanguage();
  const Labels = {
    PANEL_TITLE: translate('Bill') || 'Bill',
    DATATABLE_TITLE: translate('Bill_list') || 'Bill List',
    ADD_NEW_ENTITY: translate('add_new_bill') || 'Add New Bill',
    ENTITY_NAME: translate('Bill') || 'Bill',
    RECORD_ENTITY: translate('record_payment'),
  };

  const configPage = {
    entity,
    ...Labels,
  };
  return <RecordPaymentModule config={configPage} />;
}
