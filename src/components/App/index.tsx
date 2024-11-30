import { PostsList } from "../PostsList";
import { UsersList } from "../UsersList";
import styles from "./App.module.css";

function App() {
  return (
    <div className={styles.app}>
      <UsersList className={styles.usersList} />
      <div className={styles.rightColumn}>
        <PostsList className={styles.postsList} />
      </div>
    </div>
  );
}

export default App;
