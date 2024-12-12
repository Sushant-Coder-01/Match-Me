import { usePathname, useRouter } from "next/navigation";
import useFilterStore from "./useFilterStore";
import { ChangeEvent, useEffect, useTransition } from "react";
import { FaFemale, FaMale } from "react-icons/fa";
import usePaginationStore from "./usePaginationStore";
import { useShallow } from "zustand/react/shallow";

export const useFilters = () => {
  const pathname = usePathname();
  const router = useRouter();

  const { filters, setFilters } = useFilterStore();

  const { pageNumber, pageSize, setPage, totalCount } = usePaginationStore(
    useShallow((state) => ({
      pageNumber: state.pagination.pageNumber,
      pageSize: state.pagination.pageSize,
      setPage: state.setPage,
      totalCount: state.pagination.totalCount,
    }))
  );

  const { gender, ageRange, orderBy, withPhoto } = filters;

  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (gender || ageRange || orderBy || withPhoto) {
      setPage(1);
    }
  }, [gender, ageRange, orderBy, withPhoto]);

  useEffect(() => {
    startTransition(() => {
      const searchParams = new URLSearchParams();

      if (gender) searchParams.set("gender", gender.toString());
      if (ageRange) searchParams.set("ageRange", ageRange.toString());
      if (orderBy) searchParams.set("orderBy", orderBy);
      if (withPhoto) searchParams.set("withPhoto", withPhoto.toString());
      // if (pageNumber) searchParams.set("pageNumber", pageNumber.toString());
      searchParams.set("withPhoto", withPhoto.toString());

      router.replace(`${pathname}?${searchParams}`);
    });
  }, [
    gender,
    ageRange,
    orderBy,
    withPhoto,
    // router,
    // pathname,
    // pageNumber,
  ]);

  const orderByList = [
    { label: "Last active", value: "updated" },
    { label: "Newest members", value: "created" },
  ];

  const genderList = [
    { value: "male", icon: FaMale },
    { value: "female", icon: FaFemale },
  ];

  const handleAgeSelect = (values: number[]) => {
    setFilters("ageRange", values);
  };

  const handleOrderSelect = (value: Selection) => {
    if (value instanceof Set) {
      setFilters("orderBy", value.values().next().value);
    }
  };

  const handleGenderSelect = (value: string) => {
    if (gender.includes(value)) {
      setFilters(
        "gender",
        gender.filter((genderValue) => genderValue !== value)
      );
    } else {
      setFilters("gender", [...gender, value]);
    }
  };

  const handleWithPhotoToggle = (e: ChangeEvent<HTMLInputElement>) => {
    setFilters("withPhoto", e.target.value);
  };

  return {
    orderByList,
    genderList,
    selectAge: handleAgeSelect,
    selectOrder: handleOrderSelect,
    selectGender: handleGenderSelect,
    selectPhoto: handleWithPhotoToggle,
    filters,
    totalCount,
    isPending,
  };
};
