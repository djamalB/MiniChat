import {
  ChangeEvent,
  FC,
  KeyboardEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import classnames from "classnames";
import { useSelector } from "react-redux";
import styles from "./AddPost.module.css";
import { RootState, useStoreDispatch } from "../../redux/store";
import { savePost } from "../../redux/posts";
import { FaTelegramPlane } from "react-icons/fa";

interface IAddPostProps {
  className?: string;
}

export const AddPost: FC<IAddPostProps> = ({ className }) => {
  const dispatch = useStoreDispatch();
  const [text, setTextChange] = useState<string>("");
  const currentUser = useSelector((state: RootState) => state.users.current);
  const ref = useRef<HTMLInputElement>(null);

  const addPostUser = async () => {
    if (text) {
      const newPost = {
        text,
        authorId: currentUser.id,
        date: new Date(),
      };
      await dispatch(savePost(newPost));
      setTextChange("");
    }
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newText = e.target.value;
    setTextChange(newText);
    localStorage.setItem(`postUserText_${currentUser.id}`, newText);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && ref.current) {
      e.preventDefault();
      addPostUser();
      localStorage.removeItem(`postUserText_${currentUser.id}`);
      ref.current.focus();
    }
  };

  useEffect(() => {
    const savedText = localStorage.getItem(`postUserText_${currentUser.id}`);
    if (savedText) {
      setTextChange(savedText);
    } else {
      setTextChange("");
    }
  }, [currentUser.id]);

  return (
    <div className={classnames(styles.addPost, className)}>
      <img className={styles.avatar} src={currentUser.avatar} alt="author" />
      <div className={styles.form}>
        <input
          className={styles.input}
          placeholder="Сообщение..."
          value={text}
          onChange={onChange}
          ref={ref}
          onKeyDown={onKeyDown}
        />

        <button className={styles.sendButton} onClick={addPostUser}>
          <FaTelegramPlane color="white" size={25} />
        </button>
      </div>
    </div>
  );
};
