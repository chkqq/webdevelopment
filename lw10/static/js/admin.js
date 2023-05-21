let post = {
    "Title": null,
    "SubTitle": null,
    "AuthorName": null,
    "AuthorPhoto": null,
    "AuthorPhotoName": null,
    "Data": null,
    "BigImage": null,
    "BigImageName": null,
    "SmallImage": null,
    "SmallImageName": null,
    "Content": null
}

const readerAuthor = new FileReader();
      readerBig = new FileReader();
      readerSmall = new FileReader();
      
const title = document.getElementById('title');
const subTitle = document.getElementById('description');
const author = document.getElementById('author');
const publishDate = document.getElementById('publishDate');

function Click()
{
    PrintToLog();
}

function PrintToLog()
{
    let NotNull = true;
    
    console.log(post);

    for(key in post)
    {
        if(post[key] === null)
        {
            NotNull = false;
        }
    }

    let massage = document.getElementById('massage');
    massage.classList.add('main-top__massage');

    while(massage.children[0] !== undefined)
    {
        massage.children[0].remove();
    }

    icon = document.createElement('img');
    icon.classList.add('main-top__icon');

    text = document.createElement('p');
    text.classList.add('main-top__massage-text')

    if (NotNull)
    {
        Preview();
        massage.classList.add('main-top__massage_complited');
        icon.src = "../static/svg_files/check_circle.svg";
        text.textContent = "Publish Complete!"

        massage.insertBefore(text, massage.children[0]);
        massage.insertBefore(icon, massage.children[0]);

        let newpost = JSON.stringify(post);

        let XHR = new XMLHttpRequest();

        XHR.open("POST", "/api/post");
        XHR.send(newpost);
    }
    else
    {
        massage.classList.remove('main-top__massage_complited')
        icon.src = "../static/svg_files/alert_circle.svg";
        text.textContent = "Whoops! Some fields need your attention :o"

        massage.insertBefore(text, massage.children[0]);
        massage.insertBefore(icon, massage.children[0]);
    }
}

// function Preview()
// {
//     let getTitleArticle = document.getElementById('preview-title-article');
//         getTitle = document.getElementById('preview-title');
//         getSubTitle = document.getElementById('preview-subtitle');
//         getSubTitleArticle = document.getElementById('preview-subtitle-article');
//         getAuthorName = document.getElementById('preview-author-name');
//         getAuthorPhoto = document.getElementById('preview-author-photo');
//         getData = document.getElementById('preview-data');
//         getBigImage = document.getElementById('preview-big-image');
//         getSmallImage = document.getElementById('preview-small-image');

//     getTitleArticle.textContent = post.Title;
//     getTitle.innerHTML = post.Title;
//     getSubTitleArticle.innerHTML = post.SubTitle;
//     getSubTitle.innerHTML = post.SubTitle;
//     getAuthorName.innerHTML = post.AuthorName;
//     getAuthorPhoto.src = post.AuthorPhoto;
//     getData.innerHTML = post.Data;
//     getBigImage.src = post.BigImage;
//     getSmallImage.src = post.SmallImage;
// }

// function PreviewBigIMage() 
// {
//     let getBigImage = document.getElementById('preview-big-image');
//     getBigImage.src = post.BigImage;
// }

// function Select(name)
// {
//     let field = document.getElementById(name);
//     field.classList.add('main-info__fields_select');
// }

// function NotSelect(name)
// {
//     let field = document.getElementById(name);
//     let block = document.getElementById(name + '-block');
//     field.classList.remove('main-info__fields_select');


//     if((field.value === "") && (!field.classList.contains('main-info__fields_error')))
//     {
//         field.classList.add('main-info__fields_error');

//         let err_message = document.createElement('p');
//         if (name === 'Author-name')
//         {
//             err_message.textContent = 'Author name is required.';
//         }
//         else
//         {
//             err_message.textContent = name + ' is required.';
//         }
//         err_message.classList.add('main-info__error-message');

