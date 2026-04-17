import React from 'react';
import { Form, Input, Row, Col, Select } from 'antd';

const { Option } = Select;

interface UserFormProps {
  form: any;
  onFinish: (values: any) => void;
}

const CreateUser: React.FC<UserFormProps> = ({ form, onFinish }) => {
  return (
    <Form form={form} layout="vertical" onFinish={onFinish}>
      <Row gutter={16}>
        <Col span={24}>
          <Form.Item name="password" label="Şifre" rules={[{ required: true, message: 'Lütfen şifre giriniz' }]}>
            <Input.Password placeholder="********" size="large" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="firstName" label="İsim" rules={[{ required: true }]}>
            <Input size="large" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="lastName" label="Soyisim" rules={[{ required: true }]}>
            <Input size="large" />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item name="email" label="E-Posta" rules={[{ required: true, type: 'email' }]}>
            <Input size="large" />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item name="username" label="Kullanıcı Adı" rules={[{ required: true }]}>
            <Input size="large" />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item name="roles" label="Roller" rules={[{ required: true }]}>
            <Select mode="multiple" placeholder="Seçiniz" size="large">
              <Option value="admin">Yönetici</Option>
              <Option value="editor">Editör</Option>
              <Option value="viewer">İzleyici</Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default CreateUser;
