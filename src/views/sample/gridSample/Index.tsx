import {useEffect, useState} from "react";
import {useQuery} from "@tanstack/react-query";
import CommonGrid from "@/components/kendo/grid/CommonGrid.tsx";
import {CommonGridProps} from "@/components/kendo/grid/gridInterfaces.ts";
import type {AccountResult, Company,} from "@/utils/apiService/accountService.ts";
import {getCompaniesList} from "@/utils/apiService/accountService.ts";

export default function Index() {
    const column = [
        {field: "name", title: "name", width: 200, align: "center", defualtFilter: true},
        {field: "foundedYear", title: "foundedYear", width: 200, align: "center", defualtFilter: true},
        {field: "city", title: "city", width: 200, filterType: "select", defualtFilter: true},
        {field: "state", title: "state", width: 200, defualtFilter: true},
        {field: "country", title: "country", width: 200, defualtFilter: true},
        {field: "zipCd", title: "zipCd", width: 200, defualtFilter: false, filterType: "checkBox"},
        {field: "street", title: "street", width: 200, defualtFilter: false, filterType: "checkBox"},
        {field: "adminFirstName", title: "adminFirstName", width: 200, defualtFilter: false},
        {field: "adminLastName", title: "adminLastName", width: 200, defualtFilter: false},
        {field: "adminEmail", title: "adminEmail", width: 200, defualtFilter: false},
        {field: "modDate", title: "modDate", width: 200, defualtFilter: false},
        {field: "branchCnt", title: "branchCnt", width: 200, defualtFilter: false},
    ];
    const [commonGridProps, setCommonGridProps] = useState<CommonGridProps>({
        gridHeight: 0,
        gridWidth: 0,
        columnHeader: column,
        buttonCount: 5,
        gridData: null,
        sortableGrid: true,
        unsorted: true,
        multipleSorting: false,
        defualtFilter: true,
        resizable: true,
        displayCount: [10, 20, 30, 0]
    });

    const companyListQuery = () => ({
        queryKey: ["company"],
        queryFn: async () => {
            const result = await getCompaniesList();
            return result as AccountResult;
        },
    });

    const {data: company} = useQuery<AccountResult, Error>(companyListQuery());

    useEffect(() => {
        if (company && company.data) {
            setCommonGridProps((prevState) => ({
                ...prevState,
                gridData: company.data as Company[],
            }));
        }
    }, [company]);

    return (
        <div>
            <CommonGrid {...commonGridProps} check/>
        </div>
    );
}
