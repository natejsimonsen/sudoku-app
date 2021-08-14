import React, { Fragment } from "react"
import { Menu, Transition } from "@headlessui/react"
import { ChevronDownIcon } from "@heroicons/react/solid"
import { useUserConfig } from "../context/userConfigContext"
import colors from "../config/colors"

export default function Dropdown(props) {
  const { state } = useUserConfig()
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium border border-gray-300 rounded-md shadow-sm">
          Options
          <ChevronDownIcon className="w-5 h-5 ml-2 -mr-1" aria-hidden="true" />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items
          style={{ backgroundColor: state?.theme.navBgColor }}
          className="absolute right-0 w-56 mt-2 shadow-lg origin-top-right rounded-md focus:outline-none"
        >
          <div className="px-8 pt-2 pb-4 space-y-4 divide-y">
            {props.keys.map(key => (
              <Menu.Item as="button" onClick={props.onClick.bind(null, key)}>
                <div className="flex items-center pt-4">
                  <div
                    className="w-8 flex items-center justify-center shadow-2xl h-8 mx-4 rounded-full"
                    style={{
                      backgroundColor: colors[key].bgColor,
                    }}
                  >
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{
                        backgroundColor: colors[key].color,
                      }}
                    />
                  </div>
                  {key}
                </div>
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}
