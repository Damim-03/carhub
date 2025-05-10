import { CarProps, FilterProps } from "../Types/Type.ts";

export const calculateCarRent = (city_mpg: number, year: number): string => {
  const basePricePerDay = 50;
  const mileageFactor = 0.1;
  const ageFactor = 0.05;

  const mileageRate = city_mpg * mileageFactor;
  const ageRate = (new Date().getFullYear() - year) * ageFactor;
  const rentalRatePerDay = basePricePerDay + mileageRate + ageRate;

  return rentalRatePerDay.toFixed(0);
};

export const updateSearchParams = (type: string, value: string): string => {
  const searchParams = new URLSearchParams(window.location.search);
  searchParams.set(type, value);
  return `${window.location.pathname}?${searchParams.toString()}`;
};

export const deleteSearchParams = (type: string): string => {
  const newSearchParams = new URLSearchParams(window.location.search);
  newSearchParams.delete(type.toLowerCase());
  return `${window.location.pathname}?${newSearchParams.toString()}`;
};

export async function fetchCars(filters: FilterProps): Promise<never[]> {
  const { manufacturer, year, model, limit, fuel } = filters;

  const headers: HeadersInit = {
    "X-RapidAPI-Key": "ce3d56af5fmshc960b8966000ec5p15d336jsn19eb6744aedb", // Replace with your actual API key
    "X-RapidAPI-Host": "cars-by-api-ninjas.p.rapidapi.com",
  };

  try {
    const response = await fetch(
        `https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?${new URLSearchParams({
          make: manufacturer || "",
          year: year?.toString() || "",
          model: model || "",
          limit: limit?.toString() || "10",
          fuel_type: fuel || "",
        })}`,
        { headers }
    );

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Failed to fetch cars:", error);
    return [];
  }
}

export const generateCarImageUrl = (car: CarProps, angle: string = "0"): string => {
  if (!car?.make || !car?.model || !car?.year) {
    throw new Error("Invalid car properties provided");
  }

  const url = new URL("https://cdn.imagin.studio/getimage");
  const { make, model, year } = car;

  url.searchParams.append("customer", "hrjavascript-mastery"); // Replace with your actual customer key
  url.searchParams.append("make", make);
  url.searchParams.append("modelFamily", model.split(" ")[0]);
  url.searchParams.append("zoomType", "fullscreen");
  url.searchParams.append("modelYear", `${year}`);
  url.searchParams.append("angle", angle);

  return url.toString();
};