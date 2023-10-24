export class MatchMediaMock {
  handlers: Array<(event: MediaQueryListEvent) => void> = [];

  mock(matches: boolean) {
    return {
      matches,
      addEventListener: (
        _event: string,
        handler: (event: MediaQueryListEvent) => void
      ) => {
        this.handlers.push(handler);
      },
      removeEventListener: jest.fn(),
    };
  }

  mockLegacy(matches: boolean) {
    return {
      matches,
      addListener: jest.fn(),
      removeListener: jest.fn(),
    };
  }

  dispatchEvent(event: MediaQueryListEvent) {
    this.handlers.forEach((handler) => handler(event));
  }
}
