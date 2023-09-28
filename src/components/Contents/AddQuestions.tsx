import React, { useState } from "react";
import { Form, Input, Select, Checkbox, Button, Alert } from "antd";
import {
  UnorderedListOutlined,
  PlusOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

const { Option } = Select;
const { TextArea } = Input;

// Define interfaces for Category and AlertState
interface Category {
  category: string;
  questions: any[];
  setQuestions: React.Dispatch<React.SetStateAction<any[]>>;
}

interface AlertState {
  visibility: boolean;
  type: string | null;
  message: string | null;
}

const AddQuestions: React.FC<Category> = ({
  category,
  questions,
  setQuestions,
}) => {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [choiceInputs, setChoiceInputs] = useState<string[]>([""]);
  const [enableOptions, setEnableOptions] = useState<boolean>(false);
  const [showQuestionsTab, setShowQuestionsTab] = useState<boolean>(false);
  const [alert, setAlert] = useState<AlertState>({
    visibility: false,
    type: null,
    message: null,
  });

  // Handle saving a question
  const handleSaveQuestion = (values: any) => {
    if (selectedType === "multiple") {
      // Create a new question object for multiple choice
      const newQuestion = {
        id: Date.now(),
        category,
        type: values.type,
        question: values.question,
        choiceInputs,
        maxChoice: values.maxChoice,
        enableOptions: values.enableOptions,
      };
      handleLocalStorageSetUp(newQuestion);
    } else if (selectedType === "video") {
      // Create a new question object for video
      const newQuestion = {
        id: Date.now(),
        category,
        type: values.type,
        question: values.question,
        maxDuration: values.maxDuration,
        videoLength: values.videoLength,
        description: values.description,
      };
      handleLocalStorageSetUp(newQuestion);
    } else {
      // Create a new question object for other types
      const newQuestion = {
        id: Date.now(),
        category,
        type: values.type,
        question: values.question,
      };
      handleLocalStorageSetUp(newQuestion);
    }
  };

  // Handle setting up local storage and updating state
  const handleLocalStorageSetUp = (newQuestion: object) => {
    const updatedQuestions = [...questions, newQuestion];
    setQuestions(updatedQuestions);

    localStorage.setItem("questions", JSON.stringify(updatedQuestions));
    setAlert({
      visibility: true,
      type: "success",
      message: "Question added successfully",
    });
    setShowQuestionsTab(false);
    setSelectedType(null);
  };

  // Handle question type change
  const handleTypeChange = (value: string | null) => {
    setSelectedType(value);
  };

  // Show the add question tab
  const handleShowAddQuestion = () => {
    setShowQuestionsTab(true);
  };

  // Hide the add question tab
  const handleHideAddQuestion = () => {
    setShowQuestionsTab(false);
    setSelectedType(null);
  };

  // Add a choice input
  const addChoiceInput = () => {
    if (choiceInputs.length < 5) {
      setChoiceInputs([...choiceInputs, ""]);
    }
  };

  // Remove a choice input
  const removeChoiceInput = (index: number) => {
    const updatedInputs = [...choiceInputs];
    updatedInputs.splice(index, 1);
    setChoiceInputs(updatedInputs);
  };

  // Handle choice input change
  const handleChoiceInputChange = (value: string, index: number) => {
    const updatedInputs = [...choiceInputs];
    updatedInputs[index] = value;
    setChoiceInputs(updatedInputs);
  };

  // Render multiple choice input fields
  const renderMultipleChoice = () => {
    if (selectedType === "multiple") {
      return (
        <>
          <div>
            <span className="font-bold text-md ml-6">Choice</span>
            {choiceInputs.map((choice, index) => (
              <Form.Item
                name="choiceInputs"
                rules={[
                  { required: true, message: "Please input question choice" },
                ]}
                key={index}
              >
                <div className="flex justify-around space-x-2 mb-2">
                  <UnorderedListOutlined className="cursor-pointer" />
                  <Input
                    placeholder="Enter Choice"
                    className="input-styled-filled w-full"
                    value={choice}
                    onChange={(e) =>
                      handleChoiceInputChange(e.target.value, index)
                    }
                  />
                  {index === choiceInputs.length - 1 && (
                    <PlusOutlined
                      className="cursor-pointer hover:text-blue-600"
                      onClick={addChoiceInput}
                    />
                  )}
                  {index !== choiceInputs.length - 1 && (
                    <DeleteOutlined
                      className="cursor-pointer hover:text-red-600"
                      onClick={() => removeChoiceInput(index)}
                    />
                  )}
                </div>
              </Form.Item>
            ))}
          </div>
          <div className="flex">
            <Form.Item name="enableOptions" valuePropName="checked">
              <Checkbox
                className="font-semibold text-gray-700"
                onChange={() => setEnableOptions(!enableOptions)}
              ></Checkbox>
            </Form.Item>
            <span className="text-[12px] mt-1.5 mx-2">
              {" "}
              Enable "other" option
            </span>
          </div>
          {enableOptions && (
            <div>
              <span className="font-bold text-md">Max Choice Allowed</span>
              <Form.Item
                name="maxChoice"
                rules={[
                  {
                    required: true,
                    message: "Please input the number of choices allowed",
                  },
                ]}
              >
                <Input
                  placeholder="Enter Number of Choice Allowed Here"
                  className="input-styled-filled w-full special-input"
                />
              </Form.Item>
            </div>
          )}
        </>
      );
    }
    return null;
  };

  // Render video questions input fields
  const renderVideoQuestions = () => {
    if (selectedType === "video") {
      return (
        <div>
          <Form.Item name="description">
            <TextArea
              rows={4}
              placeholder="Enter your Description here..."
              className="special-input2"
            />
          </Form.Item>
          <div className="flex items-center w-full  space-x-2">
            <Form.Item
              name="maxDuration"
              className="w-full"
              rules={[
                {
                  required: true,
                  message: "Please input max duration of video",
                },
              ]}
            >
              <Input
                placeholder="Enter max duration of video"
                className="special-input2 py-2.5"
              />
            </Form.Item>
            <Form.Item name="videoLength" rules={[{ required: true }]}>
              <Select
                placeholder="In min/sec"
                allowClear
                className="h-11 select-styled"
              >
                <Option value="secs">Seconds</Option>
                <Option value="mins">Minutes</Option>
              </Select>
            </Form.Item>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="mt-5">
      {alert.visibility === true && alert.type === "success" && (
        <Alert message={alert.message} type="success" showIcon closable />
      )}

      {showQuestionsTab && (
        <Form
          name="basic"
          style={{ width: "100%" }}
          initialValues={{ remember: true }}
          autoComplete="off"
          onFinish={handleSaveQuestion}
        >
          <div>
            <span className="font-bold text-md">Type</span>
            <Form.Item
              name="type"
              rules={[
                { required: true, message: "Please select question type" },
              ]}
            >
              <Select
                placeholder="Type"
                allowClear
                className="h-11 select-styled"
                onChange={handleTypeChange}
              >
                <Option value="paragraph">Paragraph</Option>
                <Option value="short">Short Answer</Option>
                <Option value="yes/no">Yes/No</Option>
                <Option value="dropdown">Drop Down</Option>
                <Option value="multiple">Multiple Choice</Option>
                <Option value="video">Video Question</Option>
                <Option value="date">Date</Option>
                <Option value="number">Number</Option>
                <Option value="file">File Upload</Option>
              </Select>
            </Form.Item>
          </div>

          <div>
            <span className="font-bold text-md">Question</span>
            <Form.Item
              name="question"
              rules={[
                { required: true, message: "Please input your question" },
              ]}
            >
              <Input
                placeholder="Enter Question"
                className="input-styled-filled w-full"
              />
            </Form.Item>
          </div>

          <div className="space-y-2">{renderMultipleChoice()}</div>
          <div>{renderVideoQuestions()}</div>

          <div className="flex justify-between items-center mt-5">
            <div
              className="flex items-center space-x-1 cursor-pointer text-red-600 hover:text-red-300"
              onClick={handleHideAddQuestion}
            >
              <DeleteOutlined />
              <span className="text-[11px]">delete question</span>
            </div>

            <Button
              size="small"
              type="text"
              htmlType="submit"
              className="bg-[#00635b] grid items-center text-white font-semibold hover:bg-teal-900 hover:text-white"
            >
              <span className="text-[12px]">Save</span>
            </Button>
          </div>
        </Form>
      )}

      <div
        className="flex items-center space-x-2 mt-8 hover:cursor-pointer hover:text-blue-700"
        onClick={handleShowAddQuestion}
      >
        <PlusOutlined className="font-bold text-md" />{" "}
        <span className="font-bold text-sm">Add a question</span>
      </div>
    </div>
  );
};

export default AddQuestions;
