import { fetchCommentsByPostd } from "@/lib/query/comment";
import React from "react";
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
  return <div>CommentShowPage</div>;
};

export default CommentShowPage;
