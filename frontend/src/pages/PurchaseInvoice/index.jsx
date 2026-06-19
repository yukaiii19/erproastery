import dayjs from 'dayjs';
import useLanguage from '@/locale/useLanguage';
import { useMoney, useDate } from '@/settings';
import PurchaseInvoiceDataTableModule from '@/modules/PurchaseInvoiceModule/PurchaseInvoiceDataTableModule';

export default function PurchaseInvoice() {
  const translate = useLanguage();
  const { dateFormat } = useDate();
  const entity = 'purchaseInvoice';
  const { moneyFormatter } = useMoney();

  const searchConfig = {
    entity: 'supplier',
    displayLabels: ['name'],
    searchFields: 'name',
  };
  const deleteModalLabels = ['number', 'supplier.name'];
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
      title: translate('Date'),
      dataIndex: 'date',
      render: (date) => {
        return dayjs(date).format(dateFormat);
      },
    },
    {
      title: translate('Total'),
      dataIndex: 'total',
      onCell: () => {
        return {
          style: {
            textAlign: 'right',
            whiteSpace: 'nowrap',
            direction: 'ltr',
          },
        };
      },
      render: (total, record) => {
        return moneyFormatter({ amount: total, currency_code: record.currency });
      },
    },
    {
      title: translate('paid'),
      dataIndex: 'credit',
      onCell: () => {
        return {
          style: {
            textAlign: 'right',
            whiteSpace: 'nowrap',
            direction: 'ltr',
          },
        };
      },
      render: (total, record) => moneyFormatter({ amount: total, currency_code: record.currency }),
    },
    {
      title: translate('Approval Status'),
      dataIndex: 'approvalStatus',
    },
    {
      title: translate('Payment'),
      dataIndex: 'paymentStatus',
    },
  ];

  const Labels = {
    PANEL_TITLE: translate('Bill') || 'Bill (Purchase Invoice)',
    DATATABLE_TITLE: translate('Bill List') || 'Bill List',
    ADD_NEW_ENTITY: translate('Add Bill') || 'Add Bill',
    ENTITY_NAME: translate('Bill') || 'Bill',
    RECORD_ENTITY: translate('record_payment'),
  };

  const configPage = {
    entity,
    ...Labels,
  };
  const config = {
    ...configPage,
    dataTableColumns,
    searchConfig,
    deleteModalLabels,
  };

  return <PurchaseInvoiceDataTableModule config={config} />;
}
