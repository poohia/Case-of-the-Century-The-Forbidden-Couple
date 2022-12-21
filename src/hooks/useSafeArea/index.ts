const useSafeArea = () => {
  return {
    // env(safe-area-inset-top)
    sat: getComputedStyle(document.body).getPropertyValue("--sat"),
    // env(safe-area-inset-right)
    sar: getComputedStyle(document.body).getPropertyValue("--sar"),
    // env(safe-area-inset-bottom)
    sab: getComputedStyle(document.body).getPropertyValue("--sab"),
    // env(safe-area-inset-left)
    sal: getComputedStyle(document.body).getPropertyValue("--sal"),
  };
};

export default useSafeArea;
