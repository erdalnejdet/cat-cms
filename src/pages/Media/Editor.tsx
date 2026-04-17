import React, { useState, useEffect } from 'react';
import { Breadcrumb, Card, Space, Typography, theme, Tree, Layout, Button, Dropdown, message, Tooltip, Tag, Badge, Modal, Input } from 'antd';
import type { MenuProps } from 'antd';
import {
  CodeOutlined, FolderOutlined, FolderOpenOutlined,
  MoreOutlined, PlusOutlined, DeleteOutlined,
  SaveOutlined, CheckCircleOutlined,
  EyeOutlined, UndoOutlined, FileAddOutlined
} from '@ant-design/icons';
import type { DirectoryTreeProps } from 'antd/es/tree';

const { Title, Text } = Typography;
const { useToken } = theme;
const { Sider, Content } = Layout;
const { DirectoryTree } = Tree;

interface FileItem {
  title: string;
  key: string;
  isLeaf?: boolean;
  children?: FileItem[];
  content?: string;
}

const initialData: FileItem[] = [
  {
    title: 'Kök Dizin',
    key: 'root',
    children: [
      {
        title: 'Category',
        key: 'cat',
        children: [
          { title: 'List.cshtml', key: 'cat-list', isLeaf: true, content: '<div>\n  <h2>Kategori Listesi</h2>\n  <ul>\n    <li>Elektronik</li>\n    <li>Moda</li>\n  </ul>\n</div>' }
        ]
      },
      {
        title: 'Content',
        key: 'content',
        children: [
          {
            title: '.cshtml',
            key: 'c-main',
            isLeaf: true,
            content: '<div class="content-wrapper">\n  <h1>Ana İçerik Alanı</h1>\n  <p>Buraya sayfa içeriği gelecek.</p>\n</div>'
          },
          {
            title: 'campaign.detail.cshtml',
            key: 'c-camp',
            isLeaf: true,
            content: '<!-- Kampanya Detay -->\n<div class="campaign-box" style="padding: 20px; border: 1px solid #ddd; border-radius: 8px;">\n  <h3 style="color: #8b5cf6;">Bahar Kampanyası</h3>\n  <p>Tüm ürünlerde %20 indirim fırsatını kaçırmayın!</p>\n  <button style="background: #8b5cf6; color: white; padding: 10px 20px; border: none; border-radius: 4px;">Şimdi İncele</button>\n</div>'
          },
          {
            title: 'kvkk.detail.cshtml',
            key: 'c-kvkk',
            isLeaf: true,
            content: '<div class="kvkk-text">\n  <h2>KVKK Aydınlatma Metni</h2>\n  <article>\n    6698 sayılı Kişisel Verilerin Korunması Kanunu uyarınca...\n  </article>\n</div>'
          },
        ],
      },
      {
        title: 'Shared',
        key: 'shared',
        children: [
          {
            title: 'Components',
            key: 's-comp',
            children: [
              { title: 'Header.cshtml', key: 's-h', isLeaf: true, content: '<header style="padding: 10px; border-bottom: 1px solid #eee;">Logo ve Menü</header>' },
              { title: 'Footer.cshtml', key: 's-f', isLeaf: true, content: '<footer style="padding: 20px; text-align: center;">© 2024 CMS</footer>' },
            ],
          },
          { title: '_Layout.cshtml', key: 's-layout', isLeaf: true, content: '<!DOCTYPE html>\n<html>\n<head>\n  <title>CMS Layout</title>\n</head>\n<body>\n  <div id="app">@RenderBody()</div>\n</body>\n</html>' },
        ],
      },
    ],
  },
];

