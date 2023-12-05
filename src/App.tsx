import Footer from "./components/Footer";
import { testFirebase } from "../firebaseTest";

export default function App() {
  testFirebase();
  return (
    <main>
      <p>App</p>
      <Footer />
    </main>
  );
}
