import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { showBlog } from "../../../apis/blogs.api";
import Header from "../../../shared/components/Header";

const BlogView = () => {
  const params = useParams();
  const [blogContent, setBlogContent] : any = useState();
  useEffect(() => {
    getBlogContent();
  },[])
  const getBlogContent = async () => {
    try {
      let { status, data }: any = await showBlog(params?.slug);
      if (status === 200) {
        console.log(data?.transactions);
        setBlogContent(data?.transactions);
      }
    } catch (error) {
      console.log(error);
    }
    finally{
    }
  };

  return (
    <main className="h-full max-h-full">
      <section>
        <Header />
      </section>
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
                <p className="font-semibold text-gray-400 text-xs"> {blogContent?.updated_at} </p>
              </div>
            </div>
          </div>
        </div>
        <div className="px-20 lg:px-0 mt-12 text-gray-700 max-w-screen-md mx-auto text-lg leading-relaxed" dangerouslySetInnerHTML={{__html: blogContent?.content}} />
      </div>
    </div>
    </main>

  );
};

export default BlogView;
