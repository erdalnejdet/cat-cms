import React from 'react';
import { Card, Typography, theme } from 'antd';
import { BarChart, Bar, XAxis, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';

const { Title, Text } = Typography;
const { useToken } = theme;

const barData = [
  { name: 'Ocak', value: 800 },
  { name: 'Şubat', value: 400 },
  { name: 'Mart', value: 150 },
  { name: 'Nisan', value: 250 },
  { name: 'Mayıs', value: 0 },
  { name: 'Haziran', value: 0 },
];

const UserActivityChart: React.FC = () => {
  const { token } = useToken();

  return (
    <Card style={{ borderRadius: '12px', borderColor: token.colorBorderSecondary, height: '100%', background: token.colorBgContainer }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
        <div>
          <Title level={4} style={{ margin: 0, color: token.colorText }}>Kullanıcı İşlem Sayıları</Title>
          <Text style={{ color: token.colorTextDescription }}>Aylık İşlem Toplamı</Text>
        </div>
        <select style={{ padding: '6px 12px', borderRadius: '6px', border: `1px solid ${token.colorBorderSecondary}`, background: token.colorBgContainer, color: token.colorText }}>
          <option>2026</option>
          <option>2025</option>
        </select>
      </div>
      <div style={{ height: '300px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={barData} margin={{ top: 20, right: 0, left: 0, bottom: 0 }}>
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: token.colorTextDescription, fontSize: 12 }} />
            <RechartsTooltip cursor={{ fill: token.colorFillQuaternary }} contentStyle={{ borderRadius: '8px', border: 'none', background: token.colorBgElevated, color: token.colorText }} />
            <Bar dataKey="value" fill="#8b5cf6" radius={[4, 4, 0, 0]} maxBarSize={40} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default UserActivityChart;
