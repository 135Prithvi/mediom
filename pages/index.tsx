
import { DestinationCard } from "../components/Posts";
import { sanityClient} from "../lib/Next-sanity";
import { LabeledValue } from "../lib/types/blog";
import Head from "next/head";



export default function App({ posts }: any) {
  return (
    
    <div>
      <Head>
  <title>Mediom</title>
  <link rel="icon" href="/logo_bran.svg" />
  <meta name="keywords" content={`blog ,coding blog`} />
  <meta name="google-site-verification" content="Hfqc9pV2RUFW4MHhQr4KmRUnFuQ4TC4eVNit5Fis_h0" />
</Head>
      <div className="bg-gray-100 grid lg:grid-cols-2 2xl:grid-cols-5">
        <div className="px-8 py-12 max-w-md mx-auto sm:max-w-xl lg:px-12 lg:py-24 lg:max-w-full xl:mr-0 2xl:col-span-2">
          <div className="xl:max-w-xl">
            <img className="h-10" src="/logo_bran.svg" alt="Workcation" />

            <img
              className="mt-6 rounded-lg object-center shadow-xl sm:mt-8 sm:h-64 sm:w-full sm:object-cover lg:hidden"
              src="/beach-work.jpg"
              alt="Woman workcationing on the beach"
            />

            <h1 className="mt-6 text-2xl font-bold text-gray-900 sm:mt-8 sm:text-4xl lg:text-3xl xl:text-4xl">
              You can work from anywhere.
              <br className="hidden lg:inline" />{" "}
              <span className="text-[#0070f3]">Take advantage of it.</span>
            </h1>
            <p className="mt-2 text-gray-600 sm:mt-4 sm:text-xl">
              Workcation helps you find work-friendly rentals in beautiful
              locations so you can enjoy some nice weather even when you're not
              on vacation.
            </p>
            <div className="mt-4 space-x-1 sm:mt-6">
              <a
                className="inline-block px-5 py-3 rounded-lg transform transition bg-[rgb(0,112,213)] hover:bg-[rgb(0,112,300)] hover:-translate-y-0.5 focus:ring-[#0070f3] focus:ring-opacity-50 focus:outline-none focus:ring focus:ring-offset-2 active:bg-[#729ff9] uppercase tracking-wider font-semibold text-sm text-white shadow-lg sm:text-base"
                href="#"
              >
                Book your escape
              </a>
            </div>
          </div>
        </div>
        <div className="hidden relative lg:block 2xl:col-span-3">
          <img
            className="absolute inset-0 w-full h-full object-cover object-center"
            src="/beach-work.jpg"
            alt="Woman workcationing on the beach"
          />
        </div>
      </div>

      <div className="max-w-md sm:max-w-xl lg:max-w-6xl mx-auto px-8 lg:px-12 py-8">
        <h2 className="text-xl text-gray-900">Popular destinations</h2>
        <p className="mt-2 text-gray-600">
          A selection of great work-friendly cities with lots to see and
          explore.
        </p>
        <div className="mt-6 grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
          {posts.map((_post: LabeledValue) => (
            <DestinationCard {..._post} key={_post._id} />
          ))}
        </div>
      </div>
    </div>
  );
}



export async function getServerSideProps({ req, res }: any) {
  // res.setHeader(
  //     'Cache-Control',
  //     'public, s-maxage=10, stale-while-revalidate=60'
  //   )
  const query = `*[_type == "post"] {
    _id,
    title,
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
