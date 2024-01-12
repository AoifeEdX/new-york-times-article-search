# New York Times Article Search

## Description

Class mini-project using the [New York Times API](https://developer.nytimes.com/docs/articlesearch-product/1/overview).

![nyt-search](images/nyt.png)



## Code Funtionality:

* Uses an event listener for the "Search" button to handle user input and initiate API requests.

* Captures user input from the HTML form; trims and stores the input values in variables.

* Uses a fetch request for data from the constructed New York Times Article Search API URL.

* Parses the JSON response and logs the data for debugging.

* Logs an error message if there was an issue fetching data from the API.

* Extracts articles from the API response and formats them for display on the front end in a Bootstrap-styled layout, including:
	* Image
	* Title
	* Publication date
	* Author byline
	* Snippet of the article

* Clears previous articles before rendering new ones.

