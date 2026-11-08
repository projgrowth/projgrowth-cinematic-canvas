export type ServicesPanel = "collapsed" | "expanded";

export type MobileMenuState = {
  sheet: "closed" | "open";
  services: ServicesPanel;
};

export type MobileMenuEvent =
  | { type: "sheet"; open: boolean }
  | { type: "toggleServices" }
  | { type: "navigate" };

export const initialMobileMenu: MobileMenuState = {
  sheet: "closed",
  services: "collapsed",
};

/** Services expansion is remembered across close, and can only toggle while the sheet is open. */
export function mobileMenuTransition(state: MobileMenuState, event: MobileMenuEvent): MobileMenuState {
  switch (event.type) {
    case "sheet":
      return { ...state, sheet: event.open ? "open" : "closed" };
    case "toggleServices":
      if (state.sheet !== "open") return state;
      return {
        ...state,
        services: state.services === "collapsed" ? "expanded" : "collapsed",
      };
    case "navigate":
      return { ...state, sheet: "closed" };
    default: {
      const unreachable: never = event;
      return unreachable;
    }
  }
}
