module.exports = {
    project: {
      ios: {},
      android: {}, // grouped into "project"
    },
    dependency: {
      platforms: {
        android: null, // disable Android platform, other platforms will still autolink if provided
      },
    },
    assets: ['./src/assets/fonts'], // stays the same
  };