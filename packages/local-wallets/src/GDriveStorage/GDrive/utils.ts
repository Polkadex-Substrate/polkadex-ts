export function waitDocumentReady(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (document.readyState === "complete") {
      resolve();
    } else {
      const callback = () => {
        window.removeEventListener("load", callback);
        resolve();
      };

      window.addEventListener("load", callback);
    }
  });
}

export function loadScript(src: any) {
  // eslint-disable-line no-param-reassign
  return new Promise(function (resolve, reject) {
    let shouldAppend = false;
    let el: any = document.querySelector('script[src="' + src + '"]');
    if (!el) {
      el = document.createElement("script");
      el.type = "text/javascript";
      el.async = true;
      el.src = src;
      shouldAppend = true;
    } else if (el.hasAttribute("data-loaded")) {
      resolve(el);
      return;
    }

    el.addEventListener("error", reject);
    el.addEventListener("abort", reject);
    el.addEventListener("load", function loadScriptHandler() {
      el.setAttribute("data-loaded", true);
      resolve(el);
    });

    if (shouldAppend) document.head.appendChild(el);
  });
}

export class ScriptLoader {
  static async load(src: string, debug = true): Promise<void> {
    try {
      await loadScript(src);
      if (debug) console.info(`[${this.name}] Script loaded: ${src}`);
    } catch (error) {
      if (debug) console.error(error);
      else throw error;
    }
  }
}
