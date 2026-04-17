import React, { useState } from 'react';
import { Form, Input, Button, Modal, Typography, message, Space } from 'antd';
import { useNavigate } from 'react-router-dom';
import { SafetyCertificateOutlined } from '@ant-design/icons';
import '../../App.css';

const { Title, Text } = Typography;

const MiniCatLogo = () => (
  <svg width="28" height="28" viewBox="0 0 100 100" fill="none" stroke="white" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M 50 15 C 30 15 15 30 15 50 C 15 70 30 85 50 85 C 70 85 85 70 85 50 C 85 30 70 20 50 20" />
    <path d="M 35 60 L 40 45 L 50 55 L 60 45 L 65 60" />
  </svg>
);

const MainCatLogo = () => (
  <svg width="220" height="220" viewBox="0 0 100 100" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
    <path d="M 60 85 C 35 95 15 80 15 55 C 15 30 35 15 60 15 C 85 15 95 40 85 65 C 78 80 62 80 50 80 C 40 80 30 72 30 60 L 42 45 L 50 55 L 58 45 L 70 60" />
  </svg>
);

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [twoFactorCode, setTwoFactorCode] = useState('');

  const onFinish = (values: any) => {
    console.log('Login attempt:', values.email);
    setLoading(true);
    // Simüle edilmiş ilk giriş adımı
    setTimeout(() => {
      setLoading(false);
      setIsModalOpen(true);
      message.success('Giriş başarılı, lütfen doğrulama kodunu giriniz.');
    }, 1000);
  };

  const handleVerify = () => {
    if (twoFactorCode === '123456') {
      message.success('Doğrulama başarılı!');
      // Simüle edilen oturum ve rol bilgisi
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userRole', 'admin');
      navigate('/');
    } else {
      message.error('Hatalı doğrulama kodu, lütfen tekrar deneyin.');
    }
  };

  return (
    <div className="login-layout">
      <div className="left-panel">
        <div className="top-left-logo">
          <MiniCatLogo />
          <span>madebycat</span>
        </div>
        <div className="center-logo">
          <MainCatLogo />
        </div>
      </div>
      <div className="right-panel">
        <h1 className="login-title">Cat CMS'e Hoşgeldiniz</h1>
        <p className="login-subtitle">İçerik yönetim ekranlarına ulaşmak için giriş yapın.</p>

        <Form name="login" layout="vertical" onFinish={onFinish} requiredMark={false}>
          <Form.Item
            label="E-Posta"
            name="email"
            rules={[
              { required: true, message: 'Lütfen e-posta adresinizi girin!' },
              { type: 'email', message: 'Lütfen geçerli bir e-posta adresi girin!' }
            ]}
          >
            <Input placeholder="mbc@madebycat.com" className="custom-input" />
          </Form.Item>

          <Form.Item
            label="Şifre"
            name="password"
            rules={[{ required: true, message: 'Lütfen şifrenizi girin!' }]}
          >
            <Input.Password placeholder="••••••••" className="custom-input" />
          </Form.Item>

          <Form.Item style={{ marginTop: '10px' }}>
            <Button type="primary" htmlType="submit" block className="custom-button" loading={loading}>
              Giriş Yap
            </Button>
          </Form.Item>
        </Form>
      </div>

      {/* 2FA Modal */}
      <Modal
        title={null}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        centered
        width={400}
        styles={{ body: { padding: '32px 24px', textAlign: 'center' } }}
      >
        <div style={{ marginBottom: '24px' }}>
          <div style={{ 
            width: '64px', 
            height: '64px', 
            backgroundColor: '#f1f5f9', 
            borderRadius: '50%', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            margin: '0 auto 16px'
          }}>
            <SafetyCertificateOutlined style={{ fontSize: '32px', color: '#333d4e' }} />
          </div>
          <Title level={4} style={{ margin: 0, color: '#2c3243' }}>İki Faktörlü Doğrulama</Title>
          <Text type="secondary">Lütfen 6 haneli güvenlik kodunu giriniz.</Text>
        </div>

        <Input 
          size="large"
          maxLength={6}
          placeholder="000000"
          value={twoFactorCode}
          onChange={(e) => setTwoFactorCode(e.target.value)}
          style={{ 
            textAlign: 'center', 
            fontSize: '24px', 
            letterSpacing: '8px', 
            fontWeight: 'bold',
            borderRadius: '8px',
            marginBottom: '24px',
            backgroundColor: '#f8fafc',
            border: '1px solid #e2e8f0'
          }}
        />

        <Space direction="vertical" size="middle" style={{ width: '100%' }}>
          <Button 
            type="primary" 
            block 
            size="large" 
            onClick={handleVerify}
            className="custom-button"
            style={{ height: '48px', fontWeight: 'bold' }}
          >
            Doğrula ve Giriş Yap
          </Button>
          <Button type="link" style={{ color: '#64748b' }}>Kodu Tekrar Gönder</Button>
        </Space>
      </Modal>
    </div>
  );
};

export default Login;
