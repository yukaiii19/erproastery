import useLanguage from '@/locale/useLanguage';
import ReadPurchaseInvoiceModule from '@/modules/PurchaseInvoiceModule/ReadPurchaseInvoiceModule';

export default function PurchaseInvoiceRead() {
  const entity = 'purchaseInvoice';
  const translate = useLanguage();
  const Labels = {
    PANEL_TITLE: translate('purchaseInvoice'),
    DATATABLE_TITLE: translate('purchaseInvoice_list'),
    ADD_NEW_ENTITY: translate('add_new_purchaseInvoice'),
    ENTITY_NAME: translate('purchaseInvoice'),

    RECORD_ENTITY: translate('record_payment'),
  };

  const configPage = {
    entity,
    ...Labels,
  };
  return <ReadPurchaseInvoiceModule config={configPage} />;
}
