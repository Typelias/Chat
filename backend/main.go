package main

import (
	"fmt"
	"net/http"

	"github.com/Typelias/ChatTut/pkg/websocket"
)

func serveWs(pool *websocket.Pool, w http.ResponseWriter, r *http.Request) {
	fmt.Println("Websocket Endpoint Hit")
	conn, err := websocket.Upgrade(w, r)
	if err != nil {
		fmt.Fprint(w, "%++v\n",err)
	}

	client := &websocket.Client{
		Conn: conn,
		Pool: pool,
	}

	pool.Register <- client
	client.Read()
}

func setUpRoutes() {
	pool := websocket.NewPool()
	go pool.Start()
	http.HandleFunc("/ws", func(w http.ResponseWriter, r *http.Request){
		serveWs(pool,w,r)
	})
}

func main() {
	fmt.Println("Chatapp v:0.1")
	setUpRoutes()
	http.ListenAndServe(":8080", nil)
}
