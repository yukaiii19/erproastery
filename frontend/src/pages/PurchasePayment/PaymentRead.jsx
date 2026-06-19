import useLanguage from '@/locale/useLanguage';
import ReadPurchasePaymentModule from '@/modules/PurchasePaymentModule/ReadPurchasePaymentModule';

export default function PurchasePaymentRead() {
  const translate = useLanguage();

  const entity = 'purchasepayment';

  const Labels = {
    PANEL_TITLE: translate('purchasePayment'),
    DATATABLE_TITLE: translate('purchasePayment_list'),
    ADD_NEW_ENTITY: translate('add_new_purchasePayment'),
    ENTITY_NAME: translate('purchasePayment'),
  };

  const configPage = {
    entity,
    ...Labels,
  };
  return <ReadPurchasePaymentModule config={configPage} />;
}
