// Theme constants shared by the server layout (no-flash script) and the client toggle.
export const THEME_COLORS = { dark: "#021626", light: "#f7fafc" } as const;
/** Runs in <head> before first paint so the saved theme never flashes. Default: dark (brand). */
export const themeInitScript = `(function(){try{var t=localStorage.getItem("theme");if(t!=="light"&&t!=="dark")t="dark";document.documentElement.dataset.theme=t;var m=document.querySelector('meta[name="theme-color"]');if(m)m.setAttribute("content",t==="light"?"${THEME_COLORS.light}":"${THEME_COLORS.dark}")}catch(e){}})()`;
