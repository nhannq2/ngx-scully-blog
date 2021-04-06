---
title: 'Tự học Golang - 22 - Channel'
description: 'Đây là bài viết trong Series Hướng dẫn tự học lập trình Golang. Trong bài viết này chúng ta sẽ thảo luận về channel và cách mà các goroutine giao tiếp với nhau.'
published: true
keywords: 'golang, tu hoc golang, lap trinh golang, concurrency, channel'
categories: golang
date: 2021-04-07
image: assets/images/golang/tu-hoc-golang/channel/post-image.jpg
---

# Tự học Golang - 22 - Channel

![post-image](assets/images/golang/tu-hoc-golang/channel/post-image.jpg)

Đây là bài viết trong [Series Hướng dẫn tự học lập trình Golang](https://nhannguyendacoder.com/page/tu-hoc-golang). 

Vui lòng đọc lại bài viết [Goroutine](https://nhannguyendacoder.com/golang/tu-hoc-golang/goroutine) để tìm hiểu về goroutine trong Go. 

Trong bài viết này chúng ta sẽ thảo luận về channel và cách mà các goroutine giao tiếp với nhau.

## Channel là gì
Channel có thể được xem như là các đường ống giúp cho các channel có thể giao tiếp với nhau. Giống như nước có thể chảy từ đầu này đến đầu kia của ống, dữ liệu có thể được gửi và nhận ở hai đầu khác nhau bằng channel.

## Khai báo channel
Mỗi channel được khai báo với một kiểu dữ liệu nhất định, và channel chỉ cho phép vận chuyển data có kiểu được khai báo trước mà thôi. Data thuộc kiểu khác kiểu được khai báo với channel sẽ không được vận chuyển qua channel.

**Zero value** của một channel là `nil`.  

`chan T` là một channel có kiểu dữ liệu `T`. Channel `nil` không thể được sử dụng, vì vậy một channel phải được khai báo với `make`, tương tự như [map](https://nhannguyendacoder.com/golang/tu-hoc-golang/map) và [slice](https://nhannguyendacoder.com/golang/tu-hoc-golang/array-va-slice).

Ví dụ về channel,

```go
package main

import "fmt"

func main() {
    var a chan int
    if a === nil {
        fmt.Println("channel a is nil, going to define it")
        a = make(chan int)
        fmt.Println("Type ò a í %T", a)
    }
}
```

[Chạy trên playground](https://play.golang.org/p/QDtf6mvymD)

Channel `a` được khai báo ở dòng `var a chan int` có giá trị `nil` (zero value của channel là nil). Vì vậy câu lệnh `if` thỏa điều kiện và thực thi khai báo channel `a` với `make`. `a` trong ví dụ trên mà một channel có kiểu `int`. Kết quả in ra của chương trình trên,

```markup
channel a is nil, going to define it  
Type of a is chan int  
```

Channel có thể được khai báo ngắn gọn như sau

```go
a := make(chan int)
```

## Gửi và nhận dữ liệu bằng channel
Cú pháp gửi và nhận dữ liệu từ channel.

```go
data := <- a // đọc dữ liệu từ channel a
a <- data // đưa dữ liệu vào channel a
```

Hướng của mũi tên đối với channel xác định rằng dữ liệu đang được gửi đi hay chúng ta đang nhận dữ liệu từ channel.

Ở dòng đầu tiên, mũi tên hướng ra ngoài channel `a`, vì vậy chúng ta đang nhận dữ liệu từ channel và lưu vào biến `data`.

Ở dòng thứ hai, mũi tên trỏ vào channel `a`, vì vậy ở đây chúng ta đang gửi dữ liệu vào channel.

## Cơ chế blocking khi gửi và nhận dữ liệu qua channel
Khi dữ liệu được gửi vào channel thì goroutine thực hiện việc gửi dữ liệu sẽ bị block (dừng thực thi) lại ngay tại câu lệnh gửi cho đến khi có một goroutine khác đọc dữ liệu của channel này. 

Tương tự, khi đọc dữ liệu từ một channel thì goroutine thực hiện việc đọc dữ liệu sẽ bị block ngay tại câu lệnh đọc cho đến khi có một goroutine khác gửi dữ liệu vào channel đó.

Thuộc tính trên của channel giúp cho các goroutine giao tiếp với nhau hiệu quả hơn.

## Ví dụ 1 về channel
Chúng ta cùng xem lại ví dụ trong bài [Goroutine](https://nhannguyendacoder.com/golang/tu-hoc-golang/goroutine) và viết lại nó sử dụng channel.

Ví dụ cũ,

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

[Chạy trên playground](https://play.golang.org/p/U9ZZuSql8-)

Đây là ví dụ trong bài trước, chúng ta dùng `sleep` để goroutine `main` đợi goroutine `hello` hoàn thành. 

Chúng ta sẽ cùng viết lại ví dụ trên với channel.

```go
package main

import (  
    "fmt"
)

func hello(done chan bool) {  
    fmt.Println("Hello world goroutine")
    done <- true
}
func main() {  
    done := make(chan bool)
    go hello(done)
    <-done
    fmt.Println("main function")
}
```

[Chạy trên playground](https://play.golang.org/p/I8goKv6ZMF)

Trong chương trình trên, chúng ta tạo một boolean channel là `done` tại dòng `done := make(chan bool)` và truyền nó vào goroutine `hello`. Chúng ta nhận nhận dữ liệu từ `done` channel ở dòng `<-done`. Như bạn đã biết thì chương trình sẽ bị block tại dòng này và dừng lại đợi cho đến khi một goroutine gửi dữ liệu vào channel `done`. Vì vậy chúng ta không cần dùng `sleep` ở đây nữa.

Ở dòng `<-done`, chúng ta nhận dữ liệu từ channel nhưng không làm gì với dữ liệu trả về hết.

Bây giờ chúng ta có goroutine `main` đã bị block và đợi dữ liệu từ channel `done`. Goroutine `hello` nhận vào tham số channel `done`, in ra `Hello world goroutine`, và sau đó gửi `true` và channel `done`. Khi dữ liệu được gửi vào channel `done` cũng là lúc goroutine `main` nhận được dữ liệu từ `done`, goroutine `main` sẽ tiếp tục được thực thi, in ra `main function`.

```markup
Hello world goroutine  
main function  
```

Hãy chỉnh sửa ví dụ trên sử dụng `sleep` trong goroutine `hello` để hiểu rõ hơn về tính chất block của channel.

```go
package main

import (  
    "fmt"
    "time"
)

func hello(done chan bool) {  
    fmt.Println("hello go routine is going to sleep")
    time.Sleep(4 * time.Second)
    fmt.Println("hello go routine awake and going to write to done")
    done <- true
}
func main() {  
    done := make(chan bool)
    fmt.Println("Main going to call hello go goroutine")
    go hello(done)
    <-done
    fmt.Println("Main received data")
}
```

[Chạy trên playground](https://play.golang.org/p/EejiO-yjUQ)

Trong chương trình trên, chúng ta `sleep` 4 giây trong goroutine `hello`.

Chương trình sẽ in ra `Main going to call hello go goroutine` đầu tiên. Sau đó goroutine `hello` bắt đầu chạy và in ra `hello go routine is going to sleep`. Sau câu lệnh print, goroutine `hello` sẽ `sleep` 4 giây, trong khoản thời gian này goroutine sẽ bị block vì nó cần đợi dữ liệu được gửi vào channel `done` để thực thi các dòng tiếp theo. Sau 4 giây, chương trình in ra `hello go routine awake and going to write to done`, cuối cùng sẽ in ra `Main received data`.

## Ví dụ 2 về channel
Trong ví dụ này chúng ta sẽ in ra tổng của bình phương và lập phương của từng chữ số trong một số.

Ví dụ, với 123 thì chương trình sẽ tính toán như sau:
- Tổng bình phương của các chữ số: (1\*1) + (2\*2) + (3\*3) 
- Tổng lập phương của các chữ số: (1\*1\*1) + (2\*2\*2) + (3\*3\*3) 
- Kết quả in ra = Tổng bình phương của các chữ số + Tổng lập phương của các chữ số = 50

Chúng ta sẽ cấu trúc chương trình sao cho tổng bình phương và tổng lập phương của các chữ số sẽ được tính toán trong 2 goroutine khác nhau, và kết quả cuối cùng sẽ được tính trong goroutine `main`.

```go
package main

import (  
    "fmt"
)

func calcSquares(number int, squareop chan int) {  
    sum := 0
    for number != 0 {
        digit := number % 10
        sum += digit * digit
        number /= 10
    }
    squareop <- sum
}

func calcCubes(number int, cubeop chan int) {  
    sum := 0 
    for number != 0 {
        digit := number % 10
        sum += digit * digit * digit
        number /= 10
    }
    cubeop <- sum
} 

func main() {  
    number := 589
    sqrch := make(chan int)
    cubech := make(chan int)
    go calcSquares(number, sqrch)
    go calcCubes(number, cubech)
    squares, cubes := <-sqrch, <-cubech
    fmt.Println("Final output", squares + cubes)
}
```

[Chạy trên playground](https://play.golang.org/p/4RKr7_YO_B)

Hàm `calcSquares` tính tổng bình phương của các chữ số và gửi kết quả về channel `squareop`. Tương tự, hàm `calcCubes` tính tổng lập phương của các chữ số và gửi kết quả về channel `cubeop`.

Hai hàm này chạy trên hai goroutine khác nhau và mỗi hàm đều nhận vào một channel để truyền dữ liệu. Ở dòng `squares, cubes := <-sqrch, <-cubech`, goroutine `main` đợi kết quả trả về của hai channel truyền vào hai hàm trên. Khi nhận dữ liệu từ cả hai channel thì lưu vào hai biến `squares` và `cubes`. Kết quả chương trình in ra `Final output 1536`

## Deadlock
Một khía cạnh quan trọng cần quan tâm khi sử dụng channel là **deadlock**. Nếu một goroutine gửi dữ liệu vào một channel, thì có nghĩa là chúng ta mong đợi rằng sau đó sẽ có goroutine nào đó nhận dữ liệu đó. Nếu điều đó không xảy ra thì chương trình xảy ra lỗi deadlock lúc runtime.

Tương tự, nêu một goroutine chờ để nhận dữ liệu từ một channel, thì có nghĩa là chúng ta mong đợi rằng sau đó có một goroutine nào khác gửi dữ liệu vào channel đó, nếu không chương trình sẽ xảy ra lỗi.

```go
package main


func main() {  
    ch := make(chan int)
    ch <- 5
}
```

[Chạy trên playground](https://play.golang.org/p/q1O5sNx4aW)

Trong chương trình trên, channel `ch` được tạo ra và chúng ta gửi `5` vào channel này trong dòng `ch <- 5`. Trong chương trình này, không có goroutine nào khác nhận dữ liệu từ channel `ch`. Vì vậy chương trình này sẽ lỗi lúc runtime.

```markup
fatal error: all goroutines are asleep - deadlock!

goroutine 1 [chan send]:  
main.main()  
    /tmp/sandbox046150166/prog.go:6 +0x50
```

## Channel 1 chiều (Unidirectional channels)
Tất cả channel từ đầu đến giờ đều là channel 2 chiều (bidirectional channels), có nghĩa là chúng có thể được dùng cho cả hai mục đích là gửi và nhận dữ liệu. Ngoài ra chúng ta cũng có thể tạo ra channel 1 chiều, là channel chỉ gửi hoặc nhận dữ liệu.

```go
package main

import "fmt"

func sendData(sendch chan<- int) {  
    sendch <- 10
}

func main() {  
    sendch := make(chan<- int)
    go sendData(sendch)
    fmt.Println(<-sendch)
}
```

[Chạy trên playground](https://play.golang.org/p/PRKHxM-iRK)

Trong chương trình trên, chúng ta tạo ra channel chỉ gửi là `sendch`, `chan<- int` dùng để khai báo channel chỉ gửi (mũi tên trỏ vào `chan`). Tại dòng `fmt.Println(<-sendch)`, chúng ta muốn nhận dự liệu của channel chỉ gửi. Điều này là không được phép và trình biên dịch sẽ báo lỗi.

```markup
./prog.go:12:14: invalid operation: <-sendch (receive from send-only type chan<- int)
```

**Ok nhưng tại sao chúng ta lại cần một channel chỉ có thể gửi dữ liệu mà không đọc được?**

Đó là vì chúng ta có thể chuyển đổi từ channel 2 chiều sang channel 1 chiều (chỉ đọc hoặc chỉ viết). Lưu ý là bạn không thể làm ngược lại, chuyển từ channel 1 chiều sang  channel 2 chiều.

```go
package main

import "fmt"

func sendData(sendch chan<- int) {  
    sendch <- 10
}

func main() {  
    chnl := make(chan int)
    go sendData(chnl)
    fmt.Println(<-chnl)
}
```

[Chạy trên playground](https://play.golang.org/p/aqi_rJ1U8j)

Chúng ta khai báo một channel hai chiều ở dòng `chnl := make(chan int)`, sau đó truyền nó vào goroutine `sendData` ở dòng tiếp theo. Hàm `senData` chuyển đổi channel truyền vào thành channe 1 chiều chỉ có thể gửi dữ liệu (`sendch chan<- int`). Vì vậy, channel này chỉ có thể gửi trong goroutine `sendData`, nhưng nó là channel hai chiều trong goroutine `main`. Chương trình trên sẽ in ra `10`.

## Đóng channel và dùng vòng lặp for range để nhận dữ liệu từ channel
Goroutine gửi dữ liệu vào channel có thể `close` channel đó để báo hiệu cho goroutine nhận dữ liệu biết là không còn dữ liệu được gửi từ channel này nữa.

Khi nhận dữ liệu từ channel, bạn có thể dùng thêm một biến khác để check xem channel đã đóng hay chưa.

```go
v, ok := <- ch
```

Trong ví dụ trên nếu `ok` có giá trị `false` thì có nghĩa là channel đã bị đóng. Giá trị đọc được của môt channel đã đóng là **zero value** của kiểu dữ liệu mà channel đó được khai báo. Ví dụ, giá trị nhận về của một channel đã đóng kiểu `int` là `0`.

```go
package main

import (  
    "fmt"
)

func producer(chnl chan int) {  
    for i := 0; i < 10; i++ {
        chnl <- i
    }
    close(chnl)
}
func main() {  
    ch := make(chan int)
    go producer(ch)
    for {
        v, ok := <-ch
        if ok == false {
            break
        }
        fmt.Println("Received ", v, ok)
    }
}
```

[Chạy trên playground](https://play.golang.org/p/XWmUKDA2Ri)

Trong ví dụ trên, goroutine `producer` gửi các số từ `0` đến `9` vào channel `chnl` rồi sau đó đóng channel lại. Vòng lặp `for` trong gouroutine `main` lặp vô tận, nó sẽ kiểm tra xem channel đã đóng chưa bằng biến `ok`. Nếu `ok` có giá trị `false` có nghĩa là channel đã được đóng, vì vậy nó sẽ thoát ra khỏi vòng lặp. Ngược lại, nếu channel chưa đóng thì sẽ in ra giá trị của `value` và `ok`.

```markup
Received  0 true  
Received  1 true  
Received  2 true  
Received  3 true  
Received  4 true  
Received  5 true  
Received  6 true  
Received  7 true  
Received  8 true  
Received  9 true 
```

Tương tự như trên, bạn có thể dùng **for range** để nhận dữ liệu từ channel cho đến khi nó đóng.

Chương  trình trên được viết lại với for range như sau.

```go
package main

import (  
    "fmt"
)

func producer(chnl chan int) {  
    for i := 0; i < 10; i++ {
        chnl <- i
    }
    close(chnl)
}
func main() {  
    ch := make(chan int)
    go producer(ch)
    for v := range ch {
        fmt.Println("Received ",v)
    }
}
```

[Chạy trên playground](https://play.golang.org/p/JJ3Ida1r_6)

Dòng `for v := range ch` nhận dữ liệu từ channel `ch` cho đến khi nó bị đóng lại. Khi channel `ch` bị đóng, chương trình sẽ tự động thoát ra khỏi vòng lặp. Kết quả in ra 

```markup
Received  0  
Received  1  
Received  2  
Received  3  
Received  4  
Received  5  
Received  6  
Received  7  
Received  8  
Received  9  
```

Ví dụ trong phần trước, tính tổng bình phương và lập phương của các chữ số trong một số, có thể được viết lại với for range.

Nếu bạn chú ý kỹ hơn thì có thể thấy đoạn code để tìm ra từng chữ số của một số nào đó bị lặp lại ở hai hàm `calcSquares` và `calcCubes`. Chúng ta sẽ tách phần code này ra thành một hàm riêng và chạy nó đồng thời với hai hàm còn lại.

```go
package main

import (  
    "fmt"
)

func digits(number int, dchnl chan int) {  
    for number != 0 {
        digit := number % 10
        dchnl <- digit
        number /= 10
    }
    close(dchnl)
}
func calcSquares(number int, squareop chan int) {  
    sum := 0
    dch := make(chan int)
    go digits(number, dch)
    for digit := range dch {
        sum += digit * digit
    }
    squareop <- sum
}

func calcCubes(number int, cubeop chan int) {  
    sum := 0
    dch := make(chan int)
    go digits(number, dch)
    for digit := range dch {
        sum += digit * digit * digit
    }
    cubeop <- sum
}

func main() {  
    number := 589
    sqrch := make(chan int)
    cubech := make(chan int)
    go calcSquares(number, sqrch)
    go calcCubes(number, cubech)
    squares, cubes := <-sqrch, <-cubech
    fmt.Println("Final output", squares+cubes)
}
```

[Chạy trên playground](https://play.golang.org/p/oL86W9Ui03)

Hàm `digits` trong chương trình trên chứa logic để lấy ra từng chữ số của một số nào đó, hàm này được gọi và thực thi đồng thời trong cả hai hàm `calcSquares` và `calcCubes`. Khi chữ số cuối cùng được gửi đi, channel `dchnl` sẽ được đóng lại. Hai goroutine `calcSquares` và `calcCubes` lắng nghe channel `dch` của riêng mình bằng `for range` cho đến khi channel bị đóng lại. Phần còn lại của chương trình không thay đổi. Kết quả in ra vẫn là `Final output 1536`

Liên kết: 
- Bài tiếp theo - [Buffered Channel và Worker Pool](https://nhannguyendacoder.com/golang/tu-hoc-golang/buffered-channel-va-worker-pool)
- Xem thêm các bài viết khác tại [Series Hướng dẫn tự học lập trình Golang](https://nhannguyendacoder.com/page/tu-hoc-golang)
- Nguồn: [https://golangbot.com/channels/](https://golangbot.com/channels/)
