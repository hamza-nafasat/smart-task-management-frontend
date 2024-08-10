/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import SendIcon from "../../../assets/svgs/tasks/SendIcon";
import { addCommentAction, getSingleTaskAllCommentsAction } from "../../../redux/actions/tasksActions";
import SingleComment from "./SingleComment";
import { clearTaskError, clearTaskMessage } from "../../../redux/slices/tasksSlices";

const Comments = ({ taskId, comments }) => {
  const dispatch = useDispatch();
  const { message, error } = useSelector((state) => state.tasks);
  const [sendCommentLoading, setSendCommentLoading] = useState(false);
  const [commentContent, setCommentContent] = useState("");

  const addNewCommentHandler = async (e) => {
    setSendCommentLoading(true);
    e.preventDefault();
    if (!taskId) {
      setSendCommentLoading(false);
      return toast.error("Task Id is required");
    }
    if (!commentContent) {
      setSendCommentLoading(false);
      return toast.error("You can't send empty Comment");
    }
    await dispatch(addCommentAction(taskId, commentContent));
    await dispatch(getSingleTaskAllCommentsAction(taskId));
    setCommentContent("");
    setSendCommentLoading(false);
  };

  useEffect(() => {
    if (message) {
      toast.success(message);
      dispatch(clearTaskMessage());
    }
    if (error) {
      toast.error(error);
      dispatch(clearTaskError());
    }
  }, [message, error, dispatch]);
  return (
    <div>
      <p className="text-xs md:text-sm text-[#00000080] font-medium">Comments ({comments.length || 0})</p>
      <div className="flex flex-col gap-4 mt-4">
        {comments?.map((comment) => (
          <SingleComment key={comment?._id} comment={comment} />
        ))}
      </div>
      {/* send comment input  */}
      <div className="flex items-center gap-3 mt-3 rounded-[4px] border border-primary p-2 md:py-3 md:px-4">
        <input
          type="text"
          value={commentContent}
          onChange={(e) => setCommentContent(e.target.value)}
          placeholder="Write your comment here"
          className="w-full focus:outline-none bg-transparent text-[11px] md:text-[13px] text-[#33333380]"
        />
        <div
          className={` ${
            sendCommentLoading ? "opacity-50  cursor-not-allowed" : "opacity-100 cursor-pointer"
          } `}
          onClick={addNewCommentHandler}
        >
          <SendIcon />
        </div>
      </div>
    </div>
  );
};

export default Comments;
