import { useNavigate } from "react-router-dom";
import { RoutesEnums } from "../../enums/routes.enum";
import Header from "../../shared/components/Header";
import { getBlogs } from "../../apis/blogs.api";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Spinner from "../../shared/components/Spinner";

export default function Blogs() {
  const [blogs, setBlogs]: any = useState([]);
  const [loading, setLoading]: any = useState(true);

  useEffect(() => {
    getBlogsListing();
  }, []);

  const getBlogsListing = async () => {
    try {
      setLoading(true)
      let { status, data } = await getBlogs();
      if (status === 200) {
        setBlogs(data?.blogs);
      }
    } catch (e) {
      toast.error("Something went wrong")
    } finally {
      setLoading(false)
    }
  };
  const navigate = useNavigate();
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
            <div className="bg-white pt-10 pb-20 sm:py-32 overflow-scroll max-h-screen custom-scroll">
            <div className="mx-auto  px-6">
              <div className="mx-auto w-full justify-center items-center">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 text-center">
                  From the blog
                </h2>
                <p className="mt-2 text-lg leading-8 text-gray-600 border-b-2 text-center pb-4">
                  Learn how to grow your business with our expert advice.
                </p>
              </div>
              <div className="flex gap-10 w-full flex-wrap items-center justify-center bg-[#FBFBFB] p-10">
                {blogs?.map((blog: any) => (
                  <article
                  onClick={() => {
                    navigate(`${RoutesEnums.BLOG}/${blog?.slug}`);
                  }}
                    key={blog?.slug}
                    className="flex w-1/4 flex-col max-h-[300px] min-h-[200px] items-start justify-between border-[0.1px] p-3 rounded-xl hover:shadow-2xl cursor-pointer"
                  >
                    <div className="flex mt-2 items-center gap-x-4 text-xs">
                      <time
                        dateTime={blog?.updated_at}
                        className="text-gray-500 border-[0.5px] py-1 px-2 rounded-full border-[#155E75]"
                      >
                        {blog?.updated_at}
                      </time>
               {/*        <a className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100">
                        {blog.category.title}
                      </a> */}
                    </div>
                    <div className="group relative">
                      <h3
                        className="mt-3 text-lg font-semibold leading-6  text-black group-hover:text-gray-600"
                      >
                        <a>
                          <span className=" line-clamp-3 absolute inset-0 leading-6 text-ellipsis whitespace-pre-wrap" />
                          {blog?.title}
                        </a>
                      </h3>
                      <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
                        {blog?.introduction}
                      </p>
                    </div>
                    <div className="relative mt-8 flex items-center gap-x-4">
                      <div className="text-sm leading-6">
                        <p className="font-semibold text-gray-900">
                          <a>
                            <span className="absolute inset-0" />
                            Author: 
                            <span  className="font-normal mx-1">{blog.author.name}</span>
                          </a>
                        </p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
      )}
 
    </main>
  );
}
