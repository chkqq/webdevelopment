package main

import (
	"database/sql"
	"encoding/base64"
	"encoding/json"
	"fmt"
	"html/template"
	"io"
	"log"
	"net/http"
	"os"
	"strconv"

	"github.com/gorilla/mux"
	"github.com/jmoiron/sqlx"
)

type indexPage struct {
	Header             []headerdata
	PostsHeader        []postsheaderdata
	Menu               []menudata
	FeaturedPostsTitle string
	FeaturedPosts      []*featuredpostsdata
	MostRecentTitle    string
	MostRecent         []*mostrecentdata
	Footer             []footerdata
}

type postPage struct {
	HeaderPost []headerpostdata
	Post       []postdata
	Footer     []footerdata
}

type headerdata struct {
	Escape string
	Nav    []navdata
}

type headerpostdata struct {
	Escape string
	Nav    []navdata
}

type navdata struct {
	First    string
	FirstURL string
	Second   string
	Third    string
	Fourth   string
}

type postsheaderdata struct {
	BackroundHeader string
	Title           string
	Subtitle        string
	Button          string
}

type menudata struct {
	First  string
	Second string
	Third  string
	Fourth string
	Fiveth string
	Sixth  string
}

type featuredpostsdata struct {
	PostID      string `db:"post_id"`
	Title       string `db:"title"`
	Subtitle    string `db:"subtitle"`
	Author      string `db:"author"`
	Authorurl   string `db:"author_url"`
	Publishdate string `db:"publish_date"`
	Imageurl    string `db:"image_url"`
	Theme       string `db:"theme"`
	PostURL     string
}
type mostrecentdata struct {
	PostID      string `db:"post_id"`
	Title       string `db:"title"`
	Subtitle    string `db:"subtitle"`
	Author      string `db:"author"`
	Authorurl   string `db:"author_url"`
	Publishdate string `db:"publish_date"`
	Imageurl    string `db:"image_url"`
	Theme       string `db:"theme"`
	PostURL     string
}

type postdata struct {
	Title    string `db:"title"`
	Subtitle string `db:"subtitle"`
	Image    string `db:"image_url"`
	Content  string `db:"content"`
}

type footerdata struct {
	Background string
	Title      string
	Button     string
	Bottom     []bottomdata
}

type bottomdata struct {
	Escape string
	Nav    []navdata
}

type adminpage struct {
	Header   []headeradmindata
	MainTop  []maintopdata
	MainInfo []maininfodata
	Content  []contentdata
}

type headeradmindata struct {
	Escape  string
	Avatar  string
	ExitURL string
	Exit    string
}

type maintopdata struct {
	Title    string
	Subtitle string
	Button   string
}

type maininfodata struct {
	Title   string
	Fields  []fieldsdata
	Preview []previewdata
}

type fieldsdata struct {
	Title          string
	Description    string
	AuthorName     string
	AuthorPhoto    string
	AuthorPhotoURL string
	Upload         string
	Date           string
	TitleImage     string
	BigImageURL    string
	SmallImageURL  string
	BigNote        string
	SmallNote      string
}

type previewdata struct {
	Article  []articledata
	PostCard []postcarddata
}

type articledata struct {
	Label    string
	FrameURL string
	Title    string
	Subtitle string
	Imageurl string
}

type postcarddata struct {
	Label          string
	FrameURL       string
	Imageurl       string
	Title          string
	Subtitle       string
	AuthorPhotoURL string
	AuthorName     string
	Data           string
}

type contentdata struct {
	Title   string
	Comment string
}

type loginpage struct {
	Background string
	Header     []headerlogindata
	Main       []mainlogindata
}

type headerlogindata struct {
	Escape string
	Title  string
}

type mainlogindata struct {
	Title  string
	Email  string
	Pass   string
	Button string
}

