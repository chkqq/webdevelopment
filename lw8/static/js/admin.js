var Title = {
    name: "Title",
    value: null,
}
var SubTitle = {
    name: "SubTitle",
    value: null,
}
var AuthorName = {
    name: "AuthorName",
    value: null,
}
var AuthorPhoto = {
    name: "AuthorPhoto",
    value: null,
}
var Data = {
    name: "Data",
    value: null,
}
var BigImage = {
    name: "BigImage",
    value: null,
}
var SmallImage = {
    name: "SmallImage",
    value: null,
}
var Content = {
    name: "Content",
    value: null,
}

const readerAuthor = new FileReader();
const readerBig = new FileReader();
const readerSmall = new FileReader();

window.addEventListener("load", (event) => {
    console.log("page is fully loaded");
console.log(document.getElementById("testButton"));
    
document.getElementById('testButton').addEventListener('click', () => {
    console.log('CLICKED ON BUTTON');
    PrintToLog();
});
  });



// поменять шрифт во всех инпутах
// доверстать форму логинации
// remove события в html и прослушивать все события через js (addEventListener)
function Click()
{
    PrintToLog();
}

function PrintToLog()
{
    // все поля которые собрал заносишь в один объект и в консоли выводишь json oblect
    // base 64 для картинок (в лабе есть пример)
    let NotNull = true;

    let values =
    [
        Title,
        SubTitle,
        AuthorName,
        AuthorPhoto,
        Data,
        BigImage,
        SmallImage,
        Content
    ]
    
    console.log(Title.name, ':', validedvalue(Title.value));
    console.log(SubTitle.name, ':', validedvalue(SubTitle.value));
    console.log(AuthorName.name, ':', validedvalue(AuthorName.value));
    console.log(AuthorPhoto.name, ':', validedvalue(AuthorPhoto.value));
    console.log(Data.name, ':', validedvalue(Data.value));
    console.log(BigImage.name, ':', validedvalue(BigImage.value));
    console.log(SmallImage.name, ':', validedvalue(SmallImage.value));
    console.log(Content.name, ':', validedvalue(Content.value));

    values.forEach(element => {
        if(element.value === null)
        {
            NotNull = false;
        }
    });

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

function validedvalue(value) 
{
    return value === null ? "поле пустое" : value;
}

function Preview()
{
    let getTitleArticle = document.getElementById('preview-title-article');
    let getTitle = document.getElementById('preview-title');
    let getSubTitle = document.getElementById('preview-subtitle');
    let getSubTitleArticle = document.getElementById('preview-subtitle-article');
    let getAuthorName = document.getElementById('preview-author-name');
    let getAuthorPhoto = document.getElementById('preview-author-photo');
    let getData = document.getElementById('preview-data');
    let getBigImage = document.getElementById('preview-big-image');
    let getSmallImage = document.getElementById('preview-small-image');

    getTitleArticle.textContent = Title.value;
    getTitle.innerHTML = Title.value;
    getSubTitleArticle.innerHTML = SubTitle.value;
    getSubTitle.innerHTML = SubTitle.value;
    getAuthorName.innerHTML = AuthorName.value;
    getAuthorPhoto.src = AuthorPhoto.value;
    getData.innerHTML = Data.value;
    getBigImage.src = BigImage.value;
    getSmallImage.src = SmallImage.value;
}

function Select(name)
{
    let field = document.getElementById(name);
    field.classList.add('main-info__fields_select');
}

function NotSelect(name)
{
    let field = document.getElementById(name);
    let block = document.getElementById(name + '-block');
    field.classList.remove('main-info__fields_select');


    if((field.value === "") && (!field.classList.contains('main-info__fields_error')))
    {
        field.classList.add('main-info__fields_error');

        let err_message = document.createElement('p');
        if (name === 'Author-name')
        {
            err_message.textContent = 'Author name is required.';
        }
        else
        {
            err_message.textContent = name + ' is required.';
        }
        err_message.classList.add('main-info__error-message');

        block.insertBefore(err_message, block.children[2]);

        switch (name) {
            case 'Title':
                Title.value = null
                break;
            case 'SubTitle':
                SubTitle.value = null
                break;
            case 'Author-name':
                AuthorName.value = null
                break;
        }   
    }
    else
    {
        if(field.classList.contains('main-info__fields_error'))
        {
            field.classList.remove('main-info__fields_error');
            block.children[2].remove();
        }

        switch (name) {
            case 'Title':
                Title.value = field.value
                break;
            case 'Subtitle':
                SubTitle.value = field.value
                break;
            case 'Author-name':
                AuthorName.value = field.value
                break;
        }    
    }
}

function ChangeIcon()
{
    let photo = document.getElementById('author-photo').files[0];
    let block = document.getElementById('author-photo-block');
    let label = document.getElementById('author-label');
    let removelabel = document.getElementById('remove-author');

    if ((AuthorPhoto.value !== "") && (removelabel.children[0] === undefined))
    {
        
        const icon = document.createElement('img');
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

    if(photo)
    {
        readerAuthor.readAsDataURL(photo);
    }

    readerAuthor.addEventListener(
        "load",
        ()=>{
            icon.src = readerAuthor.result;
            AuthorPhoto.value = readerAuthor.result;
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

    label.insertBefore(icon, label.children[0]);

    let remove = document.getElementById('remove-author');
    remove.children[1].remove();
    remove.children[0].remove();

    AuthorPhoto.value = null;
}

function datachange()
{
    let data = document.getElementById('data');
    if(data.value === "")
    {
        Data.value = null;
    }
    else
    {
        Data.value = data.value
    }
}

function ChangeImage(size)
{
    let photo = document.getElementById(size + '-hero-image').files[0];
    let block = document.getElementById(size + '-block-image');
    let label = document.getElementById(size + '-image-label');
    let removelabel = document.getElementById(size + '-remove-image');

    if((BigImage.value !== "") && (removelabel.children[0] === undefined))
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
        }
    
        readerBig.addEventListener(
            "load",
            ()=>{
                image.src = readerBig.result;
                BigImage.value = readerBig.result
            },
            false
        );
    }
    else if(size === "small")
    {
        if(photo)
        {
            readerSmall.readAsDataURL(photo);
        }
    
        readerSmall.addEventListener(
            "load",
            ()=>{
                image.src = readerSmall.result;
                SmallImage.value = readerSmall.result
            },
            false
        );
    }
}

function DeleteImage(size)
{
    let block = document.getElementById(size + '-block-image');
    let label = document.getElementById(size + '-image-label');
    let removelabel = document.getElementById(size + '-remove-image');
    
    block.children[0].remove();

    label.children[1].remove();
    label.children[0].remove();

    removelabel.children[1].remove();
    removelabel.children[0].remove();

    let image = document.createElement('img');

    image.src = "../static/images/hero_image_" + size + ".png"
    image.alt = size + " image";

    node = document.createElement('p')
    node.classList.add("main-info__fields-title");
    node.classList.add("main-info__fields-note");
    switch (size) {
        case "big":
            node.textContent = "Size up to 10mb. Format: png, jpeg, gif."
            break;
        case "small":
            node.textContent = "Size up to 5mb. Format: png, jpeg, gif."
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
        Content.value = null;
    }
    else
    {
        Content.value = text.value;
    }
}

function changeInputType() {
    var input = document.getElementById('Pass');
    if (input.type === 'text') {
      input.type = 'password';
    } else {
      input.type = 'text';
    }
}