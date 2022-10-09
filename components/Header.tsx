import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function Header({}: any) {
  const [x, setx] = useState([]);

  const router = useRouter();

  const query = encodeURIComponent(`*[_type == "category"] {title,_id} `);
  const url = `https://kgu0y8sn.api.sanity.io/v2021-10-21/data/query/production?query=${query}`;
  useEffect(() => {
    getCategory();
  });
  async function getCategory() {
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {},
      });

      if (response.ok) {
        const result = await response.json();
        // console.log(result);
        setx(result.result);
      }
    } catch (err) {
      console.error(err);
    }
    // console.log(data);
  }
  return (
    <header className="sticky ">
      <nav className=" bg-black border-gray-200 px-4 lg:px-6 py-2.5 h-[50px] dark:bg-gray-800">
        <div className="justify-between flex m-auto max-w-5xl w-full text-white px-4 items-center">
          {" "}
          <span className="inline-flex">hii</span> <p>ffff</p>
        </div>
      </nav>

      <nav className=" bg-white border-gray-200 border-b-[1px] px-4 lg:px-6 py-2.5 dark:bg-gray-800 ">
        <div className="   container flex flex-wrap sm:justify-center justify-between sm:space-x-6 space-x-4 items-center w-full max-w-screen-xl">
          <Link href="/">
            <a className="flex items-center">
              <Image
                src="/logo.svg"
                className="mr-3 h-4 sm:h-7"
                alt="Flowbite Logo"
                width={26}
                height={26}
              />
            </a>
          </Link>
          {/* <div className="flex items-center lg:order-2 order-1"> */}
          <div>
            <button className="inline-flex items-center p-1 px-2 ml-1  text-white font-medium text-[1rem]  transition-colors duration-500 rounded-lg hover:border-[#0070f3] border hover:bg-white hover:text-[#0070f3] bg-[#0070f3]">
              Learn
            </button>
          </div>

          <button
            data-collapse-toggle="mobile-menu-2"
            type="button"
            className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="mobile-menu-2"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              ></path>
            </svg>
            <svg
              className="hidden w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
          {/* </div> */}
          <div
            className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
            id="mobile-menu-2"
          >
            <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
              {x.map((post: { _id: any; title: any }) => {
                return (
                  <Link href={`/category/${post.title}`} key={post._id}>
                    <a
                      className={`block py-2 pr-4 pl-3 ${
                        router.query.id == post.title
                          ? "text-[#0070f3] font-semibold"
                          : "text-black"
                      }  rounded bg-primary-700 lg:bg-transparent lg:text-primary-700 lg:p-0 font-sans dark:text-white`}
                      aria-current="page"
                    >
                      {post.title}
                    </a>
                  </Link>
                );
              })}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
