---
title: Angular Trick - Custom error handler
description: Trong bài này mình sẽ chia sẻ cách tạo một custom error handler trong Angular.
published: true
keywords: angular, error handler, custom error handler, errors
categories: angular
date: 2020-08-21
image: https://nhannguyendacoder.com/assets/images/angular-custom-error-handler/custom-error-handler.png
---

# [Angular Trick] Custom error handler

![Custom error handler trong Angular](../assets/images/angular-custom-error-handler/custom-error-handler.png)

Trong bài này mình sẽ chia sẻ cách tạo một custom error handler trong Angular.

Link demo trên [stackblitz](https://stackblitz.com/edit/angular-implement-custom-error-handler?file=src/app/error-handling.service.ts)

## Use cases

Angular có một default Error Handler để quản lý các lỗi của application trong quá trình sử dụng. Default Error Handler sẽ log thông tin lỗi xuống console bằng `console.error()`. Nhưng trong một số trường hợp, chúng ta cần log thông tin lỗi lên server hay hiển thị thông báo phù hợp cho user và quản lý chúng ở cùng một nơi. Trong trường hợp đó ta có thể viết một Custom Error Handler để thực hiện việc đó.

## Ưu điểm 

- Handle lỗi ở cùng một nơi nên sẽ dễ quản lý hơn
- Code nhìn gọn hơn vì không cần phải handle error ở nhiều nơi (ví dụ phải catch error mỗi lần gọi api để xử lý)

## Nhược điểm

- Trong một số trường hợp sẽ không có đủ thông tin để debug, cần kết hợp với logging để có context rõ hơn trong quá trình debug

## Custom Error Handling Service

Khai báo `ErrorHandlingService` implement `ErrorHandler` interface của Angular.

```typescript
// file: error-handling.service.ts

@Injectable()
export class ErrorHandlingService implements ErrorHandler {
    // pseudo code: inject logging and notification service
    constructor(
        // private loggingService: ILoggingService,
        // private notificationService: INotificationService,
    ){}

    handleError(error) {
        console.info("You are handling errors with ErrorHandlingService");

        // http errors
        if (error instanceof HttpErrorResponse) {
            console.log(error)
            // client side errors
            if (error.error instanceof ProgressEvent) {
                this.handleErrorFunc(
                    {
                        message: "client side error: " + error.message,
                        errorName: error.name,
                        action: `making request to url ${error.url}`
                    },
                    "Cannot connect to server, please try again later."
                );
            } else { // server side errors
                this.handleErrorFunc(
                    {
                        message: "server side error: " + error.message,
                        errorName: error.name,
                        action: `making request to url ${error.url}`
                    },
                    error.message
                );
            }
        } else { // application errors
                this.handleErrorFunc(
                    {
                        message: error.message || "unexpected error",
                        errorName: error.name || "Error",
                        stack: error.stack
                    },
                    error.message || "Unexpected error."
                );
        }
    }

    private handleErrorFunc(errorData: any, notiMessage: string) {
        // pseudo code: log error to server and notify a message to end user
        // this.loggingService.error(errorData)
        // this.notificationService.showError(notiMessage)

        // the code below is for demo purpose only!
        console.error(errorData)
        alert(notiMessage)
    }
}
```

`handleError` chính là hàm mà chúng ta cần implement để xử lý lỗi. Thường khi xảy ra lỗi thì chúng ta sẽ làm 2 việc là: log thông tin lỗi lên server và thông báo tới user. Ở hàm constructor mình có đoạn pseudo code inject logging và notification service, trong thực tế bạn cần inject các servcie của mình vào. Trong bài này, để demo mình sẽ dùng hàm `console.error` thay cho logging service, và hàm `alert` thay cho notification service.

Đầu tiên chúng ta sẽ check các lỗi Http `if (error instanceof HttpErrorResponse)`. Trong đó sẽ có hai nguyên nhân chính là lỗi ở client như no internet connection (`if (error.error instanceof ProgressEvent)`), và lỗi do server trả về như 404, 500 (`else { // server side errors`). 

Ngoài ra, chúng ta còn bắt các lỗi khác của app (`else { // application errors`).

`handleErrorFunc` là một hàm helper để xử lý lỗi (logging và notification).

## Demo

Provide `ErrorHandlingService` như là một `ErrorHandler` trong `AppModule`.

```typescript
// file: app.module.ts
@NgModule({
  imports:      [ BrowserModule, HttpClientModule ], 
  declarations: [ AppComponent ],
  bootstrap:    [ AppComponent ],
  providers: [
    {
      provide: ErrorHandler,
      useClass: ErrorHandlingService
    }
  ]
})
export class AppModule { }
```

Test `ErrorHandlingService` bằng cách quăng các exception khác nhau trong `AppComponent`.

```typescript
// file: app.component.ts
@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  constructor(http: HttpClient) {
    // enable the line below will cause an application error
    // throw new Error("My Error") 

    // enable the line below will cause a client side error
    // http.get('https://not-exist.com').subscribe()
    
    // enable the line below will cause a server side error
    // http.post('https://gorest.co.in/public-api/users/123', {}).subscribe() 
  }
}
```

Cảm ơn các bạn đã theo dõi bài viết, mong nhận được góp ý từ mọi người.

Bài viết này có tham khảo nội dung từ các nguồn sau: 
- https://angular.io/api/core/ErrorHandler



