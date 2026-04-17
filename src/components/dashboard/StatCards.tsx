import React from 'react';
import { Row, Col, Card, Typography, theme } from 'antd';
import { 
  ShareAltOutlined, BookOutlined, MessageOutlined, 
  MailOutlined, AppstoreAddOutlined, UserOutlined 
} from '@ant-design/icons';

const { Title, Text } = Typography;
const { useToken } = theme;

const StatCards: React.FC = () => {
  const { token } = useToken();

  const getCardStyle = () => ({
    borderRadius: '12px',
    borderColor: token.colorBorderSecondary,
  });

  return (
    <>
      <Card 
        bodyStyle={{ padding: '20px 24px' }} 
        className="global-card-gradient"
        style={{ 
          borderRadius: '12px', 
          border: `1px solid ${token.colorBorderSecondary}`
        }}
      >
        <Title level={3} style={{ margin: 0, color: token.colorText }}>Kontrol Paneli</Title>
        <Text style={{ color: token.colorTextDescription }}>Genel Bakış</Text>
      </Card>

      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={8} lg={4}>
          <Card bodyStyle={{ padding: '24px 16px', textAlign: 'center' }} style={getCardStyle()} className="global-card-gradient">
            <ShareAltOutlined style={{ fontSize: '32px', color: '#3b82f6', marginBottom: '16px' }} />
            <div style={{ color: '#3b82f6', fontWeight: '600' }}>Bülten Abone</div>
            <div style={{ fontSize: '24px', color: '#3b82f6', fontWeight: 'bold' }}>0</div>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8} lg={4}>
          <Card bodyStyle={{ padding: '24px 16px', textAlign: 'center' }} style={getCardStyle()} className="global-card-gradient">
            <BookOutlined style={{ fontSize: '32px', color: '#ef4444', marginBottom: '16px' }} />
            <div style={{ color: '#ef4444', fontWeight: '600' }}>Sayfa</div>
            <div style={{ fontSize: '24px', color: '#ef4444', fontWeight: 'bold' }}>29</div>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8} lg={4}>
          <Card bodyStyle={{ padding: '24px 16px', textAlign: 'center' }} style={getCardStyle()} className="global-card-gradient">
            <MessageOutlined style={{ fontSize: '32px', color: '#10b981', marginBottom: '16px' }} />
            <div style={{ color: '#10b981', fontWeight: '600' }}>Bileşen</div>
            <div style={{ fontSize: '24px', color: '#10b981', fontWeight: 'bold' }}>96</div>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8} lg={4}>
          <Card bodyStyle={{ padding: '24px 16px', textAlign: 'center' }} style={getCardStyle()} className="global-card-gradient">
            <MailOutlined style={{ fontSize: '32px', color: '#6366f1', marginBottom: '16px' }} />
            <div style={{ color: '#6366f1', fontWeight: '600' }}>Zamanlı Görev</div>
            <div style={{ fontSize: '24px', color: '#6366f1', fontWeight: 'bold' }}>0</div>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8} lg={4}>
          <Card bodyStyle={{ padding: '24px 16px', textAlign: 'center' }} style={getCardStyle()} className="global-card-gradient">
            <AppstoreAddOutlined style={{ fontSize: '32px', color: '#14b8a6', marginBottom: '16px' }} />
            <div style={{ color: '#14b8a6', fontWeight: '600' }}>Site</div>
            <div style={{ fontSize: '24px', color: '#14b8a6', fontWeight: 'bold' }}>1</div>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8} lg={4}>
          <Card bodyStyle={{ padding: '24px 16px', textAlign: 'center' }} style={getCardStyle()} className="global-card-gradient">
            <UserOutlined style={{ fontSize: '32px', color: '#a855f7', marginBottom: '16px' }} />
            <div style={{ color: '#a855f7', fontWeight: '600' }}>Kullanıcı</div>
            <div style={{ fontSize: '24px', color: '#a855f7', fontWeight: 'bold' }}>1</div>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default StatCards;
