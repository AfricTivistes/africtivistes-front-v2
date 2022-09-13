module.exports = {
  siteMetadata: {
    title: `africtivistes`,
    siteUrl: `https://www.yourdomain.tld`
  },
  plugins: [{
    resolve: 'gatsby-source-wordpress',
    options: {
      "url": "https://update.africtivistes.org/graphql",
      presets: [
        {
          presetName: `DEVELOP`,
          useIf: () => process.env.NODE_ENV === `development`,
          options: {
            develop: {
              nodeUpdateInterval: 60000, // Update nodes every 60 seconds 
              hardCacheMediaFiles: true,
              hardCacheData: false,
            },
            type: {
              MediaItem: {
                localFile: {
                  requestConcurrency: 10, // Amount of images to download concurrently. Try lowering this if wordpress server crashes on import.
                },
              },
            },
          },
        },
        {
          presetName: `PRODUCTION`,
          useIf: () => process.env.NODE_ENV === `production`,
          options: {
            production: {
              hardCacheMediaFiles: true,
              allow404Images: true,
              allow401Images: true,
            },
          },
        },
      ],
    }
  }, {
    resolve: 'gatsby-plugin-google-analytics',
    options: {
      "trackingId": "UA-228721643-1"
    }
  }, "gatsby-plugin-image", "gatsby-plugin-react-helmet", "gatsby-plugin-sitemap", {
    resolve: 'gatsby-plugin-manifest',
    options: {
      "icon": "src/images/icon.png"
    }
  }, "gatsby-plugin-mdx", "gatsby-plugin-sharp", "gatsby-transformer-sharp", {
    resolve: 'gatsby-source-filesystem',
    options: {
      "name": "images",
      "path": "./src/images/"
    },
    __key: "images"
  }, {
    resolve: 'gatsby-source-filesystem',
    options: {
      "name": "pages",
      "path": "./src/pages/"
    },
    __key: "pages"
  }]
};