import { YasumuRestEntity } from '@/lib/api/workspace/modules/rest/YasumuRestEntity';
import { HttpMethods } from '@/lib/constants';
import { create } from 'zustand';

export const useEnvironment = create((set) => ({
  environment: null as string | null,
  variables: {} as Record<string, string>,
  setEnvironment: (environment: string) => set({ environment }),
  setVariables: (variables: Record<string, string>) => set({ variables }),
}));

export interface IParamOrHeader {
  key: string;
  value: string;
  enabled: boolean;
}

export interface IRequestConfig {
  id: string;
  url: string;
  method: HttpMethods;
  headers: IParamOrHeader[];
  body: string;
  setId: (id: string) => void;
  setUrl: (url: string) => void;
  setMethod: (method: HttpMethods) => void;
  setHeaders: (headers: IParamOrHeader[]) => void;
  setBody: (body: string) => void;
}

export const useRequestConfig = create<IRequestConfig>((set) => ({
  id: '',
  url: '',
  method: HttpMethods.GET,
  headers: [
    { key: 'Content-Type', value: 'application/json', enabled: true },
    { key: 'User-Agent', value: 'Yasumu/1.0', enabled: true },
    { key: '', value: '', enabled: true },
  ] as IParamOrHeader[],
  body: '{\n  \n}',
  setId: (id: string) => set({ id }),
  setUrl: (url: string) => set({ url }),
  setMethod: (method: HttpMethods) => set({ method }),
  setHeaders: (headers: IParamOrHeader[]) => set({ headers }),
  setBody: (body: string) => set({ body }),
}));

export interface IRequestStore {
  current: YasumuRestEntity | null;
  setCurrent: (current: YasumuRestEntity | null) => void;
}

export const useRequestStore = create<IRequestStore>((set) => ({
  current: null,
  setCurrent: (current) => set({ current }),
}));

export interface IRequestFs {
  copied: string | null;
  cut: string | null;
  selectedPath: string | null;
  setCopied: (copied: string | null) => void;
  setCut: (cut: string | null) => void;
  setSelectedPath: (selectedPath: string | null) => void;
}

export const useRequestFs = create<IRequestFs>((set) => ({
  copied: null,
  cut: null,
  selectedPath: null,
  setCopied: (copied) => set({ copied }),
  setCut: (cut) => set({ cut }),
  setSelectedPath: (selectedPath) => set({ selectedPath }),
}));