import useSWR from "swr";
import config from "../config";
import useAxios from "axios-hooks";

const Secret = () => {
    const [{ data, loading, error }, refetch] = useAxios({
        url: config.ENDPOINT + "/secret",
        withCredentials: true,
    });

    if (!data) return <div>Loading</div>;
    if (error) return <div>Error</div>;
    return <div>Secret: {data.data}</div>;
};

export default Secret;
