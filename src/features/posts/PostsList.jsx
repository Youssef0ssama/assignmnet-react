import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";
import "./style.css";
import {
  fetchPosts,
  addPost,
  updatePost,
  deletePost,
} from "./slices/postsSlice";
import { faEdit, faTrash, faPlus } from "@fortawesome/free-solid-svg-icons";
import Button from "../../Components/Buttons/Button";
import UpdatePostModal from "../../Components/Modals/UpdatePostModal";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
  title: Yup.string()
    .min(10, "Title must be at least 10 characters")
    .max(100, "Title can't be more than 100 characters")
    .required("Title is required"),
  body: Yup.string()
    .min(50, "Body must be at least 50 characters")
    .max(500, "Body can't be more than 500 characters")
    .required("Body is required"),
});

function PostsList() {
  const [showModal, setShowModal] = useState(false);
  const [currentPost, setCurrentPost] = useState({
    title: "",
    body: "",
  });

  const isEffectRun = useRef(false); // Track if effect has run
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.postsData.posts);
  const [newPost, setNewPost] = useState({
    title: "",
    body: "",
  });

  useEffect(() => {
    if (!isEffectRun.current) {
      dispatch(fetchPosts());
      isEffectRun.current = true;
    }
  }, [dispatch]);

  const handleAddPost = (values, { resetForm }) => {
    dispatch(addPost(values)).then(() => {
      resetForm();
      toast.success("Post added successfully");
    });
  };

  const handleShowModal = (post) => {
    // console.log(post)
    setCurrentPost(post);
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };
  const handleUpdatePost = () => {
    const updatedPostData = {
      title: currentPost.title,
      body: currentPost.body,
    };
    // console.log(updatedPostData);
    dispatch(
      updatePost({ id: currentPost.id, updatedData: updatedPostData })
    ).then(() => {
      setShowModal(false);
      toast.success("Post has been updated successfully");
    });
  };

  const handleDeletePost = (postId) => {
    dispatch(deletePost(postId)).then(() => {
      toast.success("Post deleted successfully");
    });
  };
  return (
    <>
      <div className="posts-container">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              {posts &&
                posts.map((post) => (
                  <div className="card post-item" key={post.id}>
                    <div className="card-body">
                      <h5>
                        <Link
                          to={`/post/${post.id}`}
                          className="post-title-link"
                        >
                          {post.id} - {post.title}
                        </Link>
                      </h5>
                      <p className="card-text">{post.body}</p>
                      <div className="postControlButtons">
                        <Button
                          color="primary"
                          icon={faEdit}
                          text="Update"
                          onClick={() => handleShowModal(post)}
                        />
                        <Button
                          color="danger"
                          icon={faTrash}
                          text="Delete"
                          onClick={() => handleDeletePost(post.id)}
                        />
                      </div>
                    </div>
                  </div>
                ))}
            </div>
            <div className="col-lg-4">
              <div className="add-post-form">
                <Formik
                  initialValues={{ title: "", body: "" }}
                  validationSchema={validationSchema}
                  schema
                  onSubmit={handleAddPost}
                >
                  {({ values, handleChange, handleBlur, errors, touched }) => (
                    <Form>
                      <Field
                        type="text"
                        name="title"
                        className="form-control mb-2"
                        placeholder="Title"
                        value={values.title}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {touched.title && errors.title && (
                        <div className="error">{errors.title}</div>
                      )}

                      <Field
                        as="textarea"
                        name="body"
                        className="form-control mb-2"
                        placeholder="Body"
                        rows="4"
                        value={values.body}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {touched.body && errors.body && (
                        <div className="error">{errors.body}</div>
                      )}

                      <Button
                        color="success"
                        icon={faPlus}
                        text="Add Post"
                        type="submit"
                      />
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </div>

      <UpdatePostModal
        showModal={showModal}
        handleCloseModal={handleCloseModal}
        currentPost={currentPost}
        handleChangeData={setCurrentPost}
        handleUpdatePost={handleUpdatePost}
      />
      <ToastContainer />
    </>
  );
}

export default PostsList;
