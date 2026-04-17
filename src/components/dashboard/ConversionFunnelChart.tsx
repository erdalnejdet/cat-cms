import React from 'react';
import { Card, Typography, theme } from 'antd';
import { FunnelChart, Funnel, LabelList, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';

const { Title, Text } = Typography;
const { useToken } = theme;

const funnelData = [
  { value: 100000, name: 'Görüntülenme', fill: '#8b5cf6' },
  { value: 80000, name: 'Tıklama', fill: '#3b82f6' },
  { value: 50000, name: 'Kayıt Formu', fill: '#14b8a6' },
  { value: 30000, name: 'Sepet / Demo', fill: '#f59e0b' },
  { value: 12000, name: 'Satın Alma', fill: '#ef4444' },
];

const ConversionFunnelChart: React.FC = () => {
  const { token } = useToken();

  return (
    <Card style={{ borderRadius: '12px', borderColor: token.colorBorderSecondary, background: token.colorBgContainer }}>
      <div style={{ marginBottom: '24px' }}>
        <Title level={4} style={{ margin: 0, color: token.colorText }}>Dönüşüm Hunisi</Title>
        <Text style={{ color: token.colorTextDescription }}>Kullanıcı Satın Alma Yolculuğu</Text>
      </div>
      <div style={{ height: '250px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <FunnelChart margin={{ top: 20 }}>
            <RechartsTooltip contentStyle={{ background: token.colorBgElevated, border: 'none', borderRadius: '8px', color: token.colorText }} />
            <Funnel dataKey="value" data={funnelData} isAnimationActive>
              <LabelList position="right" fill={token.colorText} stroke="none" dataKey="name" />
            </Funnel>
          </FunnelChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default ConversionFunnelChart;
