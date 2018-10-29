// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  serviceUrl: 'https://localhost:3000',
  redirectUrl: 'https://localhost:4200/login',
  // Orcid information
  orcidUrl: 'https://sandbox.orcid.org/oauth/token',
  orcidClientId: 'APP-5AX5CHPDPUG3O9U7',
  orcidClientSecret: '54581a4b-efb9-4c83-8123-fb391a1f943d',
  orcidUserUrl: 'https://api.sandbox.orcid.org/v2.1/',
  // Github information
  githubClientId: 'f82f9874cdbfb0d42e1c',
  githubClientSecret: '77e5c5c25dc66247bc34f09f1647c9ba8a3ae84f',
  githubApi: "https://github.com/login/oauth/access_token",
  githubUserApi: "https://api.github.com/user",
  // Figshare information
  figshareClientId: 'bec69b2aa0ae870099779e0e41ded2ecb735a4b6',
  figshareClientSecret: 'a68f9e52feac2dccf9604d3837c905f3ca9ebae9df2d2fc64be82a505e3dba64146f6fe2233ae71ca69740ada6355e67bf8c3283b474c3488b423234aaaffa7b',
  figshareApi: "https://api.figshare.com/v2/token",
  figshareUserApi: "https://api.figshare.com/v2/",
  // Openaire information
  openaireClientId: 'bec69b2aa0ae870099779e0e41ded2ecb735a4b6',
  openaireClientSecret: 'a68f9e52feac2dccf9604d3837c905f3ca9ebae9df2d2fc64be82a505e3dba64146f6fe2233ae71ca69740ada6355e67bf8c3283b474c3488b423234aaaffa7b',
  openaireApi: "https://api.figshare.com/v2/token",
  openaireUserApi: "https://api.figshare.com/v2/",
  // Openaire information
  slideshareApiKey: '3vCVKUss',
  slideshareSharedSecret: 'mj06UMmH',
  slideshareApi: "https://www.slideshare.net/api/2/get_slideshows_by_user"
};


/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.

