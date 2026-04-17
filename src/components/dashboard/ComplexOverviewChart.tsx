import React from 'react';
import { Card, Typography, theme } from 'antd';
import { ComposedChart, Bar, Line, Area, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';

const { Title, Text } = Typography;
const { useToken } = theme;

const composedData = [
  { name: 'H1', gelir: 590, gider: 800, fark: 1400 },
  { name: 'H2', gelir: 868, gider: 967, fark: 1506 },
  { name: 'H3', gelir: 1397, gider: 1098, fark: 989 },
  { name: 'H4', gelir: 1480, gider: 1200, fark: 1228 },
  { name: 'H5', gelir: 1520, gider: 1108, fark: 1100 },
  { name: 'H6', gelir: 1400, gider: 680, fark: 1700 },
];

const ComplexOverviewChart: React.FC = () => {
  const { token } = useToken();

  return (
    <Card style={{ borderRadius: '12px', borderColor: token.colorBorderSecondary, background: token.colorBgContainer }}>
      <div style={{ marginBottom: '24px' }}>
        <Title level={4} style={{ margin: 0, color: token.colorText }}>Karmaşık Görünüm (Composed)</Title>
        <Text style={{ color: token.colorTextDescription }}>Gelir, Gider ve İşlem Farkı Korelasyonu</Text>
      </div>
      <div style={{ height: '300px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={composedData} margin={{ top: 10, right: 0, bottom: 0, left: -20 }}>
            <XAxis dataKey="name" tick={{ fill: token.colorTextDescription }} tickLine={false} axisLine={false} />
            <YAxis tick={{ fill: token.colorTextDescription }} tickLine={false} axisLine={false} />
            <RechartsTooltip contentStyle={{ background: token.colorBgElevated, border: 'none', borderRadius: '8px', color: token.colorText }} />
            <Legend verticalAlign="top" height={36} wrapperStyle={{ color: token.colorTextDescription }} />
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={token.colorBorderSecondary} />
            <Area type="monotone" dataKey="fark" fill="#14b8a6" stroke="#14b8a6" fillOpacity={0.2} />
            <Bar dataKey="gelir" barSize={20} fill="#8b5cf6" radius={[4, 4, 0, 0]} />
            <Line type="monotone" dataKey="gider" stroke="#ef4444" strokeWidth={3} />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default ComplexOverviewChart;
