var coll = document.getElementsByClassName("collapsible");
var autoOpen = document.getElementsByClassName("collapsible_auto");
var i;

for (i = 0; i < coll.length; i++) {
	coll[i].addEventListener("click", function() {
		this.classList.toggle("active");
		var content = this.nextElementSibling;
		if (content.style.display === "block") {
			content.style.display = "none";
		} else {
			content.style.display = "block";
		}
	});
}

for (i = 0; i < autoOpen.length; i++) {
	var content = autoOpen[i].nextElementSibling;
	content.style.display = "block";
	autoOpen[i].classList.add("active");
}