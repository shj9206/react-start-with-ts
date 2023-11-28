import { Form, useParams } from "react-router-dom";
import { useQuery, QueryClient } from "@tanstack/react-query";
import { getContact, updateContact } from "@/utils/contacts";
import Favorite from "@/components/sample/Favorite";

interface Contact {
  avatar?: string;
  first?: string;
  last?: string;
  notes?: string;
  favorite?: boolean;
}

interface Params {
  [key: string]: string | undefined;
  contactId: string;
}

const contactDetailQuery = (id: string) => ({
  queryKey: ["contacts", "detail", id],
  queryFn: async () => {
    const contact = await getContact(id);
    if (!contact) {
      throw new Response("", {
        status: 404,
        statusText: "Not Found",
      });
    }
    return contact as Contact;
  },
});

export const loader =
  (queryClient: QueryClient) =>
  async ({ params }: { params: Params }) => {
    const query = contactDetailQuery(params.contactId);
    return (
      queryClient.getQueryData(query.queryKey) ??
      (await queryClient.fetchQuery(query))
    );
  };

export const action =
  (queryClient: QueryClient) =>
  async ({ request, params }: { request: Request; params: Params }) => {
    const formData = await request.formData();
    const contact = await updateContact(params.contactId, {
      favorite: formData.get("favorite") === "true",
    });
    await queryClient.invalidateQueries({ queryKey: ["contacts"] });
    return contact;
  };

export default function Contact() {
  const params = useParams<Params>();
  const { data: contact } = useQuery<Contact, Error>(
    contactDetailQuery(params.contactId ?? "")
  );

  return (
    <div id="contact">
      <div>
        <img key={contact?.avatar} src={contact?.avatar || undefined} />
      </div>

      <div>
        <h1>
          {contact?.first || contact?.last ? (
            <>
              {contact.first} {contact.last}
            </>
          ) : (
            <i>No Name</i>
          )}{" "}
          {contact && <Favorite contact={contact} />}
        </h1>

        {contact?.notes && <p>{contact.notes}</p>}

        <div>
          <Form action="edit">
            <button type="submit">Edit</button>
          </Form>
          <Form
            method="post"
            action="destroy"
            onSubmit={(event) => {
              if (!confirm("Please confirm you want to delete this record.")) {
                event.preventDefault();
              }
            }}
          >
            <button type="submit">Delete</button>
          </Form>
        </div>
      </div>
    </div>
  );
}
