import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

  // <body className="antialiased">
  //       <Provider store={store}>
  //         <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
  //          <Main />
  //       <NextScript />
  //         </PersistGate>
  //       </Provider>
  //     </body>