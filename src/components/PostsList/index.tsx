import { FC, useEffect, useRef, useState } from "react";
import classnames from "classnames";
import { useSelector } from "react-redux";
import { Post } from "../Post";
import { IPost } from "../Post/IPost";
import { getPosts } from "../../redux/posts";
import { RootState, useStoreDispatch } from "../../redux/store";
import styles from "./PostsList.module.css";
import { AddPost, IAddPostRef } from "../AddPost";

interface IPostsListProps {
  className?: string;
}

export const PostsList: FC<IPostsListProps> = ({ className }) => {
  const dispatch = useStoreDispatch();
  const posts = useSelector((state: RootState) => state.posts.list);
  const addPostRef = useRef<IAddPostRef>(null);
  const [editPostId, setEditPostId] = useState<number | null>(null);

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  return (
    <>
      <ul className={classnames(styles.postsList, className)}>
        {posts.map((post: IPost) => (
          <Post
            key={post.id}
            post={post}
            addPostRef={addPostRef}
            setEditPostId={setEditPostId}
          />
        ))}
      </ul>
      <AddPost
        ref={addPostRef}
        setEditPostId={setEditPostId}
        editPostId={editPostId}
      />
    </>
  );
};
