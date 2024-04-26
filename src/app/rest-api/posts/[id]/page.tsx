"use client";
import React, { useEffect, useState } from "react";
import useCallAPIState from "@/hooks/useCallAPIState";
import CommentService from "@/services/comment";
import PostService from "@/services/post";
import { CommentData } from "@/types/comment";
import Comment from "@/components/comentBox";
import { Post } from "@/types/post";
import PostCard from "@/components/postCard";
import { User } from "@/types/user";
import UserService from "@/services/user";
import UserComponent from "@/components/userIcon";

import RenderState from "@/components/ConditionRender/RenderState";
import Breadcrumbs from "@/components/BreadCrum/AutoMapBreadCrum";

const PostPage = ({ params }) => {
 
  const [apiState, updateApiState] = useCallAPIState<CommentData>({ data: [] });
  const [postState, updatePostState] = useCallAPIState<Post | null>({ data: null });
  const [userState, updateUserState] = useCallAPIState<User[]>({ data: [] });
  const [userId, setUserId] = useState<number | null>(null);
  const [parentId, setParentId] = useState<number | null>(null);
  const [replyContent, setReplyContent] = useState<string>("");

  const handleUserClick = (userId: number) => {

    setUserId(userId);
  };

  const handleParentId = (parentId: number) => {
    setParentId(parentId);
  };

  const CreateAComment = async () => {
    await CommentService.createAComment({ parentId: parentId, userId: userId, postId: postState.data?.id, content: replyContent });
    OnUpdateComment()
  };

  const DeleteAComment = async (commentId: number) => {
    await CommentService.deleteMyComment(commentId);
    OnUpdateComment()
  };

  const handleChangeMessage = async (content: string) => {
    await setReplyContent(content);
  };
  const OnUpdateComment = async () => {
    try {
      updateApiState("start", []);
      const comments = await CommentService.getCommentsByPostId(Number(params.id));
      updateApiState("success", comments || []);
    } catch (error) {
      console.error("Error fetching comments:", error);
      updateApiState("error");
    }
  }

  useEffect(() => {
    setUserId(userState?.data[0]?.id ?? null);
    console.log(userId)
  }, [userState]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        updateApiState("start", []);
        const comments = await CommentService.getCommentsByPostId(Number(params.id));
        updateApiState("success", comments || []);

        updatePostState("start", null);
        const post = await PostService.getPostById(Number(params.id));
        updatePostState("success", post);

        updateUserState("start", []);
        const users = await UserService.getUsers();
        updateUserState("success", users);
      } catch (error) {
        console.error("Error fetching data:", error);
        updateApiState("error");
        updatePostState("error");
        updateUserState("error");
      }
    };

    fetchData();
  }, [params.id, updateApiState, updatePostState, updatePostState]);

  return (
   <>
   <div className="flex bg-white py-6 px-12 ">   <Breadcrumbs url={`rest-api/posts/${params.id}`} /></div>

   <div className="flex flex-row p-2 w-full select-none min-h-96">
   
   <div className="flex w-2/5 flex-col items-stretch h-50">
      <RenderState
        loading={postState.loading}
        success={postState.success}
        error={postState.error}
      >
        {postState.success && (
          <div className="p-6 h-4/5">
            <PostCard key={postState.data?.id} {...postState.data} />
          </div>
        )}
      </RenderState>
      <RenderState
        loading={userState.loading}
        success={userState.success && userId!==null?true:false}
        error={userState.error}
      >
        {userState.success && (
          <div className="p-6 flex flex-row">
            {userState.data.map((user) => (
              <UserComponent
                key={user.id}
                highlight={user.id === userId}
                user={user}
                onUserClick={handleUserClick}
              />
            ))}
          </div>
        )}
      </RenderState>
    </div>

    
    <div className="flex w-3/5 max-h-screen bg-white overflow-y-scroll p-3 rounded-lg">
      <RenderState
        loading={apiState.loading}
        success={apiState.success}
        error={apiState.error}
      >
        {apiState.success && (
          <div>
            {apiState.data.map((comment) => (
              <Comment
                key={comment.id}
                comment={comment}
                userId={userId}
                OnUpdateComment={OnUpdateComment}
                setParentID={handleParentId}
                handleChangeMess={handleChangeMessage}
                CreateAComment={CreateAComment}
                DeleteAComment={DeleteAComment}
              />
            ))}
          </div>
        )}
      </RenderState>
    </div>
  </div>
   </>

  );
};

export default PostPage;
