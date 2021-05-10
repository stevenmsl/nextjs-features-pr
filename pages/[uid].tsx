import { GetServerSideProps } from "next";

interface UserIdPageProps {
  id: string;
}

const UserIdPage: React.FC<UserIdPageProps> = ({ id }) => {
  return <h1>User Id: {id}</h1>;
};

export const getServerSideProps: GetServerSideProps<UserIdPageProps> = async (
  context
) => {
  const { params } = context;
  const id = params.uid as string;

  return {
    props: { id },
  };
};

export default UserIdPage;
