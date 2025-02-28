import { fetchCommentsByPostd } from "@/lib/query/comment";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import CommentCreateForm from "./comment-create-form";
type CommentShowProps = {
  postId: string;
  commentId: string;
};

const CommentShowPage: React.FC<CommentShowProps> = async ({
  postId,
  commentId,
}) => {
  const comments = await fetchCommentsByPostd(postId);
  const comment = comments.find((c) => c.id === commentId);
  if (!comment) return null;
  const children = comments.filter((c) => c.parentId === commentId);
  return (
    <div className="m-4 p-4 border">
      {/* main comment show */}
      <div className="flex gap-3">
        <Avatar>
          <AvatarImage src={comment.user.image || ""}></AvatarImage>
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="flex-1 space-y-3">
          <p className="text-gray-500 text-sm font-medium">
            {comment.user.name}
          </p>
          <p className="text-gray-800">{comment.content}</p>
          <CommentCreateForm postId={comment.postId} parentId={comment.id} />
        </div>
      </div>
      {children.map((comment) => (
        <CommentShowPage
          key={comment.id}
          postId={postId}
          commentId={comment.id}
        />
      ))}
    </div>
  );
};

export default CommentShowPage;
