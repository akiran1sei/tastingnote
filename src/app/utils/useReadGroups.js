import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
const useReadGroups = () => {
  const router = useRouter();
  const [data, setData] = useState("");

  const fetchData = async () => {
    const responseGroup = await fetch("/pages/api/group/chioce", {
      method: "GET",
      header: { "Cache-Control": "no-store" },
    });
    const resultGroup = await responseGroup.json();

    try {
      if (resultGroup.status === 200) {
        setData(resultGroup.groups);
        console.log(data);
      } else {
        throw new Error(resultGroup.message);
      }
    } catch (error) {
      console.error(error);
      router.push("/");
    }
  };

  useEffect(() => {
    fetchData();
  }, [router]);

  return data;
};
export default useReadGroups;
