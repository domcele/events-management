import AppRoutes from "./routes/AppRoutes";
import NavigationBar from "./components/NavigationBar/NavigationBar";

const App = () => {
  return (
    <div>
      <NavigationBar />
      <AppRoutes />
    </div>
  );
};

export default App;
