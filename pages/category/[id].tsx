
import { GetStaticPaths, GetStaticProps } from "next/types";


import { sanityClient } from "../../lib/Next-sanity";

import Head from "next/head";

import { DestinationCard } from "../../components/Posts";
import { LabeledValue, Post } from "../../lib/types/blog";


export default function Category({posts}:any) {



    return (
        <div className="  h-screen">
          <Head>
        <title>Categories</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        ></meta>
        <meta name="keywords" content={`blog ,coding blog`} />

        <link rel="icon" href={`/favicon.ico`} />

        <meta charSet="utf-8"></meta>
        
      </Head>
         
          <div className="grid grid-cols-1 gap-3 p-7 2xl:grid-cols-3 md:gap-6 md:p-12">
            {" "}
            {posts.map(
              (post: LabeledValue) => {
                
                return (
                  <DestinationCard
                    key={post._id}
                    {...post}
                  />
                );
              }
            )}
          </div>
        </div>
      );
}
export const getStaticProps: GetStaticProps = async ({ params }) => {
    console.log(params?.id);
    const query = `*[_type == "post" && references(*[_type=="category" && title == $id]._id) ] {
        _id,
        _createdAt,
        title,
        description,
        mainImage,
        slug,

      }   `;
  
    const posts = await sanityClient.fetch(query, {
      id: params?.id,
    });
    // console.log(posts.body);
  
    if (!posts) {
      return {
        notFound: true,
      };
    }
  
    return {
      props: {
        posts,
      },
      revalidate: 60,
    };
  };
  export const getStaticPaths:GetStaticPaths = async () => {
    const query = `*[_type == "post"] {
    _id,
    slug {
        current
    }
  }`;
  
    const posts = await sanityClient.fetch(query);
  
    const paths = posts.map((post: Post) => ({
      params: {
        id: post.slug.current,
      },
    }));
  
    return {
      paths,
      fallback: "blocking",
    };
  };