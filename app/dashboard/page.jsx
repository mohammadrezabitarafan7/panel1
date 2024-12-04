'use client'
import SectionCard from '../ui/cardsection'
import TopProducts from '../components/topproducts'
import Chart from '../components/chart'
import BarChart from '../components/barchart'
import { useState, useEffect, useContext } from 'react'
import axios from "axios";
import { AuthContext } from '../context/auth-context/contaxt'
import useSWR from 'swr';
import Loading from '../ui/loading'
import { ThemeContext } from '../context/themeContext/context'
import clsx from "clsx";

export default function Home() {
  const { CheckUser, GetUser } = useContext(AuthContext);
  const [id, setId] = useState(null);
  const { dark } = useContext(ThemeContext);

  useEffect(() => {
    const userId = CheckUser() ? GetUser() : null;
    setId(userId);
  }, [CheckUser, GetUser]);

  const fetcher = (url) => axios.get(url).then((res) => res.data);
  const { data: orders, error: usersError } = useSWR('http://localhost:8001/orders', fetcher, { refreshInterval: 20000 });
  const { data: products, error: productsError } = useSWR('http://localhost:8001/products', fetcher, { refreshInterval: 20000 });
  const { data: users } = useSWR('http://localhost:8001/users', fetcher,);
  const { data: category } = useSWR('http://localhost:8001/category', fetcher,);

  if (!products || !orders || !users || !category) {
    return <div><Loading /></div>;
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-row gap-4 max-md:flex-col">
        <div className={clsx(
          'basis-[70%]  p-4 shadow-md rounded-xl',
          dark ? 'bg-white' : 'bg-[#17191b]'
        )}>
          <SectionCard products={products} orders={orders} users={users} category={category} />
        </div>
        <div className={clsx(
          'basis-[30%]  p-4 shadow-md rounded-xl',
          dark ? 'bg-white' : 'bg-[#17191b]'

        )}>
        <Chart products={products} orders={orders} users={users} category={category} />
        </div>
      </div>

      <div className="flex flex-row gap-4 max-md:flex-col">
        <div className="basis-3/5">
          <TopProducts />
        </div>
        <div className={clsx(
          'basis-2/5  p-4 shadow-md rounded-xl',
          dark? 'bg-white': 'bg-[#17191b]'

        )}>
          <BarChart />
        </div>
      </div>
    </div>
  );
}
