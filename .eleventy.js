module.exports = function (eleventyConfig) {
  let markdownIt = require("markdown-it");
  let markdownAnchor = require("markdown-it-anchor");
  let options = {
    html: true,
  };
  let markdownLib = markdownIt(options).use(markdownAnchor);

  eleventyConfig.setLibrary("md", markdownLib);

  eleventyConfig.setDataDeepMerge(true);

  eleventyConfig.setTemplateFormats(["njk", "md", "jpg", "svg", "png"]);

  eleventyConfig.addPassthroughCopy({ "static/*": "/" });

  eleventyConfig.addPassthroughCopy("css/styles.css");

  eleventyConfig.addCollection("tagList", (collection) => {
    const tagsSet = new Set();
    collection.getAll().forEach((item) => {
      if (!item.data.tags) return;
      item.data.tags
        .filter((tag) => !["recipe", "all"].includes(tag))
        .forEach((tag) => tagsSet.add(tag));
    });
    return Array.from(tagsSet).sort();
  });

  eleventyConfig.addCollection("recipesAlpha", (collection) =>
    collection.getFilteredByGlob("recipes/*.md").sort((a, b) => {
      let nameA = a.data.title.toUpperCase();
      let nameB = b.data.title.toUpperCase();
      if (nameA < nameB) return -1;
      else if (nameA > nameB) return 1;
      else return 0;
    })
  );

  return {
    markdownTemplateEngine: "njk",
  };
};
