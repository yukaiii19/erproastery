import { Form, Input, Select } from 'antd';
import { validatePhoneNumber } from '@/utils/helpers';
import useLanguage from '@/locale/useLanguage';
import { countryList } from '@/utils/countryList';

export default function SupplierForm({ isUpdateForm = false }) {
  const translate = useLanguage();
  const validateEmptyString = (_, value) => {
    if (value && value.trim() === '') {
      return Promise.reject(new Error('Field cannot be empty'));
    }
    return Promise.resolve();
  };

  return (
    <>
      <Form.Item
        label={translate('name') || 'Supplier Name'}
        name="name"
        rules={[
          { required: true },
          { validator: validateEmptyString },
        ]}
      >
        <Input />
      </Form.Item>
      
      <Form.Item
        name="phone"
        label={translate('Phone')}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="email"
        label={translate('email')}
        rules={[{ type: 'email' }]}
      >
        <Input />
      </Form.Item>
      
      <Form.Item
        name="country"
        label={translate('country') || 'Country'}
      >
        <Select
          showSearch
          optionFilterProp="children"
          filterOption={(input, option) =>
            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
          }
          filterSort={(optionA, optionB) =>
            (optionA?.label ?? '').toLowerCase().startsWith((optionB?.label ?? '').toLowerCase())
          }
          style={{
            width: '100%',
          }}
        >
          {countryList.map((language) => (
            <Select.Option
              key={language.value}
              value={language.value}
              label={translate(language.label)}
            >
              {language?.icon && language?.icon + ' '}
              {translate(language.label)}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        name="address"
        label={translate('address') || 'Address'}
      >
        <Input.TextArea />
      </Form.Item>
    </>
  );
}
