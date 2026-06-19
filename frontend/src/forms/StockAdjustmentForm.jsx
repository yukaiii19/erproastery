import React from 'react';
import { Form, Input, InputNumber, Button, Select, Divider, Row, Col } from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import useLanguage from '@/locale/useLanguage';
import SelectAsync from '@/components/SelectAsync';

export default function StockAdjustmentForm({ isUpdateForm = false }) {
  const translate = useLanguage();
  const form = Form.useFormInstance();

  return (
    <>
      <Row gutter={[12, 0]}>
        <Col className="gutter-row" span={8}>
          <Form.Item
            name="warehouse"
            label={translate('Warehouse')}
            rules={[{ required: true }]}
          >
            <SelectAsync entity="warehouse" displayLabels={['name']} searchFields="name" />
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={4}>
          <Form.Item
            label={translate('number')}
            name="number"
            rules={[{ required: true }]}
          >
            <InputNumber min={1} style={{ width: '100%' }} />
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={4}>
          <Form.Item
            label={translate('year')}
            name="year"
            rules={[{ required: true }]}
          >
            <InputNumber min={2000} style={{ width: '100%' }} />
          </Form.Item>
        </Col>

        <Col className="gutter-row" span={8}>
          <Form.Item
            label={translate('status')}
            name="status"
            rules={[{ required: false }]}
            initialValue={'draft'}
          >
            <Select
              options={[
                { value: 'draft', label: translate('Draft') },
                { value: 'pending', label: translate('Pending') },
                { value: 'completed', label: translate('Completed') },
                { value: 'cancelled', label: translate('Cancelled') },
              ]}
            ></Select>
          </Form.Item>
        </Col>

        <Col className="gutter-row" span={8}>
          <Form.Item
            name="date"
            label={translate('Date')}
            rules={[{ required: true, type: 'object' }]}
            initialValue={dayjs()}
          >
            <DatePicker style={{ width: '100%' }} format="YYYY-MM-DD" />
          </Form.Item>
        </Col>
      </Row>

      <Divider dashed />

      <Row gutter={[12, 12]} style={{ position: 'relative' }}>
        <Col className="gutter-row" span={10}>
          <p>
            <strong>{translate('Product')}</strong>
          </p>
        </Col>
        <Col className="gutter-row" span={6}>
          <p>
            <strong>{translate('Type')}</strong>
          </p>
        </Col>
        <Col className="gutter-row" span={6}>
          <p>
            <strong>{translate('Quantity')}</strong>
          </p>
        </Col>
      </Row>

      <Form.List name="items">
        {(fields, { add, remove }) => (
          <>
            {fields.map((field) => (
              <Row gutter={[12, 12]} style={{ position: 'relative' }} key={field.key}>
                <Col className="gutter-row" span={10}>
                  <Form.Item
                    name={[field.name, 'product']}
                    rules={[{ required: true, message: 'Please select a product' }]}
                  >
                    <SelectAsync
                      entity={'product'}
                      displayLabels={['name']}
                      searchFields={'name'}
                      placeholder="Select Product"
                      onChange={(value, option) => {
                        const items = form.getFieldValue('items') || [];
                        items[field.name] = {
                          ...items[field.name],
                          product: value,
                          itemName: option?.name || '',
                        };
                        form.setFieldsValue({ items });
                      }}
                    />
                  </Form.Item>
                  <Form.Item
                    name={[field.name, 'itemName']}
                    hidden
                  >
                    <Input />
                  </Form.Item>
                </Col>

                <Col className="gutter-row" span={6}>
                  <Form.Item
                    name={[field.name, 'type']}
                    rules={[{ required: true }]}
                    initialValue={'increase'}
                  >
                    <Select
                      options={[
                        { value: 'increase', label: translate('Increase') },
                        { value: 'decrease', label: translate('Decrease') },
                      ]}
                    />
                  </Form.Item>
                </Col>

                <Col className="gutter-row" span={6}>
                  <Form.Item name={[field.name, 'quantity']} rules={[{ required: true }]}>
                    <InputNumber style={{ width: '100%' }} min={1} />
                  </Form.Item>
                </Col>

                <div style={{ position: 'absolute', right: '-20px', top: '5px' }}>
                  <DeleteOutlined onClick={() => remove(field.name)} />
                </div>
              </Row>
            ))}
            <Form.Item>
              <Button
                type="dashed"
                onClick={() => add()}
                block
                icon={<PlusOutlined />}
              >
                {translate('Add field')}
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>

      <Divider dashed />
      <Row gutter={[12, 0]}>
        <Col className="gutter-row" span={24}>
          <Form.Item
            label={translate('Note')}
            name="notes"
          >
            <Input.TextArea rows={2} />
          </Form.Item>
        </Col>
      </Row>
    </>
  );
}
