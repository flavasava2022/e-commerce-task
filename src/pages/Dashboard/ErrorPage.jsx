import { div } from "motion/react-client";
import { useRouteError, Navigate, Link } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  if (error.status === 401) {
    return (
      <div className="w-full items-center justify-center mx-auto flex flex-col gap-2">
        <p>You Are Not Allowed To Enter This Page</p>
        <Link to={"/dashboard"}>Home</Link>
      </div>
    );
  }

  return <div>Something went wrong</div>;
}
