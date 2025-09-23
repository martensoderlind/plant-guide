import { Suspense } from "react";
import ArticleContainer from "./article-container";

export default async function Articles() {
  return (
    <div>
      <section className="relative max-w-7xl mx-auto">
        <p className="font-bold text-3xl py-4">Articles</p>
        <div className="relative z-10 bg-white rounded-3xl p-8 shadow-2xl ">
          <Suspense
            fallback={
              <div className="flex align-middle justify-center">
                <p className="text-2xl">Loading Articles..</p>
              </div>
            }
          >
            <ArticleContainer />
          </Suspense>
        </div>
      </section>
    </div>
  );
}
