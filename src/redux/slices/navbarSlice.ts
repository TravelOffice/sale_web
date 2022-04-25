import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Bookmark {
  id: number,
  target: string,
  isBookmarked: boolean,
  title: string,
  icon: string,
  link: string,
}

interface NavbarState {
  query: string,
  bookmarks: Bookmark[],
  suggestions: any[]
}

const bookmarks : Bookmark[] = [];

const initialState : NavbarState = {
  query: '',
  bookmarks,
  suggestions: [],
};

const navbarSlice = createSlice({
  name: 'layout',
  initialState,
  reducers: {
    handleSearchQuery: (state, action) => {
      state.query = action.payload;
    },
    updateBookmarked: (state, action: PayloadAction<Bookmark>) => {
      const objectToUpdate = action.payload;
      const bookmarkIndex = state.bookmarks.findIndex((x) => x.id === objectToUpdate.id);
      if (bookmarkIndex === -1) {
        state.bookmarks.push(objectToUpdate);
      } else {
        state.bookmarks.splice(bookmarkIndex, 1);
      }
    },
  },
});

// Actions
export const navbarActions = navbarSlice.actions;

// Reducers
export const navbarReducers = navbarSlice.reducer;

export default { navbarReducers, navbarActions };
