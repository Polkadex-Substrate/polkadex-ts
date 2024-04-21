import { RedirectType, permanentRedirect } from "next/navigation";

export default function Page() {
  const defaultPage = "/swap";
  permanentRedirect(defaultPage, "push" as RedirectType);
}
