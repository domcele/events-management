import AppRoutes from "./routes/AppRoutes";
import NavigationBar from "./components/NavigationBar/NavigationBar";

const App = () => {
  return (
    <div>
      <AppRoutes />
      <NavigationBar />
    </div>
  );
};

export default App;
