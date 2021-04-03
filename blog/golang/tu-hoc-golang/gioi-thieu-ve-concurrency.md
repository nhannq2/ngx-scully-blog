---
title: 'Tự học Golang - 20 - Giới thiệu về Concurrency'
description: 'Đây là bài viết trong Series Hướng dẫn tự học lập trình Golang. Có một lưu ý là Go là một ngôn ngữ concurrent, không phải là một ngôn ngữ parallel. Trước khi nơi về concurrency trong Go, chúng ta phải hiểu được concurrency là gì, và nó khác với parallel như thế nào.'
published: true
keywords: 'golang, tu hoc golang, lap trinh golang, concurrency'
categories: golang
date: 2021-04-05
image: assets/images/golang/tu-hoc-golang/gioi-thieu-ve-concurrency/post-image.jpg
---

# Tự học Golang - 20 - Giới thiệu về Concurrency

![post-image](assets/images/golang/tu-hoc-golang/gioi-thieu-ve-concurrency/post-image.jpg)

Đây là bài viết trong [Series Hướng dẫn tự học lập trình Golang](https://nhannguyendacoder.com/page/tu-hoc-golang). 

Có một lưu ý là Go là một ngôn ngữ **concurrent**, không phải là một ngôn ngữ **parallel**. Trước khi nơi về concurrency trong Go, chúng ta phải hiểu được concurrency là gì, và nó khác với parallel như thế nào.

## Concurrency là gì?
Concurrency là khả năng có thể xử lý được khi đối mặt với nhiều việc cùng một lúc.

Ví dụ có một người đang chạy bộ thì dây giày của anh ấy bị tuột, anh ấy dừng việc chạy bộ lại và buộc dây giày, sau đó anh ấy tiếp tục chạy. 

Ví dụ trên là một ví dụ của concurrency. Người này có thể xử lý được khi đối mặt với hai việc cùng lúc là chạy và thắt dây giày. Nói cách khác, anh ấy có khả năng xử lý được khi đối mặt với nhiều việc cùng lúc.

## Parallel là gì và nó khác với concurrency như thế nào?
Parallel là làm nhiều việc tại cùng một thời điểm. Có thể nó nghe giống như concurrency nhưng thật ra chúng rất khác biệt.

Quay lại với ví dụ về người chạy bộ ở trên. Trong trường hợp này, giả sử anh ấy vừa chạy và vừa nghe nhạc bằng iPod. Ở đây, anh ấy vừa chạy và vừa nghe nhạc tại cùng một thời điểm, hay anh ấy đang làm nhiều việc tại cùng một thời điểm. Đây là ví dụ về parallel.

## Concurrency và parallel dưới góc nhìn kỹ thuật
Chúng ta đã hiểu concurrency là gì và nó khác với parallel như thế nào bằng một ví dụ trong thực tế. Bây giờ hãy cùng xem xét một ví dụ về kỹ thuật.

Ví dụ chúng ta đang lập trình ra một trình duyệt web. Trình duyệt này có nhiều thành phần khác nhau. Hai trong số đó là phần tải file từ internet và phần render ra giao diện trang web. Giả sử chúng ta đã cấu trúc code của trình duyệt sao cho các thành phần của nó có thể hoạt động độc lập với nhau (Có thể dùng thread trong các ngôn ngữ tương tự như Java, trong Go thì chúng ta có thể dùng [Goroutine](https://nhannguyendacoder.com/golang/tu-hoc-golang/goroutine)). Khi trình duyệt chạy trên một bộ xử lý đơn nhân (single-core processor) thì bộ xử lý sẽ liên tục chuyển qua lại giữa hai phần này. Nó có thể tải file một lúc, và sau đó chuyển sang render giao diện web. Đây gọi là concurrency. 

Nếu như trình duyệt của chúng ta chạy trên một bộ xử lý đa nhân (multi-core processor). Trong trường hợp này, quá trình tải file và render giao diện có thể diễn ra đồng thời trên các core khác nhau. Đây gọi là parallel.

![concurrency-parallelism.png](assets/images/golang/tu-hoc-golang/gioi-thieu-ve-concurrency/concurrency-parallelism.png)

Parallel không phải lúc nào cũng có thời gian thực thi nhanh hơn. Nguyên nhân là đôi khi các thành phần chạy parallel cần phải tương tác với nhau. Ví dụ như trong trường hợp trình duyệt web của chúng ta, khi việc download file hoàn thành, thì cần phải tương tác với người dùng, giả sử cần hiện pop-up thông báo (đây là việc của thành phần render giao diện). Vì vậy trong trường hợp này có sự giao tiếp xảy ra giữa thành phần phụ trách tải file và thành phần phụ trách render giao diện.

Chi phí cho việc giao tiếp như trên là cao trong các hệ thống parallel, nhưng thấp hơn trong các hệ thống concurrency.

Vì vậy, parallel không phải lúc nào cũng nhanh hơn concurrency.

## Concurrency trong Go
Concurrency được hỗ trợ sẵn trong ngôn ngữ lập trình Go. Trong Go, concurrency được quản lý bởi [Goroutine](https://nhannguyendacoder.com/golang/tu-hoc-golang/goroutine) và channel. Chúng ta sẽ tìm hiểu về chúng trong các bài tiếp theo.

Liên kết: 
- Bài tiếp theo - [Goroutine](https://nhannguyendacoder.com/golang/tu-hoc-golang/goroutine)
- Xem thêm các bài viết khác tại [Series Hướng dẫn tự học lập trình Golang](https://nhannguyendacoder.com/page/tu-hoc-golang)
- Nguồn: [https://golangbot.com/concurrency/](https://golangbot.com/concurrency/)
