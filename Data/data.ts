import { CarProps, FilterProps } from "../Types/Type";

export const calculateCarRent = (city_mpg: number, year: number) => {
  const basePricePerDay = 50; 
  const mileageFactor = 0.1; 
  const ageFactor = 0.05; 

  const mileageRate = city_mpg * mileageFactor;
  const ageRate = (new Date().getFullYear() - year) * ageFactor;

  const rentalRatePerDay = basePricePerDay + mileageRate + ageRate;

  return rentalRatePerDay.toFixed(0);
};

export const updateSearchParams = (type: string, value: string) => {
  const searchParams = new URLSearchParams(window.location.search);

  searchParams.set(type, value);

  const newPathname = `${window.location.pathname}?${searchParams.toString()}`;

  return newPathname;
};

export const deleteSearchParams = (type: string) => {
  const newSearchParams = new URLSearchParams(window.location.search);

  newSearchParams.delete(type.toLocaleLowerCase());

  const newPathname = `${window.location.pathname}?${newSearchParams.toString()}`;

  return newPathname;
};

export async function fetchCars(filters: FilterProps) {
  const { manufacturer, year, model, limit, fuel } = filters;

  const headers: HeadersInit = {
    "X-RapidAPI-Key": "ce3d56af5fmshc960b8966000ec5p15d336jsn19eb6744aedb",
    "X-RapidAPI-Host": "cars-by-api-ninjas.p.rapidapi.com",
  };

  try {
    // Construct a valid query string
    const queryParams = new URLSearchParams({
      make: manufacturer || "",
      year: year?.toString() || "",
      model: model || "",
      limit: limit?.toString() || "10",
      fuel_type: fuel || "",
    });

    const response = await fetch(
      `https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?${queryParams.toString()}`,
      {
        headers: headers,
      }
    );

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Failed to fetch cars:", error);
    return [];
  }
}


export const generateCarImageUrl = (car: CarProps, angle: string = "0") => {
  if (!car || !car.make || !car.model || !car.year) {
    throw new Error("Invalid car properties provided.");
  }

  const url = new URL("https://cdn.imagin.studio/getimage");

  const { make, model, year } = car;

  url.searchParams.append('customer', 'WdQDVcun7L8XSKoTZh1Uhw==6W1JTSbZC0IFkEvr');
  url.searchParams.append('make', make);
  url.searchParams.append('modelFamily', model.split(" ")[0]); // Use the first word of the model
  url.searchParams.append('zoomType', 'fullscreen');
  url.searchParams.append('modelYear', `${year}`);
  url.searchParams.append('angle', angle); // Use the provided angle or default to "0"

  return url.toString();
};
