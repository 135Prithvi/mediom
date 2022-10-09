import {
 
    createCurrentUserHook,
    createClient,
  } from 'next-sanity';
import    createImageUrlBuilder  from '@sanity/image-url';

  export const config = {
    /**
     * Find your project ID and dataset in `sanity.json` in your studio project.
     * These are considered “public”, but you can use environment variables
     * if you want differ between local dev and production.
     *
     * https://nextjs.org/docs/basic-features/environment-variables
     **/
     projectId: 'kgu0y8sn',
  dataset: 'production',
  apiVersion: 'v1',
  token:
  process.env.token || "skQx0RzoFTkSC6npjxHYFRdR6lao1dgKWiEuMx5z0wMsTbshEMSEN0bUlpSgm6ykN0F2dl1jAtFY3A9PKCyOYfoWGdvEqnBPi75x0uKdg2yjjgjWGBpAaYcYP9xNfwedrl8v4GrXNveXxvkGulXxIzSpAxIujELBJgOwkhBQOArm1yuUm5st" ,
  useCdn: false,
  ignoreBrowserTokenWarning: true
  };
  
  export const sanityClient = createClient(config);
  
  /**
   * Set up a helper function for generating Image URLs with only the asset reference data in your documents.
   * Read more: https://www.sanity.io/docs/image-url
   **/
  export const urlFor = (source) => createImageUrlBuilder(config).image(source);
  
  // Helper function for using the current logged in user account
  export const useCurrentUser = createCurrentUserHook(config);