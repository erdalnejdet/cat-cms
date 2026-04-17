import React from 'react';
import { Card, Typography, theme } from 'antd';
import { BarChart, Bar, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';

const { Title, Text } = Typography;
const { useToken } = theme;

const stackedData = [
  { name: 'Ocak', b2b: 4000, b2c: 2400, e_ticaret: 2400 },
  { name: 'Şub', b2b: 3000, b2c: 1398, e_ticaret: 2210 },
  { name: 'Mar', b2b: 2000, b2c: 9800, e_ticaret: 2290 },
  { name: 'Nis', b2b: 2780, b2c: 3908, e_ticaret: 2000 },
  { name: 'May', b2b: 1890, b2c: 4800, e_ticaret: 2181 },
];

const RevenueBreakdownChart: React.FC = () => {
  const { token } = useToken();

  return (
    <Card style={{ borderRadius: '12px', borderColor: token.colorBorderSecondary, background: token.colorBgContainer }}>
      <div style={{ marginBottom: '24px' }}>
        <Title level={4} style={{ margin: 0, color: token.colorText }}>Gelir Dağılımı</Title>
        <Text style={{ color: token.colorTextDescription }}>Kanal Bazlı Stacked Büyüme</Text>
      </div>
      <div style={{ height: '250px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={stackedData} margin={{ top: 20, right: 30, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={token.colorBorderSecondary} />
            <XAxis dataKey="name" tick={{ fill: token.colorTextDescription }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: token.colorTextDescription }} axisLine={false} tickLine={false} />
            <RechartsTooltip contentStyle={{ background: token.colorBgElevated, border: 'none', borderRadius: '8px', color: token.colorText }} />
            <Legend wrapperStyle={{ color: token.colorTextDescription }} />
            <Bar dataKey="b2b" name="B2B (Kurumsal)" stackId="a" fill="#8b5cf6" />
            <Bar dataKey="b2c" name="B2C (Bireysel)" stackId="a" fill="#14b8a6" />
            <Bar dataKey="e_ticaret" name="E-Ticaret" stackId="a" fill="#f59e0b" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default RevenueBreakdownChart;
