"use client";
import DropDown from "@/components/ui/dropdown";
import SearchBar from "@/components/ui/searchbar";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import Box from "./box";
import CheckBox from "@/components/ui/checkbox";
import SearchBarSecondary from "@/components/ui/searchbarsecondary";
import Collapse from "@/components/ui/collapse";
import { Type, styles, tattooThemes } from "@/lib/global/styles";
import RangeInput from "@/components/ui/rangeinput";
import Button from "@/components/ui/Button";
import { Locations } from "@/lib/global/locations";
import ControlledMultiInput from "@/components/ui/controlledmultiinput";

const useFilterParams = () => {
  const [currentFilters, setCurrentFilters] = useState<any>([]);
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  useEffect(() => {
    setCurrentFilters(parseFilters());
  }, [searchParams]);

  const applyFilter = (key: any, value: any) => {
    const params = new URLSearchParams(searchParams);
    if (value === undefined || value === null || value === "") params.delete(key);
    else {
      params.set(key, value);
    }
    router.replace(`${pathname}?${params.toString()}`);
  };

  const applyFilters = (filters: any) => {
    const params = new URLSearchParams();

    Object.entries(filters).forEach(([key, values]: any) => {
      // Check if 'values' is an array and handle accordingly
      if (Array.isArray(values)) {
        values.forEach((value) => params.append(key, value));
      } else {
        params.append(key, values);
      }
    });

    router.replace(`${pathname}?${params.toString()}`);
  };

  const parseFilters = () => {
    const newFilters = [];

    // Assuming your URL query parameters are structured as arrays
    //@ts-ignore
    for (const [key, value] of searchParams.entries()) {
      if (Array.isArray(value)) {
        value.forEach((val) => newFilters.push([key, val]));
      } else {
        newFilters.push([key, value]);
      }
    }

    return newFilters;
  };

  const getValue = (key: any) => {
    const filter = currentFilters.find((filter: any) => filter[0] === key);
    return filter ? filter[1] : "";
  };

  return {
    applyFilter,
    applyFilters,
    currentFilters,
    getValue,
  };
};

export const SearchBarFilter = () => {
  const { applyFilter, getValue, currentFilters } = useFilterParams();

  const searchRef = useRef<any>(null);
  const searchArtist = () => {
    applyFilter("search", searchRef.current.value);
  };

  useEffect(() => {
    const search = getValue("search");
    if (search) {
      searchRef.current.value = search;
    }
  }, [currentFilters]);

  return <SearchBar ref={searchRef} onSearch={searchArtist} text="Search for Artists" className="md:min-w-[400px]" containerClassName="mx-auto" />;
};

export const LocationFilter = () => {
  const { applyFilter, getValue } = useFilterParams();
  const [value, setValue] = useState<any>([]);

  const options: any = Locations;

  const locationSearch = (option: any) => {
    applyFilter("location", option && option.length > 0 ? option : undefined);
  };

  useEffect(() => {
    const valu = getValue("location")
      ?.split(",")
      ?.filter((val: any) => val !== "" && val !== undefined);
    // for each value, find the corresponding option , if the array is empty return undefined
    setValue(valu && valu.length > 0 ? valu : []);
  }, [getValue("location")]);

  return (
    <ControlledMultiInput
      label={<span className="text-black">Locations:</span>}
      options={options}
      value={value}
      className="!text-black"
      contentOuterClassName="max-w-[300px] min-w-[300px]"
      onChange={locationSearch}
    />
  );
};

export const SortByFilter = () => {
  const { applyFilter, getValue } = useFilterParams();

  const options = [
    { label: "Newest", value: "newest" },
    { label: "Best Reviews", value: "best_reviews" },
    { label: "Price (Low to High)", value: "price_asc" },
    { label: "Price (High to Low)", value: "price_desc" },
  ];

  const sortFilter = (option: any) => {
    applyFilter("sort", option?.value);
  };

  const value = () => {
    return options.find((option) => option.value === getValue("sort"));
  };

  return <DropDown onChange={sortFilter} value={value()} label="Sort By:" defaultOption={options[0]} options={options} />;
};

export const FavoriteFilter = () => {
  const { applyFilter, getValue } = useFilterParams();

  const favoriteFilter = (value: any) => {
    applyFilter("favorite", value ? "true" : undefined);
  };

  const value = () => {
    return getValue("favorite") === "true";
  };

  return <CheckBox value={value()} onChange={favoriteFilter} label="Saved Artists" className="font-['Dayrom']" Box={Box} />;
};

