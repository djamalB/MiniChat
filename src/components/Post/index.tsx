import { FC, useEffect, useState } from "react";
import classnames from "classnames";
import { IPost } from "../Post/IPost";
import { useSelector } from "react-redux";
import { RootState, useStoreDispatch } from "../../redux/store";
import styles from "./Post.module.css";
import { removePost } from "../../redux/posts";

interface IPostProps {
  post: IPost;
}

export const Post: FC<IPostProps> = ({ post }) => {
  const users = useSelector((state: RootState) => state.users.list);
  const currentUser = useSelector((state: RootState) => state.users.current);
  const user = users.find(({ id }) => id === post.authorId);
  const dispatch = useStoreDispatch();
  const [openModal, setOpenModal] = useState<boolean>(false);

  const openModalClick = () => {
    if (currentUser.id === post.authorId) {
      setOpenModal((prev) => !prev);
    }
  };

  useEffect(() => {
    setOpenModal(false);
  }, [currentUser.id, post.id]);

  const handleDelete = () => {
    dispatch(removePost(post.id));
  };

  return (
    <li
      className={classnames(styles.post, {
        [styles.currentUsersPost]: post.authorId === currentUser.id,
      })}
    >
      <button className={styles.btn_img} onClick={openModalClick}>
        <img className={styles.image} src={user?.avatar} alt="author" />
      </button>
      <div className={styles.chat}>
        <span className={styles.name}>{user?.name}</span>
        <span
          className={classnames(styles.text, {
            [styles.currentUsersPostText]: post.authorId === currentUser.id,
          })}
        >
          {post.text}
        </span>
      </div>
      {openModal && (
        <div>
          <button onClick={handleDelete}>Удалить</button>
          <button>Изменить</button>
        </div>
      )}
    </li>
  );
};
