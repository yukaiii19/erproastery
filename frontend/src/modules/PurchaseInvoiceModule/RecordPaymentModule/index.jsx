import { ErpLayout } from '@/layout';

import PageLoader from '@/components/PageLoader';
import { erp } from '@/redux/erp/actions';
import { selectItemById, selectCurrentItem, selectRecordPaymentItem } from '@/redux/erp/selectors';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import PurchasePayment from './components/PurchasePayment';

export default function RecordPurchasePaymentModule({ config }) {
  const dispatch = useDispatch();
  const { id } = useParams();

  let item = useSelector(selectItemById(id));

  useEffect(() => {
    if (item) {
      dispatch(erp.currentItem({ data: item }));
    } else {
      dispatch(erp.read({ entity: config.entity, id }));
    }
  }, [item, id]);

  const { result: currentResult } = useSelector(selectCurrentItem);
  item = currentResult;

  useEffect(() => {
    dispatch(erp.currentAction({ actionType: 'recordPayment', data: item }));
  }, [item]);

  return (
    <ErpLayout>
      {item ? <PurchasePayment config={config} currentItem={currentResult} /> : <PageLoader />}
    </ErpLayout>
  );
}
