import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";
// import { Booking } from "./BookingTable";

// export type BookingQuery = {
//   data:
//     | {
//         id: number;
//         createdAt: Date;
//         startDate: Date;
//         endDate: Date;
//         numNights: number;
//         numGuests: number;
//         status: string;
//         totalPrice: number;
//         cabins: {
//           name: string;
//         }[];
//         guests: {
//           fullName: string;
//           email: string;
//         }[];
//       }
//     | undefined;
// };

export function useBookings() {
  const queryClient = useQueryClient();
  const [serachParams] = useSearchParams();

  // FILTER
  const filterValue = serachParams.get("status");
  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "status", value: filterValue, method: "eq" };

  // ٍSORT
  const sortByRaw = serachParams.get("sortBy") || "startDate-desc";
  const [field, direction] = sortByRaw.split("-");
  const sortBy = { field, direction };

  // PAGINATION
  const page = !serachParams.get("page")
    ? 1
    : parseInt(serachParams.get("page")!);

  // QUERY
  const {
    data: { data: bookings, count } = {},
    isLoading,
    error,
  } = useQuery({
    queryKey: ["bookings", filter, sortBy, page],
    queryFn: () => getBookings({ filter, sortBy, page: page }),
  });

  // PRE-FETCHING
  const pageCount = Math.ceil(count! / PAGE_SIZE);
  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page + 1],
      queryFn: () => getBookings({ filter, sortBy, page: page + 1 }),
    });

  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page - 1],
      queryFn: () => getBookings({ filter, sortBy, page: page - 1 }),
    });

  return { bookings, isLoading, error, count };
}
