"use client";

import { useFilters } from "@/hooks/useFilters";
import {
  Button,
  Select,
  SelectItem,
  Slider,
  Switch,
} from "@nextui-org/react";
import { useState } from "react";
import { FiFilter } from "react-icons/fi";

const Filters = () => {
  const {
    orderByList,
    genderList,
    selectAge,
    selectGender,
    selectOrder,
    selectPhoto,
    filters,
    totalCount,
  } = useFilters();

  const { ageRange, gender, orderBy, withPhoto } = filters;
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <div className="relative">
      {/* Desktop Filters */}
      <div className="hidden relative md:block">
        <div className="shadow-md py-2">
          <div className="flex flex-row justify-around items-center">
            <div className="flex gap-2 items-center">
              <div className="text-foreground font-semibold text-xl">
                Results: {totalCount}
              </div>
            </div>

            <div className="flex gap-2 items-center">
              <div className="font-semibold text-lg">Gender:</div>
              {genderList.map(({ icon: Icon, value }) => (
                <Button
                  key={value}
                  isIconOnly
                  color="default"
                  size="md"
                  variant={gender.includes(value) ? "solid" : "light"}
                  className={`${
                    gender.includes(value) ? "bg-pink-500" : "bg-gray-500"
                  }`}
                  onPress={() => selectGender(value)}
                >
                  <Icon size={24} />
                </Button>
              ))}
            </div>

            <div className="flex flex-row items-center gap-2 w-1/4">
              <Slider
                label="Age Range"
                size="sm"
                minValue={18}
                maxValue={100}
                defaultValue={ageRange}
                aria-label="Age range slider"
                color="foreground"
                className="font-semibold"
                onChangeEnd={selectAge}
              />
            </div>

            <div className="flex flex-row items-center gap-2">
              <p className="text-md font-semibold">With Photo:</p>
              <Switch
                onChange={(checked) => {
                  selectPhoto(checked);
                }}
                color="danger"
                defaultSelected={withPhoto}
                size="md"
              />
            </div>

            <div className="w-1/4">
              <Select
                size="sm"
                fullWidth
                label="Order By"
                variant="bordered"
                color="default"
                aria-label="Order by selector"
                className="font-semibold"
                selectedKeys={new Set([orderBy])}
                onSelectionChange={selectOrder}
              >
                {orderByList.map((item) => (
                  <SelectItem
                    key={item.value}
                    value={item.value}
                    color="default"
                    className="font-semibold"
                  >
                    {item.label}
                  </SelectItem>
                ))}
              </Select>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Filter Icon */}
      <div className="block md:hidden fixed bottom-4 right-4 z-50">
        <Button
          isIconOnly
          size="lg"
          color="primary"
          onPress={() => {
            setOpenMenu(!openMenu);
          }}
          aria-label="Open Filters"
        >
          <FiFilter
            size={24}
            className={`${openMenu ? "text-pink-500" : "text-white"}`}
          />
        </Button>
      </div>

      {openMenu && (
        <div
          // isOpen={openMenu}
          // onClose={() => setOpenMenu(false)}
          // placement="bottom"
          className="block md:hidden absolute z-40"
        >
          <div className="w-screen h-auto bg-white shadow-2xl fixed rounded-t-lg overflow-hidden">
            <div className="p-5 bg-white flex flex-col gap-4">
              {/* Header */}
              <div className="text-center font-semibold text-2xl text-pink-600 border-b border-gray-200 pb-4">
                Filters
              </div>

              <div className="flex items-center justify-center">
                <p className="text-lg font-semibold text-gray-700">
                  Results: {totalCount}
                </p>
              </div>

              {/* Gender Filter */}
              <div className="flex items-center gap-5 p-4 border rounded-lg border-gray-300">
                <p className="text-xl font-semibold">Gender:</p>
                <div className="flex items-center gap-2">
                  {genderList.map(({ icon: Icon, value }) => (
                    <Button
                      key={value}
                      isIconOnly
                      color="default"
                      size="md"
                      variant={gender.includes(value) ? "solid" : "light"}
                      className={`transition ${
                        gender.includes(value) ? "bg-pink-500" : "bg-gray-300"
                      } hover:shadow`}
                      onPress={() => selectGender(value)}
                    >
                      <Icon size={20} />
                    </Button>
                  ))}
                </div>
              </div>

              {/* Age Range Slider */}
              <div className="p-4 border rounded-lg border-gray-300">
                <p className="text-lg font-semibold mb-2">
                </p>
                <Slider
                  label="Age Range"
                  size="sm"
                  minValue={18}
                  maxValue={100}
                  defaultValue={ageRange}
                  aria-label="Age range slider"
                  color="warning"
                  className="font-semibold"
                  onChangeEnd={selectAge}
                />
              </div>

              {/* With Photo Toggle */}
              <div className="p-4 border rounded-lg border-gray-300 flex items-center gap-3">
                <p className="text-lg font-semibold">With Photo:</p>
                <Switch
                  onChange={selectPhoto}
                  color="danger"
                  defaultSelected={withPhoto}
                  size="md"
                />
              </div>

              {/* Order By Selector */}
              <div className="p-4 border rounded-lg border-gray-300">
                <Select
                  size="sm"
                  fullWidth
                  label="Order By"
                  variant="bordered"
                  color="default"
                  aria-label="Order by selector"
                  selectedKeys={new Set([orderBy])}
                  onSelectionChange={selectOrder}
                  className="font-semibold"
                >
                  {orderByList.map((item) => (
                    <SelectItem
                      key={item.value}
                      value={item.value}
                      className="font-semibold"
                    >
                      {item.label}
                    </SelectItem>
                  ))}
                </Select>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Filters;
