import { useFilters } from "@/hooks/useFilters";
import {
  Button,
  Select,
  SelectItem,
  Slider,
  Switch,
} from "@nextui-org/react";

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

  return (
    <div>
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
  );
};

export default Filters;
