import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getCompaniesList } from "@/utils/apiService/accountService";
import type { AccountResult } from "@/utils/apiService/accountService";
import KendoForm from "@/components/kendo/form/KendoForm.tsx";

export default function KendoFormTest() {
  const companyListQuery = () => ({
    queryKey: ["company"],
    queryFn: async () => {
      const result = await getCompaniesList();
      return result as AccountResult;
    },
  });
  const { data: company } = useQuery<AccountResult, Error>(companyListQuery());
  useEffect(() => {
    if (company && company.data) {
      console.log(company);
    }
  }, [company]);

  return <KendoForm />;
}
