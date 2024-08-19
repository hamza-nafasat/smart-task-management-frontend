/* eslint-disable react/prop-types */
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { addCommentReplyAction, getTaskActivitiesAction } from "../../../redux/actions/tasksActions";
import { customAxios } from "../../../utils/customAxios";
import { getTimeAgo } from "../../../utils/formatting";

const SingleComment = ({ comment }) => {
  const dispatch = useDispatch();
  // const { singleCommentReplies } = useSelector((state) => state.tasks);
  const [singleCommentReplies, setSingleCommentReplies] = useState([]);
  const [isReplyViewActive, setIsReplyViewActive] = useState(false);
  const [replyContent, setReplyContent] = useState("");
  const [isReplyLoading, setIsReplyLoading] = useState(false);
  const [isRepliesComingLoading, setIsRepliesComingLoading] = useState(false);

  // function for getting replies for single single comment
  const getCommentReplies = async (commentId) => {
    try {
      const response = await customAxios.get(`/tasks/replies/all/${commentId}`);
      setSingleCommentReplies(response?.data?.data);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Some Error Occurred While Get Comment Replies");
    }
  };

  // toggle view replies
  const handleReplyView = async () => {
    setIsRepliesComingLoading(true);
    try {
      if (!isReplyViewActive) {
        await getCommentReplies(comment?._id);
      }
      setIsReplyViewActive(!isReplyViewActive);
      setIsRepliesComingLoading(false);
    } catch (error) {
      setIsRepliesComingLoading(false);
    }
  };

  // add new comment reply handler
  const addNewReplyHandler = async (e) => {
    setIsReplyLoading(true);
    try {
      e.preventDefault();
      if (!replyContent) {
        setIsReplyLoading(false);
        return toast.error("You can't send empty Reply");
      }
      await dispatch(addCommentReplyAction(comment?._id, replyContent));
      await dispatch(getTaskActivitiesAction(comment?.task?._id));
      await getCommentReplies(comment?._id);
      setReplyContent("");
      setIsReplyLoading(false);
    } catch (error) {
      setIsReplyLoading(false);
    }
  };

  return (
    <div className="p-[10px] bg-[#016a7a0d] rounded-md flex gap-2 transition-all duration-1000">
      <img
        src={comment?.user?.image?.url}
        alt="image"
        className="w-7 h-7 rounded-full object-cover border border-primary"
      />
      <div className="flex flex-col gap-4 w-full">
        <h6 className="text-[10px] md:text-[13px] font-semibold text-[#333333]">{comment?.user?.name}</h6>
        <p className="text-[10px] md:text-[13px] text-[#4f4f4f]">{comment?.content}</p>
        <div className="flex items-center gap-4">
          <p className="text-[10px] md:text-xs text-[#828282]">{getTimeAgo(new Date(comment?.createdAt))}</p>
          <p
            className={`text-[10px] md:text-xs text-primary ${
              isRepliesComingLoading ? "opacity-50 cursor-not-allowed" : "opacity-100 cursor-pointer"
            }`}
            onClick={handleReplyView}
          >
            {isRepliesComingLoading ? "Loading..." : "Reply"}
          </p>
        </div>
        {/* single comment replies  */}
        {/* ----------------------- */}
        <div
          className={`w-full rounded-md overflow-hidden transition-all duration-1000 ${
            isReplyViewActive ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
          }`}
          style={{ transitionProperty: "max-height, opacity, padding" }}
        >
          {singleCommentReplies?.length > 0 &&
            singleCommentReplies?.map((reply) => <SingleReply key={reply?._id} reply={reply} />)}
          {/* add comment reply*/}
          <div className={` w-full overflow-hidden min-h-8 h-8 flex items-center gap-2 `}>
            <input
              type="text"
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
              placeholder="Write your reply here"
              className={`bg-[#016a7a14] rounded-[4px] focus:outline-none text-xs font-light py-2 px-3 w-full`}
            />
            <button
              disabled={isReplyLoading}
              className="bg-primary rounded-md cursor-pointer text-white text-xs py-2 px-3 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={addNewReplyHandler}
            >
              Reply
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleComment;

// single reply component
const SingleReply = ({ reply }) => {
  return (
    <div className="flex gap-4 w-full bg-[#016a7a0d] p-3 mb-2">
      <img
        src={reply?.user.image.url}
        alt="image"
        className="w-7 h-7 rounded-full object-cover border border-primary"
      />
      <div className="flex flex-col gap-[4px] xl:basis-[70%]">
        <h6 className="text-[10px] md:text-[13px] font-semibold text-[#333333]">{reply?.user.name}</h6>
        <p className="text-[10px] md:text-[13px] text-[#4f4f4f]">{reply?.content}</p>
        <div className="flex items-center gap-4">
          <p className="text-[10px] md:text-xs text-[#828282] text-nowrap">
            {getTimeAgo(new Date(reply?.createdAt))}
          </p>
        </div>
      </div>
    </div>
  );
};
