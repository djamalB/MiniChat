import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import users from "./users";
import posts from "./posts";

// Тут мы создаем стор с помощью configureStore
export const store = configureStore({
  reducer: {
    users, // этот редюсер будет хранить юзеров
    posts, // а этот редюсер будет хранить посты
  },
});

// тут объявляется хук useStoreDispatch который вызывает useDispatch а дженериком
// он возвращает тип диспатча для того чтобы сохранить типизацию при передачи в диспатч какого нибудь действия
export const useStoreDispatch = () => useDispatch<typeof store.dispatch>();
export type RootState = ReturnType<typeof store.getState>;