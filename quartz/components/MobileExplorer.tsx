import { QuartzComponentConstructor } from "./types";

// @ts-ignore
import script from "./scripts/mobile-explorer.inline";

export default (() => {
  function MobileExplorer() {
    return null;
  }

  MobileExplorer.afterDOMLoaded = script;

  return MobileExplorer;
}) satisfies QuartzComponentConstructor;
