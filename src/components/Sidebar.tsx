import { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  HomeOutlined,
  SettingOutlined,
  OrderedListOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, theme } from "antd";
const { Sider } = Layout;

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed, setCollapsed }) => {
  return (
    <Sider trigger={null} collapsible collapsed={collapsed}>
      <div className="demo-logo-vertical" />
      <Menu
        theme="light"
        mode="inline"
        className="h-screen"
        defaultSelectedKeys={["2"]}
      >
        <Menu.Item
          key="1"
          icon={
            collapsed ? (
              <MenuUnfoldOutlined onClick={() => setCollapsed(!collapsed)} />
            ) : (
              <MenuFoldOutlined onClick={() => setCollapsed(!collapsed)} />
            )
          }
          style={{ marginBottom: 25 }} // Apply a custom CSS class
        ></Menu.Item>
        <Menu.Item key="2" icon={<HomeOutlined />}>
          Home
        </Menu.Item>
        <Menu.Item key="3" icon={<UserOutlined />}>
          Profile
        </Menu.Item>
        <Menu.Item key="4" icon={<OrderedListOutlined />}>
          Catalogs
        </Menu.Item>
        <Menu.Item key="5" icon={<SettingOutlined />}>
          Settings
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default Sidebar;
