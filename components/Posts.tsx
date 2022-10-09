import Link from "next/link";
import { urlFor } from "../lib/Next-sanity";
import { LabeledValue } from "../lib/types/blog";

/* eslint-disable @next/next/no-img-element */
export function DestinationCard(destination: LabeledValue) {
  return (
    <div className="flex items-center rounded-lg bg-white shadow-lg overflow-hidden">
      <div className=" shadow-lg   ">
        <img
          className="aspect-auto h-32 w-36"
          src={
            destination.mainImage
              ? urlFor(destination.mainImage).url()!
              : "https://avatars.githubusercontent.com/u/87182486?s=40&v=4"
          }
        />
      </div>
      <div className="px-6 py-4">
        <h3 className="sm:text-lg text-base  inline font-semibold text-gray-800">
          {destination.title}
        </h3>

        <p className="text-gray-600 ">
          <br className="block" />
          {new Date(destination._createdAt).toDateString()}{" "}
        </p>
        <div className="mt-4">
          <Link href={`/posts/${destination.slug.current}`}>
            <a className="text-[#0070f3] hover:text-[#729ff9] font-semibold text-sm">
              Explore {} more
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}