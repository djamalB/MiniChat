import {
  ChangeEvent,
  forwardRef,
  KeyboardEvent,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import classnames from "classnames";
import { useSelector } from "react-redux";
import styles from "./AddPost.module.css";
import { RootState, useStoreDispatch } from "../../redux/store";
import { savePost, updatePost } from "../../redux/posts";
import { FaTelegramPlane } from "react-icons/fa";

interface IAddPostProps {
  className?: string;
  setEditPostId: (id: number | null) => void;
  editPostId: number | null;
}

export interface IAddPostRef {
  setText: (text: string) => void;
  focusInput: () => void;
}

export const AddPost = forwardRef<IAddPostRef, IAddPostProps>(function (
  { className, setEditPostId, editPostId },
  ref
) {
  const dispatch = useStoreDispatch();
  const [text, setTextChange] = useState<string>("");
  const currentUser = useSelector((state: RootState) => state.users.current);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSaveOrUpdatePost = async () => {
    if (text) {
      if (editPostId) {
        await dispatch(updatePost({ id: editPostId, text }));
        setEditPostId(null);
      } else {
        const newPost = {
          text,
          authorId: currentUser.id,
          date: new Date(),
        };
        await dispatch(savePost(newPost));
      }
      setTextChange("");
    }
  };

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    const newText = e.target.value;
    setTextChange(newText);
    localStorage.setItem(`postUserText_${currentUser.id}`, newText);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputRef.current) {
      e.preventDefault();
      handleSaveOrUpdatePost();
      localStorage.removeItem(`postUserText_${currentUser.id}`);
      inputRef.current.focus();
      
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

  useImperativeHandle(ref, () => ({
    setText: (newText: string) => setTextChange(newText), // Устанавливаем текст
    focusInput: () => {
      inputRef.current?.focus(); // Фокусируем на поле
    },
  }));

  return (
    <div className={classnames(styles.addPost, className)}>
      <img className={styles.avatar} src={currentUser.avatar} alt="author" />
      <div className={styles.form}>
        <input
          className={styles.input}
          placeholder="Сообщение..."
          value={text}
          onChange={onChangeInput}
          ref={inputRef}
          onKeyDown={onKeyDown}
        />
        <button className={styles.sendButton} onClick={handleSaveOrUpdatePost}>
          <FaTelegramPlane color="white" size={25} />
        </button>
      </div>
    </div>
  );
});
