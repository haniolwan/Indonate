import React from 'react';
import './style.less';
import { Typography } from 'antd';

const { Text } = Typography;
function HeaderAllCampaigns() {
  return (
    <div className="Header-Image">
      <Text className="text">Donation Listing</Text>
      <Text className="text">
        Home/
        {' '}
        <span className="Donation-title">Donation</span>
      </Text
      >
    </div>
  );
}

export default HeaderAllCampaigns;
