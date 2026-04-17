import React, { useContext, useState } from 'react';
import { Layout, Menu, Avatar, Button, Dropdown, Space, theme } from 'antd';
import type { MenuProps } from 'antd';
import {
  AppstoreOutlined, SettingOutlined,
  UnorderedListOutlined,
  QuestionCircleOutlined, MoonOutlined, SunOutlined, UserOutlined,
  DownOutlined, PoweroffOutlined, MenuUnfoldOutlined, MenuFoldOutlined, HistoryOutlined,
  GlobalOutlined, LinkOutlined, TeamOutlined, FileImageOutlined,
  CodeOutlined, FolderOpenOutlined
} from '@ant-design/icons';
import { Outlet, useNavigate } from 'react-router-dom';
import { ThemeContext } from '../App';

const { Header, Sider, Content } = Layout;
const { useToken } = theme;

const MiniCatLogoVector = ({ color }: { color: string }) => (
  <svg width="28" height="28" viewBox="0 0 100 100" fill="none" stroke={color} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" style={{ minWidth: '28px' }}>
    <path d="M 50 15 C 30 15 15 30 15 50 C 15 70 30 85 50 85 C 70 85 85 70 85 50 C 85 30 70 20 50 20" />
    <path d="M 35 60 L 40 45 L 50 55 L 60 45 L 65 60" />
  </svg>
);

const DashboardLayout: React.FC = () => {
  const navigate = useNavigate();
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  const { token } = useToken();
  const [collapsed, setCollapsed] = useState(false);

  const menuItems: MenuProps['items'] = [
    {
      type: 'group',
      label: 'DOSYA YÖNETİMİ',
      children: [
        { key: '/dosya/manager', icon: <FolderOpenOutlined />, label: 'Dosya Yöneticisi' },
        { key: '/dosya/editor', icon: <CodeOutlined />, label: 'Sayfa Editörü' },
        { key: '/dosya/medya', icon: <FileImageOutlined />, label: 'Medya Listesi' },
      ],
    },
    {
      type: 'group',
      label: 'GENEL BAKIŞ',
      children: [
        { key: '/', icon: <AppstoreOutlined />, label: 'Kontrol Paneli' },
      ],
    },
    {
      type: 'group',
      label: 'SİSTEM YÖNETİMİ',
      children: [
        {
          key: 'system',
          icon: <SettingOutlined />,
          label: 'Sistem Ayarları',
          children: [
            { key: '/sistem/siteler', icon: <GlobalOutlined />, label: 'Site Yönetimi' },
            { key: '/sistem/yonlendirme', icon: <LinkOutlined />, label: 'Yönlendirme Listesi' },
            { key: '/sistem/kullanicilar', icon: <TeamOutlined />, label: 'Kullanıcı Yönetimi' }
          ]
        },
      ],
    },
    {
      type: 'group',
      label: 'İÇERİK YÖNETİMİ',
      children: [
        { key: '/kategoriler', icon: <UnorderedListOutlined />, label: 'Kategori Listesi' },
        { key: '/sistem/loglar', icon: <HistoryOutlined />, label: 'İşlem Geçmişi' },
      ],
    },
  ];

  return (
    <Layout style={{ height: '100vh', overflow: 'hidden' }}>
      <Sider
        width={250}
        collapsible
        collapsed={collapsed}
        trigger={null}
        theme={isDarkMode ? 'dark' : 'light'}
        style={{
          borderRight: `1px solid ${token.colorBorderSecondary}`,
          display: 'flex',
          flexDirection: 'column',
          height: '100vh',
          zIndex: 1001
        }}
      >
        <div style={{ height: '64px', minHeight: '64px', display: 'flex', alignItems: 'center', padding: collapsed ? '0 24px' : '0 24px', fontSize: '20px', fontWeight: 'bold', color: token.colorText, overflow: 'hidden', whiteSpace: 'nowrap' }}>
          <Space>
            <MiniCatLogoVector color={token.colorText} />
            {!collapsed && <span>madebycat</span>}
          </Space>
        </div>

        {!collapsed && (
          <div style={{ padding: '16px 24px', fontSize: '12px', fontWeight: '600', color: token.colorTextDescription }}>
            İŞLEMLER
          </div>
        )}
        {collapsed && <div style={{ height: '16px' }} />}

        <div style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden' }}>
          <Menu
            mode="inline"
            theme={isDarkMode ? 'dark' : 'light'}
            defaultSelectedKeys={['/']}
            items={menuItems}
            onClick={(e) => navigate(e.key)}
            style={{ borderRight: 0 }}
            inlineIndent={12}
          />
        </div>

        <div style={{
          padding: collapsed ? '16px 8px' : '16px 24px',
          borderTop: `1px solid ${token.colorBorderSecondary}`,
          backgroundColor: token.colorFillAlter,
          display: 'flex',
          alignItems: 'center',
          justifyContent: collapsed ? 'center' : 'space-between',
          margin: collapsed ? '16px 8px' : '16px',
          borderRadius: '8px'
        }}
        >
          {collapsed ? (
            <Avatar icon={<UserOutlined />} style={{ cursor: 'pointer' }} onClick={() => navigate('/login')} />
          ) : (
            <>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', overflow: 'hidden' }}>
                <Avatar icon={<UserOutlined />} />
                <div style={{ fontSize: '12px', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                  <div style={{ fontWeight: '600', color: token.colorText }}>mbc@madeby...</div>
                  <div style={{ color: token.colorTextDescription }}>Yönetici</div>
                </div>
              </div>
              <PoweroffOutlined style={{ cursor: 'pointer', color: token.colorTextDescription, marginLeft: '8px' }} onClick={() => navigate('/login')} />
            </>
          )}
        </div>
      </Sider>

      <Layout style={{ backgroundColor: token.colorBgLayout, height: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Header style={{ background: token.colorBgContainer, padding: '0 24px', borderBottom: `1px solid ${token.colorBorderSecondary}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '64px', minHeight: '64px' }}>
          <Space size="large">
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{ color: token.colorText, fontSize: '16px' }}
            />
            <Dropdown menu={{ items: [{ key: '1', label: 'Site Seç' }] }}>
              <a onClick={(e) => e.preventDefault()} style={{ color: token.colorText }}>
                Siteler <DownOutlined style={{ fontSize: '10px' }} />
              </a>
            </Dropdown>
            <Button type="default" style={{ color: token.colorPrimary, borderColor: token.colorPrimary }}>Cache Tazele</Button>
          </Space>

          <Space size="large" style={{ fontSize: '18px', color: token.colorText }}>
            <QuestionCircleOutlined style={{ cursor: 'pointer' }} />
            {isDarkMode ? (
              <SunOutlined style={{ cursor: 'pointer' }} onClick={toggleTheme} />
            ) : (
              <MoonOutlined style={{ cursor: 'pointer' }} onClick={toggleTheme} />
            )}
            <Avatar icon={<UserOutlined />} style={{ cursor: 'pointer' }} />
          </Space>
        </Header>
        <Content style={{ flex: 1, padding: '24px', overflowY: 'auto', backgroundColor: token.colorBgLayout }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;
