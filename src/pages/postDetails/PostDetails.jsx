import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

function PostDetails() {
  const { id } = useParams();
  const post = useSelector((state) =>
    state.postsData.posts.find((post) => post.id.toString() === id)
  );

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <div className="container">
      <h1>Post Title :</h1>
      <h3>{post.title}</h3>
      <h1>Post Description :</h1>
      <p>{post.body}</p>
    </div>
  );
}

export default PostDetails;
