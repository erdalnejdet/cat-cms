import React from 'react';
import { Card, theme } from 'antd';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const { useToken } = theme;

const pieData = [
  { name: 'Yayınlanan', value: 98 },
  { name: 'Yayınlanmayan', value: 2 },
];
const COLORS = ['#8b5cf6', '#d1d5db'];

const PublishedContentChart: React.FC = () => {
  const { token } = useToken();

  return (
    <Card style={{ borderRadius: '12px', borderColor: token.colorBorderSecondary, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: token.colorBgContainer }}>
       <div style={{ position: 'relative', width: '250px', height: '250px', margin: '0 auto' }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={pieData}
              innerRadius={80}
              outerRadius={100}
              paddingAngle={5}
              dataKey="value"
              stroke={token.colorBgContainer}
              strokeWidth={2}
            >
              {pieData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
           <div style={{ color: '#8b5cf6', fontWeight: 'bold', fontSize: '16px' }}>Yayınlanan İçerik</div>
           <div style={{ color: token.colorTextSecondary, fontSize: '24px' }}>98%</div>
        </div>
      </div>
    </Card>
  );
};

export default PublishedContentChart;
