package main

// для чего имопрт?
// для подключения пакетов логирования и пакета для http сервера
import (
	"database/sql" // Импортируем для возможности подключения к MySQL
	"fmt"
	"log"
	"net/http"

	_ "github.com/go-sql-driver/mysql"
	"github.com/jmoiron/sqlx"
)

// на каком порту нельзя запустить сервер?
// На зарезервированных например:
// Порты от 0 до 1023: эти порты зарезервированы для системных служб и могут быть использованы только суперпользователем или системными процессами.
// Порты 135-139 и 445: эти порты зарезервированы для службы NetBIOS, используемой в операционных системах Windows.
// Порты 1433 и 1434: эти порты зарезервированы для Microsoft SQL Server.
// Порты 80 и 443: эти порты зарезервированы для HTTP и HTTPS соответственно, и они используются для веб-серверов.

const (
	port         = ":3000"
	dbDriverName = "mysql"
)

func main() {

	db, err := openDB() // Открываем соединение к базе данных в самом начале
	if err != nil {
		log.Fatal(err)
	}

	dbx := sqlx.NewDb(db, dbDriverName) // Расширяем стандартный клиент к базе

	//createDatabase(dbx)

	mux := http.NewServeMux()
	mux.HandleFunc("/home", index(dbx))
	mux.HandleFunc("/post", post)

	// Реализуем отдачу статики
	mux.Handle("/static/", http.StripPrefix("/static/", http.FileServer(http.Dir("./static"))))

	fmt.Println("Start server")
	err = http.ListenAndServe(port, mux)
	if err != nil {
		log.Fatal(err)
	}
}

func openDB() (*sql.DB, error) {
	// Здесь прописываем соединение к базе данных
	return sql.Open(dbDriverName, "root:Q19euplzo12345)@tcp(localhost:3306)/blog?charset=utf8mb4&collation=utf8mb4_unicode_ci&parseTime=true")
}
