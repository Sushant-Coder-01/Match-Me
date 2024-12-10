import { Button, Select, SelectItem, Slider, Switch } from "@nextui-org/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FaFemale, FaMale } from "react-icons/fa";

const Filters = () => {
  const orderByList = [
    { label: "Last active", value: "updated" },
    { label: "Newest members", value: "created" },
  ];

  const genderList = [
    { value: "Male", icon: FaMale },
    { value: "Female", icon: FaFemale },
  ];

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleAgeSelect = (values: number[]) => {
    const params = new URLSearchParams(searchParams);

    params.set("ageRange", values.toString());
    router.replace(`${pathname}?${params}`);
  };

  return (
    <div>
      <div className="shadow-md py-2">
        <div className="flex flex-row justify-around items-center">
          <div className="flex gap-2 items-center">
            <div className="text-default font-semibold text-xl">
              Results:{""} totalCount
            </div>
          </div>

          <div className="flex gap-2 items-center">
            <div className="font-semibold text-lg">Gender:</div>
            {genderList.map(({ icon: Icon, value }) => (
              <Button key={value} isIconOnly color="default" size="md">
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
              defaultValue={[18, 100]}
              aria-label="Age range slider"
              color="foreground"
              className="font-semibold"
              onChangeEnd={(values) => handleAgeSelect(values as number[])}
            />
          </div>

          <div className="flex flex-row items-center gap-2">
            <p className="text-md font-semibold">With Photo:</p>
            <Switch color="warning" defaultSelected size="md" />
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
