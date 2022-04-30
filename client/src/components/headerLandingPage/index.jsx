import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Typography } from 'antd';
import './style.less';

const { Text } = Typography;
function HeaderLandingPage() {
  const [data, setData] = useState({});

  useEffect(() => {
    const source = axios.CancelToken.source();
    const { token } = source;
    const fetchData = async () => {
      const { data: { data: dataFromDB } } = await axios.get('/api/statistics', { cancelToken: token });
      setData(dataFromDB);
    };
    fetchData();

    return () => source.cancel();
  }, []);

  return (

    <div className="Header-section">
      <div className="description-Header-div">
        <Text className="Header-description">
          Short description for our work, and how we can
          <br />
          {' '}
          affect to People lives
        </Text>
      </div>
      <div className="statistic-section">

        {Object.keys(data).map((item) => (
          <div className="statistic-card" key={item}>
            <Text className="statictic-title">{item}</Text>
            <Text className="statictic-data">{data[item]}</Text>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HeaderLandingPage;
