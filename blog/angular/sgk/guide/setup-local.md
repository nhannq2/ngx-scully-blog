---
title: 'Học Angular theo SGK - Phần 1.6: Khởi Động - Cài đặt môi trường cho Angular trên máy cá nhân'
description: 'Phần này sẽ hướng dẫn bạn cài đặt môi trường cần thiết để có thể lập trình Angular trên máy cá nhân với Angular CLI.'
published: true
keywords: angular, angular sgk, hoc angular theo sach giao khoa, angular setup
categories: angular
date: 2020-10-03
image: assets/images/angular/sgk/guide/setup-local/setup-local-image.jpg

---
# Học Angular theo SGK - Phần 1.6: Khởi Động - Cài đặt môi trường cho Angular trên máy cá nhân

![post-image](assets/images/angular/sgk/guide/setup-local/setup-local-image.jpg)

Bài viết gốc: https://angular.io/guide/setup-local

Phần này sẽ hướng dẫn bạn cài đặt môi trường cần thiết để có thể lập trình Angular trên máy cá nhân với [Angular CLI](https://angular.io/cli "CLI command reference"). Nội dung phần này bao gồm các điều kiện yêu cầu, cài đặt Angular CLI, tạo workspace, tạo ứng dụng và chạy thử ứng dụng trên máy cá nhân.


<div class="callout is-helpful">

Nếu bạn mới tìm hiểu Angular, bạn có thể tìm hiểu các khái niệm căn bản trong Angular một cách nhanh chóng mà không phải cài đặt bất cứ phần mềm nào ở [đây](https://nhannguyendacoder.com/blog/angular/sgk/start/index)

</div>

## Yêu cầu

Để sử dụng framework Angular, bạn cần phải biết các công nghệ sau:

* [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/A_re-introduction_to_JavaScript)
* [HTML](https://developer.mozilla.org/docs/Learn/HTML/Introduction_to_HTML)
* [CSS](https://developer.mozilla.org/docs/Learn/CSS/First_steps)

Kiến thức về [TypeScript](https://www.typescriptlang.org/) có thể hữu ích, nhưng không bắt buộc.

Để cài đặt Angular trên máy cá nhân bạn cần:


* **Node.js**
  
  Angular yêu cầu các phiên bản Node.js được đánh dấu là [current, active LTS, or maintenance LTS](https://nodejs.org/about/releases).

  <div class="alert is-helpful">

  Để biết yêu cần chi tiết về phiên bản của Node.js, bạn có thể xem giá trị của field `engines` trong file [package.json](https://unpkg.com/@angular/cli/package.json).

  </div>

  Xem thêm về việc cài đặt Node.js tại [nodejs.org](http://nodejs.org "Nodejs.org").

  Dùng lệnh `node -v` trên terminal để biết được bạn đang sử dụng Node.js phiên bản nào.

* **npm package manager**

  Angular, Angular CLI, và các ứng dụng Angular phụ thuộc vào [các package trên npm](https://docs.npmjs.com/getting-started/what-is-npm).

  Để tải và cài đặt các package trên npm, bạn cần một phần mềm quản lý package (gọi là npm package manager).

  Phần này sẽ sử dụng [npm client](https://docs.npmjs.com/cli/install) với giao diện dòng lệnh, được cài đặt mặc định cùng với Node.js.

  Để kiểm tra phiên bản npm client bạn đang sử dụng, dùng lệnh `npm -v` trên termial.


## Cài đặt Angular CLI

Angular CLI được dùng để tạo các project, tạo ra code cho các ứng dụng, thư viện, và thực thi nhiều tác vụ khác nhau như test, build hay deploy.

Để cài đặt Angular CLI, mở cửa sổ terminal và chạy lệnh sau:

```bash
npm install -g @angular/cli
```

## Tạo workspace và ứng dụng đầu tiên

Một hay nhiều ứng dụng có thể được phát triển trong cùng một Angular [**workspace**](https://angular.io/guide/glossary#workspace).

Để tạo một một workspace mới có sẵn một ứng dụng trong đó:

1. Chạy lệnh `ng new` với tên là `my-app`:

  ```bash
    ng new my-app
  ```

2. Lệnh `ng new` trên sẽ tạo sẵn cho bạn một ứng dụng và hỏi một số câu hỏi. Bạn chỉ cần ấn Enter để chọn các giá trị mặc định.

Tiếp theo Angular CLI sẽ cài đặt các npm package và các dependency cần thiết. Quá trình này có thể mất một vài phút.

Sau khi hoàn thành thì chúng ta có một workspace với một ứng dụng được tạo sẵn và có thể chạy được.

<div class="alert is-helpful">

Bạn có thể lựa chọn để sử dụng strict mode Angular để có thể viết những đoạn code có chất lượng tốt hơn, dễ bảo trì hơn.
Tìm hiểu thêm về strict mode của Angular ở [đây](https://angular.io/guide/strict-mode).

</div>


## Chạy ứng dụng

Angular CLI có đi kèm một server để có thể build và chạy ứng dụng của bạn trên máy cá nhân (local).

1. Trên terminal, di chuyển vào thư mục của workspace là `my-app`:
  ```bash
  cd my-app
  ```

2. Chạy lệnh sau:

  ```bash
  ng serve --open
  ```

Lệnh `ng serve` sẽ build ứng dụng của bạn ra các file khác nhau, khởi tạo một server để host các file đó, sau đó nó tiếp tục giám sát source code, nếu có thay đổi nào về phía source code thì ứng dụng của bạn sẽ được build lại, cập nhật các thay đổi mới nhất.

Tham số `--open` (viết tắt `-o`) sẽ tự động mở trình duyệt của bạn tại địa chỉ `http://localhost:4200/`.


Nếu quá trình cài đặt và thiết lập thành công, bạn sẽ thấy một trang tương tự như sau:


<div class="lightbox">
  <img src='assets/images/angular/sgk/guide/setup-local/app-works.png' alt="Welcome to my-app!">
</div>


## Tiếp theo

* Tìm hiểu thêm về các khái niệm căn bản, thuật ngữ, kiến trúc và cách thiết kế của các ứng dụng Angular ở [đây](https://angular.io/guide/architecture).

* Xem loạt bài hướng dẫn có tên là [Tour of Heroes](https://angular.io/tutorial), đây là một loạt bài hướng dẫn hoàn chỉnh, chi tiết, hướng dẫn quy trình phát triển một ứng dụng với Angular CLI, cũng như giới thiệu các khái niệm quan trọng của Angular.

* Tìm hiểu thêm về Angular CLI ở [đây](https://angular.io/cli "CLI Overview"). Ngoài việc tạo ra workspace và ứng dụng, bạn có thể dùng Angular CLI để tạo ra các module, component, servcie, directive, pipe,... và thực hiện các tác vụ như build, test, bundling, và deploy.

* Tìm hiểu thêm về các file được tạo ra bởi lệnh `ng new` ở [đây](https://angular.io/guide/file-structure).
