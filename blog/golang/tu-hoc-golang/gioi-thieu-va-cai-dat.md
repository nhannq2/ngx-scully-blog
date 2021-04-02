---
title: 'Tự học Golang - 1 - Giới thiệu và cài đặt'
description: 'Đây là bài viết trong Series Hướng dẫn tự học lập trình Golang. Bài viết này sẽ giới thiệu về ngôn ngữ lập trình Go và những ưu điểm của Go so với các ngôn ngữ lập trình khác. Chúng ta cũng sẽ học cách cài đặt Go trên Mac OS, Windows và Linux.'
published: true
keywords: 'golang, tu hoc golang, lap trinh golang'
categories: golang
date: 2021-04-02
image: assets/images/golang/tu-hoc-golang/gioi-thieu-va-cai-dat/post-image.jpg
---

# Tự học Golang - 1 - Giới thiệu và cài đặt

![post-image](assets/images/golang/tu-hoc-golang/gioi-thieu-va-cai-dat/post-image.jpg)

Đây là bài viết trong [Series Hướng dẫn tự học lập trình Golang](https://nhannguyendacoder.com/page/tu-hoc-golang). Bài viết này sẽ giới thiệu về ngôn ngữ lập trình Go và những ưu điểm của Go so với các ngôn ngữ lập trình khác. Chúng ta cũng sẽ học cách cài đặt Go trên Mac OS, Windows và Linux.

## Giới thiệu
Go, hay Golang là một ngôn ngữ lập trình biên dịch và là ngôn ngữ định kiểu. Go là một dự án mã nguồn mở của Google. Các tác giả chính của Go bao gồm [Rob Pike](https://en.wikipedia.org/wiki/Rob_Pike), [Ken Thompson](https://en.wikipedia.org/wiki/Ken_Thompson) và Robert Griesemer. Go được giới thiệu lần đầu vào tháng 10 năm 2009.

Go là một ngôn ngữ lập trình đa năng với cú pháp đơn giản và đi kèm với các thư viện chuẩn rất mạnh mẽ. Một trong những lĩnh vực quan trọng mà Go tỏa sáng là việc tạo ra các ứng dụng web app có tính khả dụng và mở rộng cao. Go còn có thể được dùng để tạo ra các ứng dụng dòng lệnh, ứng dụng desktop hay thậm chí là ứng dụng mobile.

## Ưu điểm của Go
Tại sao bạn nên chọn Go làm ngôn ngữ lập trình phía server trong khi có rất nhiều ngôn ngữ khác có thể làm được chuyện đó như python, ruby, nodejs,...

Sau đây là một số ưu điểm của Go.

### Cú pháp đơn giản
Cú pháp đơn giản và ngắn gọn, ngôn ngữ không bị cồng kềnh bởi các tính năng không cần thiết. Điều này giúp cho việc viết code dễ đọc và dễ bảo trì hơn. 

### Dễ dàng viết các chương trình concurrent
[Concurrency](https://golangbot.com/concurrency/) là một phần của Go. Bạn có thể viết các chương trình đa luồng với [Goroutines](https://golangbot.com/goroutines/) và [channels](https://golangbot.com/channels/). Chúng ta sẽ tìm hiểu về concurrency trong Go ở các bài viết tiếp theo.

### Ngôn ngữ biên dịch
Go là một ngôn ngữ biên dịch. Source code được biên dịch thành ngôn ngữ máy, không giống như các ngôn ngữ thông dịch như Javascript dùng trong Nodejs.

### Biên dịch nhanh
Trình biên dịch của Go thì rất là "amazing good job", ngay từ đầu nó đã được thiết kế để có thể biên dịch nhanh nhất có thể.

### Static linking
Trình biên dich của Go có hỗ trợ static linking. Toàn bộ một project Go có thể được liên kết thành một file binary và có thể được deploy lên clound server một cách dễ dàng mà không cần phải lo lắng về các dependency.

### Các công cụ hỗ trợ của Go
Go đi kèm với các công cụ rất mạnh mẽ, giúp các lập trình viên viết code tốt hơn. Một số công cụ hay được sử dụng là:
- gofmt - [gofmt](https://golang.org/cmd/gofmt/) được dùng để tự động định dạng source code Go, giúp source code nhìn gọn gàng, dễ đọc hơn.
- vet - [vet](https://golang.org/cmd/vet/) phân tích source code Go và báo cáo cho bạn biết các đoạn code đáng ngờ, có thể sinh ra lỗi không mong muốn. Không phải tất cả các vấn đề báo cáo bởi vet đều là lỗi thực sự, nhưng nó có khả năng bắt các lỗi mà trình biên dịch có thể bỏ sót, ví dụ như lỗi dùng sai format cho hàm [Printf](https://golang.org/pkg/fmt/#Printf).
- golint - [golint](https://github.com/golang/lint) được dùng để xác định các vấn đề về định dạng trong code.

### Garbage collection
Go dùng garbage collection, vì vậy việc quản lý bộ nhớ hầu hết sẽ được làm tự động và lập trình viên không phải lo lắng về việc quản lý bộ nhớ. Nó cũng giúp cho việc viết các chương trình concurrent dễ dàng hơn.

### Đặc tả ngôn ngữ đơn giản
Phần đặt tả ngôn ngữ của Go khá là đơn giản. Toàn bộ [phần đặt tả](https://golang.org/ref/spec) thì vừa gọn trong một trang và bạn thậm chí có thể viết một trình biên dịch của riêng mình.

### Mã nguồn mở
Cuối cùng nhưng không kém phần quan trọng, Go là một dự án mã nguồn mở. Bạn có thể tham gia và đóng góp vào [Go project](https://golang.org/doc/contribute.html)

## Các sản phẩm nổi tiếng được viết bằng Go
Sau đây là một số sản phẩm nổi tiếng sử dụng Go.
- Google phát triển Kubernetes sử dụng Go.
- Docker cũng được phát triển bởi Go.
- Dropbox đã chuyển từ Python sang Go cho các thành phần quan trọng trong hệ thống của họ.
- Các sản phẩm networking thế hệ tiếp theo của Infoblox được phát triển bằng Go.

## Cài đặt 
Go có thể được cài đặt trên cả 3 nền tảng là Mac, Windows, và Linux. Bạn có thể tải file cài đặt cho nền tảng tương ứng tại [https://golang.org/dl/](https://golang.org/dl/)

### Mac OS
Tải xuống trình cài đặt cho Mac OS tại [https://golang.org/dl/](https://golang.org/dl/). Double click vào trình cài đặt. Làm theo các chỉ dẫn và sau cùng Golang sẽ được cài đặt vào thư mục `/usr/local/go` và đường dẫn `/usr/local/go/bin` cũng được thêm vào biến môi trường `PATH`.

### Windows
Tải xuống trình cài đặt cho Windows (file MSI) tại [https://golang.org/dl/](https://golang.org/dl/). Double click vào trình cài đặt. Làm theo các chỉ dẫn và sau cùng Golang sẽ được cài đặt vào thư mục `c:\Go` và đường dẫn `c:\Go\bin` cũng được thêm vào biến môi trường `path`.

### Linux
Tải xuống trình cài đặt cho Linux (tar file) tại [https://golang.org/dl/](https://golang.org/dl/) và giải nén vào thư mục `/usr/local`.

Thêm đường dẫn `/usr/local/go/bin` vào biến môi trường `PATH`. Vậy là bạn đã cài đặt xong Go trên Linux.

## Xác nhận việc cài đặt
Để xác nhận bạn đã cài đặt Go thành công, gõ lệnh `go version` trong cửa sổ dòng lệnh và nó sẽ in ra phiên bản Go đã được cài đặt. Ví dụ:

```
$ go version
go version go1.13.6 darwin/amd64  
```

1.13.6 là phiên bản mới nhất của Go lúc viết bài này. Kết quả in ra cho biết bạn đã cài đặt Go thành công. Trong bài tiếp theo, chúng ta sẽ viết chương trình Hello World đầu tiên bằng Go.

Liên kết: 
- Bài tiếp theo - [Hello World](https://nhannguyendacoder.com/golang/tu-hoc-golang/hello-world)
- Xem thêm các bài viết khác tại [Series Hướng dẫn tự học lập trình Golang](https://nhannguyendacoder.com/page/tu-hoc-golang)
- Nguồn: [https://golangbot.com/golang-tutorial-part-1-introduction-and-installation/](https://golangbot.com/golang-tutorial-part-1-introduction-and-installation/)
