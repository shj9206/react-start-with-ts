import React from "react";
import {Container, Footer, MainContent, Modal} from './style.ts'
import {Header} from './header.tsx'
import {Sidebar} from './sideBar.tsx'
import {createContact, getContacts} from "@/utils/contacts.ts";
import {QueryClient} from "@tanstack/react-query";
// import Contact from "@/views/sample/contact.tsx";

export const loader =
    (queryClient: QueryClient) =>
        async ({ request }: { request: Request }): Promise<LoaderData> => {
            const url = new URL(request.url);
            const q = url.searchParams.get("q");
            if (!queryClient.getQueryData(contactListQuery(q).queryKey)) {
                await queryClient.fetchQuery(contactListQuery(q));
            }
            return { q };
        };

export const action =
    (queryClient: QueryClient) => async (): Promise<Contact> => {
        const contact = (await createContact()) as Contact;
        queryClient.invalidateQueries({ queryKey: ["contacts", "list"] });
        return contact;
    };
// 메인 레이아웃 컴포넌트
export const MainLayout: React.FC = ({children}) => {
    const contactListQuery = (q: string | null) => ({
        queryKey: ["contacts", "list", q ?? "all"],
        queryFn: () => getContacts(q ?? ""), // `null`일 경우 기본값(예: 빈 문자열) 사용
    });


    return (
        <Container>
            <Header/>
            <Sidebar/>
            <MainContent>
                {children}
            </MainContent>
            <Footer>
               발바닥!!
            </Footer>
            <Modal>
                {/* 팝업 또는 모달 컨텐츠 */}
            </Modal>
        </Container>
    )
};


export default MainLayout;
