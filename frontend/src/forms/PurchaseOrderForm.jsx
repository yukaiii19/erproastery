import React from 'react';
import { Form, Input, InputNumber, Select, Button, Space, DatePicker } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import useLanguage from '@/locale/useLanguage';
import SelectAsync from '@/components/SelectAsync';
import calculate from '@/utils/calculate';

export default function PurchaseOrderForm({ isUpdateForm = false }) {
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
        label={translate('number') || 'PO Number'}
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

      <div style={{ marginBottom: 16 }}>
        <p><strong>Items</strong></p>
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
                          price: option?.cost || option?.price || 0,
                          quantity: items[name]?.quantity || 1,
                        };
                        form.setFieldsValue({ items });
                        handlePriceQuantityChange(name);
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

    </>
  );
}
