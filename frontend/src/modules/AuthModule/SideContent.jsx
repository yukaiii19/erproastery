import { Space, Layout, Divider, Typography } from 'antd';
import logoIcon from '@/logo-icon.svg';
import useLanguage from '@/locale/useLanguage';
import { useSelector } from 'react-redux';

const { Content } = Layout;
const { Title, Text } = Typography;

export default function SideContent() {
  const translate = useLanguage();

  return (
    <Content
      style={{
        padding: '150px 30px 30px',
        width: '100%',
        maxWidth: '450px',
        margin: '0 auto',
      }}
      className="sideContent"
    >
      <div style={{ width: '100%' }}>
        <img
          src={logoIcon}
          alt="Logo"
          style={{ margin: '0 0 40px', display: 'block', height: '240px', objectFit: 'contain' }}
        />

        <Title level={1} style={{ fontSize: 28 }}>
          Roastery Beans Corp
        </Title>
        <Text>
          ERP System for Roastery Beans Corp
        </Text>

        <div className="space20"></div>
      </div>
    </Content>
  );
}