export const CategoriesFilter = () => {
  const { applyFilters, currentFilters } = useFilterParams();
  const [filters, setFilters] = useState<any>([]);
  const [filterSearch, setFilterSearch] = useState<any>();

  useEffect(() => {
    setFilters(currentFilters);
  }, [currentFilters]);

  const handleCategoryClick = (cat: any, subcat: any) => (value: any) => {
    const newFilters = [...filters];
    if (value) {
      newFilters.push([cat, subcat]);
    } else {
      const index = newFilters.findIndex((filter: any) => filter[0] === cat && filter[1] === subcat);
      newFilters.splice(index, 1);
    }
    setFilters(newFilters);
  };

  const handleHourlyRateInput = (key: any) => (e: any) => {
    const newFilters = [...filters];
    const index = newFilters.findIndex((filter: any) => filter[0] === key);
    if (index === -1) {
      newFilters.push([key, e.target.value]);
    } else {
      newFilters[index][1] = e.target.value;
    }
    setFilters(newFilters);
  };

  const handleHourlyRate = (values: any) => {
    let newFilters = [...filters];
    const maxindex = newFilters.findIndex((filter: any) => filter[0] === "maxHourlyRate");
    const minindex = newFilters.findIndex((filter: any) => filter[0] === "minHourlyRate");
    if (maxindex === -1) {
      newFilters = [...newFilters, ["maxHourlyRate", values[1]]];
    } else {
      newFilters[maxindex][1] = values[1];
    }
    if (minindex === -1) {
      newFilters = [...newFilters, ["minHourlyRate", values[0]]];
    } else {
      newFilters[minindex][1] = values[0];
    }
    setFilters(newFilters);
  };

  const handleKeyPress = (e: any) => {
    // Allow numbers, decimal points, and control characters (like backspace)
    const validChars = /[0-9.]|\./;
    const validKeys = ["Backspace", "ArrowLeft", "ArrowRight", "Delete", "Tab"];
    if (!validChars.test(e.key) && !validKeys.includes(e.key) && e.preventDefault) {
      e.preventDefault();
    }
  };

  const apply = () => {
    const aggregatedFilters = filters.reduce((acc: any, [key, value]: any) => {
      if (acc.hasOwnProperty(key)) {
        if (Array.isArray(acc[key])) {
          acc[key].push(value);
        } else {
          acc[key] = [acc[key], value];
        }
      } else {
        acc[key] = value;
      }
      return acc;
    }, {});

    applyFilters(aggregatedFilters);
  };

  const handleCategorySearch = (e: any) => {
    setFilterSearch(e.target.value?.toLowerCase());
  };

  //#region filter search
  const isOptionVisible = (label: string) => {
    if (!filterSearch) return true;
    return label.toLowerCase().includes(filterSearch);
  };

  const hasVisibleOptions = (options: any) => {
    return options.some((option: any) => isOptionVisible(option.label));
  };

  const stylesOptions = styles;

  const tattooThemeOptions = tattooThemes;

  const typeOptions = Type;

  //#endregion

  const filterCheckboxValue = (key: any, val: any) => {
    // const filter = filters.find((filter: any) => filter[0] === key);
    // return filter ? filter[1] : "";
    const filter = filters.find((filter: any) => filter[0] === key && filter[1] === val);
    return !!filter;
  };

  const inputValue = (key: any) => {
    const filter = filters.find((filter: any) => filter[0] === key);
    return filter ? filter[1] : "";
  };

  return (
    <>
      <div className="mb-[1rem] flex items-center gap-[1rem] whitespace-nowrap flex-wrap">
        <Button onClick={apply} className="w-full">
          Apply Filters
        </Button>
        <Button href="/artists" className="w-full">
          Clear Filters
        </Button>
      </div>
      <SearchBarSecondary onChange={handleCategorySearch} onSearch={apply} containerClassName="mb-[2rem] max-w-[250px]" />
      <Collapse title="Hourly Rate" className="mb-[2rem]" expanded>
        <RangeInput
          className="mb-[1rem]"
          values={[Math.max(0, parseInt(inputValue("minHourlyRate"))) || 0, Math.min(500, parseInt(inputValue("maxHourlyRate"))) || 500]}
          onChange={(values: any) => {
            handleHourlyRate(values);
          }}
        />
        <div className='flex items-center gap-[1rem] font-["Helvetica"] mx-auto'>
          <div className="flex items-center gap-[5px]">
            <input
              onKeyDown={handleKeyPress}
              value={inputValue("minHourlyRate")}
              onChange={handleHourlyRateInput("minHourlyRate")}
              placeholder="min"
              className="outline-none border-[1px] min-w-0 placeholder:text-white/70 px-[5px] max-w-[80px] bg-transparent border-white/70 rounded-[5px]"
            />
            <span>/hr</span>
          </div>
          <div className="flex items-center gap-[5px]">
            <input
              value={inputValue("maxHourlyRate")}
              onKeyDown={handleKeyPress}
              onChange={handleHourlyRateInput("maxHourlyRate")}
              placeholder="max"
              className="outline-none border-[1px] min-w-0 placeholder:text-white/70 px-[5px] max-w-[80px] bg-transparent border-white/70 rounded-[5px]"
            />
            <span>/hr</span>
          </div>
        </div>
      </Collapse>
      {hasVisibleOptions(stylesOptions) && (
        <Collapse title="Styles" className="mb-[2rem]" expanded>
          {stylesOptions.map((style: any) => {
            return (
              isOptionVisible(style.label) && (
                <CheckBox
                  className="mb-[5px]"
                  value={filterCheckboxValue("styles", style.value)}
                  onChange={handleCategoryClick("styles", style.value)}
                  label={style.label}
                  count={1259}
                />
              )
            );
          })}
        </Collapse>
      )}
      {hasVisibleOptions(tattooThemeOptions) && (
        <Collapse title="Tattoo Themes" className="mb-[2rem]" expanded>
          {tattooThemeOptions.map((style: any) => {
            return (
              isOptionVisible(style.label) && (
                <CheckBox
                  className="mb-[5px]"
                  value={filterCheckboxValue("tattooThemes", style.value)}
                  onChange={handleCategoryClick("tattooThemes", style.value)}
                  label={style.label}
                  count={1259}
                />
              )
            );
          })}
        </Collapse>
      )}
      {hasVisibleOptions(typeOptions) && (
        <Collapse title="Types" className="mb-[2rem]" expanded>
          {typeOptions.map((style: any) => {
            return (
              isOptionVisible(style.label) && (
                <CheckBox
                  className="mb-[5px]"
                  value={filterCheckboxValue("type", style.value)}
                  onChange={handleCategoryClick("type", style.value)}
                  label={style.label}
                  count={1259}
                />
              )
            );
          })}
        </Collapse>
      )}
    </>
  );
};

export default SearchBarFilter;
