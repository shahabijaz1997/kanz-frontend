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
              className="mb-4 md:mb-0 w-full max-w-screen-md flex items-center justify-center mx-auto"
              style={{ height: "10em" }}
            >
              <div className="p-4  bottom-0 left-0 z-20 items-center flex-col flex justify-center">
                <h2 className="text-3xl font-semibold text-black leading-tight">
                  {blogContent?.title}
                </h2>
                <div className="flex mt-3 items-center text-center justify-center">
                  <div>
                    <p className="font-semibold text-black text-sm">
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
              className="mx-20 lg:px-0 text-gray-700 max-w-screen-md p-5 text-lg leading-relaxed border-[0.25px] shadow-md rounded-md border-neutral-200"
              dangerouslySetInnerHTML={{ __html: blogContent?.content }}
            />
          </div>
        </div>
      )}
    </main>
  );
};

export default BlogView;
