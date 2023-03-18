import { Outlet } from "react-router-dom";
import PostsManager from "./screens/Posts/Posts";
import Layout, { GradientBackground } from "./components/Layout";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { getGlobalData } from "./utils/global-data.js";

function App() {
  const globalData = getGlobalData();

  return (
    <div
      className={`antialiased text-lg bg-white dark:bg-gray-900 dark:text-white leading-base`}
    >
      <Layout>
        <Header name={globalData.name} />
        <main className="w-full">
          <h1 className="text-3xl lg:text-5xl text-center mb-12">
            {globalData.blogTitle}
          </h1>
          <Outlet />
        </main>
        <Footer copyrightText={globalData.footerText} />
        <GradientBackground
          variant="large"
          className="fixed top-20 opacity-40 dark:opacity-60"
        />
        <GradientBackground
          variant="small"
          className="absolute bottom-0 opacity-20 dark:opacity-10"
        />
      </Layout>
    </div>
  );
}

export default App;
