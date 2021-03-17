---
title: 'Học Angular theo SGK - Phần 1.5: Khởi Động - Triển khai ứng dụng Angular'
description: 'Để triển khai ứng dụng Angular, trước tiên bạn phải biên dịch (compile) ứng dụng sang các file Javascript, CSS và HTML. Sau đó bạn cần đưa phần kết quả biên dịch được lên server để mọi người có thể truy cập được.'
published: true
keywords: angular, angular sgk, hoc angular theo sach giao khoa, angular deployment
categories: angular
date: 2020-10-02
image: assets/images/angular/sgk/guide/start/start-deployment-image.jpg

---
# Học Angular theo SGK - Phần 1.5: Khởi Động - Triển khai ứng dụng Angular

![post-image](assets/images/angular/sgk/guide/start/start-deployment-image.jpg)

Bài viết gốc: https://angular.io/start/start-deployment

Triển khai (deploy) ứng dụng là thực hiện các hành động cần thiết để ứng dụng có thể chạy được trên một môi trường cụ thể. 

Để triển khai ứng dụng Angular, trước tiên bạn phải biên dịch (compile) ứng dụng sang các file Javascript, CSS và HTML. Sau đó bạn cần đưa phần kết quả biên dịch này lên server để mọi người có thể truy cập được.


<div class="alert is-helpful">

