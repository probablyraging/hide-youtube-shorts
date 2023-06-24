import { r as reactExports, k as keyframes, s as styled, n as n$2, R as React, o as o$5, K as KeyCode, j as jsxRuntimeExports, b as a$1, m as m$1, c as sharedFocus, d as c, i as isChildElement, e as o$6, f as reactDomExports, t as t$2, g as t$3, p as presentModal, h as handleCloseModal } from "./index.js";
const t$1 = (e2) => {
  const [o2, c2] = reactExports.useState(() => "function" == typeof e2 ? e2() : e2), u2 = reactExports.useRef(e2);
  reactExports.useEffect(() => {
    u2.current = o2;
  }, [o2]);
  return [o2, (t2) => {
    const r = "function" == typeof t2 ? t2(u2.current) : t2;
    u2.current = r, c2(r);
  }, u2];
};
const n$1 = { scrollLayer: false }, o$3 = /* @__PURE__ */ new Map(), u$3 = (e2) => !!(e2.touches && e2.touches.length > 1) || (e2.preventDefault(), false);
const o$4 = (c2, s) => {
  if ("undefined" == typeof document)
    return [false, (e2) => e2];
  const d2 = c2 || reactExports.useRef(document.body), [i2, a2] = reactExports.useState(false), l2 = { ...n$1, ...s || {} }, f = () => !l2.scrollLayer && (!("undefined" == typeof window || !window.navigator) && /iP(ad|hone|od)/.test(window.navigator.platform));
  return reactExports.useEffect(() => {
    if (!d2 || !d2.current)
      return;
    const e2 = d2.current.style.overflow;
    if (i2) {
      if (o$3.has(d2.current))
        return;
      return f() ? document.addEventListener("touchmove", u$3, { passive: false }) : d2.current.style.overflow = "hidden", void o$3.set(d2.current, { last: e2 });
    }
    if (o$3.has(d2.current)) {
      if (f())
        document.removeEventListener("touchmove", u$3);
      else {
        const e3 = o$3.get(d2.current);
        d2.current.style.overflow = e3.last;
      }
      o$3.delete(d2.current);
    }
  }, [i2, d2]), [i2, a2];
};
const i = keyframes({ "0%": { opacity: 0 }, "60%": { opacity: 0.75 }, "100%": { opacity: 1 } }), t = keyframes({ "0%": { opacity: 0 } }), n = keyframes({ "0%": { backdropFilter: "saturate(0%) blur(0)" } });
const StyledBackdropContent = styled("div", { position: "relative", display: "inline-block", zIndex: "$max", outline: "none", width: "100%", margin: "$9 auto", verticalAlign: "middle", "@sm": { width: "90%", maxWidth: "90%" }, variants: { animated: { true: { "&": { animationName: i, animationDuration: "200ms", animationTimingFunction: "ease-in", animationDirection: "normal" } }, false: { transition: "none" } } } });
const StyledBackdropLayer = styled("div", { position: "fixed", top: 0, left: 0, right: 0, bottom: 0, size: "100%", pe: "none", zIndex: "$max", "@motion": { transition: "none" }, variants: { blur: { true: { bg: "$black", opacity: "$$backdropOpacity", "@supports ((-webkit-backdrop-filter: none) or (backdrop-filter: none))": { opacity: 1, backdropFilter: "saturate(180%) blur(20px)", animationName: `${n}, ${t}`, bg: "rgba(0, 0, 0, 0.1)" } }, false: { bg: "$black", opacity: "$$backdropOpacity", animationName: `${t}`, animationDuration: "0.2s", animationTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)" } }, animated: { true: { animationName: `${t}`, animationDuration: "0.2s", animationTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)" }, false: { transition: "none" } } } });
const StyledBackdrop = styled("div", { position: "fixed", top: 0, left: 0, right: 0, bottom: 0, overflow: "auto", zIndex: "$max", WebkitOverflowScrolling: "touch", boxSizing: "border-box", textAlign: "center", "&:before": { content: "", display: "inline-block", width: 0, height: "100%", verticalAlign: "middle" }, ".nextui-backdrop-wrapper-enter .nextui-backdrop-layer-default": { opacity: 0 }, ".nextui-backdrop-wrapper-enter-active .nextui-backdrop-layer-default": { opacity: "$$backdropOpacity" }, ".nextui-backdrop-wrapper-leave .nextui-backdrop-layer-default": { opacity: "$$backdropOpacity" }, ".nextui-backdrop-wrapper-leave-active .nextui-backdrop-layer-default": { opacity: 0 }, ".nextui-backdrop-wrapper-enter .nextui-backdrop-layer-blur": { bg: "rgba(0, 0, 0, 0.1)" }, ".nextui-backdrop-wrapper-enter-active .nextui-backdrop-layer-blur": { bg: "rgba(0, 0, 0, 0.4)" }, ".nextui-backdrop-wrapper-leave .nextui-backdrop-layer-blur": { bg: "rgba(0, 0, 0, 0.4)" }, ".nextui-backdrop-wrapper-leave-active .nextui-backdrop-layer-blur": { bg: "rgba(0, 0, 0, 0.1)" }, variants: { fullScreen: { true: { display: "inline-flex", overflow: "hidden", [`& ${StyledBackdropContent}`]: { width: "100vw", maxWidth: "100vw", height: "100vh", margin: 0 }, [`& ${StyledBackdropLayer}`]: { display: "none" } } } }, defaultVariants: { fullScreen: false } });
const x$1 = "nextui-backdrop", k = React.memo(({ children: e2, onClick: a2, onKeyPress: m2, visible: k2, maxWidth: y, blur: h2, animated: $, opacity: v, preventDefault: N, className: j, css: T, ...g }) => {
  const [, C, D] = t$1(false), w = (e3) => {
    D.current || a2 && a2(e3);
  }, E = reactExports.useCallback((e3) => {
    e3.stopPropagation();
  }, []), I = () => {
    if (!D.current)
      return;
    const e3 = setTimeout(() => {
      C(false), clearTimeout(e3);
    }, 0);
  }, { bindings: M } = o$5((e3) => {
    m2 && m2(e3);
  }, [KeyCode.Escape, KeyCode.Space], { disableGlobalEvent: true, preventDefault: N }), P = reactExports.useMemo(() => k2 ? "open" : "closed", [k2]), S = reactExports.useMemo(() => jsxRuntimeExports.jsxs(StyledBackdrop, { "aria-hidden": true, className: a$1(x$1, `${x$1}--${P}`, j), css: { $$backdropOpacity: v, ...T }, "data-state": P, role: "button", tabIndex: -1, onClick: w, onMouseUp: I, ...M, ...g, children: [jsxRuntimeExports.jsx(StyledBackdropLayer, { animated: $, blur: h2, className: a$1(`${x$1}-layer`, h2 ? `${x$1}-layer-blur` : `${x$1}-layer-default`) }), jsxRuntimeExports.jsx(StyledBackdropContent, { animated: $, className: `${x$1}-content`, css: { maxWidth: y }, onClick: E, onMouseDown: () => C(true), children: e2 })] }), [e2]);
  return jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: $ ? jsxRuntimeExports.jsx(m$1, { clearTime: 150, enterTime: 20, leaveTime: 20, name: `${x$1}-wrapper`, visible: k2, children: S }) : k2 ? S : null });
});
k.toString = () => ".nextui-backdrop";
const o$2 = n$2(k, { onClick: () => {
}, visible: false, blur: false, animated: true, preventDefault: true, opacity: 0.5, className: "" });
const reboundAnimation = keyframes({ "0%": { transform: "scale(0.95)" }, "40%": { transform: "scale(1.02)" }, "80%": { transform: "scale(0.98)" }, "100%": { transform: "scale(1)" } });
const appearanceIn = keyframes({ "0%": { opacity: 0, transform: "scale(0.95)" }, "60%": { opacity: 0.75, transform: "scale(1.02)" }, "100%": { opacity: 1, transform: "scale(1)" } });
const appearanceOut = keyframes({ "0%": { opacity: 1, transform: "scale(1)" }, "100%": { opacity: 0, transform: "scale(0.95)" } });
const StyledModalHideTab = styled("div", { outline: "none", overflow: "hidden", width: 0, height: 0, opacity: 0 });
const StyledModalCloseButton = styled("button", { position: "absolute", background: "transparent", border: "none", zIndex: "$1", top: "$space$3", right: "$space$2", margin: 0, d: "inline-flex", ai: "center", height: "auto", cursor: "pointer", boxSizing: "border-box", transition: "$default", padding: "calc($space$sm * 0.5)", color: "$accents4", br: "$space$5", svg: { color: "currentColor" }, "&:hover": { svg: { opacity: 0.8 } }, variants: { disabled: { true: { cursor: "not-allowed" } } } }, sharedFocus);
const StyledModalHeader = styled("div", { display: "flex", flexShrink: 0, ai: "center", ov: "hidden", color: "inherit", padding: "$sm $10", fs: "$xs", variants: { noPadding: { true: { padding: 0 } }, autoMargin: { true: { "> *:first-child": { mt: 0 }, "> *:last-child": { mb: 0 } } } } });
const StyledModalBody = styled("div", { display: "flex", flexDirection: "column", flex: "1 1 auto", padding: "$sm $10", oy: "auto", position: "relative", ta: "left", variants: { noPadding: { true: { flex: 1, padding: 0 } }, autoMargin: { true: { "> *:first-child": { mt: 0 }, "> *": { mb: "$8" }, "> *:last-child": { mb: 0 } } } } });
const StyledModalFooter = styled("div", { d: "flex", flexWrap: "wrap", flexShrink: 0, overflow: "hidden", color: "inherit", ai: "center", fs: "$xs", padding: "$sm $lg", variants: { noPadding: { true: { padding: 0 } }, autoMargin: { true: { "> *": { m: "$2" } } } } });
const StyledModal = styled("section", { maxWidth: "100%", verticalAlign: "middle", overflow: "hidden", height: "fit-content(20em)", maxHeight: "inherit", display: "flex", outline: "none", flexDirection: "column", position: "relative", boxSizing: "border-box", color: "$foreground", br: "$lg", boxShadow: "$lg", bg: "$backgroundContrast", animationFillMode: "forwards", "@motion": { transition: "none" }, "&.nextui-modal-wrapper-enter:not(.nextui-modal-rendered)": { animationName: appearanceIn, animationDuration: "200ms", animationTimingFunction: "ease-in", animationDirection: "normal" }, "&.nextui-modal-wrapper-leave": { animationName: appearanceOut, animationDuration: "50ms", animationTimingFunction: "ease-out" }, variants: { fullScreen: { true: { size: "100%", maxHeight: "100%" }, false: { "&.nextui-modal-rebound": { animationDuration: "250ms", animationName: reboundAnimation, animationTimingFunction: "ease", animationFillMode: "forwards" } } }, scroll: { true: { maxHeight: "calc(100vh - 200px)" } }, closeButton: { true: { paddingTop: "$lg", [`& ${StyledModalCloseButton}`]: { svg: { size: "$10" } } } } }, compoundVariants: [{ scroll: true, fullScreen: true, css: { maxHeight: "100%" } }] });
const a = ({ onClick: o2, ...a2 }) => jsxRuntimeExports.jsx(StyledModalCloseButton, { "aria-label": "Close", className: "nextui-modal-close-icon", type: "button", onClick: (t2) => {
  t2.preventDefault(), t2.stopPropagation(), t2.nativeEvent.stopImmediatePropagation(), o2 && o2(t2);
}, ...a2, children: jsxRuntimeExports.jsx(c, { plain: true, "aria-hidden": true, className: "nextui-modal-close-icon-svg", fill: "currentColor", size: 18 }) });
a.toString = () => ".nextui-modal-close-icon";
const l$3 = React.memo(a);
const u$2 = l$3;
const x = "nextui-modal", h = ({ className: e2, children: l2, visible: h2, fullScreen: $, closeButton: T, rebound: v, animated: j, onCloseButtonClick: w, scroll: y, ...N }) => {
  const k2 = reactExports.useRef(null), C = reactExports.useRef(null), g = reactExports.useRef(null), [B, I] = reactExports.useState(false);
  reactExports.useEffect(() => {
    const e3 = setTimeout(() => {
      I(true), clearTimeout(e3);
    }, 300);
    return () => clearTimeout(e3);
  }, []), reactExports.useEffect(() => {
    if (!h2)
      return;
    const e3 = document.activeElement;
    isChildElement(k2.current, e3) || C.current && C.current.focus();
  }, [h2]);
  const S = (e3) => {
    const r = e3.keyCode === KeyCode.Tab;
    if (!h2 || !r)
      return;
    const t2 = document.activeElement;
    e3.shiftKey ? t2 === C.current && g.current && g.current.focus() : t2 === g.current && C.current && C.current.focus();
  }, E = () => {
    w && w();
  }, K = reactExports.useMemo(() => h2 ? "open" : "closed", [h2]), D = reactExports.useMemo(() => jsxRuntimeExports.jsxs(StyledModal, { ref: k2, "aria-modal": h2, className: a$1(x, `${x}--${K}`, { [`${x}-fullscreen`]: $, [`${x}-with-close-button`]: T, [`${x}-rebound`]: v, [`${x}-rendered`]: B }, e2), closeButton: T, "data-state": K, fullScreen: $, role: "dialog", scroll: y, tabIndex: -1, ...N, onKeyDown: S, children: [jsxRuntimeExports.jsx(StyledModalHideTab, { ref: C, "aria-hidden": "true", className: `${x}-hide-tab`, role: "button", tabIndex: 0 }), T && jsxRuntimeExports.jsx(u$2, { onClick: E }), l2, jsxRuntimeExports.jsx(StyledModalHideTab, { ref: g, "aria-hidden": "true", className: `${x}-hide-tab`, role: "button", tabIndex: 0 })] }), [v, l2]);
  return jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: j ? jsxRuntimeExports.jsx(m$1, { clearTime: 300, enterTime: 20, leaveTime: 20, name: `${x}-wrapper`, visible: h2, children: D }) : h2 ? D : null });
};
h.toString = () => ".nextui-modal-wrapper";
const u$1 = n$2(h, { className: "", visible: false, rebound: false });
const o$1 = {};
const ModalContext = React.createContext(o$1);
const b = ({ children: e2, onClose: c2, onOpen: b2, open: v, autoMargin: x2, width: g, className: h2, preventClose: C, blur: N, animated: P, fullScreen: S, noPadding: k2, ...y }) => {
  const w = o$6("modal"), [, M] = o$4(null, { scrollLayer: true }), [j, B, E] = t$1(false), [T, D] = reactExports.useState(false), G = () => {
    c2 && c2(), B(false), M(false);
  };
  reactExports.useEffect(() => {
    void 0 !== v && (v && b2 && b2(), !v && E.current && c2 && c2(), B(v), M(v));
  }, [v]);
  const I = () => {
    D(true);
    const e3 = setTimeout(() => {
      D(false), clearTimeout(e3);
    }, 300);
  }, { bindings: L } = o$5(() => {
    C ? I() : G();
  }, KeyCode.Escape, { disableGlobalEvent: true, preventDefault: true }), O = reactExports.useMemo(() => ({ close: G, autoMargin: x2, noPadding: k2 }), []);
  return w ? reactDomExports.createPortal(jsxRuntimeExports.jsx(ModalContext.Provider, { value: O, children: jsxRuntimeExports.jsx(o$2, { animated: P, blur: N, fullScreen: S, maxWidth: g, visible: j, onClick: () => {
    C ? I() : G();
  }, ...L, children: jsxRuntimeExports.jsx(u$1, { animated: P, className: h2, fullScreen: S, rebound: T, visible: j, onCloseButtonClick: G, ...y, children: e2 }) }) }), w) : null;
};
b.toString = () => ".nextui-modal", b.defaultProps = { width: "400px", className: "", preventClose: false, fullScreen: false, closeButton: false, animated: true, blur: false, scroll: false, noPadding: false };
const o = b;
const m = "nextui-modal-header", d$2 = ({ children: t2, className: r, justify: d2, autoMargin: u2, css: c2, ...l2 }) => {
  const { autoMargin: f, noPadding: g } = reactExports.useContext(ModalContext), p = reactExports.useMemo(() => void 0 !== f ? f : u2, [u2, f]);
  return jsxRuntimeExports.jsx(StyledModalHeader, { autoMargin: p, className: a$1(m, { [`${m}-auto-margin`]: p, [`${m}-no-padding`]: g }, r), css: { justifyContent: d2, ...c2 }, noPadding: g, ...l2, children: t2 });
};
d$2.toString = () => ".nextui-modal-header";
const u = React.memo(d$2);
const d$3 = n$2(u, { className: "", justify: "center", autoMargin: true });
const d$1 = "nextui-modal-body", e$1 = ({ className: o2, children: r, autoMargin: e2, ...l2 }) => {
  const { autoMargin: u2, noPadding: c2 } = reactExports.useContext(ModalContext), g = reactExports.useMemo(() => void 0 !== u2 ? u2 : e2, [e2, u2]);
  return jsxRuntimeExports.jsx(StyledModalBody, { autoMargin: g, className: a$1(d$1, { [`${d$1}-auto-margin`]: g, [`${d$1}-no-padding`]: c2 }, o2), noPadding: c2, ...l2, children: r });
};
e$1.toString = () => ".nextui-modal-body";
const l$2 = React.memo(e$1);
const e$2 = n$2(l$2, { className: "", autoMargin: true });
const e = "nextui-modal-footer", d = ({ children: t2, className: r, justify: d2, autoMargin: l2, css: u2, ...c2 }) => {
  const { autoMargin: f, noPadding: g } = reactExports.useContext(ModalContext), p = reactExports.useMemo(() => void 0 !== f ? f : l2, [l2, f]);
  return jsxRuntimeExports.jsx(StyledModalFooter, { autoMargin: p, className: a$1(e, { [`${e}-auto-margin`]: p, [`${e}-no-padding`]: g }, r), css: { justifyContent: d2, ...u2 }, noPadding: g, ...c2, children: t2 });
};
d.toString = () => ".nextui-modal-footer";
const l = React.memo(d);
const l$1 = n$2(l, { className: "", justify: "flex-end", autoMargin: true });
o.Header = d$3, o.Body = e$2, o.Footer = l$1;
const ModalDisplay = () => {
  const [shouldPresentModal, setShouldPresentModal] = reactExports.useState(false);
  const [visible, setVisible] = reactExports.useState(false);
  reactExports.useEffect(() => {
    const fetchModalState = async () => {
      try {
        const presentModalState = await presentModal();
        setShouldPresentModal(presentModalState);
        setVisible(presentModalState);
      } catch (error) {
        console.error("Error fetching switch data:", error);
      }
    };
    fetchModalState();
  }, []);
  const closeHandler = () => {
    handleCloseModal();
    setVisible(false);
  };
  return shouldPresentModal && /* @__PURE__ */ jsxRuntimeExports.jsxs(
    o,
    {
      closeButton: true,
      blur: true,
      "aria-labelledby": "modal-title",
      open: visible,
      onClose: closeHandler,
      className: "max-h-[440px]",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(o.Header, { className: "absolute flex flex-col items-start top-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(t$2, { className: "font-semibold", size: 16, children: "What's New In 1.6.15" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(t$2, { className: "text-[12px]", children: "June 21, 2023" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(o.Body, { className: "mt-[50px]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(t$2, { className: "added mb-4", children: "Increased Performance" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(t$2, { className: "text-[13px] mb-2", children: [
            "I have changed the way the extension hides videos and other elements, opting to use stylesheets over javascript logic, this should result in;",
            /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Significantly less system resource usage" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Videos and other elements being hidden long before the page finishes loading" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "The ability to toggle options on/off and see the changes in real time, without needing to refresh the page" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "A much nicer user experience overall 🙂" })
            ] }),
            "If you have any issues at all, please feel free to join the Discord support server by ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "https://discord.gg/HAFP4P7Dfr", target: "_blank", children: "clicking here" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(t$2, { className: "changed mb-4", children: "Power Button" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(t$2, { className: "text-[13px] mb-2", children: "The power button to enable/disable the extension has been moved to the settings menu (top right)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(t$2, { className: "removed mb-4", children: "Statistics Tab" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(t$2, { className: "text-[13px] mb-2", children: "I decided to remove the statistics tab as it will no longer work with the changes mentioned above" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(o.Footer, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(t$3, { flat: true, color: "none", className: "w-full", onPress: closeHandler, children: "Close" }) })
      ]
    }
  );
};
export {
  ModalDisplay as default
};
