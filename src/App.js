import { useLoadScript } from "@react-google-maps/api";
import Map from "./components/Map/Map";
import "./App.css";

function App() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });

  if (!isLoaded) return <div>Loading...</div>;

  return <Map />;
}

export default App;
