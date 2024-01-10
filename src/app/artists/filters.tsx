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
    else params.set(key, value);
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
  }

  return {
    applyFilter,
    applyFilters,
    currentFilters,
    getValue
  };
};

export const SearchBarFilter = () => {
  const { applyFilter,getValue,currentFilters } = useFilterParams();

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

  return <SearchBar
  ref={searchRef} onSearch={searchArtist} text="Search for Artists" className="md:min-w-[400px]" containerClassName="mx-auto" />;
};

export const LocationFilter = () => {
  const { applyFilter,getValue } = useFilterParams();

  const options = [
    { label: "All", value: "" },
    { label: "Location 1", value: "1" },
    { label: "Location 2", value: "2" },
    { label: "Location 3", value: "3" },
  ];

  const locationSearch = (option: any) => {
    applyFilter("location", option?.value);
  };

  const value = ()=>{
    return options.find((option)=>option.value===getValue("location"));
  }

  return (
    <DropDown
      onChange={locationSearch}
      value={value()}
      label="Location:"
      defaultOption={options[0]}
      options={options}
    />
  );
};

export const SortByFilter = () => {
  const { applyFilter,getValue } = useFilterParams();

  const options = [
    { label: "Newest", value: "newest" },
    { label: "Best Reviews", value: "best_reviews" },
    { label: "Price (Low to High)", value: "price_asc" },
    { label: "Price (High to Low)", value: "price_desc" },
  ];

  const sortFilter = (option: any) => {
    applyFilter("sort", option?.value);
  };

  const value = ()=>{
    return options.find((option)=>option.value===getValue("sort"));
  }

  return (
    <DropDown
      onChange={sortFilter}
      value={value()}
      label="Sort By:"
      defaultOption={options[0]}
      options={options}
    />
  );
};

