import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
const useReadGroups = () => {
  const router = useRouter();
  const [data, setData] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const responseGroup = await fetch("/api/group/choice", {
        method: "GET",
        header: { "Cache-Control": "no-store" },
      });
      const resultGroup = await responseGroup.json();

      try {
        if (resultGroup.status === 200) {
          setData(resultGroup.groups);
        } else {
          throw new Error(resultGroup.message);
        }
      } catch (error) {
        console.error(error);
        router.push("/");
      }
    };
    fetchData();
  }, [router]);

  return data;
};
export default useReadGroups;
