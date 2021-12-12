import React from "react";
import { useUserConfig } from "../context/userConfigContext";

export default function ColorBrowser() {
  const { state, dispatch } = useUserConfig();

  return (
    <div className="flex justify-center">
      <div className="pt-2 pb-4">
        {Object.keys(state?.themes).map(
          (key, i) =>
            key !== "default" && (
              <button
                key={key}
                onClick={() => dispatch({ type: "changeTheme", name: key })}
              >
                <div
                  className="flex items-center justify-center w-8 h-8 mx-4 rounded-full shadow-2xl"
                  style={{
                    backgroundColor: state?.themes[key].bgColor,
                    borderWidth: "2px",
                    borderStyle: "solid",
                    borderColor:
                      state?.theme.bgColor === state?.themes[key].bgColor
                        ? state?.theme.borderColor
                        : "transparent",
                  }}
                >
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{
                      backgroundColor: state?.themes[key].color,
                    }}
                  />
                </div>
              </button>
            )
        )}
      </div>
    </div>
  );
}
