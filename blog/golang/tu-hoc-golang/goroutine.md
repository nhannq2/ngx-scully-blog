---
title: 'Tự học Golang - 21 - Goroutine'
description: 'Đây là bài viết trong Series Hướng dẫn tự học lập trình Golang. Trong bài này chúng ta sẽ cùng thảo luận về goroutine trong Go.'
published: true
keywords: 'golang, tu hoc golang, lap trinh golang, goroutine, concurrency'
categories: golang
date: 2021-04-06
image: assets/images/golang/tu-hoc-golang/goroutine/post-image.jpg
---

# Tự học Golang - 21 - Goroutine

![post-image](assets/images/golang/tu-hoc-golang/goroutine/post-image.jpg)

Đây là bài viết trong [Series Hướng dẫn tự học lập trình Golang](https://nhannguyendacoder.com/page/tu-hoc-golang). 

Vui lòng đọc lại bài viết [Giới thiệu về Concurrency](https://nhannguyendacoder.com/golang/tu-hoc-golang/gioi-thieu-ve-concurrency) để hiểu concurrency là gì và nó khác với parallel như thế nào. 

Trong bài này chúng ta sẽ cùng thảo luận về goroutine trong Go.

## Goroutine là gì?
Goroutine là các [function](https://nhannguyendacoder.com/golang/tu-hoc-golang/function) hay [method](https://nhannguyendacoder.com/golang/tu-hoc-golang/method) chạy đồng thời (run concurrently) với các function hay method khác. Goroutine có thể được xem như một phiên bản gọn nhẹ hơn của thread. Chi phí để tạo ra một goroutine so với thread là rất nhỏ. Vì vậy một ứng dụng Go thường có thể có tới hàng nghìn goroutine chạy đồng thời.

## Ưu điểm của goroutine so với thread
- Chi phí để tạo ra một goroutine so với thread là rất nhỏ. Chúng thường chiếm chỉ vài kb trong stack và stack có thể tăng hay giảm tùy vào nhu cầu của ứng dụng, trong trường hợp của thread thì kích thước stack phải được khai báo trước và là cố định, không thể thay đổi.
- Một thread có thể có nhiều goroutine. Có thể có hàng nghìn goroutine trong một thread. Nếu bất kỳ goroutine nào bị block trong một thread, ví dụ như phải chờ input của user, sau đó một thread mới sẽ được tạo ra và các goroutine còn lại sẽ được chuyển sang thread mới đó. Tất cả những việc này sẽ được xử lý lúc runtime bởi Go và chúng ta không cần phải quan tâm đến chi tiết.
- Các goroutine giao tiếp với nhau qua channel. Channel được thiết kế để ngăn race condition xảy ra khi các goroutine khác nhau cùng truy cập vào một vùng nhớ chung. Một channel có thể được xem như là một đường ống để giao tiếp giữa các goroutine. Chúng ta sẽ tìm hiểu về channel trong bài tiếp theo.

## Cách để tạo một goroutine
Chỉ cần thêm từ khóa `go` vào trước lời gọi funtion hay method là bạn đã có một goroutine chạy đồng thời.

```go
package main

import (  
    "fmt"
)

func hello() {  
    fmt.Println("Hello world goroutine")
}
func main() {  
    go hello()
    fmt.Println("main function")
}
```

[Chạy trên Playground](https://play.golang.org/p/zC78_fc1Hn)

`go hello()` tạo ra một goroutine. Bây giờ, hàm `hello()` sẽ chạy đồng thời với hàm `main()`. Hàm `main()` chạy trên `main goroutine`.

Khi chạy chương trình này thì bạn sẽ thấy kết quả in ra là `main function`. Điều gì đã xảy ra với goroutine chúng ta vừa mới tạo ra? Chúng ta cần hiểu rõ các thuộc tính của goroutine để hiêu tại sao lại có kết quả như vậy.
- Khi một goroutine mới được tạo ra, thì lời gọi goroutine đó sẽ return ngay lập tức. Không giống như lời gọi hàm, chương trình sẽ không đợi goroutine thực hiện xong mới return, mà nó sẽ ngay lập tức return về dòng tiếp theo sau dòng gọi goroutine, bất cứ giá trị trả về nào của goroutine đó sẽ bị bỏ qua.
- `Main goroutine` nên tồn tại trong lúc các goroutine khác vẫn còn đang chạy. Nếu `main goroutine` kết thúc thì chương trình sẽ dừng lại và không còn goroutine nào chạy hết.

Bây giờ bạn đã hiểu vì sao goroutine của chúng ta không chạy. Sau khi chúng ta gọi `go hello()`, chương trình ngay lập tức return về dòng tiếp theo và in ra `main function` mà không đợi cho `hello goroutine` hoàn thành. Sau khi `main goroutine` kết thúc thì tất cả các goroutine đều dừng thực thi, `hello goroutine` của chúng ta không có cơ hội được thực thi.

Hãy sửa một chút như sau.

```go
package main

import (  
    "fmt"
    "time"
)

func hello() {  
    fmt.Println("Hello world goroutine")
}
func main() {  
    go hello()
    time.Sleep(1 * time.Second)
    fmt.Println("main function")
}
```

[Chạy trên Playground](https://play.golang.org/p/U9ZZuSql8-)

Ngay sau khi gọi `go hello()`, chúng ta gọi hàm [Sleep](https://golang.org/pkg/time/#Sleep) trong package `time` và `main goroutine` sẽ vào trạng thái sleep 1 giây. Bây giờ `hello goroutine` đã có đủ thời gian để thực thi trước khi `main goroutine` kết thúc. Chương trình sẽ in ra `Hello world goroutine`, sau đó dừng 1 giây và in ra `main function`.

*Đây là cách tạm thời để minh họa cách goroutine hoạt động. Channel có thể được dùng để block `main goroutine` cho đến khi các goroutine chạy xong. Chúng ta sẽ thảo luận về channel trong bài tiếp theo*

## Tạo nhiều goroutine
Hãy viết một chương trinh tạo ra nhiều goroutine để hiểu rõ hơn nhé.

```go
package main

import (  
    "fmt"
    "time"
)

func numbers() {  
    for i := 1; i <= 5; i++ {
        time.Sleep(250 * time.Millisecond)
        fmt.Printf("%d ", i)
    }
}
func alphabets() {  
    for i := 'a'; i <= 'e'; i++ {
        time.Sleep(400 * time.Millisecond)
        fmt.Printf("%c ", i)
    }
}
func main() {  
    go numbers()
    go alphabets()
    time.Sleep(3000 * time.Millisecond)
    fmt.Println("main terminated")
}
```

[Chạy trên Playground](https://play.golang.org/p/oltn5nw0w3)

Ở hai dòng `go numbers()` và `go alphabets()` của chương trình trên tạo ra 2 goroutine chạy đồng thời. `numbers goroutine` sleep 250 mili giây và sao đó in ra `1`, sau đó sleep nữa và in ra `2`, và tiếp tục như vậy cho đến khi `5` được in ra. Tương tự, `alphabets goroutine` sẽ in các ký tự từ `a` đến `e` với thời gian sleep mỗi lần là 400 mili giây. `Main goroutine` sau khi tạo ra hai goroutine `numbers` và `alphabets` thì sleep 3000 mili giây, sau đó kết thúc.

Chương trình trên in ra:

```markup
1 a 2 3 b 4 c 5 d e main terminated
```

Bức ảnh sau miêu tả cách chương trình hoạt động.

![goroutines-explained.png](assets/images/golang/tu-hoc-golang/goroutine/goroutines-explained.png)

Phần đầu tiên của hình ảnh có màu xanh lam đại diện cho `numbers goroutine`, phần thứ hai có màu hạt dẻ đại diện cho `alphabets goroutine`, phần thứ ba màu xanh lục đại diện cho `main goroutine`, và phần cuối cùng màu đen kết hợp tất cả ba phần trên và cho chúng ta thấy chương trình hoạt động như thế nào. Các chuỗi như `0 s`, `250 ms` ở trên mỗi box đại diện cho thời gian bằng mili giây và kết quả in ra được thể hiện ở dưới mỗi box, ví dụ `1`, `2`, `3`,... Box xanh dương cho chúng ta biết `1` được in ra sau 250 mili giây, `2` được in ra sau 500 mili giây,... Bên dưới box cuối cùng màu đen có các giá trị `1`, `a`, `2`, `3`, `b`, `4`, `c`, `5`, `d`, `e`, `main terminated`. Đây cũng là kết quả in ra của chương trình. Hình ảnh đã tự giải thích cho chính nó và bạn sẽ có thể hiểu cách hoạt động của chương trình.

Liên kết: 
- Bài tiếp theo - [Channel](https://nhannguyendacoder.com/golang/tu-hoc-golang/channel)
- Xem thêm các bài viết khác tại [Series Hướng dẫn tự học lập trình Golang](https://nhannguyendacoder.com/page/tu-hoc-golang)
- Nguồn: [https://golangbot.com/goroutines/](https://golangbot.com/goroutines/)
