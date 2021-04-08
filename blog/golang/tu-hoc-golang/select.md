---
title: 'Tự học Golang - 24 - Select'
description: 'Đây là bài viết trong Series Hướng dẫn tự học lập trình Golang. Câu lệnh select được dùng để lựa chọn giữa nhiều hành động gửi/nhận của channel. Câu lệnh select sẽ block cho đến khi hành động gửi/nhận dữ liệu từ channel sẵn sàng. Nếu nhiều hành động gửi/nhận sẵn sàng cùng lúc thì select sẽ lựa chọn ngẫu nhiên một trong số chúng.'
published: true
keywords: 'golang, tu hoc golang, lap trinh golang, select'
categories: golang
date: 2021-04-09
image: assets/images/golang/tu-hoc-golang/select/post-image.jpg
---

# Tự học Golang - 24 - Select

![post-image](assets/images/golang/tu-hoc-golang/select/post-image.jpg)

Đây là bài viết trong [Series Hướng dẫn tự học lập trình Golang](https://nhannguyendacoder.com/page/tu-hoc-golang). 

## Select là gì?
Câu lệnh `select` được dùng để lựa chọn giữa nhiều hành động gửi/nhận của channel. Câu lệnh select sẽ block cho đến khi hành động gửi/nhận dữ liệu từ channel sẵn sàng. Nếu nhiều hành động gửi/nhận sẵn sàng cùng lúc thì select sẽ lựa chọn ngẫu nhiên một trong số chúng. Cú pháp của select tương tự như `switch`, ngoại trừ việc mỗi case của select sẽ là một hành động của channel (channel operation).

## Ví dụ
```go
package main

import (  
    "fmt"
    "time"
)

func server1(ch chan string) {  
    time.Sleep(6 * time.Second)
    ch <- "from server1"
}
func server2(ch chan string) {  
    time.Sleep(3 * time.Second)
    ch <- "from server2"

}
func main() {  
    output1 := make(chan string)
    output2 := make(chan string)
    go server1(output1)
    go server2(output2)
    select {
    case s1 := <-output1:
        fmt.Println(s1)
    case s2 := <-output2:
        fmt.Println(s2)
    }
}
```

[Chạy trên playground](https://play.golang.org/p/3_yaJSoSpG)

Trong chương trình ở trên, hàm `server1` sleep 6 giây sau đó gửi đoạn text `form server1` vào channel `ch`. Hàm `server2` sleep 3 giây sau đó gửi đoạn text `form server2` vào channel `ch`.

Hàm `main` gọi hai hàm `server1` và `server2`. Sau đó tới câu lệnh select, câu lệnh này sẽ bị block cho đến khi có ít nhất một case sẵn sàng. Như đã phân tích ở trên thì sau 3 giây `server2` sẽ gửi dữ liệu vào channel trước (`server1` cần 6 giây). Vì vậy sau 3 giây thì select sẽ được unblock và chương trình in ra,

```markup
from server2
```

## Ứng dụng thực tế của select
Việc đặt tên hai hàm ở trên là `server1` và `server2` là để mô phỏng ứng dụng thực tế của select.

Giả sử bạn đang lập trình một ứng dụng cần trả về kết quả cho user nhanh nhất có thể. Database của ứng dụng này được tách ra và lưu trữ trên nhiều server khác nhau trên toàn thế giới. Giả sử hai hàm `serve1` và `server2` đang gọi tới hai server thật. Kết quả trả về của mỗi server phụ thuộc vào khối lượng công việc cần xử lý và tốc độ của mạng Internet. Chúng ta gửi request tới cả hai server và đợi kết quả trả về với câu lệnh `select`. Server nào trả về kết quả nhanh nhất sẽ được lựa chọn, kết quả của server còn lại sẽ bị bỏ qua. Bằng cách này chúng ta có thể gửi request tới nhiều server và trả về kết quả nhanh nhất cho user. 

## Trường hợp mặc định (default case)
Default case trong `select` sẽ được thực thi khi không có case nào sẵn sàng, và thường được dùng để ngăn câu lệnh `select` bị block mãi mãi.

```go
package main

import (  
    "fmt"
    "time"
)

func process(ch chan string) {  
    time.Sleep(10500 * time.Millisecond)
    ch <- "process successful"
}

func main() {  
    ch := make(chan string)
    go process(ch)
    for {
        time.Sleep(1000 * time.Millisecond)
        select {
        case v := <-ch:
            fmt.Println("received value: ", v)
            return
        default:
            fmt.Println("no value received")
        }
    }

}
```

[Chạy trên playground](https://play.golang.org/p/8xS5r9g1Uy)

Trong chương trình trên, hàm `process` chạy đồng thời với `main` và  sleep 10500 mili giây (10.5 giây) và gửi đoạn text `process successful` và channel `ch`.

Sau khi tạo ra goroutine `process`, hàm `main` bắt đầu một vòng lặp vô tận. Mỗi lần lặp nó sẽ sleep 1000 mili giây (1 giây), sau đó sẽ đến câu lệnh `select`. Trong vòng 10500 mili giây đầu tiên, case đầu tiên của select là `case v := <-ch:` sẽ không sẵn sàng vì goroutine `process` chỉ gửi dữ liệu vào channel `ch` sau 10500 mili giây. Vì vậy case `default` sẽ được thực thi trong khoảng thời gian này và chương trình sẽ in ra `received value:  process successful`, sau đó return và kết thúc chương trình. Kết quả in ra,

```markup
no value received  
no value received  
no value received  
no value received  
no value received  
no value received  
no value received  
no value received  
no value received  
no value received  
received value:  process successful  
```

## Deadlock và default case
```go
package main

func main() {  
    ch := make(chan string)
    select {
    case <-ch:
    }
}
```

[Chạy trên playground](https://play.golang.org/p/za0GZ4o7HH)

Trong chương trình trên, chúng ta đã tạo ra channel `ch` và đọc channel đó trong câu lệnh select. Câu lệnh select sẽ bị block mãi mãi (deadlock) vì không có goroutine nào khác gửi dữ liệu vào `ch`. Kết quả lỗi lúc runtime,

```markup
fatal error: all goroutines are asleep - deadlock!

goroutine 1 [chan receive]:  
main.main()  
    /tmp/sandbox627739431/prog.go:6 +0x4d
```

Nếu có thêm case `default` thì deadlock sẽ không xảy ra vì case `default` sẽ được thực thi khi không có case nào sẵn sàng. Chương trình trên có thể được viết lại như sau.

```go
package main

import "fmt"

func main() {  
    ch := make(chan string)
    select {
    case <-ch:
    default:
        fmt.Println("default case executed")
    }
}
```

[Chạy trên playground](https://play.golang.org/p/Pxsh_KlFUw)

Kết quả in ra,

```markup
default case executed  
```

Tương tự, case default cũng sẽ thực thi nếu select các channel `nil`.

```go
package main

import "fmt"

func main() {  
    var ch chan string
    select {
    case v := <-ch:
        fmt.Println("received value", v)
    default:
        fmt.Println("default case executed")
    }
}
```

Trong chương trình trên `ch` là một channel `nil` mà chúng ta đang cố đọc trong câu lệnh `select` và case `default` sẽ được thực thi. Nếu không có case `default` thì chương trình sẽ bị block mãi mãi. Kết quả in ra,

```markup
default case executed 
```

## Lựa chọn ngẫu nhiên
Khi có nhiều case trong câu lệnh select cùng sẵn sàng, một trong số chúng sẽ được lựa chọn ngẫu nhiên.

```go
package main

import (  
    "fmt"
    "time"
)

func server1(ch chan string) {  
    ch <- "from server1"
}
func server2(ch chan string) {  
    ch <- "from server2"

}
func main() {  
    output1 := make(chan string)
    output2 := make(chan string)
    go server1(output1)
    go server2(output2)
    time.Sleep(1 * time.Second)
    select {
    case s1 := <-output1:
        fmt.Println(s1)
    case s2 := <-output2:
        fmt.Println(s2)
    }
}
```

[Chạy trên playground](https://play.golang.org/p/vJ6VhVl9YY)

Chương trình trên tạo ra hai goroutine `server1` và `server2`, sau đó `main` sleep 1 giây. Khi đến câu lệnh select, cả hai channel `output1` và `output2` đều đã sẵn sàng, nên select sẽ chọn ngẫu nhiên 1 trong 2 case. Nếu bạn chạy chương trình nhiều lần thì kết quả in ra có thể ngẫu nhiên là `from server1` hoặc `from server2`.

Lưu ý là bạn phải chạy trên máy cá nhân vì trên playground chương trình chỉ trả về một kết quả duy nhất.

## Empty select
```go
package main

func main() {  
    select {}
}
```

[Chạy trên playground](https://play.golang.org/p/u8hErIxgxs)

Như bạn đã biết thì câu lệnh select sẽ bị block cho đến khi ít nhất một case của nó sẵn sàng. Vì vậy nếu một select không có case nào thì nó sẽ bị block mãi mãi. Kết quả in ra,

```markup
fatal error: all goroutines are asleep - deadlock!

goroutine 1 [select (no cases)]:  
main.main()  
    /tmp/sandbox246983342/prog.go:4 +0x25
```

Liên kết: 
- Bài tiếp theo - [Mutex](https://nhannguyendacoder.com/golang/tu-hoc-golang/mutex)
- Xem thêm các bài viết khác tại [Series Hướng dẫn tự học lập trình Golang](https://nhannguyendacoder.com/page/tu-hoc-golang)
- Nguồn: [https://golangbot.com/select/](https://golangbot.com/select/)
