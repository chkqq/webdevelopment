const title = document.getElementById('title');
const subTitle = document.getElementById('description');
const author = document.getElementById('author');
const publishDate = document.getElementById('publishDate');
const content = document.getElementById('content');

const uploadAuthorPhoto = document.querySelector(".author-photo-form__input");
const uploadTinyPostIMG = document.querySelector(".input-hero-image-tiny__input");
const uploadPostIMG = document.querySelector(".input-hero-image__input");

const removeAuthorPhoto = document.querySelector(".author-photo-form__remove-button");
const removeTinyPostIMG = document.querySelector(".remove-tiny-hero");
const removePostIMG = document.querySelector(".remove-hero");

const titleReq = document.getElementById("titleReq");
const subTitleReq = document.getElementById("subTitleReq");
const authorReq = document.getElementById("authorReq");
const authorPhotoReq = document.getElementById("authorPhotoReq");
const publishDateReq = document.getElementById("publishDateReq");
const postIMGReq = document.getElementById("postIMGReq");
const tinyPostIMGReq = document.getElementById("tinyPostIMGReq");
const contentReq = document.getElementById("contentReq");

let postImgInput;
let authorIMGInput;
let previewIMGInput;

let post = {
    "Title": null,
    "SubTitle": null,
    "AuthorName": null,
    "AuthorPhoto": null,
    "Data": null,
    "BigImage": null,
    "SmallImage": null,
    "Content": null
}

title.addEventListener(
    "blur", 
    () => {
        if (title.value === ''){
            title.classList.add("form-card__input-invalid");
            titleReq.classList.add("form-card__is-required-visible");
        }
        else {
            title.classList.remove("form-card__input-invalid");
            titleReq.classList.remove("form-card__is-required-visible");
        }
    }
)

subTitle.addEventListener(
    "blur", 
    () => {
        if (subTitle.value === ''){
            subTitle.classList.add("form-card__input-invalid");
            subTitleReq.classList.add("form-card__is-required-visible");
        }
        else {
            title.classList.remove("form-card__input-invalid");
            subTitleReq.classList.remove("form-card__is-required-visible");
        }
    }
)

author.addEventListener(
    "blur", 
    () => {
        if (author.value === ''){
            author.classList.add("form-card__input-invalid");
            authorReq.classList.add("form-card__is-required-visible");
        }
        else {
            author.classList.remove("form-card__input-invalid");
            authorReq.classList.remove("form-card__is-required-visible");
        }
    }
)

publishDate.addEventListener(
    "input", 
    () => {
        if (publishDate.value === ''){
            publishDate.classList.add("form-card__input-invalid");
            publishDateReq.classList.add("form-card__is-required-visible");
        }
        else {
            publishDate.classList.remove("form-card__input-invalid");
            publishDateReq.classList.remove("form-card__is-required-visible");
        }
    }
)

content.addEventListener(
    "blur", 
    () => {
        if (content.value === ''){
            content.classList.add("form-card__text-invalid");
            contentReq.classList.add("form-card__is-required-visible");
        }
        else {
            content.classList.remove("form-card__text-invalid");
            contentReq.classList.remove("form-card__is-required-visible");
        }
    }
)

title.addEventListener(
    "input" , 
    () => {
        let title = document.getElementById('title').value;
        let defaultTitle = 'New Post';
        if (title !== '' && title.length < 25) {
            document.getElementById('titleVisual').innerHTML = title;
            document.getElementById('titleVisualTiny').innerHTML = title;
            post.Title = title;
        }
        else {
            document.getElementById('titleVisual').innerHTML = defaultTitle;
            document.getElementById('titleVisualTiny').innerHTML = defaultTitle;
            post.Title = null;
        }
    }
)

subTitle.addEventListener(
    "input",  
    () => {
        let subtitle = document.getElementById('description').value;
        let defaultSubtitle = 'Please, enter any description';
        if (subtitle !== '' && subtitle.length < 60){
            document.getElementById('subtitleVisual').innerHTML = subtitle;
            document.getElementById('subtitleVisualTiny').innerHTML = subtitle;
            post.SubTitle = subtitle;
        } 
        else {
            document.getElementById('subtitleVisual').innerHTML = defaultSubtitle;
            document.getElementById('subtitleVisualTiny').innerHTML = defaultSubtitle;
            post.SubTitle = null;
        }   
    }
)

author.addEventListener(
    "input",   
    () => {
        let name = document.getElementById('author').value;
        let defaultName = 'Enter author name';
        if (name !== '' && name.length < 25){
            document.getElementById('authorNameVisualTiny').innerHTML = name;
            post.AuthorName = name;
        }    
        else {
            document.getElementById('authorNameVisualTiny').innerHTML = defaultName;
            post.AuthorName = null;
        }
        
    }
)

