import { Dispatch, Fragment, SetStateAction, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import classNames from "classnames";

interface ISort {
  name: string;
  selected: boolean;
}

interface SortProps {
  options: string[];
  name?: string;
  position?: "right" | "left";
  type: "single" | "multi";
  onChangeSingle?: Dispatch<SetStateAction<string>>;
  onChangeMulti?: Dispatch<SetStateAction<string[]>>;
}


const Sort = ({ options, name = "Sort", position = "left", type = "single", onChangeSingle, onChangeMulti }: SortProps) => {
  let positionClass = position === "right" ? "right-0" : "right--10";

  const [sortOptions, setSortOptions] = useState<ISort[]>(
    options.map((o, i) => ({
      name: o,
      selected: type === "single" && i === 0,
    }))
  );

  let selectedMultiOption: string[] = [];

  
  const handleSortChange = (selectedOption: string) => {
    const updatedSortOptions = sortOptions.map((o) => ({
      ...o,
      selected: type === "single" ? o.name === selectedOption : type === "multi" ? (o.name === selectedOption ? !o.selected : o.selected) : o.selected,
    }));
    setSortOptions(updatedSortOptions);
    //console.log("updatedSortOptions: " + updatedSortOptions[0].name)
    if(type === "single" && onChangeSingle){
      onChangeSingle(selectedOption)
    }
    if(type === "multi" && onChangeMulti){
      for(const op of updatedSortOptions){
        op.selected ? selectedMultiOption.push(op.name) : "";
      }
      //console.log(selectedMultiOption)
      onChangeMulti(selectedMultiOption);
    }
  };

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
          {name}
          <ChevronDownIcon
            className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
            aria-hidden="true"
          />
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
          className={`absolute ${positionClass} z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none`}
        >
          <ul className="py-1">
            {sortOptions.map((o) => (
              <Menu.Item key={o.name}>
                {({ active }) => (
                  <li
                    className={classNames(
                      o.selected ? "font-medium text-gray-900" : "text-gray-500",
                      active ? "bg-gray-100" : "",
                      "flex items-center px-4 py-2 text-sm cursor-pointer select-none"
                    )}
                    onClick={() => {
                      handleSortChange(o.name);
                    }}
                  >
                    {type === "multi" && (
                      <input
                        type="checkbox"
                        className="mr-2"
                        checked={o.selected}
                        onChange={() => {
                          handleSortChange(o.name);
                        }}
                      />
                    )}
                    <span>{o.name}</span>
                  </li>
                )}
              </Menu.Item>
            ))}
          </ul>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default Sort;
