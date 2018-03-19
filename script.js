"use strict";

const timeOut = 500;
let timeout;

// Ko uporabnik 0.5 sekunde ali več nič ne napiše, posodobi rezultate
$(".search").keyup(function() {
  	let searchTerm = this.value;

  	if(timeout) {
        clearTimeout(timeout);
        timeout = null;
    }

	timeout = setTimeout(function() {
		searchApiAndShowResults(searchTerm);
	}, timeOut);
});

// Funckija ki bo iskala javni api (jsonplaceholder.typicode.com), in prikazala rezultate v tabeli 
function searchApiAndShowResults(searchTerm) {
	$('tr:not(:first-child)').remove();

	// Ce je input polje prazno, ne isci API-ja
	if (searchTerm === '') {
		return;
	}
	
	$.ajax({
		url: "https://jsonplaceholder.typicode.com/posts",
		method: "GET",
		
		success: function(results) {
			for (let i = 0; i < results.length; i++) {
				let article = results[i];

				if (article.title.indexOf(searchTerm) >= 0) {
					$("table").append(
						`<tr>
							<td>${article.id}</td>
							<td>${article.userId}</td>
							<td>${article.title}</td>
						</tr>`
					);
				}
			}
		}
	});
}
