import useLanguage from '@/locale/useLanguage';
import UpdatePurchasePaymentModule from '@/modules/PurchasePaymentModule/UpdatePurchasePaymentModule';

export default function PurchasePaymentUpdate() {
  const translate = useLanguage();

  const entity = 'purchasePayment';

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
  return <UpdatePurchasePaymentModule config={configPage} />;
}
