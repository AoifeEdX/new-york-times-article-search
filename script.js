// Event listener for the submit button
$("#run-search").on("click", function (event) {
	event.preventDefault();

	// Variables for the values input in the search parameters
	const searchTerm = $("#search-term").val().trim();
	const articleCount = $("#article-count").val();
	const startYear = $("#start-year").val().trim();
	const endYear = $("#end-year").val().trim();

	// Variables to adapt the year input by the user into a searchable format for the API (YYYYMMDD), i.e. adds 01 Jan to the Start Year and 31 December to the End Year
	const formattedStartDate = startYear ? `&begin_date=${startYear}0101` : '';
	const formattedEndDate = endYear ? `&end_date=${endYear}1231` : '';

	// NYtimes API key 
	const apiKey = "77MfVxDZtFMkA8wiPSN1WQLNe2H95LTE";
	const queryURL = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchTerm}&api-key=${apiKey}${formattedStartDate}${formattedEndDate}`;

	// Fetch data from New York Times
	fetch(queryURL)
		.then(response => response.json())
		.then(data => {
			console.log("Data from NYT API:", data);

			// Extract articles from the API response or provide an empty array as a default
			const articles = data?.response?.docs || [];

			// Console log relevant fields of articles (title and snippet)
			console.log("Relevant Fields from Articles:", articles.map(({ headline, snippet }) => ({ title: headline.main, snippet })));

			// Display the articles on the frontend (using the showArticles function below)
			showArticles(articles, articleCount);
		})

		// Console log an error if there is an issue fetching data from the API
		.catch(error => console.error("Error fetching data from NYT API:", error));
});

// Function to show a single article card in Bootstrap
function showArticleCard(article) {

	// Extract multimedia information from the articles; use a placeholder image from Picsum if multimedia is not available
	const multimedia = article.multimedia?.[0];
	const imageSrc = multimedia ? `https://www.nytimes.com/${multimedia.url}` : 'https://picsum.photos/300';

	// Create an image element with Bootstrap/CSS styling
	const imageElement = $("<img>", {
		class: "card-img-top",
		src: imageSrc,
		alt: "Article Image",
		css: { "max-height": "300px", "object-fit": "cover" }
	});

	// Format the article title
	const titleElement = $("<h5>", { class: "card-title mt-3" }).text(article.headline.main);

	// Format the publication date as a localized string
	const publishDate = new Date(article.pub_date).toLocaleDateString();
	const dateElement = $("<h6>", { class: "card-text" }).text(`Published ${publishDate}`);

	// Format the author's name / byline; if no author is specified, leave it blank
	const authorElement = $("<p>", { class: "card-subtitle mb-2 text-muted" }).text(article.byline?.original || '');

	// Format a snippet from the article
	const snippetElement = $("<p>", { class: "card-text" }).text(article.snippet);

	const articleCard = $("<div>", { class: "card" }).append(imageElement, titleElement, dateElement, authorElement, snippetElement);

	return $("<div>", { class: "col mb-4" }).append(articleCard);
}

// Function to show articles on the frontend in Bootstrap
function showArticles(articles, articleCount) {
	const articleSection = $("#article-section").empty(); // Clear previous articles

	const articleRow = $("<div>", { class: "row row-cols-1 row-cols-md-2 g-4" });

	// Display only the number of articles selected by the user
	const displayedArticles = articles.slice(0, articleCount);

	// Create and append article cards for each displayed article
	displayedArticles.forEach(article => articleRow.append(showArticleCard(article)));
	articleSection.append(articleRow);
}