import React from 'react';
import { Form, Input, InputNumber, Select, Button, Space, DatePicker } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import useLanguage from '@/locale/useLanguage';
import SelectAsync from '@/components/SelectAsync';
import calculate from '@/utils/calculate';

export default function SalesOrderForm({ isUpdateForm = false }) {
  const translate = useLanguage();
  const form = Form.useFormInstance();

  const handlePriceQuantityChange = (name) => {
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
        label={translate('number') || 'SO Number'}
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
        label={translate('Client') || 'Client'}
        name="client"
        rules={[{ required: true }]}
      >
        <SelectAsync
          entity={'client'}
          displayLabels={['name']}
          searchFields={'name'}
        />
      </Form.Item>

      <div style={{ marginBottom: 16 }}>
        <p><strong>Order Items</strong></p>
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
        label={translate('status') || 'Status'}
        name="status"
        initialValue="draft"
      >
        <Select>
          <Select.Option value="draft">Draft</Select.Option>
          <Select.Option value="pending_approval">Pending Approval</Select.Option>
          <Select.Option value="approved">Approved</Select.Option>
          <Select.Option value="rejected">Rejected</Select.Option>
          <Select.Option value="fulfilled">Fulfilled</Select.Option>
        </Select>
      </Form.Item>
    </>
  );
}
