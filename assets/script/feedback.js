const ratingStars = [...document.getElementsByClassName("rating__star")];

function executeRating(stars) {
  const starClassActive = "rating__star fas fa-star";
  const starClassInactive = "rating__star far fa-star";
  const starsLength = stars.length;
  let i;
  stars.map((star) => {
    star.onclick = () => {
      i = stars.indexOf(star);

      if (star.className===starClassInactive) {
        for (i; i >= 0; --i) stars[i].className = starClassActive;
      } else {
        for (i; i < starsLength; ++i) stars[i].className = starClassInactive;
      }
    };
  });
}
executeRating(ratingStars);

// creazione sezione commenti 
document.getElementById("bottone_invio").addEventListener("click", function () {

  const newComment = document.getElementById("feedbackInput").value;
  const commentContainer = document.getElementById("comment-container");
  const commentElement = document.createElement("p");
  commentElement.innerText = newComment;
  commentContainer.appendChild(commentElement);
  document.getElementById("feedbackInput").value = "";
})