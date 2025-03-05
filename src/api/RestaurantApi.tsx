import { SearchState } from "@/pages/SearchPage";
import { Restaurant, RestaurantSearchResponse } from "@/types";
import { useQuery } from "react-query";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

//
export const useGetRestaurant = (restaurantId?: string) => {
  const getRestaurantByIdRequest = async (): Promise<Restaurant> => {
    console.log("Restaurant ID:", restaurantId); // ✅ Log the restaurantId

    if (!restaurantId) {
      throw new Error("Restaurant ID is required");
    }

    const response = await fetch(
      `${API_BASE_URL}/api/restaurant/${restaurantId}`
    );
    if (!response.ok) {
      throw new Error("Failed to get restaurant");
    }

    return response.json();
  };

  const { data: restaurant, isLoading } = useQuery(
    ["fetchRestaurant", restaurantId],
    getRestaurantByIdRequest,
    {
      enabled: !!restaurantId,
    }
  );

  return { restaurant, isLoading };
};

export const useSearchRestaurants = (
  searchState: SearchState,
  city?: string
) => {
  const createSearchRequest = async (
    searchState: SearchState
  ): Promise<RestaurantSearchResponse> => {
    const params = new URLSearchParams();
    params.set("searchQuery", searchState.searchQuery);
    params.set("page", searchState.page.toString());
    params.set("selectedCuisines", searchState.selectedCuisines.join(","));
    params.set("sortOption", searchState.sortOption);

    const response = await fetch(
      `${API_BASE_URL}/api/restaurant/search/${city}?${params.toString()}`
    );

    if (!response.ok) {
      throw new Error("Failed to get restaurant");
    }
    return response.json();
  };

  // const { data: results, isLoading } = useQuery(
  //   ["searchRestaurants", searchState.searchQuery, city,],
  //   createSearchRequest,
  //   {
  //     enabled: !!city,
  //   }
  // );
  const { data: results, isLoading } = useQuery(
    [
      "searchRestaurants",
      searchState.searchQuery,
      city,
      searchState.page,
      searchState.selectedCuisines,
      searchState.sortOption,
    ], // ✅ Now listens for page changes
    () => createSearchRequest(searchState), // ✅ Pass searchState dynamically
    { enabled: !!city }
  );

  return {
    results,
    isLoading,
  };
};