type createPostRequest struct {
	Title           string `json:"title"`
	SubTitle        string `json:"subtitle"`
	AuthorName      string `json:"authorname"`
	AuthorPhoto     string `json:"authorphoto"`
	AuthorPhotoName string `json:"authorphotoname"`
	Data            string `json:"data"`
	BigImage        string `json:"bigimage"`
	BigImageName    string `json:"bigimagename"`
	SmallImage      string `json:"smallimage"`
	SmallImageName  string `json:"smallimagename"`
	Content         string `json:"content"`
}

func index(db *sqlx.DB) func(w http.ResponseWriter, r *http.Request) {
	return func(w http.ResponseWriter, r *http.Request) {
		featuredposts, err := featuredPosts(db)
		if err != nil {
			http.Error(w, "Error", 500)
			log.Println(err)
			return
		}

		mostrecent, err := mostrecent(db)
		if err != nil {
			http.Error(w, "Error", 500)
			log.Println(err)
			return
		}

		ts, err := template.ParseFiles("pages/index.html")
		if err != nil {
			http.Error(w, "Internal Server Error", 500)
			log.Println(err)
			return
		}

		data := indexPage{
			Header:             header(),
			PostsHeader:        postsheader(),
			Menu:               menu(),
			FeaturedPostsTitle: "Featured Posts",
			FeaturedPosts:      featuredposts,
			MostRecentTitle:    "Most Recent",
			MostRecent:         mostrecent,
			Footer:             footer(),
		}

		err = ts.Execute(w, data)
		if err != nil {
			http.Error(w, "Server Error", 500)
			log.Println(err.Error())
			return
		}

		log.Println("Request completed successfully")
	}
}

func post(db *sqlx.DB) func(w http.ResponseWriter, r *http.Request) {
	return func(w http.ResponseWriter, r *http.Request) {
		postIDStr := mux.Vars(r)["postID"]

		postID, err := strconv.Atoi(postIDStr)
		if err != nil {
			http.Error(w, "Invalid order id", 403)
			log.Println(err)
			return
		}

		post, err := postByID(db, postID)
		if err != nil {
			if err == sql.ErrNoRows {
				http.Error(w, "Order not found", 404)
				log.Println(err)
				return
			}

			http.Error(w, "Server Error", 500)
			log.Println(err)
			return
		}

		ts, err := template.ParseFiles("pages/post.html")
		if err != nil {
			http.Error(w, "Internal Server Error", 500)
			log.Println(err.Error())
			return
		}

		data := postPage{
			HeaderPost: headerpost(),
			Post:       post,
			Footer:     footer(),
		}

		err = ts.Execute(w, data)
		if err != nil {
			http.Error(w, "Internal Server Error", 500)
			log.Println(err.Error())
			return
		}
	}
}

func admin(w http.ResponseWriter, r *http.Request) {
	ts, err := template.ParseFiles("pages/admin.html")
	if err != nil {
		http.Error(w, "Internal Server Error", 500)
		log.Println(err.Error())
		return
	}

	data := adminpage{
		Header:   headeradmin(),
		MainTop:  maintop(),
		MainInfo: maininfo(),
		Content:  content(),
	}

	err = ts.Execute(w, data)
	if err != nil {
		http.Error(w, "Internal Server Error", 500)
		log.Println(err.Error())
		return
	}
}

func login(w http.ResponseWriter, r *http.Request) {
	ts, err := template.ParseFiles("pages/login.html")
	if err != nil {
		http.Error(w, "Internal Server Error", 500)
		log.Println(err.Error())
		return
	}

	data := loginpage{
		Background: "../static/images/login_background.png",
		Header:     headerlogin(),
		Main:       mainlogin(),
	}

	err = ts.Execute(w, data)
	if err != nil {
		http.Error(w, "Internal Server Error", 500)
		log.Println(err.Error())
		return
	}
}

func header() []headerdata {
	return []headerdata{
		{
			Escape: "../static/svg_files/escape_white.svg",
			Nav:    nav(),
		},
	}
}

