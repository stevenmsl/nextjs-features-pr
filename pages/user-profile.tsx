import { GetServerSideProps } from "next";

interface UserProfilePageProps {
  username: string;
}
const UserProfilePage: React.FC<UserProfilePageProps> = ({ username }) => {
  return <h1>{username}</h1>;
};

/*
  - not pre-generated
  - executed on the server side per every request
*/

export const getServerSideProps: GetServerSideProps<UserProfilePageProps> = async (
  context
) => {
  const { params, req, res } = context;
  console.log(req);
  return {
    props: {
      username: "Arlo",
    },
  };
};

export default UserProfilePage;
