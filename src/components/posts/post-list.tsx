import React from "react";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { PostWithData } from "@/lib/query/post";
type PostListProps = {
  fetchData: () => Promise<PostWithData[]>;
};

const PostList: React.FC<PostListProps> = async ({ fetchData }) => {
  const posts = await fetchData();
  console.log(posts);
  return (
    <div className="flex flex-col gap-2">
      {posts.map((post) => (
        <Card key={post.id}>
          <CardHeader>
            <CardTitle>{post.title}</CardTitle>
            <CardDescription className="flex justify-between items-center">
              <h1>By {post.User?.name}</h1>
              <h1>{post._count.Comment} comments</h1>
            </CardDescription>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
};

export default PostList;
