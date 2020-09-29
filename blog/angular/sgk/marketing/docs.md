---
title: 'Học Angular theo SGK - Phần 0: Giới thiệu'
description: 'Series hướng dẫn cách sử dụng Angular để phát triển các ứng dụng từ đơn giản đến phức tạp'
published: true
keywords: 'angular, angular sgk, hoc angular theo sach giao khoa'
categories: angular
date: '2020-09-05'
image: 'assets/images/angular/sgk/marketing/docs-image.jpg'
---

<h1 class="no-toc">Học Angular theo SGK - Phần 0: Giới thiệu</h1>

![post-image](assets/images/angular/sgk/marketing/docs-image.jpg)

Bài viết gốc: [https://angular.io/docs](https://angular.io/docs)

Angular là một framework để thiết kế và phát triển các **ứng dụng single-page** một cách hiệu quả.

*Theo [Wikipedia](https://en.wikipedia.org/wiki/Single-page_application), **ứng dụng single-page** (single-page application hay SPA) là một ứng dụng web chỉ có một trang (page), tất các các mã nguồn cần thiết như HTML, CSS, Javascript,... sẽ được tải xuống một lần duy nhất vào lần tải trang đầu tiên. Sau đó, tùy vào dữ liệu trả về từ máy chủ mà trang này sẽ hiển thị giao diện theo như logic đã được lập trình trước (client-side rendering) thay vì phải tải lại toàn bộ trang khi có dữ liệu mới (server-side rendering).*

Mục tiêu của tài liệu này là hướng dẫn các bạn cách sử dụng Angular để phát triển các ứng dụng từ đơn giản đến phức tạp. Các bài hướng dẫn sẽ có kèm theo code mẫu, có thể tải xuống và xem trên máy cá nhân.

<div class="card-container">
  <a href="https://angular.io/guide/setup-local" class="docs-card"
    title="Angular Local Environment Setup">
    <section>Bắt đầu</section>
    <p>Cài đặt môi trường trên máy cá nhân với Angular CLI.</p>
    <p class="card-footer">Cài đặt môi trường trên máy cá nhân</p>
  </a>
  <a href="https://angular.io/guide/architecture" class="docs-card" title="Angular Concepts">
    <section>Khám phá</section>
    <p>Tìm hiểu các khái niệm căn bản về cách thiết kế và kiến trúc của các ứng dụng Angular.</p>
    <p class="card-footer">Giới thiệu các khái niệm trong Angular</p>
  </a>
  <a href="https://nhannguyendacoder.com/blog/angular/sgk/start/index" class="docs-card" title="Try out Angular">
    <section>Khởi động nhanh</section>
    <p>Xem qua một ứng dụng Angular đơn giản mà không cần phải cài đặt bất cứ công cụ gì.</p>
    <p class="card-footer">Thử ngay</p>
  </a>
  <a href="tutorial" class="docs-card" title="Create an app">
    <section>Hello World</section>
    <p>Hướng dẫn cụ thể tạo một ứng dụng Angular đầu tiên.</p>
    <p class="card-footer">Tour of Heroes tutorial</p>
  </a>

</div>

## Yêu cầu
Để theo dõi series này, bạn cần có kiến thức về [HTML](https://developer.mozilla.org/docs/Learn/HTML/Introduction_to_HTML "Learn HTML"), [CSS](https://developer.mozilla.org/docs/Learn/CSS/First_steps "Learn CSS"), [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/A_re-introduction_to_JavaScript "Learn JavaScript"),
và một số [tính năng mới của Javascript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Language_Resources "Latest JavaScript standards"), như [class](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes "ES2015 Classes") và [modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import "ES2015 Modules").
Code mẫu trong tài liệu này sẽ được viết bằng [TypeScript](https://www.typescriptlang.org/ "TypeScript").
Hầu hết code trong ứng dụng Angular có thể được viết bằng Javascript chuẩn mới nhất, sử dụng [type](https://www.typescriptlang.org/docs/handbook/classes.html "TypeScript Types") cho dependency injection và [decorators](https://www.typescriptlang.org/docs/handbook/decorators.html "Decorators") cho metadata.


## Góp ý

Chúng tôi muốn lắng nghe ý kiến của bạn. [Hãy báo cáo các vấn đề mà bạn gặp phải hay góp ý để cải tiến tài liệu của Angular trong tương lai.](https://github.com/angular/angular/issues/new/choose "Angular GitHub repository new issue form")

Hãy đóng góp cho tài liệu này bằng cách [tạo pull request trên Github repository của Angular](https://github.com/angular/angular/pulls "Angular Github pull requests").

Xem thêm [hướng dẫn đóng góp cho Angular](https://github.com/angular/angular/blob/master/CONTRIBUTING.md "Contributing guide") để tìm hiểu chi tiết hơn.

Mục tiêu của cộng đồng Angular hướng tới là trở thành một cộng đồng mà mọi người tôn trọng và giúp đỡ lẫn nhau. 
Vui lòng thao khảo và tuân theo các quy tắc ứng xử [ở đây](https://github.com/angular/code-of-conduct/blob/master/CODE_OF_CONDUCT.md "Contributor code of conduct").