func headerpost() []headerpostdata {
	return []headerpostdata{
		{
			Escape: "../static/svg_files/escape_black.svg",
			Nav:    nav(),
		},
	}
}

func nav() []navdata {
	return []navdata{
		{
			First:    "HOME",
			FirstURL: "/home",
			Second:   "CATEGORIES",
			Third:    "ABOUT",
			Fourth:   "CONTACT",
		},
	}
}

func postsheader() []postsheaderdata {
	return []postsheaderdata{
		{
			BackroundHeader: "../static/images/lets_do_it_together.png",
			Title:           "Let's do it together",
			Subtitle:        "We travel the world in search of stories. Come along the ride",
			Button:          "View Latest Posts",
		},
	}
}

func menu() []menudata {
	return []menudata{
		{
			First:  "Nature",
			Second: "Photography",
			Third:  "Relaxation",
			Fourth: "Vacation",
			Fiveth: "Travel",
			Sixth:  "Adventure",
		},
	}
}

func featuredPosts(db *sqlx.DB) ([]*featuredpostsdata, error) {
	const query = `
		SELECT
		  post_id,
		  title,
		  subtitle,
		  author,
		  author_url,
		  publish_date,
		  image_url,
		  theme
		FROM
		  post
		WHERE featured = 1
	`

	var featuredposts []*featuredpostsdata

	err := db.Select(&featuredposts, query)
	if err != nil {
		return nil, err
	}

	for _, post := range featuredposts {
		post.PostURL = "/post/" + post.PostID
	}

	fmt.Println(featuredposts)

	return featuredposts, nil
}

func mostrecent(db *sqlx.DB) ([]*mostrecentdata, error) {
	const query = `
		SELECT
		  post_id,
		  title,
		  subtitle,
		  author,
		  author_url,
		  publish_date,
		  image_url,
		  theme
		FROM
		  post
		WHERE featured = 0
	`

	var mostrecent []*mostrecentdata

	err := db.Select(&mostrecent, query)
	if err != nil {
		return nil, err
	}

	for _, post := range mostrecent {
		post.PostURL = "/post/" + post.PostID
	}

	fmt.Println(mostrecent)

	return mostrecent, nil
}

func postByID(db *sqlx.DB, postID int) ([]postdata, error) {
	const query = `
		SELECT
		  title,
		  subtitle,
		  image_url,
		  content
		FROM
		  post
	    WHERE
		  post_id = ?
	`

	var post []postdata

	err := db.Select(&post, query, postID)
	if err != nil {
		return nil, err
	}

	return post, nil
}

func footer() []footerdata {
	return []footerdata{
		{
			Background: "../static/images/footer.png",
			Title:      "Stay in Touch",
			Button:     "Sumbit",
			Bottom:     bottom(),
		},
	}
}

func bottom() []bottomdata {
	return []bottomdata{
		{
			Escape: "../static/svg_files/escape_white.svg",
			Nav:    nav(),
		},
	}
}

func headeradmin() []headeradmindata {
	return []headeradmindata{
		{
			Escape:  "../static/svg_files/escape_author_white.svg",
			Avatar:  "../static/images/avatar.png",
			ExitURL: "/login",
			Exit:    "../static/svg_files/log_out.svg",
		},
	}
}

func maintop() []maintopdata {
	return []maintopdata{
		{
			Title:    "New Post",
			Subtitle: "Fill out the form bellow and publish your article",
			Button:   "Publish",
		},
	}
}

func maininfo() []maininfodata {
	return []maininfodata{
		{
			Title:   "Main Information",
			Fields:  fields(),
			Preview: preview(),
		},
	}
}

func fields() []fieldsdata {
	return []fieldsdata{
		{
			Title:          "Title",
			Description:    "Short description",
			AuthorName:     "Author Name",
			AuthorPhoto:    "Author Photo",
			AuthorPhotoURL: "../static/svg_files/photo_icon.svg",
			Upload:         "Upload",
			Date:           "Publish Date",
			TitleImage:     "Hero image",
			BigImageURL:    "../static/images/hero_image_big.png",
			SmallImageURL:  "../static/images/hero_image_small.png",
			BigNote:        "Size up to 10mb. Format: png, jpeg, gif.",
			SmallNote:      "Size up to 5mb. Format: png, jpeg, gif.",
		},
	}
}

