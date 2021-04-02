---
title: 'Tự học Golang - 2 - Hello World'
description: 'Đây là bài viết trong Series Hướng dẫn tự học lập trình Golang. Cách tốt nhất để học một ngôn ngữ lập trình là bắt tay vào thực hành. Bây giờ chúng ta hãy cùng nhau viết chương trình đầu tiên với Go.'
published: true
keywords: 'golang, tu hoc golang, lap trinh golang, hello world'
categories: golang
date: 2021-04-03
image: assets/images/golang/tu-hoc-golang/hello-world/post-image.jpg
---

# Tự học Golang - 2 - Hello World

![post-image](assets/images/golang/tu-hoc-golang/hello-world/post-image.jpg)

Đây là bài viết trong [Series Hướng dẫn tự học lập trình Golang](https://nhannguyendacoder.com/page/tu-hoc-golang).

Vui lòng đọc lại bài viết [Giới thiệu và cài đặt](https://nhannguyendacoder.com/golang/tu-hoc-golang/gioi-thieu-va-cai-dat) để biết Golang là gì và làm sao để cài đặt Golang.

Cách tốt nhất để học một ngôn ngữ lập trình là bắt tay vào thực hành. Bây giờ chúng ta hãy cùng nhau viết chương trình đầu tiên với Go.

## Cài đặt môi trường để lập trình Go
Đầu tiên hãy tạo một thư mục để chứa mã nguồn của chương trình hello world. Mở terminal và gõ lệnh sau.

```bash
mkdir ~/Documents/learngo
```

Câu lệnh trên sẽ tạo một thư mục tên `learngo` bên trong thư mục `Documents`. Bạn cũng có thể tạo thư mục này ở bất cứ nơi nào mà bạn muốn.

## Hello world 
Trong thư mục `learngo`, tạo một file có tên `main.go` với nội dung sau. Bạn có thể dùng bất cứ trình soạn thảo code nào mà bạn thích.

```go
package main

import "fmt"

func main() {
    fmt.Println("Hello World")
}
```

Trong Go, tên của file chứa hàm `main` thường là `main.go`, nhưng bạn có thể đặt tên file khác cũng không sao.

## Chạy một chương trình Go
Có nhiều cách khác nhau để chạy một chương trình Go. Hãy tìm hiểu từng cách một. 

### 1. go install 
Cách đầu tiên để chạy một chương trình Go là dùng lệnh `go install`. Bây giờ hãy `cd` vào thư mục `learngo` mà chúng ta vừa tạo ra.

```bash
cd ~/Documents/learngo
```

Tiếp sau chạy lệnh sau.

```bash
go install
```

Câu lệnh trên sẽ biên dịch chương trình và cài đặt (copy) file binary vào thư mục `~/go/bin`. Tên của file binary chính là tên thư mục chứa file `main.go`. Trong trường hợp của chúng ta, nó sẽ có tên là `learngo`.

Bạn có thể sẽ gặp lỗi sau khi dùng lệnh `go install` để cài đặt chương trình.

```markup
go install: no install location for directory 
/home/naveen/Documents/learngo outside GOPATH  
For more details see: 'go help gopath'  
```

Lỗi xuất hiện phía trên có nghĩa là `go install` không thể tìm thấy nơi để cài đặt file binary đã được biên dịch của chúng ta. Vì vậy hãy tiếp tục và cho nó biết vị trí đó. Vị trí này được thiết lập bởi biến môi trường tên là `GOBIN`.

```bash
export GOBIN=~/go/bin/
```

Câu lệnh trên chỉ định rằng `go install` nên copy file binary đã được biên dịch đến đường dẫn `~/go/bin`. Bạn cũng có thể đổi đường dẫn khác nếu bạn muốn. Bây giờ hãy chạy lại `go install` lần nữa và chương trình của bạn sẽ được biên dịch và chạy mà không có vấn đề nào nữa.

Gõ `ls -al ~/go/bin/learngo` trong terminal và bạn có thể thấy đúng là `go install` đã đặt file binary tại thư mục `~/go/bin`.

Bây giờ hãy chạy file binary đã được biên dịch.

```bash
~/go/bin/learngo
```

Câu lệnh trên sẽ chạy file binary tên `learngo` và in ra màn hình dòng `Hello World`.

Chúc mừng! Bạn đã chạy thành công chương trình Go đầu tiên.

Nếu bạn muốn tránh việc phải gõ lại toàn bộ đường dẫn `~/go/bin/learngo` mỗi lần chạy chương trình, bạn có thể thêm `~/go/bin/` vào biến môi trường `PATH`.

```bash
export PATH:$PATH:~/go/bin
```

Bây giờ bạn chỉ cần gõ `learngo` trên terminal để chạy chương trình.

Bạn có thể thắc mắc là sẽ ra sao nếu thư mục `learngo` còn chứa nhiều file go khác ngoài file `main.go`. `go install` sẽ hoạt động như thế nào trong trường hợp này? Hãy kiên nhẫn, chúng ta sẽ nói về vấn đề này trong bài viết về package và module.

### 2. go build
Lựa chọn thứ 2 để chạy một chương trình Go là sử dụng `go build`. `go build` cũng tương tự như `go install` ngoại trừ nó không cài đặt (copy) file binary sau khi biên dịch vào `~/go/bin`, thay vào đó nó tạo ra file binary bên trong thư mục mà `go build` được cài đặt.

Gõ lệnh sau vào terminal để đi đến thư mục `learngo`.

```bash
cd ~/Documents/learngo/  
```

Sau đó tiếp tục gõ lệnh sau.

```bash
go build
```

Câu lệnh ở trên sẽ tạo ra một file binary tên là `learngo` trong thư mục hiện tại. Gõ `ls -al` để thấy một file mới tên `learngo` vừa mới được tạo ra.

Gõ `./learngo` để chạy chương trình, nó cũng sẽ in ra `Hello World`.

Vậy là bạn cũng đã chạy thành công chương trình với `go build`.

### 3. go run
Cách thứ 3 để chạy chương trình là dùng lệnh `go run`,

Gõ lệnh sau vào terminal để đi đến thư mục `learngo`.

```bash
cd ~/Documents/learngo/  
```

Sau đó tiếp tục gõ lệnh sau.

```bash
go run main.go
```

Sau khi chạy lệnh trên chương trình cũng sẽ in ra `Hello World`.

Một sự khác biệt giữa `go run` và `go build`/`go install` là `go run` cần truyền vào tên của file go khi chạy. 

Ở bên dưới, `go run` cũng hoạt động tương tự như `go build`. Thay vì biên dịch và cài đặt chương trình vào thư mục hiện tại, nó sẽ biên dịch chương trình vào một vị trí tạm thời và chạy chương trình ở vị trí đó. Nếu bạn muốn biết `go run` sẽ biên dịch chương trình và đặt ở đâu, hãy chạy lệnh `go run` với tham số `--work`.

```bash
go run --work main.go 
```

Trong trường hợp này, kết quả sẽ hiện ra như sau.

```markup
WORK=/var/folders/23/vdjz4kt972g5nzr86wzrj9740000gq/T/go-build698353814  
Hello World
```

Giá trị của `WORK` chính là vị trí tạm thời mà chương trình sẽ được biên dịch.

Trong trường hợp này, chương trình được biên dịch tới vị trí `/var/folders/23/vdjz4kt972g5nzr86wzrj9740000gq/T/go-build698353814/b001/exe`. Trong trường hợp của bạn có thể là vị trí khác.

### 4. Go Playground
Cách cuối cùng để chạy một chương trình Go là sử dụng [go playground](https://play.golang.org/). Mặc dù có một số hạn chế, nhưng cách này rất hiệu quả khi bạn muốn chạy một chương trình Go đơn giản mà không phải cài đặt Go trên máy tính của mình. Bạn có thể click vào [đây](https://play.golang.org/p/oXGayDtoLPh) để chạy online chương trình hello world.

Bạn có thể dùng playground để chia sẻ code của mình với người khác.

Bây giờ bạn đã biết có 4 cách để chạy một chương trình Go, bạn có thể thắc mắc là mình nên sử dùng cách nào. Câu trả lời là tùy vào nhu cầu của bạn. Tôi thường sử dụng playground khi muốn kiểm tra nhanh một logic nào đó hay cách một thư viện chuẩn hoạt động như thế nào. Trong hầu hết trường hợp, tôi thích dùng `go install` vì bạn có thể chạy chương trình ở mọi thư mục trong terminal vì nó biên dịch tất cả chương trình vào cùng một đường dẫn chuẩn là `~/go/bin`.

## Giải thích chương trình hello world
Đây là  chương trình mà chúng ta đã viết.

```go
package main

import "fmt"

func main() {
    fmt.Println("Hello World")
}
```

Chúng ta sẽ thảo luận ngắn gọn ý nghĩa của từng dòng và sẽ tìm hiểu chi tiết hơn trong các phần tiếp theo.

`package main` - Tất cả file go phải bắt đầu với câu lệnh `package name`. Package được sử dụng để phục vụ mục đích chia tách và tái sử dụng code. Package khai báo trong câu trên có tên là `main`. Hàm `main` phải được khai báo trong package `main`.

`import "fmt"` - Câu lệnh import được sử dụng để import các package khác. Trong trường hợp của chúng ta, package `fmt` được import và được sử dụng bên trong hàm `main`.

`func main()` - Từ khóa `func` đánh dấu sự bắt đầu của hàm. Hàm `main` là một hàm đặc biệt. Chương trình sẽ bắt đầu thực thi từ hàm `main`. Hai dấu `{` và `}` đánh dấu vị trí bắt đầu và kết thúc của hàm `main`.

`fmt.Println("Hello World")` - Hàm `Println` của package `fmt` được dùng để hiển thị text ra màn hình. `package.Function()` là cú pháp để gọi một funtion trong package nào đó.

Liên kết: 
- Bài tiếp theo - [Biến](https://nhannguyendacoder.com/golang/tu-hoc-golang/bien)
- Xem thêm các bài viết khác tại [Series Hướng dẫn tự học lập trình Golang](https://nhannguyendacoder.com/page/tu-hoc-golang)
- Nguồn: [https://golangbot.com/hello-world-gomod/](https://golangbot.com/hello-world-gomod/)
