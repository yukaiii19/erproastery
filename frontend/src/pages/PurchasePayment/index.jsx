import dayjs from 'dayjs';
import useLanguage from '@/locale/useLanguage';
import PurchasePaymentDataTableModule from '@/modules/PurchasePaymentModule/PurchasePaymentDataTableModule';

import { useMoney, useDate } from '@/settings';

export default function PurchasePayment() {
  const translate = useLanguage();
  const { dateFormat } = useDate();
  const { moneyFormatter } = useMoney();
  const searchConfig = {
    entity: 'supplier',
    displayLabels: ['number'],
    searchFields: 'number',
    outputValue: '_id',
  };

  const deleteModalLabels = ['number'];
  const dataTableColumns = [
    {
      title: translate('Number'),

      dataIndex: 'number',
    },
    {
      title: translate('Supplier'),
      dataIndex: ['supplier', 'name'],
    },
    {
      title: translate('Amount'),
      dataIndex: 'amount',
      onCell: () => {
        return {
          style: {
            textAlign: 'right',
            whiteSpace: 'nowrap',
            direction: 'ltr',
          },
        };
      },
      render: (amount, record) =>
        moneyFormatter({ amount: amount, currency_code: record.currency }),
    },
    {
      title: translate('Date'),
      dataIndex: 'date',
      render: (date) => {
        return dayjs(date).format(dateFormat);
      },
    },
    {
      title: translate('Number'),
      dataIndex: ['purchaseInvoice', 'number'],
    },
    {
      title: translate('year'),
      dataIndex: ['purchaseInvoice', 'year'],
    },
    {
      title: translate('PurchasePayment Mode'),
      dataIndex: ['paymentMode', 'name'],
    },
  ];

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
  const config = {
    ...configPage,
    disableAdd: true,
    dataTableColumns,
    searchConfig,
    deleteModalLabels,
  };
  return <PurchasePaymentDataTableModule config={config} />;
}
