import React from 'react';
import { Form, Input, Row, Col, Divider, Space, Typography, Switch, theme } from 'antd';

const { Text } = Typography;

interface CategoryFormProps {
  form: any;
  onFinish: (values: any) => void;
}

const CreateCategory: React.FC<CategoryFormProps> = ({ form, onFinish }) => {
  const { token } = theme.useToken();
  
  return (
    <Form form={form} layout="vertical" onFinish={onFinish} requiredMark="optional">
      <Row gutter={24}>
        <Col span={24}>
          <Form.Item 
            name="name" 
            label={<Text strong>Kategori Adı</Text>}
            rules={[{ required: true, message: 'Lütfen kategori adını giriniz' }]}
          >
            <Input placeholder="Örn: Haberler" size="large" style={{ borderRadius: '8px' }} />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={24}>
        <Col span={24}>
          <Form.Item 
            name="slug" 
            label={<Text strong>URL / Slug</Text>}
            rules={[{ required: true }]}
            tooltip="URL'de görünecek olan isim"
          >
            <Input prefix="/" placeholder="haberler" size="large" style={{ borderRadius: '8px' }} />
          </Form.Item>
        </Col>
      </Row>

      <Divider style={{ margin: '24px 0' }} />

      <Row gutter={24}>
        <Col span={12}>
          <Form.Item 
            name="order" 
            label={<Text strong>Sıralama No</Text>}
          >
            <Input type="number" placeholder="0" size="large" style={{ borderRadius: '8px' }} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item 
            name="status" 
            label={<Text strong>Yayın Durumu</Text>} 
            valuePropName="checked"
            initialValue={true}
          >
            <div style={{ 
              padding: '8px 16px', 
              border: `1px solid ${token.colorBorderSecondary}`, 
              borderRadius: '8px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <Text>{form.getFieldValue('status') ? 'Aktif' : 'Pasif'}</Text>
              <Switch defaultChecked />
            </div>
          </Form.Item>
        </Col>
      </Row>

      <div style={{ 
        marginTop: '24px', 
        padding: '16px', 
        background: token.colorFillAlter, 
        borderRadius: '12px',
        border: `1px dashed ${token.colorBorder}`
      }}>
        <Space direction="vertical" size="small" style={{ width: '100%' }}>
          <Text strong style={{ fontSize: '13px' }}>SEO Önişleme</Text>
          <Text type="secondary" style={{ fontSize: '12px' }}>
            Google aramalarında "domain.com/kategori-adi" şeklinde görünecektir.
          </Text>
        </Space>
      </div>
    </Form>
  );
};

export default CreateCategory;
