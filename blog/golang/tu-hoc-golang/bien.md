---
title: 'Tự học Golang - 3 - Biến'
description: 'Đây là bài viết trong Series Hướng dẫn tự học lập trình Golang. Biến là một cái tên được cấp cho một vùng nhớ mà tại đó lưu trữ một giá trị thuộc một kiểu nhất định. Có nhiều cách để khai báo biến trong Go.'
published: true
keywords: 'golang, tu hoc golang, lap trinh golang'
categories: golang
date: 2021-04-04
image: assets/images/golang/tu-hoc-golang/bien/post-image.jpg
---

# Tự học Golang - 3 - Biến

![post-image](assets/images/golang/tu-hoc-golang/bien/post-image.jpg)

Đây là bài viết trong [Series Hướng dẫn tự học lập trình Golang](https://nhannguyendacoder.com/page/tu-hoc-golang). 

Vui lòng đọc lại bài viết [Hello World](https://nhannguyendacoder.com/golang/tu-hoc-golang/hello-world) để biết cách thiết lập Go và chạy chương trình hello world.

## Biến là gì 
Biến là một cái tên được cấp cho một vùng nhớ mà tại đó lưu trữ một giá trị thuộc một [kiểu](https://nhannguyendacoder.com/golang/tu-hoc-golang/kieu-du-lieu) nhất định. Có nhiều cách để khai báo biến trong Go. 

## Khai báo một biến
Cú pháp để khai báo một biến trong Go là `var name type`.

```go
package main

import "fmt"

func main() {
    var age int // khai báo biến
    fmt.Println("My age is", age)
}
```

[Chạy trên playground](https://play.golang.org/p/bycpQlMWyw-)

Câu lệnh `var age int` khai báo một biến tên `age` thuộc kiểu `int`. Chúng ta chưa gán giá trị cho biến này. Nếu một biến chưa được gán giá trị, Go sẽ tự động khởi tạo biến đó với một giá trị **zero value** của kiểu dữ liệu mà biến thuộc về. Trong trường hợp này, `age` được tự động khởi tạo bằng 0, chính là **zero value** của kiểu `int`. Nếu chạy chương trình, bạn sẽ thấy kết quả như sau.

```markup
My age is 0  
```

Một biến có thể được gán cho bất kỳ giá trị nào, miễn là giá trị đó thuộc kiểu dữ liệu mà biến đó được khai báo. Trong ví dụ trên, biến `age` có thể được gán cho bất kỳ số nguyên nào.

```go
package main

import "fmt"

func main() {  
    var age int // khai báo biến
    fmt.Println("My age is", age)
    age = 29 // gán giá trị cho biến
    fmt.Println("My age is", age)
    age = 54 // gán giá trị cho biến
    fmt.Println("My new age is", age)
}
```

[Chạy trên playground](https://play.golang.org/p/dP8hG83Gj3K)

Chương trình trên sẽ in ra kết quả như sau.

```markup
My age is  0  
My age is 29  
My new age is 54  
```

## Khai báo biến với giá trị khởi tạo
Một biến có thể được gán một giá trị khởi tạo ban đầu, khi nó được khai báo với cú pháp như sau.

```markup
var name type = initialvalue
```


```go
package main

import "fmt"

func main() {  
    var age int = 29 // khai báo biến với giá trị khởi tạo

    fmt.Println("My age is", age)
}
```

[Chạy trên playground](https://play.golang.org/p/zWtpqINuJlA)

Trong chương trình trên, `age` thuộc kiểu `int` và có giá trị khởi tạo là `29`. Kết quả in ra sẽ là:

```markup
My age is 29
```

## Type inference
Go có thể tự động suy ra kiểu của biến từ giá trị khởi tạo. Vì vậy nếu biến có giá trị khởi tạo thì có thể bỏ phần phải khai báo kiểu cho biến đi.

Nếu biến được khai báo theo cú pháp sau

```markup
var name = initalValue
```

Go sẽ tự động suy ra kiểu của biến từ giá trị khởi tạo.

Trong ví dụ tiếp theo, chúng ta có thể thấy type `int` của biến `age` đã được bỏ ra ở dòng `var age = 29`. Khi là biến có giá trị khởi tạo là 29, Go có thể suy ra biến đó thuộc kiểu `int`.

```go
package main

import "fmt"

func main() {  
    var age = 29 // tự động suy ra kiểu của biến từ giá trị khởi tạo
    fmt.Println("My age is", age)
}
```

[Chạy trên playground](https://play.golang.org/p/i99Xzzz9XBD)

## Khai báo nhiều biến cùng lúc
Cú pháp để khai báo nhiều biến cùng lúc.

```markup
var name1, name2 type = initialvalue1, initialvalue2
```

```go
package main

import "fmt"

func main() {  
    var width, height int = 100, 50 // khai báo nhiều biến cùng lúc

    fmt.Println("width is", width, "height is", height)
}
```

[Chạy trên playground](https://play.golang.org/p/4aOQyt55ah)

Có thể bỏ phần `type` nếu các biến đều có giá trị khởi tạo, chương trình trên có thể viết lại như sau.

```go
package main

import "fmt"

func main() {  
    var width, height = 100, 50 // có thể bỏ "int" đi

    fmt.Println("width is", width, "height is", height)
}
```

[Chạy trên playground](https://play.golang.org/p/sErofTJ6g-)

Chương trình trên sẽ in ra `width is 100 height is 50`.

Và có thể bạn cũng đã đoán ra rằng nếu không có giá trị khởi tạo thì hai biến `width` và `height` sẽ được gán giá trị khởi tạo là 0 một cách tự động.

```go 
package main

import "fmt"

func main() {  
    var width, height int
    fmt.Println("width is", width, "height is", height)
    width = 100
    height = 50
    fmt.Println("new width is", width, "new height is", height)
}
```

[Chạy trên playground](https://play.golang.org/p/aPegNR4MAA_q)

Kết quả in ra sẽ là: 

```markup
width is 0 height is 0  
new width is 100 new height is 50  
```

Nếu bạn muốn khai báo nhiều biến có nhiều kiểu khác nhau, bạn co thể dùng cú pháp sau.

```markup
var (
    name1 = initialvalue1
    name2 = initialvalue2
)
```

```go
package main

import "fmt"

func main() {  
    var (
        name   = "naveen"
        age    = 29
        height int
    )
    fmt.Println("my name is", name, ", age is", age, "and height is", height)
}
```

[Chạy trên playground](https://play.golang.org/p/7pkp74h_9L)

Trong đoạn code trên, chúng ta đã khai báo biến `name` kiểu `string`, `age` và `height` kiểu `int`. Chúng ta sẽ tìm hiểu các kiểu dữ liệu khác nhau trong Go ở [bài tiếp theo](https://nhannguyendacoder.com/golang/tu-hoc-golang/kieu-du-lieu).

Kết quả in ra của chương trình trên sẽ là `my name is naveen , age is 29 and height is 0`.

## Cách khai báo biến ngắn gọn
Bạn có thể khai báo biến một cách ngắn gọn với cú pháp `name := initalvalue`.

Chương trình sau khai báo biến `count` bằng 10. Go tự động suy ra kiểu của biến này là `int`.

```go
package main

import "fmt"

func main() {  
    count := 10
    fmt.Println("Count =",count)
}
```

[Chạy trên playground](https://play.golang.org/p/L5_8aru7VQM)

Kết quả in ra là `Count = 10`.

Cú pháp này cũng có thể dùng để khai báo cùng lúc nhiều biến.

```go
package main

import "fmt"

func main() {  
    name, age := "naveen", 29 //short hand declaration

    fmt.Println("my name is", name, "age is", age)
}
```

[Chạy trên playground](https://play.golang.org/p/ctqgw4w6kx)

Chương trình trên khai báo hai biến `name` và `age` thuộc kiểu `string` và `int`.

Khi chạy chương trình sẽ in ra `my name is naveen age is 29`.

Kiểu khai báo biến này yêu cầu phải có giá trị khởi tạo cho tất cả các biến ở bên trái của `:=`. Chương trình sau sẽ in ra lỗi `assignment mismatch: 2 variables but 1 values`. Lý do là biến `age` chưa được cung cấp giá trị khởi tạo.

```go
package main

import "fmt"

func main() {  
    name, age := "naveen" //error

    fmt.Println("my name is", name, "age is", age)
}
```

[Chạy trên playground](https://play.golang.org/p/wZd2HmDvqw)

Cú pháp khai báo biến ngắn gọn chỉ có thể được sử dụng khi có ít nhất một biến ở bên trái `:=` là biến được tạo mới. 

```go
package main

import "fmt"

func main() {  
    a, b := 20, 30 // khai báo a và b
    fmt.Println("a is", a, "b is", b)
    b, c := 40, 50 // b đã được khai báo nhưng c là biến mới
    fmt.Println("b is", b, "c is", c)
    b, c = 80, 90 // gán giá trị cho hai biến đã được khai báo rồi là b và c
    fmt.Println("changed b is", b, "c is", c)
}
```

[Chạy trên playground](https://play.golang.org/p/MSUYR8vazB)

Trong chương trình trên, ở dòng `b, c := 40, 50`, `b` đã được khai báo nhưng `c` là biến mới nên chương trình vẫn chạy và in ra:

```markup
a is 20 b is 30  
b is 40 c is 50  
changed b is 80 c is 90  
```

Trong khi nếu bạn chạy chương trình sau sẽ in ra lỗi `/prog.go:8:10: no new variables on left side of :=`.

```go
package main

import "fmt"

func main() {  
    a, b := 20, 30 //a và b được khai báo
    fmt.Println("a is", a, "b is", b)
    a, b := 40, 50 //error, không có biến nào mới được khai báo
}
```

Lỗi trên xảy ra vì cả hai biến `a` và `b` đều đã được khai báo và không có biến mới được khai báo ở dòng `a, b := 40, 50`.

Biến cũng có thể được gán các giá trị được tính toán lúc runtime. Ví dụ như trong chương trình sau.

```go
package main

import (  
    "fmt"
    "math"
)

func main() {  
    a, b := 145.8, 543.8
    c := math.Min(a, b)
    fmt.Println("Minimum value is", c)
}
```

[Chạy trên playground](https://play.golang.org/p/Kk84pOyFgQB)

Ở chương trình trên, [`math`](https://golang.org/pkg/math/) là một [package](https://nhannguyendacoder.com/golang/tu-hoc-golang/package) và [`Min`](https://golang.org/pkg/math/#Min) là một [function](https://nhannguyendacoder.com/golang/tu-hoc-golang/function) trong package đó. Đừng lo lắng về các khái niệm đó nếu bạn chưa biết, chúng ta sẽ bàn về [package](https://nhannguyendacoder.com/golang/tu-hoc-golang/package) và [function](https://nhannguyendacoder.com/golang/tu-hoc-golang/function) trong các bài tiếp theo. Tất cả những gì bạn cần biết là, giá trị của `c` được tính toán lúc runtime và nó là giá trị nhỏ nhất giữa `a` và `b`. Kết quả in ra là `Minimum value is  145.8`.

Vì Go là ngôn ngữ định kiểu, biến khai báo thuộc kiểu này không thể được gán cho một giá trị thuộc kiểu khác. Chương trình sau sẽ in ra lỗi `cannot use "naveen" (type string) as type int in assignment`. Lý do là `age` được khai báo kiểu `int` và chúng ta đang cố gắng gán cho nó một giá trị kiểu `string`.

```go
package main

func main() {  
    age := 29      // age kiểu int
    age = "naveen" // lỗi vì gán giá trị string cho biến int
}
```

[Chạy trên playground](https://play.golang.org/p/K5rz4gxjPj)

Liên kết: 
- Bài tiếp theo - [Kiểu dữ liệu](https://nhannguyendacoder.com/golang/tu-hoc-golang/kieu-du-lieu)
- Xem thêm các bài viết khác tại [Series Hướng dẫn tự học lập trình Golang](https://nhannguyendacoder.com/page/tu-hoc-golang)
- Nguồn: [https://golangbot.com/variables/](https://golangbot.com/variables/)
