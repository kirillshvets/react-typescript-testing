import { act, renderHook } from "@testing-library/react";
import { MatchMediaMock } from "../../mocks/MatchMediaMock";
import { useMediaQuery } from "../useMediaQuery";

const matchMediaMock = new MatchMediaMock();

describe("useMediaQuery", () => {
  afterAll(() => {
    vi.clearAllMocks();
  });

  describe('with "addEventListener" and "addRemoveListener"', () => {
    test("should return true if media query matches", () => {
      window.matchMedia = vi
        .fn()
        .mockImplementation(() => matchMediaMock.mock(true));

      const view = renderHook(() => useMediaQuery("(min-width: 1024px)"));
      expect(view.result.current).toEqual(true);
    });

    test("should return false if media query doesn`t match", () => {
      window.matchMedia = vi
        .fn()
        .mockImplementation(() => matchMediaMock.mock(false));

      const view = renderHook(() => useMediaQuery("(min-width: 1024px)"));
      expect(view.result.current).toEqual(false);
    });

    test("should handle change event", () => {
      window.matchMedia = vi
        .fn()
        .mockImplementation(() => matchMediaMock.mock(true));

      const view = renderHook(() => useMediaQuery("(min-width: 1024px)"));
      expect(view.result.current).toEqual(true);

      act(() => {
        matchMediaMock.dispatchEvent({ matches: false } as MediaQueryListEvent);
      });
      expect(view.result.current).toEqual(false);
    });
  });

  describe('with "addListener" and "removeListener"', () => {
    test("should return true if media query matches", () => {
      window.matchMedia = vi
        .fn()
        .mockImplementation(() => matchMediaMock.mockLegacy(true));

      const view = renderHook(() => useMediaQuery("(min-width: 768px)"));
      expect(view.result.current).toEqual(true);
    });

    test("should return false if media query doesn`t match", () => {
      window.matchMedia = vi
        .fn()
        .mockImplementation(() => matchMediaMock.mockLegacy(false));

      const view = renderHook(() => useMediaQuery("(min-width: 1024px)"));
      expect(view.result.current).toEqual(false);
    });
  });
});
