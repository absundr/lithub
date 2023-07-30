import { Box, Flex } from "@chakra-ui/react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar";
import ErrorPage from "./pages/Error";
import Explore from "./pages/Explore";
import Repo from "./pages/Repo";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Explore />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/repo/:id",
    element: <Repo />,
    errorElement: <ErrorPage />,
  },
]);

function App() {
  return (
    <Box h={"100vh"} w={"100vw"} maxW={"100%"} maxH={"100%"}>
      <Flex flex={1} flexDirection={"column"} width={"100%"} height={"100%"}>
        <Navbar />
        <RouterProvider router={router} />
      </Flex>
    </Box>
  );
}

export default App;
