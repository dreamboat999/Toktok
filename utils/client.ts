import sanityClient from '@sanity/client';

export const client = sanityClient({
  projectId: 'ou4lefsb',
  dataset: 'production',
  apiVersion: '2022-08-04',
  useCdn: false,
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
});
