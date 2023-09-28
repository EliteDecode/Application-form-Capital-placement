import React from "react";
import { Tabs, Layout } from "antd";
import { Collapse, Space } from "antd";
import ImageCover from "./ImageCover";
import PersonalInfo from "./PersonalInfo";
import Profile from "./Profile";
import AdditionalQuestions from "./AdditionalQuestions";

const { Content } = Layout;
const { TabPane } = Tabs;

const ContentBox = () => {
  const customTabBarStyle = {
    width: 0,
    height: 0,
    borderTop: "25px solid transparent",
    borderLeft: "50px solid #555",
    borderBottom: "25px solid transparent",
  };

  return (
    <Content
      style={{
        margin: "0px 25px",
        padding: "10px 2px",
        minHeight: 280,
        background: "#fff",
      }}
    >
      <Tabs defaultActiveKey="2">
        <TabPane tab="Program Details" key="1">
          Program Details
        </TabPane>
        <TabPane tab="Application Form" key="2">
          <Space
            direction="vertical"
            className="fixed-width-collapse space-y-8"
          >
            <Collapse
              collapsible="header"
              defaultActiveKey={["1"]}
              items={[
                {
                  key: "1",
                  label: "Upload Cover Image",
                  children: <ImageCover />,
                },
              ]}
            />
            <Collapse
              defaultActiveKey={["1"]}
              items={[
                {
                  key: "1",
                  label: "Personal Information",
                  children: <PersonalInfo />,
                },
              ]}
            />
            <Collapse
              defaultActiveKey={["1"]}
              items={[
                {
                  key: "1",
                  label: "Profile",
                  children: <Profile />,
                },
              ]}
            />
            <Collapse
              defaultActiveKey={["1"]}
              items={[
                {
                  key: "1",
                  label: "Additional Questions",
                  children: <AdditionalQuestions />,
                },
              ]}
            />
          </Space>
        </TabPane>
        <TabPane tab="Work Flow" key="3">
          Work Flow
        </TabPane>
        <TabPane tab="Preview" key="4">
          Preview
        </TabPane>
      </Tabs>
    </Content>
  );
};

export default ContentBox;
