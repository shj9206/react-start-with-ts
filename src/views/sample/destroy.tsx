import { redirect } from "react-router-dom";
import { deleteContact } from "@/utils/contacts";
import { QueryClient } from "@tanstack/react-query";
interface Params {
  [key: string]: string | undefined;
  contactId: string;
}
export const action =
  (queryClient: QueryClient) =>
  async ({ params }: { params: Params }) => {
    await deleteContact(params.contactId);
    queryClient.invalidateQueries({ queryKey: ["contacts"] });
    return redirect("/");
  };
