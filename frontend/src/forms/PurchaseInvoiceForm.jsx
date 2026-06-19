import React from 'react';
import { Form, Input, InputNumber, Select, Button, Space, DatePicker, Switch } from 'antd';
import { MinusCircleOutlined, PlusOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons';
import useLanguage from '@/locale/useLanguage';
import SelectAsync from '@/components/SelectAsync';
import calculate from '@/utils/calculate';

export default function PurchaseInvoiceForm({ isUpdateForm = false }) {
  const translate = useLanguage();
  const form = Form.useFormInstance(); // Get the current form instance

  const handlePriceQuantityChange = (name) => {
    // When price or quantity changes, auto-calculate total for this row
    const items = form.getFieldValue('items') || [];
    const item = items[name];
    if (item && item.price !== undefined && item.quantity !== undefined) {
      items[name].total = calculate.multiply(item.quantity, item.price);
      form.setFieldsValue({ items });
    }
  };
  return (
    <>
      <Form.Item
        label={translate('number') || 'Bill Number'}
        name="number"
        rules={[{ required: true }]}
        style={{ display: 'inline-block', width: '33%' }}
      >
        <InputNumber style={{ width: '100%' }} />
      </Form.Item>
      <Form.Item
        label={translate('year') || 'Year'}
        name="year"
        rules={[{ required: true }]}
        style={{ display: 'inline-block', width: '33%', paddingLeft: '5px' }}
      >
        <InputNumber style={{ width: '100%' }} />
      </Form.Item>
      <Form.Item
        label={translate('date') || 'Date'}
        name="date"
        rules={[{ required: true }]}
        style={{ display: 'inline-block', width: '33%', paddingLeft: '5px' }}
      >
        <DatePicker style={{ width: '100%' }} format="YYYY-MM-DD" />
      </Form.Item>

      <Form.Item
        label={translate('Supplier') || 'Supplier'}
        name="supplier"
        rules={[{ required: true }]}
      >
        <SelectAsync
          entity={'supplier'}
          displayLabels={['name']}
          searchFields={'name'}
        />
      </Form.Item>

      <Form.Item
        label={translate('Purchase Order') || 'Purchase Order'}
        name="purchaseOrder"
      >
        <SelectAsync
          entity={'purchaseOrder'}
          displayLabels={['number']}
          searchFields={'number'}
          onChange={(value, option) => {
            if (option) {
              const currentSupplier = form.getFieldValue('supplier');
              const newSupplier = option.supplier?._id || option.supplier;
              if (newSupplier && currentSupplier !== newSupplier) {
                form.setFieldsValue({ supplier: newSupplier });
              }
              const currentItems = form.getFieldValue('items');
              if (!currentItems || currentItems.length === 0 || (currentItems.length === 1 && !currentItems[0].product)) {
                form.setFieldsValue({
                  items: option.items?.map(i => ({
                    product: i.product?._id || i.product,
                    itemName: i.itemName,
                    quantity: i.quantity,
                    price: i.price,
                    total: i.total
                  })) || []
                });
              }
            }
          }}
        />
      </Form.Item>

      <Form.Item
        label={translate('Standalone Bill') || 'Standalone Bill'}
        name="isStandalone"
        valuePropName="checked"
      >
        <Switch checkedChildren={<CheckOutlined />} unCheckedChildren={<CloseOutlined />} />
      </Form.Item>

      <div style={{ marginBottom: 16 }}>
        <p><strong>Billed Items</strong></p>
        <Form.List name="items">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                  <Form.Item
                    {...restField}
                    name={[name, 'product']}
                    rules={[{ required: true, message: 'Please select a product' }]}
                    style={{ width: '200px' }}
                  >
                    <SelectAsync
                      entity={'product'}
                      displayLabels={['name']}
                      searchFields={'name'}
                      placeholder="Select Product"
                      onChange={(value, option) => {
                        const items = form.getFieldValue('items') || [];
                        items[name] = {
                          ...items[name],
                          product: value,
                          itemName: option?.name || '',
                        };
                        form.setFieldsValue({ items });
                      }}
                    />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, 'itemName']}
                    hidden
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, 'quantity']}
                    rules={[{ required: true, message: 'Missing quantity' }]}
                  >
                    <InputNumber placeholder="Qty" min={1} onChange={() => handlePriceQuantityChange(name)} />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, 'price']}
                    rules={[{ required: true, message: 'Missing price' }]}
                  >
                    <InputNumber placeholder="Price" min={0} onChange={() => handlePriceQuantityChange(name)} />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, 'total']}
                    rules={[{ required: true, message: 'Missing total' }]}
                  >
                    <InputNumber placeholder="Total" min={0} readOnly />
                  </Form.Item>
                  <MinusCircleOutlined onClick={() => remove(name)} />
                </Space>
              ))}
              <Form.Item>
                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                  Add Item
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </div>

      <Form.Item
        label={translate('Payment Status') || 'Payment Status'}
        name="paymentStatus"
        initialValue="unpaid"
      >
        <Select>
          <Select.Option value="unpaid">Unpaid</Select.Option>
          <Select.Option value="paid">Paid</Select.Option>
          <Select.Option value="partially">Partially Paid</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item
        label={translate('Approval Status') || 'Approval Status'}
        name="approvalStatus"
        initialValue="draft"
      >
        <Select>
          <Select.Option value="draft">Draft</Select.Option>
          <Select.Option value="pending_approval">Pending Approval</Select.Option>
          <Select.Option value="approved">Approved</Select.Option>
          <Select.Option value="rejected">Rejected</Select.Option>
        </Select>
      </Form.Item>
    </>
  );
}
