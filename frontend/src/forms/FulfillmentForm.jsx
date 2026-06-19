import React from 'react';
import { Form, Input, InputNumber, Select, Button, Space, DatePicker } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import useLanguage from '@/locale/useLanguage';
import SelectAsync from '@/components/SelectAsync';

export default function FulfillmentForm({ isUpdateForm = false }) {
  const translate = useLanguage();
  const form = Form.useFormInstance();

  return (
    <>
      <Form.Item
        label={translate('number') || 'Fulfillment Number'}
        name="number"
        rules={[{ required: true }]}
        style={{ display: 'inline-block', width: '50%' }}
      >
        <InputNumber style={{ width: '100%' }} />
      </Form.Item>
      <Form.Item
        label={translate('date') || 'Date'}
        name="date"
        rules={[{ required: true }]}
        style={{ display: 'inline-block', width: '50%', paddingLeft: '5px' }}
      >
        <DatePicker style={{ width: '100%' }} format="YYYY-MM-DD" />
      </Form.Item>

      <Form.Item
        label={translate('Sales Order') || 'Sales Order'}
        name="salesOrder"
      >
        <SelectAsync
          entity={'salesOrder'}
          displayLabels={['number']}
          searchFields={'number'}
          onChange={(value, option) => {
            if (option && !isUpdateForm) {
              const currentClient = form.getFieldValue('client');
              const newClient = option.client?._id || option.client;
              if (newClient && currentClient !== newClient) {
                form.setFieldsValue({ client: newClient });
              }
              const currentItems = form.getFieldValue('items');
              if (!currentItems || currentItems.length === 0) {
                form.setFieldsValue({
                  items: option.items?.map(i => ({
                    product: i.product?._id || i.product,
                    itemName: i.itemName,
                    quantityShipped: i.quantity,
                  })) || []
                });
              }
            }
          }}
        />
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

      <Form.Item
        label={translate('Warehouse') || 'Warehouse'}
        name="warehouse"
        rules={[{ required: true }]}
      >
        <SelectAsync
          entity={'warehouse'}
          displayLabels={['name']}
          searchFields={'name'}
        />
      </Form.Item>

      <div style={{ marginBottom: 16 }}>
        <p><strong>Shipped Items</strong></p>
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
                    name={[name, 'quantityShipped']}
                    rules={[{ required: true, message: 'Missing quantity' }]}
                  >
                    <InputNumber placeholder="Qty Shipped" min={1} />
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
          <Select.Option value="picked">Picked</Select.Option>
          <Select.Option value="packed">Packed</Select.Option>
          <Select.Option value="shipped">Shipped</Select.Option>
          <Select.Option value="delivered">Delivered</Select.Option>
        </Select>
      </Form.Item>
    </>
  );
}
