---
title: 'Tự học Golang - 23 - Buffered channel và Worker Pool'
description: 'Đây là bài viết trong Series Hướng dẫn tự học lập trình Golang. Chúng ta có thể tạo ra channel với buffer. Việc gửi tới một buffer channel chỉ bị block khi buffer của channel đó bị đầy. Tương tự, việc nhận dữ liệu từ một buffer channel chỉ bị block khi buffer của channel đó bị rỗng.'
published: true
keywords: 'golang, tu hoc golang, lap trinh golang, buffered channel, worker pool'
categories: golang
date: 2021-04-08
image: assets/images/golang/tu-hoc-golang/buffered-channel-va-worker-pool/post-image.jpg
---

# Tự học Golang - 23 - Buffered channel và Worker Pool

![post-image](assets/images/golang/tu-hoc-golang/buffered-channel-va-worker-pool/post-image.jpg)

Đây là bài viết trong [Series Hướng dẫn tự học lập trình Golang](https://nhannguyendacoder.com/page/tu-hoc-golang). 

## Buffered channel là gì?
Như chúng ta đã thảo luận trong bài [Channel](https://nhannguyendacoder.com/golang/tu-hoc-golang/channel), các channel từ đầu đến giờ mà chúng ta gặp là các channel không có buffer, và việc gửi và nhận dữ liệu từ channel không có buffer sẽ làm cho goroutine tương ứng bị block. 

Chúng ta có thể tạo ra channel với buffer. Việc gửi tới một buffer channel chỉ bị block khi buffer của channel đó bị đầy. Tương tự, việc nhận dữ liệu từ một buffer channel chỉ bị block khi buffer của channel đó bị rỗng.

Buffer channel có thể được tạo ra với hàm `make`.

```go
ch := make(chan type, capacity)
```

`capacity` cho biết số lượng buffer của channel được tạo ra. `capacity` của channel ko có buffer là bằng 0 và thường được bỏ qua khi tạo channel.

## Ví dụ 1
```go
package main

import (  
    "fmt"
)


func main() {  
    ch := make(chan string, 2)
    ch <- "naveen"
    ch <- "paul"
    fmt.Println(<- ch)
    fmt.Println(<- ch)
}
```

[Chạy trên playground](https://play.golang.org/p/It-em11etK)

Trong ví dụ trên, chúng ta đã tạo ra một channel có capacity là 2. Vì vậy chúng ta có thể gửi hai giá  trị string vào channel mà không bị block. Kết quả in ra 

```markup
naveen  
paul
```

## Ví dụ 2
Trong ví dụ tiếp theo về buffer channel, chúng ta sẽ gửi dữ liệu vào channel từ một goroutine khác và đọc dữ liệu của channel ở goroutine main. Thông qua ví dụ này chúng ta sẽ hiểu rõ hơn khi nào việc gửi data vào buffer channel bị block.

```go
package main

import (  
    "fmt"
    "time"
)

func write(ch chan int) {  
    for i := 0; i < 5; i++ {
        ch <- i
        fmt.Println("successfully wrote", i, "to ch")
    }
    close(ch)
}
func main() {  
    ch := make(chan int, 2)
    go write(ch)
    time.Sleep(2 * time.Second)
    for v := range ch {
        fmt.Println("read value", v,"from ch")
        time.Sleep(2 * time.Second)
    }
}
```

[Chạy trên playground](https://play.golang.org/p/bKe5GdgMK9)

Trong hàm `main`, chúng ta tạo ra channel `ch` có capacity là 2 và truyền vào goroutine `write`, sau đó goroutine `main` sleep 2 giây. Trong lúc này goroutine `write` đang chạy đồng thời với goroutine `main`. Goroutine `write` dùng vòng lặp `for` và truyền giá trị từ 0 đến 4 vào channel `ch`. Capacity của `ch` là 2, vì vậy goroutine `write` chỉ có thể gửi hai giá trị 0 và 1 vào channel này, sau khi gửi xong thì sẽ bị block không thể gửi được nữa cho đến khi có ít nhất 1 data được rút ra khỏi channel. Vì vậy chương trình sẽ ngay lập tức in ra hai dòng sau.

```markup
successfully wrote 0 to ch  
successfully wrote 1 to ch  
```

Sau khi in ra hai dòng trên, việc gửi dữ liệu vào channel `ch` sẽ bị block cho đến khi có ít nhất 1 data được rút ra khỏi channel. Và vì goroutine `main` sleep 2 giây trước khi bắt đầu đọc dữ liệu từ channel nên chương trình sẽ không in ra bất cứ gì trong hai giây tiếp theo. Sau hai giây, `main` bắt đầu đọc dữ liệu của channel bằng vòng lặp `for range`, sau đó sleep tiếp 2 giây. Vòng lặp này tiếp tục cho đến khi channel `ch` bị đóng. Kết quả in ra sau hai giây,

```markup
read value 0 from ch  
successfully wrote 2 to ch  
```

Lưu ý là cứ mỗi giá trị được đọc ra ở `main` thì ở goroutine `write` có thể đẩy thêm một giá trị mới vào `ch`. Kết quả cuối cùng in ra,

```markup
successfully wrote 0 to ch  
successfully wrote 1 to ch  
read value 0 from ch  
successfully wrote 2 to ch  
read value 1 from ch  
successfully wrote 3 to ch  
read value 2 from ch  
successfully wrote 4 to ch  
read value 3 from ch  
read value 4 from ch 
```

## Deadlock
```go
package main

import (  
    "fmt"
)

func main() {  
    ch := make(chan string, 2)
    ch <- "naveen"
    ch <- "paul"
    ch <- "steve"
    fmt.Println(<-ch)
    fmt.Println(<-ch)
}
```

[Chạy trên playground](https://play.golang.org/p/FW-LHeH7oD)

Ở ví dụ này, chúng ta gửi 3 string vào buffer channel có capacity là 2 vì vậy lần gửi dữ liệu thứ 3 (`ch <- "steve"`) sẽ bị block. Bây giờ phải có một goroutine nào khác rút bớt dữ liệu từ `ch` thì chúng ta mới có thể gửi dữ liệu tiếp vào channel. Trong trường hợp này, không có goroutine nào khác đọc dữ liệu của channel này. Vì vậy chương trình sẽ xuất hiện lỗi **deadlock** lúc runtime.

```markup
fatal error: all goroutines are asleep - deadlock!

goroutine 1 [chan send]:  
main.main()  
    /tmp/sandbox091448810/prog.go:11 +0x8d
```

## Length và capacity
Capacity của một buffer channel là số giá trị mà một channel có thể nắm giữ. Giá trị này được truyền vào khi chúng ta khai báo buffer channel với hàm `make`.

Length của một buffer channel là số phần tử hiện đang có trong channel đó.

Ví dụ,

```go
package main

import (  
    "fmt"
)

func main() {  
    ch := make(chan string, 3)
    ch <- "naveen"
    ch <- "paul"
    fmt.Println("capacity is", cap(ch))
    fmt.Println("length is", len(ch))
    fmt.Println("read value", <-ch)
    fmt.Println("new length is", len(ch))
}
```

[Chạy trên playground](https://play.golang.org/p/2ggC64yyvr)

Trong chương trình trên, channel được tạo ra có capacity là 3, nó có thể chứa được 3 tring. Sau đó chúng ta gửi 2 string vào channel này. Bây giờ channel có length là 2. Sau khi đọc một string từ channel thì length của nó chỉ còn lại 2. Kết quả in ra

```markup
capacity is 3  
length is 2  
read value naveen  
new length is 1
```

## WaitGroup
Trong phần tiếp theo chúng ta sẽ tìm hiểu về worker pool, nhưng trước tiên chúng ta cần hiểu về `WaitGroup` vì nó sẽ được dùng trong worker pool.

WaitGroup được dùng để đợi một nhóm các goroutine hiện xong. Khi dùng WaitGroup thì chương trình sẽ bị block cho đến khi tất cả các goroutine cùng hoàn thành. Giả sử có 3 goroutine được tạo ra từ `main` goroutine mà `main` goroutine cần đợi cho 3 goroutine đó hoàn thành mới tiếp tục chương trình thì chúng ta có thể sử dụng WaitGroup.

Ví dụ,

```go
package main

import (  
    "fmt"
    "sync"
    "time"
)

func process(i int, wg *sync.WaitGroup) {  
    fmt.Println("started Goroutine ", i)
    time.Sleep(2 * time.Second)
    fmt.Printf("Goroutine %d ended\n", i)
    wg.Done()
}

func main() {  
    no := 3
    var wg sync.WaitGroup
    for i := 0; i < no; i++ {
        wg.Add(1)
        go process(i, &wg)
    }
    wg.Wait()
    fmt.Println("All go routines finished executing")
}
```

[Chạy trên playground](https://play.golang.org/p/CZNtu8ktQh)

[WaitGroup](https://golang.org/pkg/sync/#WaitGroup) là một struct, khai báo ở dòng `var wg sync.WaitGroup` tạo ra biến `wg` là giá trị là zero value của kiểu `WaitGroup`. WaitGroup hoạt động dựa trên một counter. Khi chúng ta gọi method `Add` và truyền vào một số `int`, thì counter của WaitGroup thay đổi dựa vào tham số truyền vào. Để giảm counter xuống, bạn có thể gọi method `Done`. Method `Wait` sẽ block goroutine gọi nó cho đến khi nào counter trở về 0.

Trong đoạn code trên, chúng ta gọi `wg.Add(1)` trong vòng lặp `for` 3 lần. Counter hiện tại là 3. Vòng lặp `for` cũng tạo ra 3 goroutine `process` và sau đó chúng ta gọi `wg.Wait()` ở hàm `main` làm cho goroutine `main` bị block cho đến khi counter bằng 0. Couter sẽ giảm mỗi lần `wg.Done()` được gọi trong goroutine `process`. Khi 3 goroutine `process` hoàn thành, `wg.Done()` sẽ được gọi 3 lần, counter trở về 0 và hàm main sẽ được unlock.

**Lưu ý là `wg` cần được truyền dưới dạng con trỏ (`go process(i, &wg)`), nếu không thì mỗi goroutine `process` sẽ nhận được một bản copy khác nhau của `WaitGroup` và goroutine `main` sẽ không được thông báo khi chúng kết thúc.**

Kết quả chương trình in ra

```markup
started Goroutine  2  
started Goroutine  0  
started Goroutine  1  
Goroutine 0 ended  
Goroutine 2 ended  
Goroutine 1 ended  
All go routines finished executing  
```

Kết quả của bạn có thể khác vì thứ tự thực hiện của  các goroutine là khác nhau.

## Worker Pool 
Một trong những ứng dụng quan trọng của buffer channel là ứng dụng trong [worker pool](https://en.wikipedia.org/wiki/Thread_pool).

Worker pool là tập hợp một số goroutine để thực hiện một khối lượng công việc nào đó (bao gồm nhiều job). Các goroutine trong worker pool sẽ thực hiện các công việc (job) được phân chia, sau khi hoàn thành, chúng có thể tiếp tục nhận job mới.

Tiếp theo chúng ta sẽ triển khai một worker pool với buffer channel. Khối lượng công việc mà worker pool của chúng ta sẽ làm là một danh sách 100 các số nguyên ngẫu nhiên. Nhiệm vụ của mỗi job là tìm ra tổng các chữ số của một số. Ví dụ với 234 thì kết quả sẽ là 9 (2 + 3 + 4). 

Sau đây là các chức năn chính của worker pool mà chúng ta sẽ tạo
- Tạo ra một số goroutine nhất định để lắng nghe từ một buffer channel để nhận job cần thực thi.
- Gửi các job vào vào một buffer channel.
- Gửi kết quả thực thi (result) vào một buffer channel khác sau khi hoàn thành job.
- Đọc và in ra result từ channel ở trên.

Chúng ta sẽ viết từng bước một để bạn có thể hiểu dễ dàng hơn.

Đầu tiên, hãy tạo ra các struct đại diện cho job và result.

```go
type Job struct {  
    id       int
    randomno int
}
type Result struct {  
    job         Job
    sumofdigits int
}
```

Mỗi job bao gồm `id` để phân biệt và một `randomno` là số mà chúng ta cần phải tính tổng các chữ số của nó.

Result bao gồm `job` cho biết kết quả là của job nào và `sumofdigits` là tổng của các chữ số sau khi tính toán.

Tiếp theo, tạo ra hai buffer channel để nhận job và gửi result.

```go
var jobs = make(chan Job, 10)  
var results = make(chan Result, 10)  
```

Các goroutine trong worker pool sẽ lắng nghe channel `jobs` để nhận job. Khi hoàn thành job thì kết quả sẽ được gửi về channel `results`.

Hàm `digits` bên dưới làm công việc tìm tổng các chữ số và trả về kết quả. Sleep 2 giây là để mô phỏng hàm này cần một thời gian để thực thi.

```go
func digits(number int) int {  
    sum := 0
    no := number
    for no != 0 {
        digit := no % 10
        sum += digit
        no /= 10
    }
    time.Sleep(2 * time.Second)
    return sum
}
```

Tiếp theo, chúng ta sẽ khai báo một hàm để tạo một goroutine `worker`

```go
func worker(wg *sync.WaitGroup) {  
    for job := range jobs {
        output := Result{job, digits(job.randomno)}
        results <- output
    }
    wg.Done()
}
```

Hàm ở trên tạo ra một worker nhận dữ liệu từ channel `jobs`, tạo một struct `Ressult` với job hiện tại và kết quả của hàm `digits`, sau đó gửi struct này vào channel `results`. Hàm này nhận vào một tham số là một WaitGroup `wg` và chúng ta sẽ gọi `wg.Done()` khi hoàn thành job.

Hàm `createWorkerPool` sẽ tạo ra số lượng goroutine `worker` cần thiết.

```go
func createWorkerPool(noOfWorkers int) {  
    var wg sync.WaitGroup
    for i := 0; i < noOfWorkers; i++ {
        wg.Add(1)
        go worker(&wg)
    }
    wg.Wait()
    close(results)
}
```

Hàm trên nhận vào một tham số là số lượng goroutine `worker` cần tạo ra, nó gọi method `wg.Add(1)` trước khi tạo goroutine để tăng counter của WaitGroup lên. Sau đó nó tạo ra các goroutine `worker`, lưu ý là con trỏ của WaitGroup `wg` được truyền vào hàm `worker`. Sau khi tạo xong các goroutine cần thiết, hàm này sẽ đợi cho đến khi tất cả các goroutine hoàn thành bằng cách gọi `wg.Wait()`. Sau khi tất cả các goroutine hoàn thành, hàm này cũng đóng channel `results` vì tất cả các goroutine đều hoàn thành hết job của mình rồi và không còn kết quả nào được gửi vào channel này nữa.


Bây giờ chúng ta đã có một worker pool, hãy tiếp tục viết một hàm để cấp phát job cho các worker.

```go
func allocate(noOfJobs int) {  
    for i := 0; i < noOfJobs; i++ {
        randomno := rand.Intn(999)
        job := Job{i, randomno}
        jobs <- job
    }
    close(jobs)
}
```

Hàm `allocate` nhận vào tham số là số lượng job `noOfJobs`, sau đó lặp qua `noOfJobs` lần. Mỗi lần lặp, nó sẽ tạo ra một số ngẫu nhiên cần tính tổng các chữ số với `rand.Intn(999)`, sau đó tạo mới một job với số vừa mới tạo ra và `id` là index `i` của vòng lặp rồi gửi job đó vào channel `jobs`. Sau khi tất cả các job được gửi vào channel thì hàm sẽ đóng channel `jobs` lại.

Tiếp theo chúng ta sẽ viết hàm đọc kết quả từ channel `results` và in ra kết quả.

```go
func result(done chan bool) {  
    for result := range results {
        fmt.Printf("Job id %d, input random no %d , sum of digits %d\n", result.job.id, result.job.randomno, result.sumofdigits)
    }
    done <- true
}
```

Hàm `result` đọc từ channel `results` và in ra id của job, số ngẫu nhiên cần tính toán và tổng các chữ số của số đó. Hàm này cũng nhận vào một channel `done`, channel này sẽ được gửi dữ liệu một lần khi tất cả kết quả được in ra hết.

Chúng ta đã có mọi thứ cần thiết, bây giờ hãy gọi những hàm trên ở trong hàm `main`.

```go
func main() {  
    startTime := time.Now()
    noOfJobs := 100
    go allocate(noOfJobs)
    done := make(chan bool)
    go result(done)
    noOfWorkers := 10
    createWorkerPool(noOfWorkers)
    <-done
    endTime := time.Now()
    diff := endTime.Sub(startTime)
    fmt.Println("total time taken ", diff.Seconds(), "seconds")
}
```

Chúng ta lưu lại thời gian `startTime` lúc bắt đầu, và `endTime` lúc kết thúc chương trình để tính toán tổng thời gian mà chương trình đã chạy. Chúng ta sẽ xem thời gian thực thi thay đổi như thế nào khi số lượng gorouitne (`noOfWorkers`) thay đổi.

Số lượng job `noOfJobs` là 100, sau đó hàm `allocate` được gọi và thêm job vào channel `jobs`.

Channel `done` được tạo ra và được truyền vào goroutine `result`. Goroutine này in kết quả trả về từ channel `results`, sau khi in hết kết quả thì gửi vào một tín hiệu cho channel `done`.

Cuối cùng một worker pool với 10 goroutine được tạo ra với hàm `createWorkerPool` và hàm `main` sẽ đợi channel `done` trả về dữ liệu báo hiệu tất  cả kết quả đã được in.

Chương trình đầy đủ,

```go
package main

import (  
    "fmt"
    "math/rand"
    "sync"
    "time"
)

type Job struct {  
    id       int
    randomno int
}
type Result struct {  
    job         Job
    sumofdigits int
}

var jobs = make(chan Job, 10)  
var results = make(chan Result, 10)

func digits(number int) int {  
    sum := 0
    no := number
    for no != 0 {
        digit := no % 10
        sum += digit
        no /= 10
    }
    time.Sleep(2 * time.Second)
    return sum
}
func worker(wg *sync.WaitGroup) {  
    for job := range jobs {
        output := Result{job, digits(job.randomno)}
        results <- output
    }
    wg.Done()
}
func createWorkerPool(noOfWorkers int) {  
    var wg sync.WaitGroup
    for i := 0; i < noOfWorkers; i++ {
        wg.Add(1)
        go worker(&wg)
    }
    wg.Wait()
    close(results)
}
func allocate(noOfJobs int) {  
    for i := 0; i < noOfJobs; i++ {
        randomno := rand.Intn(999)
        job := Job{i, randomno}
        jobs <- job
    }
    close(jobs)
}
func result(done chan bool) {  
    for result := range results {
        fmt.Printf("Job id %d, input random no %d , sum of digits %d\n", result.job.id, result.job.randomno, result.sumofdigits)
    }
    done <- true
}
func main() {  
    startTime := time.Now()
    noOfJobs := 100
    go allocate(noOfJobs)
    done := make(chan bool)
    go result(done)
    noOfWorkers := 10
    createWorkerPool(noOfWorkers)
    <-done
    endTime := time.Now()
    diff := endTime.Sub(startTime)
    fmt.Println("total time taken ", diff.Seconds(), "seconds")
}
```

[Chạy trên playground](https://play.golang.org/p/au5islUIbx)

Bạn nên chạy chương trình này trên máy của mình để có được tổng thời gian chính xác hơn.

Kết quả in ra,

```markup
Job id 1, input random no 636, sum of digits 15  
Job id 0, input random no 878, sum of digits 23  
Job id 9, input random no 150, sum of digits 6  
...
total time taken  20.01081009 seconds  
```

Tổng cộng 100 dòng được in ra tương ứng với 100 job. Cuối cùng, tổng thời gian thực thi được in ra là gần 20 giây, kết quả của bạn có thể khác. Lưu ý ở đây là ở mỗi job chúng ta đều sleep 2 giây để mô phỏng đây là một công việc cần thời gian, nếu làm tuần tự thì 100 job sẽ mất 200 giây, nhưng với 10 goroutine làm cùng lúc, chúng ta chỉ mất 20 giây!

Bây giờ hãy tăng `noOfWorkers` lên 20. Kết quả tổng thời gian chạy chỉ còn 10 giây!

```markup
...
total time taken  10.004364685 seconds  
```

Liên kết: 
- Bài tiếp theo - [Select](https://nhannguyendacoder.com/golang/tu-hoc-golang/select)
- Xem thêm các bài viết khác tại [Series Hướng dẫn tự học lập trình Golang](https://nhannguyendacoder.com/page/tu-hoc-golang)
- Nguồn: [https://golangbot.com/buffered-channels-worker-pools](https://golangbot.com/buffered-channels-worker-pools/)
