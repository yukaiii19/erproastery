import { useState, useEffect } from 'react';
import { Form, Button } from 'antd';

import { useSelector, useDispatch } from 'react-redux';
import { erp } from '@/redux/erp/actions';
import { selectRecordPaymentItem } from '@/redux/erp/selectors';
import useLanguage from '@/locale/useLanguage';

import Loading from '@/components/Loading';

import PurchasePaymentForm from '@/forms/PurchasePaymentForm';
import { useNavigate } from 'react-router-dom';
import calculate from '@/utils/calculate';

export default function RecordPurchasePayment({ config }) {
  const navigate = useNavigate();
  const translate = useLanguage();
  let { entity } = config;

  const dispatch = useDispatch();

  const { isLoading, isSuccess, current: currentPurchaseInvoice } = useSelector(selectRecordPaymentItem);

  const [form] = Form.useForm();

  const [maxAmount, setMaxAmount] = useState(0);
  useEffect(() => {
    if (currentPurchaseInvoice) {
      const { credit, total, discount } = currentPurchaseInvoice;
      const calculatedMax = calculate.sub(calculate.sub(total, discount), credit);
      setMaxAmount(calculatedMax);
      form.setFieldsValue({ amount: calculatedMax });
    }
  }, [currentPurchaseInvoice]);
  useEffect(() => {
    if (isSuccess) {
      form.resetFields();
      dispatch(erp.resetAction({ actionType: 'recordPayment' }));
      dispatch(erp.list({ entity }));
      navigate(`/${entity}/`);
    }
  }, [isSuccess]);

  const onSubmit = (fieldsValue) => {
    if (currentPurchaseInvoice) {
      const { _id: purchaseInvoice } = currentPurchaseInvoice;
      const supplier = currentPurchaseInvoice.supplier && currentPurchaseInvoice.supplier._id;
      fieldsValue = {
        ...fieldsValue,
        purchaseInvoice,
        supplier,
      };
    }

    dispatch(
      erp.recordPayment({
        entity: 'purchasePayment',
        jsonData: fieldsValue,
      })
    );
  };

  return (
    <Loading isLoading={isLoading}>
      <Form form={form} layout="vertical" onFinish={onSubmit}>
        <PurchasePaymentForm maxAmount={maxAmount} />
        <Form.Item>
          <Button type="primary" htmlType="submit">
            {translate('Record PurchasePayment')}
          </Button>
        </Form.Item>
      </Form>
    </Loading>
  );
}
