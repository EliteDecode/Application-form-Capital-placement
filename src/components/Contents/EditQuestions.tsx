import React, { useState, useRef, useEffect } from "react";
import { Form, Input, Select, Checkbox, Button, Alert, message } from "antd";
import {
  UnorderedListOutlined,
  PlusOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

const { Option } = Select;
const { TextArea } = Input;

interface Category {
  question: any;
  questions: any[];
  setQuestions: React.Dispatch<React.SetStateAction<any[]>>;
  onClose?: () => void;
}

interface AlertState {
  visibility: boolean;
  type: string | null;
  message: string | null;
}

const EditQuestions: React.FC<Category> = ({
  onClose,
  question,
  questions,
  setQuestions,
}) => {
  const [selectedType, setSelectedType] = useState<string | null>(
    question.type
  );
  const [choiceInputs, setChoiceInputs] = useState<string[]>([""]);
  const [enableOptions, setEnableOptions] = useState<boolean>(false);
  const [alert, setAlert] = useState<AlertState>({
    visibility: false,
    type: null,
    message: null,
  });

  // Handle updating a question
  const handleUpdateQuestion = (values: any) => {
    if (selectedType === "multiple") {
      const newQuestion = {
        type: values.type || question.type,
        question: values.question || question.question,
        choiceInputs,
        maxChoice: values.maxChoice || question.maxChoice,
        enableOptions: values.enableOptions || question.enableOptions,
      };
      handleLocalStorageSetUp(newQuestion);
    } else if (selectedType === "video") {
      const newQuestion = {
        type: values.type || question.type,
        question: values.question || question.question,
        maxDuration: values.maxDuration || question.maxDuration,
        videoLength: values.videoLength || question.videoLength,
        description: values.description || question.description,
      };
      handleLocalStorageSetUp(newQuestion);
    } else {
      const newQuestion = {
        type: values.type || question.type,
        question: values.question || question.question,
      };

      handleLocalStorageSetUp(newQuestion);
    }
  };

  // Handle deleting a question
  const handleDeleteQuestion = () => {
    const updatedQuestions = questions.filter(
      (value) => value.id !== question.id
    );
    localStorage.setItem("questions", JSON.stringify(updatedQuestions));
    setQuestions(updatedQuestions);

    setAlert({
      visibility: true,
      type: "error",
      message: "Question deleted successfully",
    });
  };

  // Handle local storage setup
  const handleLocalStorageSetUp = (newQuestion: object) => {
    const updatedQuestions = questions.map((value) =>
      value.id === question.id ? { ...value, ...newQuestion } : value
    );

    setQuestions(updatedQuestions);

    localStorage.setItem("questions", JSON.stringify(updatedQuestions));

    setAlert({
      visibility: true,
      type: "success",
      message: "Question updated successfully",
    });
  };

  // Handle question type change
  const handleTypeChange = (value: string | null) => {
    setSelectedType(value);
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
    if (question.type === "multiple" || selectedType === "multiple") {
      return (
        <>
          <div>
            <span className="font-bold text-md ml-6">Choice</span>
            <Form.Item name="choiceInputs">
              {question.choiceInputs.map((choice: any, index: any) => (
                <div key={index} className="flex justify-around space-x-2 mb-2">
                  <UnorderedListOutlined className="cursor-pointer" />
                  <Input
                    placeholder="Enter Choice"
                    className="input-styled-filled w-full"
                    defaultValue={choice}
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
              ))}
            </Form.Item>
          </div>
          <div className="flex">
            <Form.Item
              name="enableOptions"
              valuePropName="checked"
              className=""
            >
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
              <Form.Item name="maxChoice">
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
    if (question.type === "video" || selectedType === "video") {
      return (
        <div>
          <Form.Item name="description">
            <TextArea
              rows={4}
              placeholder="Enter your Description here..."
              className="special-input2"
              defaultValue={question.description}
            />
          </Form.Item>
          <div className="flex items-center w-full  space-x-2">
            <Form.Item name="maxDuration" className="w-full">
              <Input
                defaultValue={question.maxDuration}
                placeholder="Enter max duration of video"
                className="special-input2 py-2.5"
              />
            </Form.Item>
            <Form.Item name="videoLength">
              <Select
                placeholder="In min/sec"
                allowClear
                className="h-11 select-styled"
                defaultValue={question.videoLength}
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
    <div className="">
      <div className="my-5">
        {alert.visibility === true && alert.type === "success" && (
          <Alert
            message={alert.message}
            type="success"
            showIcon
            closable
            onClick={
              alert.message === "Question updated successfully"
                ? onClose
                : undefined
            }
          />
        )}
        {alert.visibility === true && alert.type === "error" && (
          <Alert message={alert.message} type="error" showIcon closable />
        )}
      </div>

      <Form
        name="basic"
        style={{ width: "100%" }}
        initialValues={{ remember: true }}
        autoComplete="off"
        onFinish={handleUpdateQuestion}
      >
        <div>
          <span className="font-bold text-md">Type</span>
          <Form.Item name="type">
            <Select
              placeholder="Type"
              allowClear
              className="h-11 select-styled"
              onChange={handleTypeChange}
              defaultValue={question.type}
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
          <Form.Item name="question">
            <Input
              placeholder={question.question}
              className="input-styled-filled w-full"
              defaultValue={question.question}
            />
          </Form.Item>
        </div>

        <div className="space-y-2">{renderMultipleChoice()}</div>
        <div>{renderVideoQuestions()}</div>

        <div className="flex justify-between items-center mt-5">
          <div
            className="flex items-center space-x-1 cursor-pointer text-red-600 hover:text-red-300"
            onClick={handleDeleteQuestion}
          >
            <DeleteOutlined />
            <span className="text-[11px]">delete question</span>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              size="small"
              type="primary"
              onClick={onClose}
              className="bg-blue-600 grid items-center text-white font-semibold hover:bg-teal-900 hover:text-white"
            >
              <span className="text-[12px]">Close</span>
            </Button>
            <Button
              size="small"
              type="text"
              htmlType="submit"
              className="bg-[#00635b] grid items-center text-white font-semibold hover:bg-teal-900 hover:text-white"
            >
              <span className="text-[12px]">Update</span>
            </Button>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default EditQuestions;
