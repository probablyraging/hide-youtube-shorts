import { j as jsxRuntimeExports, t, I as InfoTooltip, B as Badge, a as t$1, u as updateSwitchState } from "./index.js";
const SwitchContainer = ({ darkMode, title, description, switchName, state, isNew, hasInfo }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `switch-container flex flex-row justify-between items-center pl-4 pr-4 py-4 ${darkMode ? "border-[#2d2d2d]" : "border-[#d5d5d5]"}`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(t, { className: "text-[14px] font-medium", children: title }),
        hasInfo && /* @__PURE__ */ jsxRuntimeExports.jsx(InfoTooltip, { darkMode }),
        isNew && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { content: "new", darkMode })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(t, { className: `text-[12px] ${darkMode ? "text-textAltDark" : "text-textAlt"} pr-5`, children: description })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      t$1,
      {
        onChange: () => updateSwitchState(switchName),
        checked: state,
        size: "sm",
        initialChecked: true
      }
    )
  ] });
};
export {
  SwitchContainer as default
};
