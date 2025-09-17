import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import {persistor, store} from "../store/store";
import { PersistGate } from "redux-persist/integration/react";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";

export default function App({ Component, pageProps }: AppProps) {
  return (<Provider store={store}>
    <PersistGate loading={<div className="text-center w-full mx-auto flex justify-center align-middle h-full mt-5"><LoadingSpinner size="lg" /></div>} persistor={persistor}>
      <Component {...pageProps} />
    </PersistGate>
    </Provider>);
}
