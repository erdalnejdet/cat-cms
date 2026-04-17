import React from 'react';
import { Card, Typography, theme } from 'antd';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';

const { Title, Text } = Typography;
const { useToken } = theme;

const radarData = [
  { subject: 'Tasarım', A: 120, B: 110, fullMark: 150 },
  { subject: 'SEO', A: 98, B: 130, fullMark: 150 },
  { subject: 'İçerik', A: 86, B: 130, fullMark: 150 },
  { subject: 'Teknoloji', A: 99, B: 100, fullMark: 150 },
  { subject: 'Güvenlik', A: 85, B: 90, fullMark: 150 },
  { subject: 'Hız', A: 65, B: 85, fullMark: 150 },
];

const MetricDistributionChart: React.FC = () => {
  const { token } = useToken();

  return (
    <Card style={{ borderRadius: '12px', borderColor: token.colorBorderSecondary, background: token.colorBgContainer }}>
      <div style={{ marginBottom: '24px' }}>
        <Title level={4} style={{ margin: 0, color: token.colorText }}>Metrik Dağılımı</Title>
        <Text style={{ color: token.colorTextDescription }}>Site Performans Özeti</Text>
      </div>
      <div style={{ height: '250px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart outerRadius={80} data={radarData}>
            <PolarGrid stroke={token.colorBorderSecondary} />
            <PolarAngleAxis dataKey="subject" tick={{ fill: token.colorTextDescription, fontSize: 11 }} />
            <PolarRadiusAxis angle={30} domain={[0, 150]} tick={false} axisLine={false} />
            <Radar name="Skor" dataKey="A" stroke="#10b981" fill="#10b981" fillOpacity={0.5} />
            <RechartsTooltip contentStyle={{ background: token.colorBgElevated, border: 'none', borderRadius: '8px', color: token.colorText }} />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default MetricDistributionChart;
