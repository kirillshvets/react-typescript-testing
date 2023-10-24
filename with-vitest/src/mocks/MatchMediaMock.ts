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
      removeEventListener: vi.fn(),
    };
  }

  mockLegacy(matches: boolean) {
    return {
      matches,
      addListener: vi.fn(),
      removeListener: vi.fn(),
    };
  }

  dispatchEvent(event: MediaQueryListEvent) {
    this.handlers.forEach((handler) => handler(event));
  }
}