//         block.insertBefore(err_message, block.children[2]);

//         switch (name) {
//             case 'Title':
//                 post.Title = null
//                 break;
//             case 'Subtitle':
//                 post.SubTitle = null
//                 break;
//             case 'Author-name':
//                 post.AuthorName = null
//                 break;
//         }   
//     }
//     else
//     {
//         if(field.classList.contains('main-info__fields_error'))
//         {
//             field.classList.remove('main-info__fields_error');
//             block.children[2].remove();
//         }

//         switch (name) {
//             case 'Title':
//                 post.Title = field.value
//                 break;
//             case 'Subtitle':
//                 post.SubTitle = field.value
//                 break;
//             case 'Author-name':
//                 post.AuthorName = field.value
//                 break;
//         }    
//     }
//}
title.addEventListener(
    "input" , 
    () => {
        let title = document.getElementById('title').value;
        let defaultTitle = 'New Post';
        if (title !== '' && title.length < 25) {
            document.getElementById('titleVisual').innerHTML = title;
            document.getElementById('titleVisualTiny').innerHTML = title;
        }
        else {
            document.getElementById('titleVisual').innerHTML = defaultTitle;
            document.getElementById('titleVisualTiny').innerHTML = defaultTitle;
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
        } 
        else {
            document.getElementById('subtitleVisual').innerHTML = defaultSubtitle;
            document.getElementById('subtitleVisualTiny').innerHTML = defaultSubtitle;
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
        }    
        else {
            document.getElementById('authorNameVisualTiny').innerHTML = defaultName;
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
        }    
        else {
            document.getElementById('dateVisuality').innerHTML = defaultDate;
        }
    }
)

function ChangeIcon()
{
    let photo = document.getElementById('author-photo').files[0];
    let block = document.getElementById('author-photo-block');
    let label = document.getElementById('author-label');
    let removelabel = document.getElementById('remove-author');

    if ((post.AuthorPhoto !== "") && (removelabel.children[0] === undefined))
    {
        
        let icon = document.createElement('img');
        icon.id = "author-icon";
        icon.classList.add('main-info__photo-icon');

        block.insertBefore(icon, block.children[1]);

        label.children[0].remove();
        
        label.children[0].textContent = "Upload New";

        let remove = document.createElement('p');
        remove.classList.add("main-info__remove");
        remove.textContent = "Remove";

        let trash = document.createElement('img');
        trash.classList.add("main-info__icons");
        trash.src = "../static/svg_files/trash.svg";

        let camera = document.createElement('img');
        camera.classList.add("main-info__icons");
        camera.src = "../static/svg_files/camera.svg";

        label.insertBefore(camera, label.children[0]);

        removelabel.insertBefore(remove, removelabel.children[0]);
        removelabel.insertBefore(trash, removelabel.children[0]);
    }
    
    let icon = document.getElementById('author-icon');
    let iconPreview = document.getElementById('preview-author-photo');
    if(photo)
    {
        readerAuthor.readAsDataURL(photo);
        post.AuthorPhotoName = photo.name;
    }

    readerAuthor.addEventListener(
        "load",
        ()=>{
            icon.src = readerAuthor.result;
            post.AuthorPhoto = readerAuthor.result;
            iconPreview.src = readerAuthor.result;
        },
        false
    );
}

function RemoveIcon()
{
    let block = document.getElementById('author-photo-block');

    block.children[1].remove();

    let label = document.getElementById('author-label');
    label.children[0].remove();
    label.children[0].textContent = "Upload";

    let icon = document.createElement('img');
    icon.src = "../static/svg_files/photo_icon.svg";
    icon.alt = "Avatar";

    let iconPreview = document.getElementById('preview-author-photo');
    iconPreview.src = "../static/svg_files/photo_icon.svg";
    iconPreview.alt = "Avatar";

    label.insertBefore(icon, label.children[0]);

    let remove = document.getElementById('remove-author');
    remove.children[1].remove();
    remove.children[0].remove();

    post.AuthorPhoto = null;
}

