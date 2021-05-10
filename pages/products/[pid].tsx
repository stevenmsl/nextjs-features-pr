import { Fragment } from "react";
import { Product } from "../../types";
import { getData } from "../../utilserver";
import { GetStaticProps, GetStaticPaths } from "next";

interface ProductDetailPageProps {
  product: Product;
}

const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ product }) => {
  /*
    - if nextjs needs to dynamically fetch the data 
      and load the page, you have to check if the
      data is ready (for p2  or p3 if you only 
      return p1 initially in the getStaticPaths) 

  */
  if (!product) {
    return <p>Loading</p>;
  }
  const { title, description } = product;

  return (
    <Fragment>
      <h1>{title}</h1>
      <p>{description}</p>
    </Fragment>
  );
};

export const getStaticProps: GetStaticProps<ProductDetailPageProps> = async ({
  params,
}) => {
  /* 
    - get the segment from the dynamic route through context
  */
  if (Array.isArray(params.pid))
    return {
      props: { product: null },
    };

  const productId: string = params.pid;

  const products = await getData();

  const product = products.find((p) => p.id === productId);

  if (!product) return { notFound: true };

  return {
    props: { product },
  };
};

/* #SGSR02
  - you need to provide all the possible paths here
  - or you can specify fallback to true and provide
    only some but not all of them
  - you don't need to check if the data is ready yet
    in the component if you set fallback to "blocking";
    nextjs will render the page after the data is ready

*/
export const getStaticPaths: GetStaticPaths = async () => {
  const products = await getData();

  const paths = products.map((p) => ({
    params: {
      pid: p.id,
    },
  }));

  return {
    paths,
    fallback: true,
  };
};

export default ProductDetailPage;
