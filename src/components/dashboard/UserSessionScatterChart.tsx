import React from 'react';
import { Card, Typography, theme } from 'antd';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';

const { Title, Text } = Typography;
const { useToken } = theme;

const scatterDataA = [
  { x: 100, y: 200, z: 200 }, { x: 120, y: 100, z: 260 },
  { x: 170, y: 300, z: 400 }, { x: 140, y: 250, z: 280 },
  { x: 150, y: 400, z: 500 }, { x: 110, y: 280, z: 200 },
];
const scatterDataB = [
  { x: 200, y: 260, z: 240 }, { x: 240, y: 290, z: 220 },
  { x: 190, y: 290, z: 250 }, { x: 198, y: 250, z: 210 },
  { x: 180, y: 280, z: 260 }, { x: 210, y: 220, z: 230 },
];

const UserSessionScatterChart: React.FC = () => {
  const { token } = useToken();

  return (
    <Card style={{ borderRadius: '12px', borderColor: token.colorBorderSecondary, background: token.colorBgContainer }}>
      <div style={{ marginBottom: '24px' }}>
        <Title level={4} style={{ margin: 0, color: token.colorText }}>Etkileşim Yoğunluğu</Title>
        <Text style={{ color: token.colorTextDescription }}>Oturum Süresi ve Tıklama İlişkisi</Text>
      </div>
      <div style={{ height: '250px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 20, right: 20, bottom: 0, left: -20 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={token.colorBorderSecondary} />
            <XAxis type="number" dataKey="x" name="Süre (sn)" tick={{ fill: token.colorTextDescription }} axisLine={false} tickLine={false} />
            <YAxis type="number" dataKey="y" name="Tıklama" tick={{ fill: token.colorTextDescription }} axisLine={false} tickLine={false} />
            <RechartsTooltip cursor={{ strokeDasharray: '3 3' }} contentStyle={{ background: token.colorBgElevated, border: 'none', borderRadius: '8px', color: token.colorText }} />
            <Scatter name="Kurumsal" data={scatterDataA} fill="#8b5cf6" />
            <Scatter name="Bireysel" data={scatterDataB} fill="#14b8a6" />
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default UserSessionScatterChart;
