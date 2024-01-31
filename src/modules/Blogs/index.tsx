import { useNavigate } from "react-router-dom";
import { RoutesEnums } from "../../enums/routes.enum";
import Header from "../../shared/components/Header";

const posts = [
    {
      id: 1,
      title: 'Boost your conversion rate',
      description:
        'Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.',
      date: 'Mar 16, 2020',
      datetime: '2020-03-16',
      category: { title: 'Marketing' },
      author: {
        name: 'Michael Foster',
        role: 'Co-Founder / CTO',
        imageUrl:
          'https://images.unsplash.com/photo-1706433164724-b4aacbfe931f?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fHx8',
      },
    },
    {
      id: 1,
      title: 'Boost your conversion rate',
      description:
        'Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.',
      date: 'Mar 16, 2020',
      datetime: '2020-03-16',
      category: { title: 'Marketing'},
      author: {
        name: 'Michael Foster',
        role: 'Co-Founder / CTO',
        imageUrl:
          'https://images.unsplash.com/photo-1575314027842-c33656c1f3dc?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGh0bWx8ZW58MHx8MHx8fDA%3D',
      },
    },
    {
      id: 1,
      title: 'Boost your conversion rate',
      description:
        'Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.',
      date: 'Mar 16, 2020',
      datetime: '2020-03-16',
      category: { title: 'Marketing' },
      author: {
        name: 'Michael Foster',
        role: 'Co-Founder / CTO',
        imageUrl:
          'https://images.unsplash.com/photo-1575314027842-c33656c1f3dc?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGh0bWx8ZW58MHx8MHx8fDA%3D',
      },
    },
    {
      id: 1,
      title: 'Boost your conversion rate',
      description:
        'Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.',
      date: 'Mar 16, 2020',
      datetime: '2020-03-16',
      category: { title: 'Marketing' },
      author: {
        name: 'Michael Foster',
        role: 'Co-Founder / CTO',
        imageUrl:
          'https://images.unsplash.com/photo-1575314027842-c33656c1f3dc?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGh0bWx8ZW58MHx8MHx8fDA%3D',
      },
    },
    {
      id: 1,
      title: 'Boost your conversion rate ',
      description:
        'Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.',
      date: 'Mar 16, 2020',
      datetime: '2020-03-16',
      category: { title: 'Marketing'},
      author: {
        name: 'Michael Foster',
        role: 'Co-Founder / CTO',
        imageUrl:
          'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
    },
    {
      id: 1,
      title: 'Boost your conversion rate',
      description:
        'Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.',
      date: 'Mar 16, 2020',
      datetime: '2020-03-16',
      category: { title: 'Marketing'},
      author: {
        name: 'Michael Foster',
        role: 'Co-Founder / CTO',
        imageUrl:
          'https://images.unsplash.com/photo-1511576661531-b34d7da5d0bb?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fExhbmRzY2FwZXxlbnwwfDB8MHx8fDA%3D',
      },
    },
    // More posts...
  ]
  
  export default function Blogs() {

    const navigate = useNavigate();
    return (
        <main className="h-full max-h-full">
        <section>
          <Header />
        </section>
      <div className="bg-white pt-10 pb-20 sm:py-32 overflow-scroll max-h-screen custom-scroll">
        <div className="mx-auto  px-6">
          <div className="mx-auto w-full justify-center items-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 text-center">From the blog</h2>
            <p className="mt-2 text-lg leading-8 text-gray-600 border-b-2 text-center pb-4">
              Learn how to grow your business with our expert advice.
            </p>
          </div>
          <div className="flex gap-10 w-full flex-wrap items-center justify-center bg-[#FBFBFB] p-10">
            {posts.map((post) => (
              <article key={post.id} className="flex max-w-sm flex-col items-start justify-between border-[2px] p-3 rounded-xl hover:shadow-2xl cursor-pointer">
                <div className="w-full mb-5  bg-[#FBFBFB]">
                    <img className="h-64 w-96 bg-[#FBFBFB]" style={
                        {
                            objectFit: "contain",
                            aspectRatio: "1/1",
                        }
                    }  src={post.author.imageUrl} alt="" />
                </div>
                <div className="flex items-center gap-x-4 text-xs">
                  <time dateTime={post.datetime} className="text-gray-500 border-[0.5px] py-1 px-2 rounded-full border-[#155E75]">
                    {post.date}
                  </time>
                  <a
                    className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100">
                    {post.category.title}
                  </a>
                </div>
                <div className="group relative">
                  <h3 onClick={()=>{
                    navigate(`${RoutesEnums.BLOG}/${post.id}`)
                  }} className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                    <a>
                      <span className="absolute inset-0" />
                      {post.title}
                    </a>
                  </h3>
                  <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">{post.description}</p>
                </div>
                <div className="relative mt-8 flex items-center gap-x-4">
                  <img src={post.author.imageUrl} alt="" className="h-10 w-10 rounded-full bg-gray-50" />
                  <div className="text-sm leading-6">
                    <p className="font-semibold text-gray-900">
                      <a >
                        <span className="absolute inset-0" />
                        {post.author.name}
                      </a>
                    </p>
                    <p className="text-gray-600">{post.author.role}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
      </main>
    )
  }
  