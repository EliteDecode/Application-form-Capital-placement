import { useEffect, useState } from "react";
import { Checkbox, Switch, Form, Input } from "antd";
import { EditFilled } from "@ant-design/icons";
import AddQuestions from "./AddQuestions";
import EditQuestions from "./EditQuestions";

// Define the success and failure handlers for form submission
const onFinish = (values: any) => {
  console.log("Success:", values);
};

const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};

// Define the field details for the form
type FieldType = {
  firstname?: string;
  lastname?: string;
  email?: string;
};

const FieldDetails = [
  {
    Label: "Education",
  },
  {
    Label: "Experience",
  },
  {
    Label: "Resume",
  },
];

const Profile: React.FC = () => {
  // State for controlling the visibility of text fields
  const [toggleTextArray, setToggleTextArray] = useState(
    Array(FieldDetails.length).fill(false)
  );

  // State for managing questions retrieved from localStorage
  const [questions, setQuestions] = useState<any[]>([]);

  // Function to handle the edit button click
  const handleEditClick = (index: any) => {
    const updatedEditStates = [...editStates];
    updatedEditStates[index] = !updatedEditStates[index];
    setEditStates(updatedEditStates);
  };

  // Function to fetch questions from localStorage
  const fetchQuestionsFromLocalStorage = () => {
    const storedQuestions = localStorage.getItem("questions");
    if (storedQuestions) {
      setQuestions(JSON.parse(storedQuestions));
    }
  };

  useEffect(() => {
    fetchQuestionsFromLocalStorage();
  }, []);

  // Filter questions related to "profile" category
  const customQuestions = questions.filter(
    (question) => question.category === "profile"
  );

  // State for managing the edit mode of questions
  const [editStates, setEditStates] = useState(
    Array(customQuestions.length).fill(false)
  );

  // Function to handle toggle switch for text fields
  const handleToggleText = (index: number) => {
    const newArray = [...toggleTextArray];
    newArray[index] = !newArray[index];
    setToggleTextArray(newArray);
  };

  return (
    <>
      <Form
        name="basic"
        style={{ width: "100%" }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        {/* Loop through FieldDetails to create additional text fields */}
        {FieldDetails.map((fieldDetail, index) => (
          <div
            className="flex border-b border-gray-300 justify-between mt-5"
            key={index}
          >
            <Form.Item<FieldType>
              label=""
              name="email"
              className=" w-[50%]"
              rules={[
                {
                  required: true,
                  message: `Please input your ${fieldDetail.Label}`,
                },
              ]}
            >
              <Input
                placeholder={fieldDetail.Label}
                className="input-styled2 border-none"
              />
            </Form.Item>
            <div className="flex justify-around items-center space-x-2">
              {/* Checkbox and switch for each text field */}
              <Form.Item name={`checkbox${index}`}>
                <Checkbox value="A">Mandatory</Checkbox>
              </Form.Item>
              <Form.Item
                name={`switch${index}`}
                labelAlign="left"
                valuePropName="checked"
                className="flex items-center space-x-4"
              >
                <Switch size="small" onChange={() => handleToggleText(index)} />
                <span className="text-sm mx-2 mt-1">
                  {toggleTextArray[index] ? "Hide" : "Show"}
                </span>
              </Form.Item>
            </div>
          </div>
        ))}
      </Form>

      {/* Display custom questions and allow editing */}
      <div className="mt-5">
        {customQuestions.map((question, index) => (
          <div className="mb-4 border-b pb-3 border-gray-200" key={index}>
            <div className="">
              {editStates[index] ? (
                <EditQuestions
                  question={question}
                  questions={questions}
                  setQuestions={setQuestions}
                  onClose={() => handleEditClick(index)}
                />
              ) : (
                <>
                  <div className="flex  justify-between items-center">
                    <div className=" w-[90%]">
                      <h3 className="text-[14px] mb-1 text-gray-700 capitalize">
                        {question.type} Question
                      </h3>
                      <h4 className="text-[14px] font-bold w-[85%]">
                        {question.question}
                      </h4>
                    </div>
                    <EditFilled
                      className="font-bold text-[18px] -mt-2 border text-black cursor-pointer bg-[#d0f7fa] border-blue-200 h-0 px-1 py-3 rounded-md"
                      onClick={() => handleEditClick(index)} // Toggle edit state
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Component for adding new questions */}
      <div className="">
        <AddQuestions
          category="profile"
          questions={questions}
          setQuestions={setQuestions}
        />
      </div>
    </>
  );
};

export default Profile;
