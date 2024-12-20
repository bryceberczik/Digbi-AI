const ErrorPage = () => {
    const handleGoHome = () => {
      // Replace this with the appropriate navigation logic, e.g., `navigate('/')` if using React Router
      window.location.href = "/";
    };
  
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F3F4F6] py-16 px-6 sm:px-8 lg:px-12">
        <div className="max-w-lg w-full space-y-12 text-center">
          <h1 className="text-4xl font-bold text-gray-800">
            Oops! Looks like you got lost...
          </h1>
          <p className="text-lg text-gray-700">
            We couldn't find the page you're looking for.
          </p>
          <button
            onClick={handleGoHome}
            className="group relative w-full flex justify-center py-3 px-6 border border-transparent text-lg font-medium rounded text-white bg-gray-700 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  };
  
  export default ErrorPage;
  