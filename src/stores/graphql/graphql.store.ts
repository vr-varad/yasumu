import { create } from 'zustand';

export interface IGraphqlStore {
  url: string;
  setUrl: (url: string) => void;
  query: string | null;
  setQuery: (query: string | null) => void;
}

export const useGraphqlStore = create<IGraphqlStore>((set) => ({
  url: 'https://graphql.postman-echo.com/graphql',
  setUrl: (url) => set({ url }),
  query: null,
  setQuery: (query) => set({ query }),
}));
