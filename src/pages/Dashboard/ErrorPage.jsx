import { useRouteError, Link } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  const status = error?.status;

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-4xl font-bold text-red-600 mb-4">Oops!</h1>

      {status === 401 ? (
        <>
          <p className="text-lg text-gray-700 mb-2">
            🚫 You are not authorized to access this page.
          </p>
          <Link
            to="/dashboard"
            className="mt-2 px-4 py-2 bg-primary text-white"
          >
            Go Back Home
          </Link>
        </>
      ) : (
        <>
          <p className="text-lg text-gray-700 mb-2">Something went wrong.</p>
          <Link to="/" className="mt-2 px-4 py-2 bg-primary text-white">
            Return to Home
          </Link>
        </>
      )}
    </div>
  );
}
