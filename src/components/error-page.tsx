import { useRouteError } from "react-router-dom";
import PageLayout from "./global/PageLayout.tsx";

export default function ErrorPage() {
  const error: any = useRouteError();
  console.error(error);

  return (
    <PageLayout className="flex flex-col gap-3 items-center justify-center text-center w-screen h-screen">
      <h1 className="font-bold text-2xl">Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>Kindly refresh the page</p>
    </PageLayout>
  );
}
