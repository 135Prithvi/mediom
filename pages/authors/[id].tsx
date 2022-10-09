/* eslint-disable @next/next/no-img-element */
import { sanityClient, urlFor } from "../../lib/Next-sanity";

import PortableText from 'react-portable-text';
import { GetStaticProps } from "next/types";
export default function author({author}:any) {


    return (
        <div>


        <article className="mx-auto max-w-3xl p-5">
          
          <h2 className="mb-2 text-xl font-light text-gray-500">
            {author.description}
          </h2>

          <div className="flex items-center space-x-2">
            <img
              className="h-10 w-10 rounded-full"
              src={urlFor(author.image).url()!}
              alt=""
            />
            <h1 className=" text-3xl">{author.name}</h1>
          </div>

          <div className="container mt-5">
            <PortableText
              dataset={"production"}
              projectId={"kgu0y8sn"}
              content={author.bio}
              serializers={{
                h1: (props: any) => (
                  <h1 className="my-5 text-2xl font-bold" {...props}></h1>
                ),
                h2: (props: any) => (
                  <h1 className="my-5 text-xl font-bold" {...props}></h1>
                ),
                li: ({ children }: any) => (
                  <li className="ml-4 list-disc">{children}</li>
                ),
                link: ({ children, href }: any) => (
                  <a href={href} className="text-blue-500 hover:underline">
                    {children}
                  </a>
                ),
              }}
            />
          </div>
        </article>
        </div>
);
}


export const getStaticPaths = async () => {
    const query = `*[_type == "author"] {
    _id,
    slug {
        current
    }
  }`;
  
    const authors = await sanityClient.fetch(query);
  
    const paths = authors.map((author: any) => ({
      params: {
        id: author.slug.current,
      },
    }));
  
    return {
      paths,
      fallback: 'blocking',
    };
  };
  
  export const getStaticProps: GetStaticProps = async ({ params }) => {
    // console.log(params?.id);
    const query = `*[_type == "author" && slug.current == $id][0] {
        _id,
        name,
        image,
      slug ,
      bio
  }`;
  
    const author = await sanityClient.fetch(query, {
      id: params?.id,
    });
  
    if (!author) {
      return {
        notFound: true,
      };
    }
    // console.log(author);
    return {
      props: {
        author,
      },
      revalidate: 6,
    };
  };
