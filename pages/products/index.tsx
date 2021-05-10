import { GetStaticProps } from "next";
import { Product, ProductsRaw } from "../../types";
import Link from "next/link";
import { getData } from "../../utilserver";
import { Fragment, useState } from "react";
import { toProducts } from "../../util";

/*
  - if the data are static, this page will be 
    pre-rendered by default
  - if it's dynamic, you need to define getStaticProps
    for this component 
*/

/* #CSDF04
   - view page source will show you the pre-rendered products
   - you can also do client-side fetching - getProducts 
*/

interface HomePageProps {
  products: Product[];
}

const HomePage: React.FC<HomePageProps> = ({ products }) => {
  const [loadedProducts, setLoadedProducts] = useState<Product[]>(products);

  /* client-side fetching */
  const getProducts = async () => {
    const url =
      "https://nexjs-course-default-rtdb.firebaseio.com/products.json";

    const res = await fetch(url);
    const productsRaw: ProductsRaw = await res.json();
    setLoadedProducts(toProducts(productsRaw));
  };

  return (
    <Fragment>
      <button onClick={getProducts}>Get Products</button>
      <ul>
        {loadedProducts.map((product) => (
          <li key={product.id}>
            <Link href={`/products/${product.id}`}>{product.title}</Link>
          </li>
        ))}
      </ul>
    </Fragment>
  );
};

/* #SGSR01
  - executed while you are building the project 
  - you have access to the file system and such
  - will not appear on the client side js files
  - the return object should always has a props property
    and its type is what you specified in the first generic
    type prvoided to GetStaticProps   
*/
export const getStaticProps: GetStaticProps<HomePageProps> = async (
  context
) => {
  console.log("(Re-)generating");

  const data: HomePageProps = { products: await getData() };

  /*
    - you can use redirect to navigate to a different
      page instead of this page
  */
  if (!data) {
    return {
      redirect: {
        destination: "/cannot-access-data", //pseudo url; for demo purpose only
        permanent: false, // this is needed to TS won't complain
      },
    };
  }

  /*
    - return 404 page
  */
  if (data.products.length === 0) {
    return { notFound: true };
  }

  /*
    - props's type is HomePageProps
    - Incremental Static Generation (ISR)  #SGSR03 
      - specify the revalidate to indicate
        how often this page should be rebuilt
        (only applies in prod mode)
      - in dev mode the page will be rebuilt
        for every visit to the site  
  */
  return {
    props: { products: data.products },
    revalidate: 10,
  };
};

export default HomePage;
