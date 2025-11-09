// Fetches article data from a JSON file, finds the article matching the stored ID, and displays its content.
// Alerts the user if an error occurs during fetching or parsing.
const fetchData = async () => {
  try {
    const promise = await fetch("files/data.json");
    const data = await promise.json();
    const article = data.find(
      (elem) => elem.id == localStorage.getItem("articleId")
    );
    fillInArticle(article);
  } catch (error) {
    alert(error.message);
  }
};

fetchData();

// Fill in the article page with content based on the provided article object.
function fillInArticle(article) {
  const articleTitle = document.getElementById("article-title");
  if (articleTitle) {
    articleTitle.innerHTML = article.article_title;
  }

  const articleIntro = document.getElementById("article-intro");
  if (articleIntro) {
    articleIntro.innerHTML = article.article_content;
  }

  const articleCodeSyntax = document.getElementById("article-code-syntax");
  if (articleCodeSyntax) {
    articleCodeSyntax.innerHTML = article.article_code_syntax;
  }

  const articleCode = document.getElementById("article-code");
  if (articleCode) {
    articleCode.innerHTML = article.article_code;
  }

  const articleCodeOutput = document.getElementById("article-code-output");
  if (articleCodeOutput) {
    articleCodeOutput.innerHTML = article.article_code_output;
  }
}
