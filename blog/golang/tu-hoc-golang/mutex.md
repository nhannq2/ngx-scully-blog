---
title: 'Tự học Golang - 25 -Mutex'
description: 'Đây là bài viết trong Series Hướng dẫn tự học lập trình Golang. Trong bài này chúng ta sẽ cùng tìm hiểu về mutex. Chúng ta cũng sẽ học cách dùng mutex và channel để giải quyết vấn đề race condition.'
published: true
keywords: 'golang, tu hoc golang, lap trinh golang, mutex'
categories: golang
date: 2021-04-10
image: assets/images/golang/tu-hoc-golang/mutex/post-image.jpg
---

# Tự học Golang - 25 -Mutex

![post-image](assets/images/golang/tu-hoc-golang/mutex/post-image.jpg)

Đây là bài viết trong [Series Hướng dẫn tự học lập trình Golang](https://nhannguyendacoder.com/page/tu-hoc-golang). 

Trong bài này chúng ta sẽ cùng tìm hiểu về mutex. Chúng ta cũng sẽ học cách dùng mutex và [channel](https://nhannguyendacoder.com/golang/tu-hoc-golang/channel) để giải quyết vấn đề race condition.

## Critical section trong lập trình concurrency
Trước khi tìm hiểu về mutex, chúng ta cần hiểu một khái niệm quan trọng trong lập trình concurrency là [critical section](https://en.wikipedia.org/wiki/Critical_section). Khi một chương trình concurrency được thực thi, đoạn code cập nhật giá trị của các resource dùng chung có thể được truy cập bởi nhiều goroutine khác nhau cùng lúc (ví dụ nhiều goroutine cùng tăng giá trị của một biến cùng lúc). Đoạn code này được gọi là **critical section**. Ví dụ chúng ta có một đoạn code tăng giá trị của `x` lên 1.

```go
x = x + 1
```

Nếu chỉ có một goroutine truy cập đoạn code này thì sẽ không có vấn đề gì xảy ra. Nhưng nếu có nhiều goroutine cùng truy cập tới đoạn code này đồng thời thì chương trình sẽ thực thi sai. 

Để đơn giản thì chúng ta sẽ giả sử có hai goroutine chạy dòng code trên đồng thời. Dòng code trên sẽ được hệ thống thực hiện theo các bước (đã được đơn giản hóa) sau:
1. Lấy ra giá trị hiện tại của x
2. Tính kết quả của x + 1
3. Gán giá trị tính được ở bước 2 lại cho x

Khi ba bước này chỉ được thực hiện bởi một Goroutine thì tất cả đều ổn. 

Hãy thảo luận điều gì sẽ xảy ra khi hai goroutine chạy code này cùng lúc. Hình bên dưới minh họa cho trường hợp này.

![hai goroutine chạy code này cùng lúc](assets/images/golang/tu-hoc-golang/mutex/cs5.png)

Giả sử giá trị ban đầu của `x` là 0. *Goroutine 1* lấy giá trị ban đầu của `x`, tính kết quả của `x + 1`, nhưng trước khi gán lại giá trị tính được cho `x` thì hệ thống chuyển sang thực thi *goroutine 2*. Khi *goroutine 2* lấy giá trị ban đầu của `x` thì nó vẫn có giá trị là 0, sau đó tính `x + 1`. Sau đó, hệ thống chuyển sang *goroutine 1*, gán giá trị tính được lúc nãy cho `x`, bây giờ `x` có giá trị là 1. Sau đó *goroutine 2* được thực thi và cũng gán giá trị nó tính được là 1 cho `x`. Như vậy sau khi 2 goroutine được thực thi, `x` có giá trị là 1, không đúng như mong đợi.

Hình bên dưới mô tả một trường hợp khác cũng có thể xảy ra khi 2 goroutine cùng chạy dòng code trên.

![hai goroutine chạy code này cùng lúc 2](assets/images/golang/tu-hoc-golang/mutex/cs-6.png)

Trong trường hợp trên, *goroutine 1* bắt đầu được thực thi và hoàn thành cả 3 bước, bây giờ giá trị của `x` là 1. Sau đó tới *goroutine 2* được thực thi, sau khi kết thúc giá trị của `x` là 2.

Từ hai trường hợp trên, bạn có thể thấy giá trị cuối cùng của x là 1 hay là 2 phụ thuộc vào quá trình chuyển đổi qua lại của 2 goroutine. Khi mà kết quả của chương trình phụ thuộc vào thứ tự thực thi của các goroutine được gọi là **[race condition](https://en.wikipedia.org/wiki/Race_condition)**.

Trong trường hợp này, để tránh khỏi race condition thì tại mọi thời điểm chúng ta chỉ cho phép 1 goroutine được truy cập tới critical section. Cách này có thể thưc hiên được với Mutex.

## Mutex
Mutex cung  cấp cho chúng ta một cơ chế lock để đảm bảo rằng tại mọi thời điểm chỉ có 1 goroutine có thể truy cập vào critical section, từ đó tránh khỏi race condition.

Mutex được cung cấp trong package [sync](https://golang.org/pkg/sync/). Có 2 method được khai báo trong [Mutex](https://tip.golang.org/pkg/sync/#Mutex) là [Lock](https://tip.golang.org/pkg/sync/#Mutex.Lock) và [Unlock](https://tip.golang.org/pkg/sync/#Mutex.Unlock). Bất kỳ đoạn code nào nằm giữa hai lời gọi hàm `Lock` và `UnLock` sẽ chỉ được thực thi bởi một goroutine ở mọi thời điểm.

```go
mutex.Lock()  
x = x + 1  
mutex.Unlock()  
```

Ở trên, đoạn code `x = x + 1` sẽ chỉ được thực thi bởi một goroutine ở mọi thời điểm và race condition sẽ không xảy ra.

**Nếu 1 goroutine đang thực thi đoạn code `x = x + 1` và có môt goroutine khác truy cập tới đoạn này thì goroutine mới sẽ bị block cho đến khi goroutine đến trước thực thi xong**

## Ví dụ về race condition
Trong phần này chúng ta sẽ viết một chương trình có xảy ra race condition.

```go
package main  
import (  
    "fmt"
    "sync"
    )
var x  = 0  
func increment(wg *sync.WaitGroup) {  
    x = x + 1
    wg.Done()
}
func main() {  
    var w sync.WaitGroup
    for i := 0; i < 1000; i++ {
        w.Add(1)        
        go increment(&w)
    }
    w.Wait()
    fmt.Println("final value of x", x)
}
```

Trong chương trình trên, hàm `increment` tăng giá trị của `x` lên 1 và sau đó gọi hàm `Done()` của [WaitGroup](https://nhannguyendacoder.com/golang/tu-hoc-golang/buffered-channel-va-worker-pool) để thông báo nó đã hoàn thành.

Chúng ta tạo ra 1000 goroutine. Các goroutine chạy đồng thời với nhau và race condition sẽ xảy ra ở dòng `x = x + 1` khi mà nhiều goroutine thực thi dòng này cùng lúc.

*Hãy chạy chương trình trên ở máy cá nhân của bạn vì trên playground sẽ không xảy ra race condition*

Chạy chương trình trên ở máy cá nhân của bạn nhiều lần và bạn có thể thấy nhiều kết quả khác nhau vì có race condition xảy ra, ví dụ `final value of x 941`, `final value of x 928`, `final value of x 922`,...

## Giải quyết race condition với mutex
Chúng ta sẽ cùng fix ví dụ trên để x có kết quả mong muốn là 1000.

```go
package main  
import (  
    "fmt"
    "sync"
    )
var x  = 0  
func increment(wg *sync.WaitGroup, m *sync.Mutex) {  
    m.Lock()
    x = x + 1
    m.Unlock()
    wg.Done()   
}
func main() {  
    var w sync.WaitGroup
    var m sync.Mutex
    for i := 0; i < 1000; i++ {
        w.Add(1)        
        go increment(&w, &m)
    }
    w.Wait()
    fmt.Println("final value of x", x)
}
```

[Chạy trên playground](https://play.golang.org/p/VX9dwGhR62)

[Mutex](https://golang.org/pkg/sync/#Mutex) là một kiểu struct, chúng ta khai báo một biến có zero value của Mutex ở dòng `var m sync.Mutex`. Trong hàm `increment` chúng ta đặt đoạn code `x = x + 1` ở giữa `m.Lock()` và `m.Unlock()`.  Bây giờ chương trình của chúng ta có thể tránh khỏi race condition vì chỉ có một goroutine có thể truy cập vào critical section tại một thời điểm. Kết quả in ra sẽ là,

```markup
final value of x 1000  
```

**Lưu ý quan trọng: Bạn phải truyền vào hàm `increment` một con trỏ của Mutex, nếu không thì mỗi goroutine sẽ nhận được một bản copy khác nhau của mutex và race condition vẫn sẽ xảy ra**

## Giải quyết race condition với channel
Bạn cũng có thể giải quyết race condition cho ví dụ trên với channel.

```go
package main  
import (  
    "fmt"
    "sync"
    )
var x  = 0  
func increment(wg *sync.WaitGroup, ch chan bool) {  
    ch <- true
    x = x + 1
    <- ch
    wg.Done()   
}
func main() {  
    var w sync.WaitGroup
    ch := make(chan bool, 1)
    for i := 0; i < 1000; i++ {
        w.Add(1)        
        go increment(&w, ch)
    }
    w.Wait()
    fmt.Println("final value of x", x)
}
```

[Chạy trên playground](https://play.golang.org/p/M1fPEK9lYz)

Trong ví dụ trên chúng ta đã tạo ra một [buffer channel](https://nhannguyendacoder.com/golang/tu-hoc-golang/buffered-channel-va-worker-pool) có capacity là 1 và truyền channel này vào hàm `increment`. Buffer channel này được dùng để đảm bảo rằng chỉ có một goroutine được truy cập vào critical section tại một thời điểm mà thôi. Khi gửi giá trị `true` vào channel `ch` thì các goroutine khác sẽ bị block khi cố gắng gửi vào channel này vì `ch` chỉ có capacity là 1. Sau khi tăng `x` lên 1 thì hàm `increment` rút giá trị trong `ch` ra, goroutine tiếp theo có thể gửi giá trị vào channel và các goroutine còn lại  tiếp tục bị block. Như vậy từng goroutine một sẽ được truy cập vào critical section. Kết quả in ra,

```markup
final value of x 1000 
```

## So sánh mutex và channel
Như bạn đã thấy thì cả mutex và channel đều có thể giải quyết được race condition. Vậy làm thế nào để chúng ta biết được là nên dùng cách nào? Câu trả lời là tùy vào vấn đề mà chúng ta đang giải quyết. Nếu nó phù hợp với mutex thì chúng ta sẽ dùng mutex, và ngược lại hãy dùng channel nếu nó phù hợp hơn.

Nhìn chung, channel được dùng khi các goroutine cần giao tiếp với nhau và mutex được dùng khi bạn có ý định chỉ cho một goroutine truy cập vào critical section.

Trong ví dụ trên, tôi sẽ thích dùng mutex hơn vì chương trình này không cần các goroutine phải giao tiếp với nhau.

Liên kết: 
- Bài tiếp theo - [Structs thay thế cho class](https://nhannguyendacoder.com/golang/tu-hoc-golang/struct-thay-the-cho-class)
- Xem thêm các bài viết khác tại [Series Hướng dẫn tự học lập trình Golang](https://nhannguyendacoder.com/page/tu-hoc-golang)
- Nguồn: [https://golangbot.com/mutex/](https://golangbot.com/mutex/)