publishDate.addEventListener(
    "input", 
    () => {
        let date = document.getElementById('publishDate').value;
        let defaultDate = '18.04.2024';
        if (date !== ''){
            document.getElementById('dateVisuality').innerHTML = date;
            post.Data = date;
        }    
        else {
            document.getElementById('dateVisuality').innerHTML = defaultDate;
            post.Data = null;
        }
    }
)

uploadAuthorPhoto.addEventListener(
    "input",  
    () => {
        const previewPostCardAuthorPhoto = document.querySelector(".post-card-info__photo");
        const previewInput = document.querySelector(".preview-author-photo");
        const file = document.querySelector(".author-photo-form__input").files[0];
        const reader = new FileReader();
        reader.addEventListener(
            "load",
            () => {
                previewPostCardAuthorPhoto.src = reader.result;
                previewInput.src = reader.result;
                authorIMGInput = reader.result;
                post.AuthorPhoto = reader.result;
            },
            false
        );
        document.querySelector(".author-photo-form__remove-button").classList.add("remove-button__remove-button-show");
        uploadAuthorPhotoButton = document.getElementById("uploadAuthorPhotoButton");
        uploadAuthorPhotoButton.innerHTML = 'Upload New';
        uploadAuthorPhotoButton.classList.add("author-photo-form__upload-button-view");
        document.querySelector(".upload-button__icon").classList.add("upload-button__icon-view");
        if (file) {
            reader.readAsDataURL(file);
        }
    }
)

removeAuthorPhoto.addEventListener(
    "click",
    function(event) {
        event.preventDefault();
        document.querySelector(".author-photo-form__remove-button").classList.remove("remove-button__remove-button-show");
        uploadAuthorPhotoButton = document.getElementById("uploadAuthorPhotoButton");
        uploadAuthorPhotoButton.innerHTML = 'Upload';
        uploadAuthorPhotoButton.classList.remove("author-photo-form__upload-button-view");
        document.querySelector(".upload-button__icon").classList.remove("upload-button__icon-view");
        const previewPostCardAuthorPhoto = document.querySelector(".post-card-info__photo");
        const previewInput = document.querySelector(".preview-author-photo");
        defaultAuthorPhoto = '../static/img/page/author_background.png';
        previewPostCardAuthorPhoto.src = defaultAuthorPhoto;
        previewInput.src = defaultAuthorPhoto;
        post.AuthorPhoto = null;
    }
)

uploadTinyPostIMG.addEventListener(
    "input",
    () => {
        const previewPostCardPhoto = document.querySelector(".post-card__photo");
        const previewInput = document.querySelector(".upload-place-tiny__img");
        const file = document.querySelector(".input-hero-image-tiny__input").files[0];
        const reader = new FileReader();
        reader.addEventListener(
            "load",
            () => {
                previewPostCardPhoto.src = reader.result;
                previewInput.src = reader.result;
                previewIMGInput = reader.result;
                post.SmallImage = reader.result;
                document.querySelector(".tiny-img-buttons").classList.add("tiny-img-buttons-show");
                document.querySelector(".input-hero-image-tiny__sign").classList.add("input-hero-image-tiny__sign-remove");
            },
            false
        );

        if (file) {
            reader.readAsDataURL(file);
        }
    }
)

removeTinyPostIMG.addEventListener(
    "click",
    function(event) {
        event.preventDefault();
        const defaultPostTinyIMG = "../static/img/page/card_background.png";
        const previewPostCardPhoto = document.querySelector(".post-card__photo");
        const previewInput = document.querySelector(".upload-place-tiny__img");
        previewPostCardPhoto.src = defaultPostTinyIMG;
        previewInput.src = defaultPostTinyIMG;
        document.querySelector(".tiny-img-buttons").classList.remove("tiny-img-buttons-show");
        document.querySelector(".input-hero-image-tiny__sign").classList.remove("input-hero-image-tiny__sign-remove");
        post.SmallImage = null;
    }
)

uploadPostIMG.addEventListener(
    "input",
    () => {
        const previewPostCardPhoto = document.querySelector(".article-preview-post-visual__photo");
        const previewInput = document.querySelector(".upload-place__img");
        const file = document.querySelector(".input-hero-image__input").files[0];
        const reader = new FileReader();
        reader.addEventListener(
            "load",
            () => {
                previewPostCardPhoto.src = reader.result;
                previewInput.src = reader.result;
                postImgInput = reader.result;
                post.BigImage = reader.result
                document.querySelector(".img-buttons").classList.add("img-buttons-show");
                document.querySelector(".input-hero-image__sign").classList.add("input-hero-image__sign-remove");
            },
            false
        );

        if (file) {
            reader.readAsDataURL(file);
        }
    }
)

