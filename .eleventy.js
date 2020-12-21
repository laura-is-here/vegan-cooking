module.exports = function (eleventyConfig) {
  eleventyConfig.setDataDeepMerge(true);

  eleventyConfig.setTemplateFormats(["njk", "md", "jpg", "svg", "png"]);

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

  return {
    markdownTemplateEngine: "njk",
  };
};