export const FavoriteFilter = () => {
  const { applyFilter,getValue } = useFilterParams();

  const favoriteFilter = (value: any) => {
    applyFilter("favorite", value ? "true" : undefined);
  };

  const value = ()=>{
    return getValue("favorite")==="true";
  }

  return <CheckBox 
  value={value()}
  onChange={favoriteFilter} label="Saved Artists" className="font-['Dayrom']" Box={Box} />;
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

  const handleHourlyRate = (cat: any) => (e: any) => {
    if(e.target.value==="" || e.target.value==="0") return handleCategoryClick(cat, null)(false)    
    
    const newFilters = [...filters];
    const index = newFilters.findIndex((filter: any) => filter[0] === cat);
    if (index === -1) {
      newFilters.push([cat, e.target.value]);
    } else {
      newFilters[index][1] = e.target.value;
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

  const experienceLevelOptions = [
    { label: "Entry Level", value: "entry" },
    { label: "Intermediate", value: "intermediate" },
    { label: "Expert", value: "expert" },
  ];

  const hourlyRateOptions = [
    { label: "minHourlyRate", value: "minHourlyRate" },
    { label: "maxHourlyRate", value: "maxHourlyRate" },
  ];

  const stylesOptions = [
    { label: "Lorem Ipsum", value: "lorem_ipsum" },
    { label: "Lorem Ipsum", value: "lorem_ipsum" },
    { label: "Lorem Ipsum", value: "lorem_ipsum" },
  ];

  const typeOptions = [
    { label: "Tattoo Gun", value: "tattoo_gun" },
    { label: "Tattoo Gun", value: "tattoo_gun" },
    { label: "Tattoo Gun", value: "tattoo_gun" },
  ];

  const loremIpsumOptions = [
    { label: "Lorem Ipsum", value: "lorem_ipsum" },
    { label: "Lorem Ipsum", value: "lorem_ipsum" },
    { label: "Lorem Ipsum", value: "lorem_ipsum" },
  ];

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
      <div className="mb-[1rem]">Category</div>
      <SearchBarSecondary onChange={handleCategorySearch} onSearch={apply} containerClassName="mb-[2rem] max-w-[250px]" />
      {hasVisibleOptions(experienceLevelOptions) && (
        <Collapse title="Experience Level" expanded className="mb-[2rem]">
          {isOptionVisible("Entry Level") && (
            <CheckBox value={filterCheckboxValue("experienceLevel", "entry")} onChange={handleCategoryClick("experienceLevel", "entry")} label="Entry Level" count={1259} />
          )}
          {isOptionVisible("Intermediate") && (
            <CheckBox
              value={filterCheckboxValue("experienceLevel", "intermediate")}
              onChange={handleCategoryClick("experienceLevel", "intermediate")}
              label="Intermediate"
              count={1259}
            />
          )}
          {isOptionVisible("Expert") && (
            <CheckBox value={filterCheckboxValue("experienceLevel", "expert")} onChange={handleCategoryClick("experienceLevel", "expert")} label="Expert" count={1259} />
          )}
        </Collapse>
      )}
      {hasVisibleOptions(hourlyRateOptions) && (
        <Collapse title="Hourly Rate" className="mb-[2rem]" expanded>
          <div className='flex items-center gap-[1rem] font-["Helvetica"]'>
            <div className="flex items-center gap-[5px]">
              <input
                onKeyDown={handleKeyPress}
                value={inputValue("minHourlyRate")}
                onChange={handleHourlyRate("minHourlyRate")}
                placeholder="min"
                className="outline-none border-[1px] min-w-0 placeholder:text-white/70 px-[5px] max-w-[80px] bg-transparent border-white/70 rounded-[5px]"
              />
              <span>/hr</span>
            </div>
            <div className="flex items-center gap-[5px]">
              <input
                value={inputValue("maxHourlyRate")}
                onKeyDown={handleKeyPress}
                onChange={handleHourlyRate("maxHourlyRate")}
                placeholder="max"
                className="outline-none border-[1px] min-w-0 placeholder:text-white/70 px-[5px] max-w-[80px] bg-transparent border-white/70 rounded-[5px]"
              />
              <span>/hr</span>
            </div>
          </div>
        </Collapse>
      )}
      {hasVisibleOptions(stylesOptions) && (
        <Collapse title="Styles" className="mb-[2rem]" expanded>
          {isOptionVisible("Lorem Ipsum") && (
            <CheckBox value={filterCheckboxValue("styles", "lorem_ipsum")} onChange={handleCategoryClick("styles", "lorem_ipsum")} label="Lorem Ipsum" count={1259} />
          )}
          {isOptionVisible("Lorem Ipsum") && (
            <CheckBox value={filterCheckboxValue("styles", "lorem_ipsum1")} onChange={handleCategoryClick("styles", "lorem_ipsum1")} label="Lorem Ipsum" count={1259} />
          )}
          {isOptionVisible("Lorem Ipsum") && (
            <CheckBox value={filterCheckboxValue("styles", "lorem_ipsum2")} onChange={handleCategoryClick("styles", "lorem_ipsum2")} label="Lorem Ipsum" count={1259} />
          )}
        </Collapse>
      )}
      {hasVisibleOptions(typeOptions) && (
        <Collapse title="Type" className="mb-[2rem]" expanded>
          {isOptionVisible("Tattoo Gun") && (
            <CheckBox value={filterCheckboxValue("type", "tattoo_gun")} onChange={handleCategoryClick("type", "tattoo_gun")} label="Tattoo Gun" count={1259} />
          )}
          {isOptionVisible("Tattoo Gun") && (
            <CheckBox value={filterCheckboxValue("type", "tattoo_gun1")} onChange={handleCategoryClick("type", "tattoo_gun1")} label="Tattoo Gun" count={1259} />
          )}
          {isOptionVisible("Tattoo Gun") && (
            <CheckBox value={filterCheckboxValue("type", "tattoo_gun2")} onChange={handleCategoryClick("type", "tattoo_gun2")} label="Tattoo Gun" count={1259} />
          )}
        </Collapse>
      )}
      {hasVisibleOptions(loremIpsumOptions) && (
        <Collapse title="Lorem Ipsum" className="mb-[2rem]" expanded>
          {isOptionVisible("Lorem Ipsum") && (
            <CheckBox value={filterCheckboxValue("lorem_ipsum", "lorem_ipsum")} onChange={handleCategoryClick("lorem_ipsum", "lorem_ipsum")} label="Lorem Ipsum" count={1259} />
          )}
          {isOptionVisible("Lorem Ipsum") && (
            <CheckBox value={filterCheckboxValue("lorem_ipsum", "lorem_ipsum1")} onChange={handleCategoryClick("lorem_ipsum", "lorem_ipsum1")} label="Lorem Ipsum" count={1259} />
          )}
          {isOptionVisible("Lorem Ipsum") && (
            <CheckBox value={filterCheckboxValue("lorem_ipsum", "lorem_ipsum2")} onChange={handleCategoryClick("lorem_ipsum", "lorem_ipsum2")} label="Lorem Ipsum" count={1259} />
          )}
        </Collapse>
      )}
    </>
  );
};

export default SearchBarFilter;
