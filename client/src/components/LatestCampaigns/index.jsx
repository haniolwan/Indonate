import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Typography, Button, message, Anchor,
} from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';
import Campaign from '../common/CampaignCard';
import './style.less';

const { Title, Text } = Typography;
const { Link } = Anchor;

function latestCampaigns() {
  const [campaigns, setCampaigns] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const getData = async () => {
      try {
        const {
          data:
           {
             data:
             {
               campaigns:
               dbCampaigns,
             },
           },
        } = await axios.get('/api/campaigns/?limit=3');
        setCampaigns(dbCampaigns);
      } catch ({
        response:
         {
           data:
           { message: errorMessage },
         },
      }) {
        message.error({
          content: errorMessage,
        });
      }
    };
    getData();
  }, []);
  return (
    <section className="layout">
      <Title className="custom_header_title" level={1}>
        Latest
        <Text className="campaigns_text">
          Campaigns
        </Text>
      </Title>
      <div className="cards">
        {
          campaigns.map((({
            id,
            title,
            description,
            image_link: imgSrc,
            category: { icon_url: iconUrl },
          }) => (
            <Campaign
              key={id}
              id={id}
              title={title}
              description={description}
              imgSrc={imgSrc}
              categoryIcon={iconUrl}
              isAvailable
            />
          )
          ))
        }
      </div>
      <Button
        className="more_btn ant-btn-primary ant-btn"
        type="primary"
        onClick={() => navigate('/campaigns/')}
      />
      <div className="more-campaigns-btn">
        <Anchor affix={false}>
          <Link
            onClick={() => navigate('/campaigns')}
            href="/campaigns"
            title="See More Campaigns"
          />
        </Anchor>
        <ArrowRightOutlined />
      </div>
    </section>
  );
}

export default latestCampaigns;
