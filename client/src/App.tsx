import { useState } from "react";

import { AppProvider } from "@/providers/app";
import { AppRoutes } from "@/routes";

function App() {
  const [state, setState] = useState(0);
  return (
    <AppProvider>
      <AppRoutes />
    </AppProvider>
  );
}

export default App;
