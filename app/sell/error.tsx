"use client";

const ErrorPage = ({ error }: { error: Error & { digest?: string } }) => {
  console.log(error);
  return (
    <div className="">
      <h1>Encountered an error</h1>
      <p>{error.message}</p>
    </div>
  );
};
export default ErrorPage;
