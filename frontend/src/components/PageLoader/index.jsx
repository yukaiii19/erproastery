import React from 'react';
import { Spin } from 'antd';

import { LoadingOutlined } from '@ant-design/icons';
import logoIcon from '@/logo-icon.svg';

const PageLoader = () => {
  const antIcon = <LoadingOutlined style={{ fontSize: 64 }} spin />;
  return (
    <div className="centerAbsolute" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <img src={logoIcon} alt="Logo" style={{ height: '200px', marginBottom: '20px', objectFit: 'contain' }} />
      <Spin indicator={antIcon}></Spin>
    </div>
  );
};
export default PageLoader;
