import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { showBlog } from "../../../apis/blogs.api";
import Header from "../../../shared/components/Header";
import { toast } from "react-toastify";
import { toastUtil } from "../../../utils/toast.utils";
import Spinner from "../../../shared/components/Spinner";

const BlogView = () => {
  const params = useParams();
  const [blogContent, setBlogContent]: any = useState();
  const [loading, setLoading]: any = useState(true);
  useEffect(() => {
    getBlogContent();
  }, []);
  const getBlogContent = async () => {
    try {
      setLoading(true);
      let { status, data }: any = await showBlog(params?.slug);
      if (status === 200) {
        setBlogContent(data?.transactions);
      }
    } catch (error) {
      toast.error("Something went wrong", toastUtil);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="h-full max-h-full">
      <section>
        <Header />
      </section>
      {loading ? (
        <div className="absolute left-0 top-0 w-full h-full grid place-items-center">
          <Spinner />
        </div>
      ) : (
        <div className=" mx-auto overflow-y-scroll max-h-screen custom-scroll pb-20">
          <div className=" w-[100wv]  items-center justify-center pb-20">
            <div
              className="mb-4 md:mb-0 w-full max-w-screen-md mx-auto relative"
              style={{ height: "35em" }}
            >
              <div
                className="absolute left-0 bottom-0 w-full h-full z-10"
                style={{
                  backgroundImage:
                    "linear-gradient(180deg, transparent, rgba(0.4, 0.6, 0.8, 1))",
                }}
              ></div>
              <img
                src="https://images.unsplash.com/photo-1493770348161-369560ae357d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80"
                className="absolute left-0 top-0 w-full h-full z-0 object-cover"
              />
              <div className="p-4 absolute bottom-0 left-0 z-20">
                <h2 className="text-4xl font-semibold text-gray-100 leading-tight">
                  {blogContent?.title}
                </h2>
                <div className="flex mt-3">
                  <div>
                    <p className="font-semibold text-gray-200 text-sm">
                      {" "}
                      {blogContent?.author?.name}{" "}
                    </p>
                    <p className="font-semibold text-gray-400 text-xs">
                      {" "}
                      {blogContent?.updated_at}{" "}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="mx-20 lg:px-0 mt-12 text-gray-700 max-w-screen-md p-5 text-lg leading-relaxed border-[1px] shadow-2xl rounded-md border-neutral-200"
              dangerouslySetInnerHTML={{ __html: blogContent?.content }}
            />
          </div>
        </div>
      )}
    </main>
  );
};

export default BlogView;
