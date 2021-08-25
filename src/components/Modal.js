import React, { Fragment } from "react";
import { Transition } from "@headlessui/react";
import { useUserConfig } from "../context/userConfigContext";

export default function Modal({ open, setOpen, children }) {
  const { state } = useUserConfig();
  return (
    <Transition.Root show={open} as={Fragment}>
      <div className="fixed z-10 inset-0 overflow-y-auto">
        <div className="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div
              style={{
                backgroundColor: state?.theme.navBgColor,
                opacity: "75%",
              }}
              className="fixed inset-0 transition-opacity"
              onClick={() => setOpen(false)}
            />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div
              style={{
                color: state?.theme.color,
                backgroundColor: state?.theme.bgColor,
                width: "90vw",
                height: "90vh",
              }}
              className="inline-block w-full max-w-6xl px-4 pt-5 pb-4 overflow-hidden text-left align-middle rounded-lg shadow-xl sm:p-6 transform transition-all sm:my-8"
            >
              {children}
              <div className="mt-5 sm:mt-6">
                <button
                  type="button"
                  className="sr-only"
                  onClick={() => setOpen(false)}
                >
                  Go back to dashboard
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </div>
    </Transition.Root>
  );
}