removePostIMG.addEventListener(
    "click",
    function(event) {
        event.preventDefault();
        const defaultPostIMG = "../static/img/page/cover_background.png";
        const previewPostCardPhoto = document.querySelector(".article-preview-post-visual__photo");
        const previewInput = document.querySelector(".upload-place__img");
        document.querySelector(".img-buttons").classList.remove("img-buttons-show");
        document.querySelector(".input-hero-image__sign").classList.remove("input-hero-image__sign-remove");
        previewPostCardPhoto.src = defaultPostIMG;
        previewInput.src = defaultPostIMG;
        post.BigImage = null;
    }
)

content.addEventListener(
    "change",
    () => {
        let text = document.getElementById('content');

        if(text.value === "")
        {
            post.Content = null;
        }
        else
        {
            post.Content = text.value;
        }
    }
)

function localPrint()
{
    console.log("Title:", title.value);
    console.log("Short Description:", subTitle.value);
    console.log("Author Name:", author.value);
    console.log("Publish Date:", publishDate.value);
    console.log("Author Photo:", authorIMGInput);
    console.log("Cover Photo:", previewIMGInput);
    console.log("Card Photo:", postImgInput);
    console.log("Content:", post.Content);
}




window.addEventListener("DOMContentLoaded", (event)=> {
     console.log("page is fully loaded");
     document.getElementById('publishButton').addEventListener(
         "click", 
         () => {
            console.log('clicked on button');
            Publish();
         });
        });

function Publish()
{   let NotNull = true;
    localPrint();
    var warning = document.getElementById("formWarning");
    var warningMess = document.getElementById("formWarningMess");
    var warningIcon = document.getElementById("warningIcon");
    var warningText = document.getElementById("warningText");

    for(key in post)
    {
        if(post[key] === null)
        {
            NotNull = false;
        }
    }

    if(NotNull) {
       warning.classList.add("form-warning_visible");
       warningMess.classList.add("form-warning__main-valid");
       warningMess.classList.remove("form-warning__main-invalid");
       warningIcon.src = "../static/svg/check_circle.svg";
       warningText.innerHTML = "Publish Complete!";
    }
    else {
        warning.classList.add("form-warning_visible");
        warningMess.classList.add("form-warning__main-invalid");
        warningMess.classList.remove("form-warning__main-valid");
        warningIcon.src = "../static/svg/alert_circle.svg";
        warningText.innerText = "Whoops! Some fields need your attention :o";
    }
    if (post.Title === null){
        title.classList.add("form-card__input-invalid");
        titleReq.classList.add("form-card__is-required-visible");
    }
    else {
        title.classList.remove("form-card__input-invalid");
        titleReq.classList.remove("form-card__is-required-visible");
    }
    if (post.SubTitle === null){
        subTitle.classList.add("form-card__input-invalid");
        subTitleReq.classList.add("form-card__is-required-visible");
    }
    else {
        subTitle.classList.remove("form-card__input-invalid");
        subTitleReq.classList.remove("form-card__is-required-visible");
    }
    if (post.AuthorName === null){
        author.classList.add("form-card__input-invalid");
        authorReq.classList.add("form-card__is-required-visible");
    }
    else {
        author.classList.remove("form-card__input-invalid");
        authorReq.classList.remove("form-card__is-required-visible");
    }
    if (post.AuthorPhoto === null){
        authorPhotoReq.classList.add("form-card__is-required-visible");
    }
    else {
        author.classList.add("form-card__input-invalid");
        authorPhotoReq.classList.remove("form-card__is-required-visible");
    }
    if (post.Data === null){
        publishDate.classList.add("form-card__input-invalid");
        publishDateReq.classList.add("form-card__is-required-visible");
    }
    else {
        publishDate.classList.remove("form-card__input-invalid");
        publishDateReq.classList.remove("form-card__is-required-visible");
    }
    if (post.AuthorPhoto === null){
        authorPhotoReq.classList.add("form-card__is-required-visible");
    }
    else {
        author.classList.add("form-card__input-invalid");
        authorPhotoReq.classList.remove("form-card__is-required-visible");
    }
    if (post.BigImage === null){
        postIMGReq.classList.add("form-card__is-required-visible");
    }
    else {
        postIMGReq.classList.remove("form-card__is-required-visible");
    }
    if (post.SmallImage === null){
        tinyPostIMGReq.classList.add("form-card__is-required-visible");
    }
    else {
        tinyPostIMGReq.classList.remove("form-card__is-required-visible");
    }
    if (post.Content === null){
        content.classList.add("form-card__text-invalid");
        contentReq.classList.add("form-card__is-required-visible");
    }
    else {
        content.classList.remove("form-card__text-invalid");
        contentReq.classList.remove("form-card__is-required-visible");
    }
    const data = {
        title: title.value,
        subtitle: subTitle.value,
        author: author.value, 
        authorIMG: authorIMGInput,
        previewIMG: previewIMGInput,
        postIMG: postImgInput, 
        publishDate: publishDate.value,
        content: content.value 
    }

    const json = JSON.stringify(data);
    console.log("json:", json);
}
