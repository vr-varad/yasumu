import { createYasumu } from '@yasumu/core';
import {
  ApplicationMock,
  CommandsMock,
  StoreMock,
  DialogMock,
  EventsMock,
  FileSystemMock,
  PathMock,
  ProcessMock,
  ShellMock,
  WebSocketMock,
} from './mocks/index.js';

export const yasumu = createYasumu({
  adapters: {
    app: new ApplicationMock(),
    command: new CommandsMock(),
    createStore: async (name) => new StoreMock(name),
    dialog: new DialogMock(),
    events: new EventsMock(),
    fs: new FileSystemMock(),
    path: new PathMock(),
    process: new ProcessMock(),
    shell: new ShellMock(),
    websocket: new WebSocketMock(),
    fetch,
  },
});
