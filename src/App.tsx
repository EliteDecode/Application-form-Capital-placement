import { useState } from "react";

import { Layout, theme } from "antd";
import Sidebar from "./components/Sidebar";
import ContentBox from "./components/Contents/ContentBox";

const { Header, Content } = Layout;

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(true);

  return (
    <Layout className="h-screen">
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      <Layout className="fixed-height">
        <Header style={{ padding: 0, background: "#fafafa" }}>
          <div className="text-center">
            <h1 className="font-bold text-[18px]">
              Capital Placement Application Form
            </h1>
          </div>
        </Header>
        <ContentBox />
      </Layout>
    </Layout>
  );
};

export default App;
