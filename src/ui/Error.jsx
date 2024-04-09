import { useNavigate, useRouteError } from "react-router-dom";

function Error() {
  const navigate = useNavigate();
  const error = useRouteError();

  const handleNavigate = (path) => {
    navigate(path);
  };
  return (
    <div style={{ textAlign: "center" }}>
      <h1>Something went wrong 😥</h1>
      <p>{error.data || error.message}</p>
      <button onClick={() => handleNavigate("/")}>Go to Home</button>
    </div>
  );
}

export default Error;
