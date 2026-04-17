import React from 'react';
import { Card, Typography, theme } from 'antd';
import { AreaChart, Area, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const { Title, Text } = Typography;
const { useToken } = theme;

const areaData = [
  { name: 'Hafta 1', uv: 4000, pv: 2400 },
  { name: 'Hafta 2', uv: 3000, pv: 1398 },
  { name: 'Hafta 3', uv: 2000, pv: 9800 },
  { name: 'Hafta 4', uv: 2780, pv: 3908 },
];

const VisitorAnalysisChart: React.FC = () => {
  const { token } = useToken();

  return (
    <Card style={{ borderRadius: '12px', borderColor: token.colorBorderSecondary, background: token.colorBgContainer }}>
      <div style={{ marginBottom: '24px' }}>
        <Title level={4} style={{ margin: 0, color: token.colorText }}>Ziyaretçi Analizi</Title>
        <Text style={{ color: token.colorTextDescription }}>Haftalık Görüntülenme</Text>
      </div>
      <div style={{ height: '250px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={areaData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <XAxis dataKey="name" tick={{ fill: token.colorTextDescription }} tickLine={false} axisLine={false} />
            <YAxis tick={{ fill: token.colorTextDescription }} tickLine={false} axisLine={false} />
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={token.colorBorderSecondary} />
            <RechartsTooltip contentStyle={{ background: token.colorBgElevated, border: 'none', borderRadius: '8px', color: token.colorText }} />
            <Area type="monotone" dataKey="uv" stroke="#8b5cf6" fillOpacity={1} fill="url(#colorUv)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default VisitorAnalysisChart;
