import { useGetInQueries } from "@/store/server/inbox/queries";

const InQuery = () => {
  const { data } = useGetInQueries();
  console.log(data);
  return <div>InQuery</div>;
};

export default InQuery;
