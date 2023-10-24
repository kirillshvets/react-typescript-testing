import { fireEvent, renderHook } from "@testing-library/react";
import { useOutsideClick } from "../useOutsideClick";

describe("useOutsideClick", () => {
  test("should handle outside click", () => {
    const target = document.createElement("div");
    document.body.appendChild(target);

    const outside = document.createElement("div");
    document.body.appendChild(outside);

    const ref = {
      current: target,
    };
    const callback = vi.fn();

    const view = renderHook(() => useOutsideClick(ref, callback));

    expect(callback).toHaveBeenCalledTimes(0);
    fireEvent.click(outside);
    expect(callback).toHaveBeenCalledTimes(1);

    // Тестируем, что "removeEventListener" работает корректно,
    // проверяя после размонтирования, что коллбэк вызывался только один раз.
    vi.spyOn(document, "removeEventListener");

    view.unmount();
    expect(document.removeEventListener).toHaveBeenCalledTimes(1);

    fireEvent.click(outside);
    expect(callback).toHaveBeenCalledTimes(1);
  });

  test("should do nothing after click on the target element", () => {
    const target = document.createElement("div");
    document.body.appendChild(target);

    const ref = {
      current: target,
    };
    const callback = vi.fn();

    renderHook(() => useOutsideClick(ref, callback));

    expect(callback).toHaveBeenCalledTimes(0);
    fireEvent.click(target);
    expect(callback).toHaveBeenCalledTimes(0);
  });
});
