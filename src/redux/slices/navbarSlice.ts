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

const bookmarks : Bookmark[] = [
  {
    id: 3,
    target: 'email',
    isBookmarked: true,
    title: 'Email',
    icon: 'Mail',
    link: '/apps/email',
  },
  {
    id: 4,
    target: 'chat',
    isBookmarked: true,
    title: 'Chat',
    icon: 'MessageSquare',
    link: '/apps/chat',
  },
  {
    id: 5,
    target: 'todo',
    isBookmarked: true,
    title: 'Todo',
    icon: 'CheckSquare',
    link: '/apps/todo',
  },
  {
    id: 6,
    target: 'calendar',
    isBookmarked: true,
    title: 'Calendar',
    icon: 'Calendar',
    link: '/apps/calendar',
  },
];

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
