/* eslint-disable @next/next/no-img-element */
import { sanityClient, urlFor } from "../../lib/Next-sanity";

import BlockContent from "@sanity/block-content-to-react";
import { GetStaticProps, GetStaticPaths } from "next/types";
import Link from "next/link";
import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";
import Head from "next/head";
import Image from "next/future/image";
import { Post } from "../../lib/types/blog";
import { useEffect } from "react";
export default function Blogpost({ post }: any) {
  const serializers = {
    types: {
      h1: (props: any) => (
        <h1 className="my-5 text-2xl font-bold" {...props}></h1>
      ),
      h2: (props: any) => (
        <h1 className="my-5 text-xl font-bold" {...props}></h1>
      ),
      li: ({ children }: any) => (<li className="ml-4 list-disc">{children}</li>),
      link: ({ children, href }: any) => (
        <a href={href} className="text-blue-500 hover:underline">
          {children}
        </a>
      ),
      code: (children: any) => {
        useEffect(() => {
          Prism.highlightAll()
        }, [])
        return<>
          <div className="my-5  max-w-xs overflow-x-auto sm:text-base sm:max-w-none text-sm">
            <code >
              <pre lang={children.node.language} >{children.node.code}</pre>
            </code>
          </div>
        </>
      },
      // Any other custom types you have in your content
      // Examples: mapLocation, contactForm, code, featuredProjects, latestNews, etc.
    },
  };

  return (
    <div className="grid items-center justify-center w-full mt-10 h-full ">
      <Head>
        <title>{post.title} </title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        ></meta>
        <meta name="keywords" content={`blog ,coding blog,${post.title}`} />

        <link rel="icon" href={urlFor(post.mainImage).url()!} />

        <meta charSet="utf-8"></meta>
        <link
          rel="icon"
          href={`https://mediom-135prithvi.vercel.app/${post.slug.current}`}
        ></link>
      </Head>
      <Image
        className="sm:h-80 sm:w-full   sm:object-scale-down  h-auto  object- "
        src={urlFor(post.mainImage).url()!}
        width={1200}
        height={800}
        alt=""
      />

      <div className="   w-full  mx-auto sm:max-w-3xl p-5">
        <h1 className="mt-10 mb-3 text-3xl">{post.title}</h1>
        <h2 className="mb-2 text-xl font-light text-gray-500">
          {post.description}
        </h2>

        <div className="flex items-center space-x-2">
          <img
            className="h-10 w-10 rounded-full"
            src={urlFor(post.author.image).url()!}
            alt=""
          />
          <p className="text-sm font-extralight">
            Blog post By{" "}
            <Link href={`/authors/${post.author.slug.current}`}>
              <a className="text-[#0070f3] cursor-pointer">
                {post.author.name}
              </a>
            </Link>{" "}
            - Published at {new Date(post._createdAt).toLocaleString()}
          </p>
        </div>

        <div className="mt-10">
          {
            <BlockContent
              dataset={"production"}
              projectId={"kgu0y8sn"}
              blocks={post.body}
              serializers={serializers}
            />
          }
        </div>
      </div>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
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

export const getStaticProps: GetStaticProps = async ({ params}:any) => {

  
  console.log(process.env.token);
  const query = `*[_type == "post" && slug.current == $id][0] {
  _id,
  _createdAt,
  title,
  author -> {
    name,
    image,
    slug
  },
  
  description,
  mainImage,
  slug,
  body
}`;

  const post = await sanityClient.fetch(query, {
    id: params?.id,
  });
  // console.log(post.body);

  if (!post) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      post,
    },
    revalidate: 15,
  };
};
