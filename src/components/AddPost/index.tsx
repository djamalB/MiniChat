import { FC, useState } from "react";
import classnames from "classnames";
import { useSelector } from "react-redux";
import styles from "./AddPost.module.css";
import { RootState, useStoreDispatch } from "../../redux/store";
import { addPost, savePost } from "../../redux/posts";
import { FaTelegramPlane } from "react-icons/fa";
import { IPost } from "../Post/IPost";
interface IAddPostProps {
  className?: string;
}

export const AddPost: FC<IAddPostProps> = ({ className }) => {
  const [text, textChange] = useState<string>("");
  const dispatch = useStoreDispatch();
  const currentUser = useSelector((state: RootState) => state.users.current);

  const addPostUser = async () => {
    if (text) {
      const newPost = {
        text,
        authorId: currentUser.id,
        date: new Date(),
      };
      await dispatch(savePost(newPost));
      textChange("");
    }
  };

  return (
    <div className={classnames(styles.addPost, className)}>
      <img className={styles.avatar} src={currentUser.avatar} alt="author" />
      <div className={styles.form}>
        <input
          className={styles.input}
          placeholder="Сообщение..."
          value={text}
          onChange={({ target }) => textChange(target.value)}
        />

        <button className={styles.sendButton} onClick={addPostUser}>
          <FaTelegramPlane color="white" size={25} />
        </button>
      </div>
    </div>
  );
};