func preview() []previewdata {
	return []previewdata{
		{
			Article:  article(),
			PostCard: postcard(),
		},
	}
}

func article() []articledata {
	return []articledata{
		{
			Label:    "Article preview",
			FrameURL: "../static/images/aritcle_frame.png",
			Title:    "New Post",
			Subtitle: "Please, enter any description",
			Imageurl: "../static/images/image_not_selected.png",
		},
	}
}

func postcard() []postcarddata {
	return []postcarddata{
		{
			Label:          "Post card preview",
			FrameURL:       "../static/images/post_card_frame.png",
			Imageurl:       "../static/images/image_not_selected.png",
			Title:          "New Post",
			Subtitle:       "Please, enter any description",
			AuthorPhotoURL: "../static/svg_files/photo_icon.svg",
			AuthorName:     "Enter author name",
			Data:           "4/19/2023",
		},
	}
}

func content() []contentdata {
	return []contentdata{
		{
			Title:   "Content",
			Comment: "Post content (plain text)",
		},
	}
}

func headerlogin() []headerlogindata {
	return []headerlogindata{
		{
			Escape: "../static/svg_files/escape_author_white.svg",
			Title:  "Log in to start creating",
		},
	}
}

func mainlogin() []mainlogindata {
	return []mainlogindata{
		{
			Title:  "Log In",
			Email:  "Email",
			Pass:   "Password",
			Button: "Log In",
		},
	}
}

func createPost(db *sqlx.DB) func(w http.ResponseWriter, r *http.Request) {
	return func(w http.ResponseWriter, r *http.Request) {
		reqData, err := io.ReadAll(r.Body)
		if err != nil {
			http.Error(w, "1Error", 500)
			log.Println(err.Error())
			return
		}

		var req createPostRequest

		authorImg, err := base64.StdEncoding.DecodeString(req.AuthorPhoto)
		if err != nil {
			http.Error(w, "img", 500)
			log.Println(err.Error())
			return
		}

		fileAuthor, err := os.Create("static/images/" + req.AuthorPhotoName)

		_, err = fileAuthor.Write(authorImg)

		bigImg, err := base64.StdEncoding.DecodeString(req.BigImage)
		if err != nil {
			http.Error(w, "img", 500)
			log.Println(err.Error())
			return
		}

		fileBig, err := os.Create("static/images/" + req.BigImageName)

		_, err = fileBig.Write(bigImg)

		smallImg, err := base64.StdEncoding.DecodeString(req.AuthorPhoto)
		if err != nil {
			http.Error(w, "img", 500)
			log.Println(err.Error())
			return
		}

		fileSmall, err := os.Create("static/images/" + req.AuthorPhotoName)

		_, err = fileSmall.Write(smallImg)

		err = json.Unmarshal(reqData, &req)
		if err != nil {
			http.Error(w, "2Error", 500)
			log.Println(err.Error())
			return
		}

		err = saveOrder(db, req)
		if err != nil {
			http.Error(w, "bd", 500)
			log.Println(err.Error())
			return
		}
		return
	}
}

func saveOrder(db *sqlx.DB, req createPostRequest) error {
	const query = `
		INSERT INTO
			post
		(
			title,
			subtitle,
			author,
			author_url,
			publish_date,
			image_url,
			content
		)
		VALUES
		(
			?,
			?,
			?,
			CONCAT('../static/images/', ?),
			?,
			CONCAT('../static/images/', ?),
			?
		)
	`

	_, err := db.Exec(query, req.Title, req.SubTitle, req.AuthorName, req.AuthorPhotoName, req.Data, req.BigImageName, req.Content)
	return err
}
