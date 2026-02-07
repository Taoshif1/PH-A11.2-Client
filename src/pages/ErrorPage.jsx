import { useRouteError, isRouteErrorResponse, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const ErrorPage = () => {
  const error = useRouteError();
  console.error(error);

  return (
    <>
    <Navbar></Navbar>
    <div className="min-h-screen flex flex-col items-center justify-center bg-base-200 p-4 text-center">
      <h1 className="text-9xl font-bold text-error">
        {isRouteErrorResponse(error) ? error.status : "Error"}
      </h1>
      <p className="text-2xl mt-4 font-semibold">
        {isRouteErrorResponse(error) 
          ? error.statusText 
          : error.message || "An unexpected error occurred."}
      </p>
      <div className="mt-8 flex gap-4">
        <Link to="/" className="btn btn-primary">Go Home</Link>
        <button onClick={() => window.location.reload()} className="btn btn-outline">
          Try Again
        </button>
      </div>
    </div>
    <Footer></Footer>
    </>
  );
};

export default ErrorPage;
