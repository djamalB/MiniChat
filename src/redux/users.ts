import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getUsersApi } from "../api/users";
import { IUser } from "../components/User/IUser";

interface IUsersState {
  // Мы создаем интерфейс для текующего юзера и список юзеров
  current: IUser;
  list: Array<IUser>;
}

const initialCurrent: IUser = {
  // Мы создаем интерфейс юзера с именем , айди и аватаром
  name: "",
  id: 0,
  avatar: "",
};

const initialState: IUsersState = {
  // Тут мы типизируем состояние указывая что у нас
  // будет текующее состояние юзера и список юзеров
  current: initialCurrent,
  list: [],
};

// Мы создаем асинхронную функцию createAsyncThunk указываем имя и колбек функцию
export const getUsers = createAsyncThunk("getUsers", async () => {
  //Далее мы возвращаем промис вызывая функцию getUsersApi в ней мы получаем данные о юзере с бека
  const response = await getUsersApi();

  return await response.json(); // возвращаем данные распарсив их
});

const counterSlice = createSlice({
  // создаем слайс
  name: "users", // даем имя
  initialState, // объявляем состояние
  reducers: {
    // пишем чистую функцию
    changeCurrent: (state, action) => {
      // функция changeCurrent принимает стейт и экшн
      state.current = // смотрим методом find произошел ли экшн по id и если экшена нет то возвращаем initialCurrent
        state.list.find(({ id }) => id === action.payload) || initialCurrent;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUsers.fulfilled, (state, action) => {
      state.list = action.payload;
      state.current = action.payload[0];
    });
  },
});

export const { changeCurrent } = counterSlice.actions;
export default counterSlice.reducer;










