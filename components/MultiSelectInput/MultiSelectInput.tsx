import { useEffect, useRef, useState } from "react"

export interface MultiSelectInputProps {
  label: string
  selected?: string[]
  onChange: (values: string[]) => void
  options: { value: string; label: string }[]
  renderLabel?: (option: { value: string; label: string }) => JSX.Element
}

export function MultiSelectInput(props: MultiSelectInputProps) {
  const [showOptions, setShowOptions] = useState(false)
  const wrapperRef = useRef<any>(null)

  useEffect(() => {
    function handleClickOutside(event: any) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowOptions(false)
      }
    }

    if (showOptions) {
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside)
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside)
      }
    }
  }, [showOptions, wrapperRef])

  function onSelect(option: { value: string; label: string }) {
    if (props.selected?.some((selected) => selected === option.value)) {
      props.onChange(props.selected.filter((selected) => selected !== option.value))
      return
    } else {
      props.onChange([...(props.selected ?? []), option.value])
    }
  }

  const selected = props.selected?.map((selected) => props.options.find((option) => option.value === selected))

  return (
    <div ref={wrapperRef} className="w-[200px]">
      <label id="listbox-label" className="block text-sm font-medium leading-6 text-gray-300">
        {props.label}
      </label>
      <div className="relative mt-2">
        <button
          onClick={() => setShowOptions(!showOptions)}
          type="button"
          className="relative h-10 w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6"
          aria-haspopup="listbox"
          aria-expanded="true"
          aria-labelledby="listbox-label"
        >
          {props.selected && (
            <span className="flex items-center">
              <span className="ml-3 block truncate">{selected?.map((selected) => selected?.label).join(", ")}</span>
            </span>
          )}
          <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
            <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path
                fill-rule="evenodd"
                d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z"
                clip-rule="evenodd"
              />
            </svg>
          </span>
        </button>
        {showOptions && (
          <ul
            className="opacity/5 absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black focus:outline-none sm:text-sm"
            tabIndex={-1}
            role="listbox"
            aria-labelledby="listbox-label"
            aria-activedescendant="listbox-option-3"
          >
            {props.options.map((option) => (
              <li
                key={option.value}
                className="relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900"
                id="listbox-option-0"
                role="option"
                aria-selected={props.selected?.some((selected) => selected === option.value)}
                onClick={() => onSelect(option)}
              >
                {props.renderLabel && props.renderLabel(option)}
                {!props.renderLabel && (
                  <>
                    <div className="flex items-center">
                      <span className="ml-3 block truncate font-normal">{option.label}</span>
                    </div>
                  </>
                )}
                {props.selected?.includes(option.value) && (
                  <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600">
                    <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path
                        fill-rule="evenodd"
                        d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </span>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
