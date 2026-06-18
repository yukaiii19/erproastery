import React from 'react';
import { Form, Input, InputNumber, Select, Switch } from 'antd';
import { CloseOutlined, CheckOutlined } from '@ant-design/icons';
import useLanguage from '@/locale/useLanguage';

export default function ProductForm({ isUpdateForm = false }) {
  const translate = useLanguage();
  return (
    <>
      <Form.Item
        label={translate('name') || 'Name'}
        name="name"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label={translate('description') || 'Description'}
        name="description"
      >
        <Input.TextArea />
      </Form.Item>
      <Form.Item
        label={translate('type') || 'Type'}
        name="type"
        rules={[
          {
            required: true,
          },
        ]}
        initialValue="inventory"
      >
        <Select>
          <Select.Option value="inventory">Inventory</Select.Option>
          <Select.Option value="non-inventory">Non-Inventory</Select.Option>
          <Select.Option value="service">Service</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item
        label={translate('price') || 'Price'}
        name="price"
        rules={[
          {
            required: true,
          },
        ]}
        style={{
          display: 'inline-block',
          width: 'calc(50%)',
          paddingRight: '5px',
        }}
      >
        <InputNumber style={{ width: '100%' }} min={0} />
      </Form.Item>

      <Form.Item
        label={translate('cost') || 'Cost'}
        name="cost"
        style={{
          display: 'inline-block',
          width: 'calc(50%)',
          paddingLeft: '5px',
        }}
      >
        <InputNumber style={{ width: '100%' }} min={0} />
      </Form.Item>

      <Form.Item
        label={translate('enabled')}
        name="enabled"
        style={{
          display: 'inline-block',
          width: 'calc(50%)',
          paddingRight: '5px',
        }}
        valuePropName="checked"
        initialValue={true}
      >
        <Switch checkedChildren={<CheckOutlined />} unCheckedChildren={<CloseOutlined />} />
      </Form.Item>

      <Form.Item
        label={translate('Stock Quantity') || 'Stock Quantity'}
        name="stockQuantity"
        style={{
          display: 'inline-block',
          width: 'calc(50%)',
          paddingLeft: '5px',
        }}
      >
        <InputNumber style={{ width: '100%' }} min={0} />
      </Form.Item>
    </>
  );
}
