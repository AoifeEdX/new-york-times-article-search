// Function to render a single article card
function renderArticleCard(article) {
	const multimedia = article.multimedia && article.multimedia.length > 0 ? article.multimedia[0] : null;
	const imageSrc = multimedia ? `https://www.nytimes.com/${multimedia.url}` : 'https://picsum.photos/300';

	const imageElement = $("<img>")
		.addClass("card-img-top")
		.attr("src", imageSrc)
		.attr("alt", "Article Image")
		.css({
			"max-height": "300px",
			"object-fit": "cover",
		});

	const titleElement = $("<h5>").addClass("card-title mt-3").text(article.headline.main);
	const publishDate = article.pub_date ? new Date(article.pub_date).toLocaleDateString() : '';
	const dateElement = $("<h6>").addClass("card-text").text(`Published ${publishDate}`);
	const author = article.byline ? article.byline.original : '';
	const authorElement = $("<p>").addClass("card-subtitle mb-2 text-muted").text(`${author}`);
	const snippetElement = $("<p>").addClass("card-text").text(article.snippet);

	const articleCard = $("<div>").addClass("card");
	articleCard.append(imageElement, titleElement, dateElement, authorElement, snippetElement);

	return $("<div>").addClass("col mb-4").append(articleCard);
}

// Function to render articles on the frontend
function renderArticles(articles, articleCount) {
	const articleSection = $("#article-section");
	articleSection.empty(); // Clear previous articles

	const articleRow = $("<div>").addClass("row row-cols-1 row-cols-md-2 g-4");
	const displayedArticles = articles.slice(0, articleCount);

	displayedArticles.forEach(function (article) {
		articleRow.append(renderArticleCard(article));
	});

	articleSection.append(articleRow);
}

// Event listener for the submit button
$("#run-search").on("click", function (event) {
	event.preventDefault();

	const searchTerm = $("#search-term").val().trim();
	const articleCount = $("#article-count").val();
	const startYear = $("#start-year").val().trim();
	const endYear = $("#end-year").val().trim();
	const formattedStartDate = startYear ? `&begin_date=${startYear}0101` : '';
	const formattedEndDate = endYear ? `&end_date=${endYear}1231` : '';

	const apiKey = "77MfVxDZtFMkA8wiPSN1WQLNe2H95LTE";
	const queryURL = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchTerm}&api-key=${apiKey}${formattedStartDate}${formattedEndDate}`;

	fetch(queryURL)
		.then(function (response) {
			return response.json();
		})
		.then(function (data) {
			console.log("Data from NYT API:", data);

			const articles = data.response && data.response.docs ? data.response.docs : [];

			console.log("Relevant Fields from Articles:", articles.map(function (article) {
				return {
					title: article.headline.main,
					snippet: article.snippet,
				};
			}));

			renderArticles(articles, articleCount);
		})
		.catch(function (error) {
			console.error("Error fetching data from NYT API:", error);
		});
});
