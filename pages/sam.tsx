// import Posts from "../components/Posts";
import { sanityClient } from "../lib/Next-sanity";
// 
// const Posts = dynamic(() => import("../components/Posts"), { ssr: false });
export default function Home({ posts }: any) {
  return (
    <div className="  h-screen">
      
      
      <div className="grid grid-cols-1 gap-3 p-7 2xl:grid-cols-3 md:gap-6 md:p-12 ">
        {" "}
        {posts.map(
          (post: {
            _createdAt: any;
            publishedAt: any;
            _id: any;
            slug: { current: any };
            mainImage: any;
            description: any;
            author: { name: any; image: any };
            title: any;
          }) => {
            // console.log(post.slug.current,post._createdAt);
            return (<>f</>
              // <Posts
              //   key={post._id}
              //   id={post.slug.current}
              //   Mainimage={post.mainImage}
                
                
              //   AuthourImage={post.author.image}
              //   title={post.title}
              //   _createdAt={post._createdAt}
              // />
            );
          }
        )}
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const query = `*[_type == "post"] {
  _id,
  title,
  author -> {
    name,
    image
  },
  _createdAt,
  
  mainImage,
  slug
}`;

  const posts = await sanityClient.fetch(query);
  // console.log(posts);

  return {
    props: { posts },
  };
}
