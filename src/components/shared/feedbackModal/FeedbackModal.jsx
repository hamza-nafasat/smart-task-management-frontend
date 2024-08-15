/* eslint-disable react/prop-types */
import { useState } from "react";
import { faceExpressions } from "../../../data/data";
import Button from "../button/Button";

const FeedbackModal = ({ onclose, submitHandler, task }) => {
  const [selectedExpression, setSelectedExpression] = useState(null);

  return (
    <div
      className="fixed inset-0 backdrop-blur-sm drop-shadow-2xl w-full p-4 flex items-center justify-center z-[999] transition-all duration-500"
      onClick={onclose}
    >
      <div
        className="p-4 bg-white rounded-md w-full md:w-[400px] overflow-y-scroll scrollbar-0"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-base font-semibold text-center">Leave a Feedback</h3>
        <div className="my-4 flex items-center justify-between gap-2 px-4">
          {faceExpressions.map((expression, i) => (
            <div className="flex flex-col items-center" key={i}>
              <button
                onClick={() => setSelectedExpression(expression.icon)}
                className="text-[2.5rem] hover:scale-[1.3] transition-all duration-300"
              >
                {expression.icon}
              </button>
              <p className="text-[10px] text-gray-700">{expression.label}</p>
            </div>
          ))}
        </div>
        {selectedExpression && (
          <div className="my-2 text-sm text-gray-600">
            You selected: <span className="text-lg">{selectedExpression}</span>
          </div>
        )}
        <Button onClick={() => submitHandler(task._id, selectedExpression)} text="Submit" height="h-[40px]" />
      </div>
    </div>
  );
};

export default FeedbackModal;
