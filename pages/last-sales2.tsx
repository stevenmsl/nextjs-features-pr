import { useEffect, useState } from "react";
import { Sales, SalesRaw } from "../types";
import useSWR from "swr";
import { toSales } from "../util";

const LastSalesPage2 = () => {
  const [sales, setSales] = useState<Sales[]>([]);
  const { data, error } = useSWR<SalesRaw>(
    "https://nexjs-course-default-rtdb.firebaseio.com/sales.json"
  );
  useEffect(() => {
    if (data) {
      setSales(toSales(data));
    }
  }, [data]);

  if (error) {
    return <p>Failed to load data</p>;
  }
  if (!data || !sales) {
    return <p>Loading...</p>;
  }

  return (
    <ul>
      {sales.map((s) => (
        <li key={s.id}>
          {s.username} - {s.volume}
        </li>
      ))}
    </ul>
  );
};

export default LastSalesPage2;
