import React from 'react';
import { Row, Col } from 'antd';
import StatCards from '../../components/dashboard/StatCards';
import UserActivityChart from '../../components/dashboard/UserActivityChart';
import PublishedContentChart from '../../components/dashboard/PublishedContentChart';
import VisitorAnalysisChart from '../../components/dashboard/VisitorAnalysisChart';
import SystemLoadChart from '../../components/dashboard/SystemLoadChart';
import MetricDistributionChart from '../../components/dashboard/MetricDistributionChart';
import ComplexOverviewChart from '../../components/dashboard/ComplexOverviewChart';
import DeviceBreakdownChart from '../../components/dashboard/DeviceBreakdownChart';
import ConversionFunnelChart from '../../components/dashboard/ConversionFunnelChart';
import UserSessionScatterChart from '../../components/dashboard/UserSessionScatterChart';
import RevenueBreakdownChart from '../../components/dashboard/RevenueBreakdownChart';

const Dashboard: React.FC = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* 1. Üst İstatistik Kartları */}
      <StatCards />

      {/* 2. Orta Büyük Tablolar */}
      <Row gutter={[24, 24]}>
        <Col xs={24} lg={16}>
          <UserActivityChart />
        </Col>
        
        <Col xs={24} lg={8}>
          <PublishedContentChart />
        </Col>
      </Row>

      {/* 3. İkincil Analiz (Area/Line/Radar) Tabloları */}
      <Row gutter={[24, 24]}>
        <Col xs={24} lg={8}>
          <VisitorAnalysisChart />
        </Col>

        <Col xs={24} lg={8}>
          <SystemLoadChart />
        </Col>  

        <Col xs={24} lg={8}>
          <MetricDistributionChart />
        </Col>
      </Row>

      {/* 4. Alt Ekstra Premium Tablolar */}
      <Row gutter={[24, 24]}>
        <Col xs={24} lg={16}>
          <ComplexOverviewChart />
        </Col>

        <Col xs={24} lg={8}>
          <DeviceBreakdownChart />
        </Col>
      </Row>

      {/* 5. Gelişmiş/Yeni Çeşitlilik (Funnel/Scatter/Stacked) Tabloları */}
      <Row gutter={[24, 24]}>
        <Col xs={24} lg={8}>
          <ConversionFunnelChart />
        </Col>

        <Col xs={24} lg={8}>
          <UserSessionScatterChart />
        </Col>

        <Col xs={24} lg={8}>
          <RevenueBreakdownChart />
        </Col>
      </Row>

    </div>
  );
};

export default Dashboard;
