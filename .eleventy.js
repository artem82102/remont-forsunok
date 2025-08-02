module.exports = function(eleventyConfig) {
  // ИСПРАВЛЕНО: Копируем папку 'css' из 'src' в корень сайта
  eleventyConfig.addPassthroughCopy("./src/css/");
  
  // ИСПРАВЛЕНО: Копируем папку 'js' из 'src' в корень сайта
  eleventyConfig.addPassthroughCopy("./src/js/");

  return {
    pathPrefix: "/remont-forsunok/",
    // Указываем, что Nunjucks является движком по умолчанию для HTML-файлов
    htmlTemplateEngine: "njk",
    // Указываем, откуда брать файлы и куда складывать результат
    dir: {
      input: "src",
      includes: "_includes",
      output: "_site"
    }
  };
};