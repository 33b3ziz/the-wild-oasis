import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
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

  const {
    data: bookings,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["bookings", filter, sortBy],
    queryFn: () => getBookings({ filter, sortBy }),
  });

  return { bookings, isLoading, error };
}