Cho dù bạn đi đến đây từ liên kết ở cuối bài trong [phần 1.1](https://nhannguyendacoder.com/blog/angular/sgk/start/index "Try it: A basic app"), hay đã hoàn thành tất cả các phần từ [1.2](https://nhannguyendacoder.com/blog/angular/sgk/start/start-routing "Try it: In-app navigation"), [1.3](https://nhannguyendacoder.com/blog/angular/sgk/start/start-data "Try it: Manage data"), và [1.4](https://nhannguyendacoder.com/blog/angular/sgk/start/start-forms "Try it: Forms for user input") thì bạn đều đang có một ứng dụng có thể deploy theo hướng dẫn của phần này.

</div>

## Chia sẻ ứng dụng của bạn

Các project trên StackBlitz sẽ mặc định được public, cho phép bạn chia sẻ project của mình thông qua url của project. Lưu ý là đây là một cách hay để chia sẻ các ý tưởng hay dự án demo, không phải là cách để triển khai ứng dụng trong thực tế (môi trường production).

1. Trong project của bạn trên StackBlitz, chắc chắn rằng bạn đã fork hoặc save project.

2. Trong phần xem trước, bạn sẽ thấy URL có dạng như sau `https://<Project ID>.stackblitz.io`.

3. Bạn có thể dùng URL này để chia sẻ với mọi người.

4. Khi người khác vào URL bạn chia sẻ thì có thể thấy được ứng dụng của bạn.

## Build ứng dụng trên máy cá nhân

Để build ứng dụng trên máy cá nhân, bạn cần tải source code của project từ StackBlitz về máy bằng cách click vào icon `Download Project`.

![stackblitz-download-btn](assets/images/angular/sgk/guide/start/stackblitz-download-btn.jpg)

Sau khi download source code và giải nén, cài đặt `Node.js` và chạy ứng dụng với Angular CLI.

Trước tiên, tải và cài đặt Nodejs ở [đây](https://nodejs.org/en/download/). Sau đó mở cửa sổ dòng lệnh (terminal), cài đặt Angular CLI với lệnh sau:

```sh
npm install -g @angular/cli
```

Sau khi cài đặt xong thì hệ thống sẽ có thêm một lệnh mới là `ng`. Bạn có thể dùng lệnh này để tạo workspace (một workspace có thể chứa nhiều project), project, chạy ứng dụng trên máy cá nhân, hoặc build (compile, biên dịch) ứng dụng để triển khai lên server.

Tiếp theo, tạo một workspace với lệnh [`ng new`](https://angular.io/cli/new "CLI ng new command reference"):

```sh
ng new my-project-name
```

Khi tạo mới workspace như trên thì Angular CLI sẽ tự động tạo một project mặc định cho bạn. Trong project vừa mới được tạo, replace thư mục `/src` và file `package.json` với thư mục và file cùng tên trong project mà bạn đã download từ StackBlitz. 

Trong terminal, di chuyển vào thư mục gốc của workspace vừa mới được tạo ra. 

Cài đặt các thư viện cần thiết bằng lệnh:

```sh
npm install
```

Bắt đầu build với lệnh sau:

```sh
ng build --prod
```

Quá trình build sẽ tạo ra các file mà bạn cần cho quá trình deploy.

#### Deploy project của bạn

Các file trong thư mục `dist/my-project-name` chính là những file được tạo ra trong quá trình build. Đây cũng chính là những file mà bạn cần triển khai lên hosting.

*Hosting (Firebase hosting hay server của bạn) là nơi lưu trữ mã nguồn ứng dụng để mọi người có thể xem được ứng dụng của bạn trên Internet.*

### Deploy ứng dụng Angular lên Firebase

Đây là cách dễ dàng nhất để đưa ứng dụng của bạn lên Internet.

*Lưu ý khi thực hiện các bước sau các bạn phải ở trong thư mục gốc của workspace trên terminal.*

1. Đăng ký một tài khoản tại [Firebase](https://firebase.google.com/ "Firebase web site").

2. Tạo một project mới với tên mà bạn muốn.

3. Thêm package `@angular/fire` vào project bằng lệnh `ng add @angular/fire`.

4. Cài đặt Firebase CLI bằng lệnh sau: `npm install -g firebase-tools`. 

    *Nếu có lỗi xảy ra, bạn có thể chạy lệnh thay thế là `sudo npm install -g firebase-tools`, lưu ý là sau đó bạn cần phải nhập mật khẩu của máy tính.*

5. Loging vào Firebase trên Firebase CLI bằng lệnh `firebase login`

6.  Kết nối project với tài khoản Firebase của bạn bằng lệnh `firebase init`. Làm theo hướng dẫn, Firebase sẽ hỏi bạn một số câu hỏi:
    - Chọn tùy chọn `Hosting` cho câu hỏi đầu tiên.
    - Sau đó chọn project mà bạn đã tạo ở bước trước đó.
    - Chọn thư mục public là `dist/my-project-name`, các file trong thư mục này sẽ được deploy lên Firebase hosting.

7. Tiến hành deploy với lệnh `ng deploy`.

8. Sau khi deploy hoàn thành, vào địa chỉ có dạng https://your-firebase-project-name.firebaseapp.com để xem ứng dụng của bạn!

### Triển khai ứng dụng Angular lên những nơi khác

Để triển khai ứng dụng Angular lên một host bất kỳ, bạn chỉ cần đưa những file được compile lên host đó.

Bởi vì bạn đang xây dựng một ứng dụng single-page nên bạn cần đảm bảo là tất cả các request đến ứng dụng của bạn có URL không hợp lệ đều trỏ về file `index.html`.

Bạn có thể xem thêm về quá trình phát triển và deploy ứng dụng ở [đây](https://angular.io/guide/build "Building and Serving Angular Apps") và ở [đây](https://angular.io/guide/deployment "Deployment guide").

## Tham gia cộng đồng Angular

Bạn có thể tạo một tweet để chi sẻ cảm nhận của mình về Angualr lên Twitter bằng cách click vào [đây](https://twitter.com/intent/tweet?url=https://angular.io/start&text=I%20just%20finished%20the%20Angular%20Getting%20Started%20Tutorial "Angular on Twitter"), hoặc tạo một issue để góp ý cho angular ở [đây](https://github.com/angular/angular/issues/new/choose "Angular GitHub repository new issue form").

Angular cung cấp rất nhiều tính năng hữu ích khác, và bây giờ bạn đã có một nền tảng đủ để xây dựng một ứng dụng với Angular và khám phá các tính năng khác như:

* Tạo ứng dụng mobile, animation, hỗ trợ đa ngôn ngữ, render ở server-side để tối ưu hóa công cụ tìm kiếm,...
* [Angular Material](https://material.angular.io/ "Angular Material web site") là thư viện về giao diện, cung cấp sẵn các thành phần giao diện theo phong cách Material Design.
* [Angular Protractor](https://protractor.angular.io/ "Angular Protractor web site") là một công cụ hữu ích để test các ứng dụng Angular.
* Angular cũng có rất nhiều [thư viện và công cụ hữu ích khác](https://angular.io/resources "Angular resources list").

Cập nhật các thông tin mới nhất bằng các theo dõi [blog của Angular](https://blog.angular.io/ "Angular blog").