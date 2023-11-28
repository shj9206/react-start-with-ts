import {
  Outlet,
  useLoaderData,
  Form,
  NavLink,
  useNavigation,
  useSubmit,
} from "react-router-dom";
import { useDebounce } from "rooks";
import { createContact, getContacts } from "@/utils/contacts";
import { useQuery, useIsFetching, QueryClient } from "@tanstack/react-query";

interface LoaderData {
  q: string | null;
}
interface Contact {
  id: string;
  first?: string;
  last?: string;
  favorite?: boolean;
}
const contactListQuery = (q: string | null) => ({
  queryKey: ["contacts", "list", q ?? "all"],
  queryFn: () => getContacts(q ?? ""), // `null`일 경우 기본값(예: 빈 문자열) 사용
});
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

export default function Root() {
  const data = useLoaderData() as LoaderData;
  const { q } = data;
  const { data: contacts } = useQuery<Contact[], Error>(contactListQuery(q));
  const searching = useIsFetching({ queryKey: ["contacts", "list"] }) > 0;
  const navigation = useNavigation();
  const submit = useSubmit();

  const debouncedSubmit = useDebounce(submit, 500);

  return (
    <>
      <div id="sidebar">
        <h1>React Router Contacts</h1>
        <div>
          <form id="search-form" role="search">
            <input
              id="q"
              aria-label="Search contacts"
              placeholder="Search"
              type="search"
              name="q"
              key={q}
              autoFocus
              defaultValue={q ?? ""}
              className={searching ? "loading" : ""}
              onChange={(event) => {
                debouncedSubmit(event.currentTarget.form);
              }}
            />
            <div id="search-spinner" aria-hidden hidden={!searching} />
            <div className="sr-only" aria-live="polite"></div>
          </form>
          <Form method="post">
            <button type="submit">New</button>
          </Form>
        </div>
        <nav>
          {contacts ? (
            <ul>
              {contacts.map((contact) => (
                <li key={contact.id}>
                  <NavLink
                    to={`contacts/${contact.id}`}
                    className={({ isActive, isPending }) =>
                      isActive ? "active" : isPending ? "pending" : ""
                    }
                  >
                    {contact.first || contact.last ? (
                      <>
                        {contact.first} {contact.last}
                      </>
                    ) : (
                      <i>No Name</i>
                    )}{" "}
                    {contact.favorite && <span>★</span>}
                  </NavLink>
                </li>
              ))}
            </ul>
          ) : (
            <p>
              <i>No contacts</i>
            </p>
          )}
        </nav>
      </div>
      <div
        id="detail"
        className={navigation.state === "loading" ? "loading" : ""}
      >
        <Outlet />
      </div>
    </>
  );
}
