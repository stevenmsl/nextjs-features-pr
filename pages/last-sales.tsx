import { useEffect, useState } from "react";
import { Sales, SalesRaw } from "../types";
import { toSales } from "../util";

const LastSalesPage = () => {
  const [sales, setSales] = useState<Sales[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    const url = "https://nexjs-course-default-rtdb.firebaseio.com/sales.json";
    const fetchData = async () => {
      const res = await fetch(url);
      const sales: SalesRaw = await res.json();
      setSales(toSales(sales));
      setIsLoading(false);
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  /* #CSDF01
     - this component is still re-rendered
     - use view page source in the browser
       and search for "No data found"
  */
  if (sales.length === 0) {
    return <p>No data found</p>;
  }

  /*  #CSDF02
      - once the data arrived React will re-render
        the page to show the result 
  */

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

export default LastSalesPage;