function datachange()
{
    let data = document.getElementById('data');
    if(data.value === "")
    {
        post.Data = null;
    }
    else
    {
        post.Data = data.value
    }
}

function ChangeImage(size)
{
    const PreviewSmallImage = document.getElementById("preview-small-image");
    const PreviewBigImage = document.getElementById("preview-big-image");
    let photo = document.getElementById(size + '-hero-image').files[0];
        label = document.getElementById(size + '-image-label');
        block = document.getElementById(size + '-block-image');
        removelabel = document.getElementById(size + '-remove-image');
    

    if((size === "big" ? post.BigImage !== "" : post.SmallImage !== "") && (removelabel.children[0] === undefined))
    {
        let image = document.createElement('img');
        image.id = size + '-image';

        block.insertBefore(image, block.children[0]);
        block.children[2].remove();

        label.children[0].remove();

        let uploadnew = document.createElement('p');
        uploadnew.classList.add("main-info__upload");
        uploadnew.textContent = "Upload New";

        let remove = document.createElement('p');
        remove.classList.add("main-info__remove");
        remove.textContent = "Remove";

        let trash = document.createElement('img');
        trash.classList.add("main-info__icons");
        trash.src = "../static/svg_files/trash.svg";

        let camera = document.createElement('img');
        camera.classList.add("main-info__icons");
        camera.src = "../static/svg_files/camera.svg";

        label.insertBefore(uploadnew, label.children[0]);
        label.insertBefore(camera, label.children[0]);

        removelabel.insertBefore(remove, removelabel.children[0]);
        removelabel.insertBefore(trash, removelabel.children[0]);
    }

    let image = document.getElementById(size + '-image');

    if(size === "big")
    {
        if(photo)
        {
            readerBig.readAsDataURL(photo);
            post.BigImageName = photo.name;
        }
    
        readerBig.addEventListener(
            "load",
            ()=>{
                image.src = readerBig.result;
                post.BigImage = readerBig.result;  
                PreviewBigImage.src = readerBig.result;             
            },
            false
        );

        image.classList.add('main-info__big')
    }
    else if(size === "small")
    {
        if(photo)
        {
            readerSmall.readAsDataURL(photo);
            post.SmallImageName = photo.name;

        }
    
        readerSmall.addEventListener(
            "load",
            ()=>{
                image.src = readerSmall.result;
                post.SmallImage = readerSmall.result;              
                PreviewSmallImage.src = readerSmall.result;
            },
            false
        );

        image.classList.add('main-info__small')
    }
}

function DeleteImage(size)
{
    const PreviewImage = document.getElementById("preview-"+ size +"-image");
    //const PreviewBigImage = document.getElementById("preview-big-image");
    let block = document.getElementById(size + '-block-image');
        label = document.getElementById(size + '-image-label');
        removelabel = document.getElementById(size + '-remove-image');
    
    block.children[0].remove();

    label.children[1].remove();
    label.children[0].remove();

    removelabel.children[1].remove();
    removelabel.children[0].remove();

    let image = document.createElement('img');
    
    image.src = "../static/images/hero_image_" + size + ".png";
    image.alt = size + " image";
    PreviewImage.src = "../static/images/image_not_selected.png";

    node = document.createElement('p')
    node.classList.add("main-info__fields-title");
    node.classList.add("main-info__fields-note");
    switch (size) {
        case "big":
            node.textContent = "Size up to 10mb. Format: png, jpeg, gif.";
            post.BigImage = null;
            break;
        case "small":
            node.textContent = "Size up to 5mb. Format: png, jpeg, gif.";
            post.SmallImage= null;
            break;
    }

    block.insertBefore(node, block.children[1])
    label.insertBefore(image, label.children[0]);
}

function ChangeContent()
{
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
