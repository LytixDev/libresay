/* Nicolai H. Brand 15.04.2022 */

const commentForm = "commentForm";
var commentSection = document.getElementById("commentSection");
var commentField = document.getElementById("commentField");

const commentWrapper = "commentWrapper";
const commentHead = "commentHead";
const commentBody = "commentBody";

var comments = [];
var total_ids = 0;

var sortByStars = false;


class Comment {

    constructor(name, comment) {
        this.id = ++total_ids;
        this.name = name;
        this.comment = comment;
        this.timeWhenSubmitted = Date.now();
        /* an upvote repsents that you agree with the comment */
        this.upvotes = 0;
        /* a downvote repsents that you disagree with the comment */
        this.downvotes = 0;
        /* 
         * a star represents the idea that you thought the comment was
         * valuable, regardless of if you agree or disagree with its
         * content/message/idea.
         */
        this.stars = 0;
    }

    incrementUpvote() {
        this.upvotes++;
    }

    incrementDownvote() {
        this.downvote++;
    }

    incrementStars() {
        this.stars++;
    }

    formatTime() {
        /* time since comment was submitted in minutes */
        let timeDiff = ((Date.now() - this.timeWhenSubmitted) / 60000) >> 0;

        /* minutes */
        if (timeDiff < 1)
            return "now";
        if (timeDiff < 60)
            return "about " + timeDiff + " minutes ago";

        /* hours*/
        let timeDiffInHours = (timeDiff / 60) >> 0;
        if (timeDiffInHours < 24)
            return "about " + timeDiffInHours + " hours ago";
        
        /* days */
        let timeDiffInDays = (timeDiffInHours / 24) >> 0;
        if (timeDiffInDays < 31)
            return "about " + timeDiffInDays + " days ago";

        /* months */
        let timeDiffInMonths = (timeDiffInHours / 30) >> 0;
        return "about " + timeDiffInMonths + " months ago";
    }

    toHTML() {
        let htmlRepresentation = `<div class="${commentWrapper}">`;
        htmlRepresentation += `<p class="${commentHead}">${this.name} - ${this.formatTime()}</p>`;
        htmlRepresentation += `<p class="${commentBody}">>>>${this.comment}</p>`;
        htmlRepresentation += `</div>`;
        return htmlRepresentation;
    }
}


function validateCommentForm(event) {
    let nameField = document.forms[commentForm]["name"].value;
    let commentField = document.forms[commentForm]["comment"].value;

    if (nameField == "")
        nameField = "anon";

    if (commentField == "") {
        alert("Empty comment");
        return 1;
    }

    let newComment = new Comment(nameField, commentField);
    comments.push(newComment);

    if (sortByStars)
        sortCommentsBasedOnStars();
    else
        sortCommentsBasedOnTime();

    showComments();

    event.preventDefault();
    /* reset comment field, but keep name field */
    document.forms[commentForm]["comment"].value = "";
}

function showComment(comment) {
    commentField.innerHTML += `<p>${comment.name} - ${comment.comment}`;
}

function showComments() {
    /* reset comment field */
    commentField.innerHTML = "";
    comments.forEach(comment => commentField.innerHTML += comment.toHTML());
}

function sortCommentsBasedOnTime() {
    comments.sort(function(a, b) {
                return b.timeWhenSubmitted - a.timeWhenSubmitted
                });
}

function sortCommentsBasedOnStars() {
    comments.sort(function(a, b) {
                return b.stars - a.stars
                });
}

function setSortByStars(bool) {
    if (bool == "true")
        sortByStars = true;
    else
        sortByStars = false;
}
