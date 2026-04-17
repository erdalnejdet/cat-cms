import React from 'react';
import { Card, Typography, theme } from 'antd';
import { RadialBarChart, RadialBar, Legend, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';

const { Title, Text } = Typography;
const { useToken } = theme;

const radialData = [
  { name: 'Mobil', fill: '#8b5cf6', pv: 4200 },
  { name: 'Tablet', fill: '#14b8a6', pv: 2100 },
  { name: 'Desktop', fill: '#f59e0b', pv: 5800 },
  { name: 'Diğer', fill: '#ef4444', pv: 800 },
];

const DeviceBreakdownChart: React.FC = () => {
  const { token } = useToken();

  return (
    <Card style={{ borderRadius: '12px', borderColor: token.colorBorderSecondary, height: '100%', background: token.colorBgContainer }}>
      <div style={{ marginBottom: '24px' }}>
        <Title level={4} style={{ margin: 0, color: token.colorText }}>Cihaz Kırılımları</Title>
        <Text style={{ color: token.colorTextDescription }}>Platformlara Göre Yoğunluk (Radial)</Text>
      </div>
      <div style={{ height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <ResponsiveContainer width="100%" height="100%">
          <RadialBarChart 
            cx="50%" 
            cy="50%" 
            innerRadius="30%" 
            outerRadius="100%" 
            barSize={15} 
            data={radialData}
            startAngle={180}
            endAngle={0}
          >
            <RadialBar
              background
              dataKey="pv"
              cornerRadius={10}
            />
            <Legend 
              iconSize={10} 
              layout="horizontal" 
              verticalAlign="bottom" 
              align="center"
              wrapperStyle={{ color: token.colorTextDescription, paddingTop: '10px' }}
            />
            <RechartsTooltip contentStyle={{ background: token.colorBgElevated, border: 'none', borderRadius: '8px', color: token.colorText }} />
          </RadialBarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default DeviceBreakdownChart;
