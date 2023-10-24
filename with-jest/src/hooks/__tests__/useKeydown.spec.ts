import { fireEvent, renderHook } from "@testing-library/react";
import { useKeydown } from "../useKeydown";

describe("useKeydown", () => {
  test("should handle keydown event", () => {
    const callback = jest.fn();
    const event = new KeyboardEvent("keydown", {
      key: "Escape",
    });

    const view = renderHook(() => useKeydown("Escape", callback));

    expect(callback).toHaveBeenCalledTimes(0);
    fireEvent(document, event);
    expect(callback).toHaveBeenCalledTimes(1);

    // Тестируем, что "removeEventListener" работает корректно,
    // проверяя после размонтирования, что коллбэк вызывался только один раз.
    jest.spyOn(document, "removeEventListener");

    view.unmount();
    expect(document.removeEventListener).toHaveBeenCalledTimes(1);

    fireEvent(document, event);
    expect(callback).toHaveBeenCalledTimes(1);
  });

  test("shouldn`t handle unnecessary keydown event", () => {
    const callback = jest.fn();
    const event = new KeyboardEvent("keydown", {
      key: "Enter",
    });

    renderHook(() => useKeydown("Escape", callback));

    expect(callback).toHaveBeenCalledTimes(0);
    fireEvent(document, event);
    expect(callback).toHaveBeenCalledTimes(0);
  });
});