const PageEditor: React.FC = () => {
  const { token } = useToken();
  const [treeData, setTreeData] = useState<FileItem[]>(initialData);
  const [selectedFile, setSelectedFile] = useState<FileItem | null>(null);
  const [code, setCode] = useState<string>('<!-- Bir dosya seçin... -->');
  const [history, setHistory] = useState<string[]>([]);
  const [lineCount, setLineCount] = useState<number>(1);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newFileName, setNewFileName] = useState('');
  const [targetFolderKey, setTargetFolderKey] = useState<string | null>(null);

  useEffect(() => {
    setLineCount(code.split('\n').length);
  }, [code]);

  const onSelect: DirectoryTreeProps['onSelect'] = (_, info) => {
    const node = info.node as any;
    if (node.isLeaf) {
      setSelectedFile(node);
      setCode(node.content || '');
      setHistory([node.content || '']);
    }
  };

  const handleCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCode(e.target.value);
  };

  const handleUndo = () => {
    if (history.length > 1) {
      const prev = history[history.length - 2];
      setHistory(history.slice(0, -1));
      setCode(prev);
      message.info('Değişiklik geri alındı');
    } else {
      message.warning('Geri alınacak başka değişiklik yok');
    }
  };

  const handleUpdate = () => {
    if (!selectedFile) return;

    // Log the data being "sent" to the server
    console.log('🚀 API\'ye Gönderilen Veri:', {
      fileKey: selectedFile.key,
      fileName: selectedFile.title,
      updatedContent: code,
      timestamp: new Date().toISOString()
    });

    setHistory([...history, code]);

    // Update the content in treeData (Mock)
    const updateContent = (data: FileItem[]): FileItem[] => {
      return data.map(item => {
        if (item.key === selectedFile.key) {
          return { ...item, content: code };
        }
        if (item.children) {
          return { ...item, children: updateContent(item.children) };
        }
        return item;
      });
    };
    setTreeData(updateContent(treeData));
    message.success('Dosya başarıyla güncellendi ve kaydedildi!');
  };

  const handleAddFile = () => {
    if (!newFileName) {
      message.error('Lütfen bir dosya adı girin');
      return;
    }

    const newFile: FileItem = {
      title: newFileName.endsWith('.cshtml') ? newFileName : `${newFileName}.cshtml`,
      key: `new-file-${Date.now()}`,
      isLeaf: true,
      content: '<div>\n  <!-- Yeni Oluşturulan Dosya -->\n</div>'
    };

    const addToTree = (data: FileItem[]): FileItem[] => {
      return data.map(item => {
        if (item.key === (targetFolderKey || 'root')) {
          return { ...item, children: [...(item.children || []), newFile] };
        }
        if (item.children) {
          return { ...item, children: addToTree(item.children) };
        }
        return item;
      });
    };

    setTreeData(addToTree(treeData));
    setIsAddModalOpen(false);
    setNewFileName('');
    message.success('Yeni dosya oluşturuldu');

    // Auto-select the new file
    setSelectedFile(newFile);
    setCode(newFile.content!);
    setHistory([newFile.content!]);
  };

  const getFolderMenu = (key: string, isLeaf?: boolean): MenuProps => ({
    items: [
      { key: 'add-file', label: 'Dosya Ekle', icon: <FileAddOutlined />, disabled: isLeaf },
      { key: 'add-folder', label: 'Klasör Ekle', icon: <FolderOutlined />, disabled: isLeaf },
      { key: 'delete', label: 'Sil', icon: <DeleteOutlined />, danger: true },
    ],
    onClick: (e) => {
      if (e.key === 'add-file') {
        setTargetFolderKey(key);
        setIsAddModalOpen(true);
      } else {
        message.info(`${e.key} işlemi tetiklendi (Mock)`);
      }
    }
  });

  const titleRender = (node: any) => {
    return (
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
        <Space size={4}>
          {node.isLeaf ? <CodeOutlined style={{ color: '#8b5cf6' }} /> : null}
          <span style={{ fontSize: '13px' }}>{node.title}</span>
        </Space>
        <Dropdown menu={getFolderMenu(node.key, node.isLeaf)} trigger={['click']}>
          <Button type="text" size="small" icon={<MoreOutlined style={{ fontSize: '12px' }} />} onClick={(e) => e.stopPropagation()} />
        </Dropdown>
      </div>
    );
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', height: '100%', paddingBottom: '24px' }}>

      <Card
        className="global-card-gradient"
        styles={{ body: { padding: '16px 24px' } }}
        style={{
          borderRadius: '16px',
          border: `1px solid ${token.colorBorderSecondary}`,
          boxShadow: '0 4px 12px -2px rgba(0,0,0,0.03)'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <Title level={4} style={{ margin: '0 0 2px 0' }}>Sayfa Editörü</Title>
            <Breadcrumb
              separator=">"
              items={[{ title: 'Anasayfa' }, { title: 'Dosya Yönetimi' }, { title: 'Sayfa Editörü' }]}
              style={{ fontSize: '12px' }}
            />
          </div>
          <Space>
            <Button type="default" icon={<UndoOutlined />} onClick={handleUndo} disabled={history.length <= 1}>Geri Al</Button>
            <Button type="default" icon={<EyeOutlined />} onClick={() => setIsPreviewOpen(true)}>Önizleme</Button>
          </Space>
        </div>
      </Card>

      <Layout style={{ background: 'transparent', flex: 1, minHeight: 0 }}>
        <Sider
          width={320}
          theme="light"
          style={{
            borderRadius: '16px',
            border: `1px solid ${token.colorBorderSecondary}`,
            overflow: 'hidden',
            marginRight: '20px',
            background: token.colorBgContainer,
            boxShadow: '0 4px 12px -2px rgba(0,0,0,0.02)'
          }}
          className="editor-sider"
        >
          <div style={{ padding: '14px 20px', borderBottom: `1px solid ${token.colorBorderSecondary}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Space>
              <FolderOpenOutlined style={{ color: token.colorPrimary }} />
              <Text strong style={{ fontSize: '14px' }}>PROJE DOSYALARI</Text>
            </Space>
            <Tooltip title="Kök Dizine Dosya Ekle">
              <Button type="text" size="small" icon={<PlusOutlined />} style={{ color: token.colorTextSecondary }} onClick={() => { setTargetFolderKey('root'); setIsAddModalOpen(true); }} />
            </Tooltip>
          </div>
          <div style={{ padding: '8px', overflowY: 'auto', height: 'calc(100% - 48px)' }}>
            <DirectoryTree
              multiple
              onSelect={onSelect}
              treeData={treeData}
              titleRender={titleRender}
              blockNode
              style={{ background: 'transparent' }}
            />
          </div>
        </Sider>

        <Content
          style={{
            borderRadius: '16px',
            border: `1px solid ${token.colorBorderSecondary}`,
            background: '#141414',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            boxShadow: '0 8px 30px rgba(0,0,0,0.1)'
          }}
        >
          {/* Editor Header */}
          <div style={{
            padding: '0 20px',
            background: '#1e1e1e',
            borderBottom: '1px solid #333',
            height: '40px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <Space size="middle">
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                background: '#141414',
                padding: '0 16px',
                height: '40px',
                borderTop: `2px solid ${token.colorPrimary}`,
                color: '#fff'
              }}>
                <CodeOutlined style={{ color: '#007acc' }} />
                <Text style={{ color: '#fff', fontSize: '13px' }}>{selectedFile?.title || 'Seçili Dosya Yok'}</Text>
              </div>
              {selectedFile && <Tag color="green" style={{ fontSize: '10px' }}>Kaydedildi</Tag>}
            </Space>
            <Badge status="processing" text={<Text style={{ color: '#888', fontSize: '11px' }}>UTF-8</Text>} />
          </div>

          <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
            <div style={{
              width: '45px',
              background: '#1e1e1e',
              color: '#858585',
              padding: '24px 0',
              textAlign: 'right',
              paddingRight: '12px',
              fontFamily: '"Fira Code", "Cascadia Code", Consolas, monospace',
              fontSize: '13px',
              userSelect: 'none',
              borderRight: '1px solid #333'
            }}>
              {Array.from({ length: Math.max(lineCount, 25) }).map((_, i) => (
                <div key={i} style={{ height: '22px' }}>{i + 1}</div>
              ))}
            </div>

            <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
              <textarea
                value={code}
                onChange={handleCodeChange}
                style={{
                  width: '100%',
                  height: '100%',
                  background: 'transparent',
                  color: '#d4d4d4',
                  border: 'none',
                  padding: '24px',
                  fontFamily: '"Fira Code", "Cascadia Code", Consolas, monospace',
                  fontSize: '14px',
                  lineHeight: '22px',
                  outline: 'none',
                  resize: 'none',
                  tabSize: 4,
                  whiteSpace: 'pre',
                  overflowY: 'auto'
                }}
                className="custom-editor-scrollbar"
                spellCheck={false}
              />
            </div>
          </div>

          <div style={{
            padding: '0 20px',
            background: '#007acc',
            height: '24px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <Space size="large">
              <Text style={{ color: '#fff', fontSize: '11px' }}>
                <CheckCircleOutlined style={{ marginRight: '5px' }} />
                Dizayn Modu
              </Text>
            </Space>
            <Space size="large">
              <Text style={{ color: '#fff', fontSize: '11px' }}>Satır {code.split('\n').length}, Karakter {code.length}</Text>
              <Text style={{ color: '#fff', fontSize: '11px' }}>Tab: 4</Text>
              <Text style={{ color: '#fff', fontSize: '11px' }}>CSHTML</Text>
            </Space>
          </div>
        </Content>
      </Layout>

      {/* UPDATE BUTTON FOOTER */}
      <div style={{
        marginTop: 'auto',
        width: '100%',
        display: 'flex',
        justifyContent: 'flex-end',
        paddingTop: '20px'
      }}>
        <Button
          type="primary"
          size="large"
          icon={<SaveOutlined />}
          style={{
            background: '#10b981',
            borderColor: '#10b981',
            borderRadius: '8px',
            height: '48px',
            padding: '0 40px',
            fontWeight: 600,
            boxShadow: '0 4px 14px 0 rgba(16, 185, 129, 0.39)'
          }}
          onClick={handleUpdate}
          disabled={!selectedFile}
        >
          Güncelle
        </Button>
      </div>

      {/* NEW FILE MODAL */}
      <Modal
        title="Yeni Dosya Ekle"
        open={isAddModalOpen}
        onOk={handleAddFile}
        onCancel={() => setIsAddModalOpen(false)}
        okText="Oluştur"
        cancelText="İptal"
      >
        <div style={{ padding: '10px 0' }}>
          <Text type="secondary" style={{ marginBottom: '8px', display: 'block' }}>Dosya Adı (Örn: index.cshtml)</Text>
          <Input
            placeholder="dosya-adi.cshtml"
            value={newFileName}
            onChange={(e) => setNewFileName(e.target.value)}
            autoFocus
            onPressEnter={handleAddFile}
          />
        </div>
      </Modal>

      {/* PREVIEW MODAL */}
      <Modal
        title={
          <Space>
            <EyeOutlined />
            <span>Önizleme: {selectedFile?.title}</span>
          </Space>
        }
        open={isPreviewOpen}
        onCancel={() => setIsPreviewOpen(false)}
        footer={null}
        width={1000}
        bodyStyle={{ height: '600px', overflow: 'auto', padding: '24px', background: '#f8fafc' }}
      >
        <div
          style={{ border: '1px solid #e2e8f0', background: 'white', padding: '24px', borderRadius: '8px', boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)' }}
          dangerouslySetInnerHTML={{ __html: code }}
        />
      </Modal>

      <style>{`
        .editor-sider .ant-tree-node-content-wrapper {
            width: 100%;
            height: 32px !important;
            display: flex !important;
            align-items: center !important;
        }
        .editor-sider .ant-tree-treenode {
            width: 100%;
            padding: 2px 0 !important;
        }
        .editor-sider .ant-tree-treenode-selected {
            background-color: rgba(139, 92, 246, 0.1) !important;
            border-right: 3px solid #8b5cf6;
        }
        .custom-editor-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-editor-scrollbar::-webkit-scrollbar-track {
          background: #1e1e1e;
        }
        .custom-editor-scrollbar::-webkit-scrollbar-thumb {
          background: #333;
          border-radius: 4px;
        }
      `}</style>
    </div>
  );
};

export default PageEditor;
