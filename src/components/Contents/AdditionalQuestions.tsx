import React, { useEffect, useState } from "react";
import { EditFilled } from "@ant-design/icons";
import AddQuestions from "./AddQuestions";
import EditQuestions from "./EditQuestions";

const AdditionalQuestions: React.FC = () => {
  // Define state for questions and edit states
  const [questions, setQuestions] = useState<any[]>([
    {
      id: Date.now() + 1,
      category: "additional_questions",
      type: "paragraph",
      question: "Please tell us about yourself?",
    },
    {
      id: Date.now() + 2,
      category: "additional_questions",
      type: "paragraph",
      question: "Where are you from?",
    },
  ]);

  // Handle click on edit button for a question
  const handleEditClick = (index: number) => {
    const updatedEditStates = [...editStates];
    updatedEditStates[index] = !updatedEditStates[index];
    setEditStates(updatedEditStates);
  };

  // Fetch questions from local storage on component mount
  const fetchQuestionsFromLocalStorage = () => {
    const storedQuestions = localStorage.getItem("questions");
    if (storedQuestions) {
      setQuestions(JSON.parse(storedQuestions));
    }
  };

  // Call fetchQuestionsFromLocalStorage on component mount
  useEffect(() => {
    fetchQuestionsFromLocalStorage();
  }, []);

  // Filter questions based on category
  const customQuestions = questions.filter(
    (question) => question.category === "additional_questions"
  );

  // Initialize edit states for questions
  const [editStates, setEditStates] = useState<boolean[]>(
    Array(customQuestions.length).fill(false)
  );

  return (
    <>
      <div className="border-b p-3">
        {customQuestions.map((question, index) => (
          <div className="mb-4 border-b pb-3 border-gray-200" key={index}>
            <div className="">
              {editStates[index] ? (
                // Render EditQuestions component when in edit state
                <EditQuestions
                  question={question}
                  questions={questions}
                  setQuestions={setQuestions}
                  onClose={() => handleEditClick(index)}
                />
              ) : (
                <>
                  <div className="flex  justify-between items-center">
                    <div className="w-[90%]">
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
        {/* Render AddQuestions component */}
        <AddQuestions
          category="additional_questions"
          questions={questions}
          setQuestions={setQuestions}
        />
      </div>
    </>
  );
};

export default AdditionalQuestions;
