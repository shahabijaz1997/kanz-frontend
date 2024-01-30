const BlogCard = ({ image , date, CardTitle, CardDescription }:any) => {
    return (
      <>
        <div className="w-full px-4 md:w-1/2 lg:w-1/3">
          <div className="mb-10 w-full">
            <div className="mb-8 overflow-hidden rounded">
              <img src={image} alt="" className="h-96 w-80" />
            </div>
            <div>
              {date && (
                <span className="mb-5 inline-block rounded bg-primary px-4 py-1 text-center text-xs font-semibold leading-loose text-white">
                  {date}
                </span>
              )}
              <h3>
                <a
                  href="/#"
                  className="mb-4 inline-block text-xl font-semibold text-dark hover:text-primary  sm:text-2xl lg:text-xl xl:text-2xl"
                >
                  {CardTitle}
                </a>
              </h3>
              <p className="text-base text-body-color ">
                {CardDescription}
              </p>
            </div>
          </div>
        </div>
      </>
    );
  };

  export default BlogCard