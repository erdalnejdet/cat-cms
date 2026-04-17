import React from 'react';
import { Card, Typography, theme } from 'antd';
import { LineChart, Line, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const { Title, Text } = Typography;
const { useToken } = theme;

const lineData = [
  { time: '00:00', cpu: 20, ram: 45 },
  { time: '04:00', cpu: 10, ram: 40 },
  { time: '08:00', cpu: 65, ram: 80 },
  { time: '12:00', cpu: 85, ram: 85 },
  { time: '16:00', cpu: 60, ram: 70 },
  { time: '20:00', cpu: 30, ram: 55 },
];

const SystemLoadChart: React.FC = () => {
  const { token } = useToken();

  return (
    <Card style={{ borderRadius: '12px', borderColor: token.colorBorderSecondary, background: token.colorBgContainer }}>
      <div style={{ marginBottom: '24px' }}>
        <Title level={4} style={{ margin: 0, color: token.colorText }}>Sistem Yükü</Title>
        <Text style={{ color: token.colorTextDescription }}>Günlük CPU ve Bellek (%)</Text>
      </div>
      <div style={{ height: '250px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={lineData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <XAxis dataKey="time" tick={{ fill: token.colorTextDescription }} tickLine={false} axisLine={false} />
            <YAxis tick={{ fill: token.colorTextDescription }} tickLine={false} axisLine={false} />
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={token.colorBorderSecondary} />
            <RechartsTooltip contentStyle={{ background: token.colorBgElevated, border: 'none', borderRadius: '8px', color: token.colorText }} />
            <Line type="monotone" dataKey="cpu" stroke="#ef4444" strokeWidth={3} dot={{ r: 0 }} activeDot={{ r: 6 }} />
            <Line type="monotone" dataKey="ram" stroke="#3b82f6" strokeWidth={3} dot={{ r: 0 }} activeDot={{ r: 6 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default SystemLoadChart;
