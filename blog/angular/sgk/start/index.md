---
title: 'Học Angular theo SGK - Phần 1.1: Khởi Động - Tìm hiểu một ứng dụng Angular đơn giản'
description: 'Tìm hiểu các thành phần cơ bản của Angular thông qua một ứng dụng Angular đơn giản.'
published: true
keywords: 'angular, angular sgk, hoc angular theo sach giao khoa'
categories: angular
date: '2020-09-07'
image: 'assets/images/angular/sgk/guide/start/index-image.jpg'

---
# Học Angular theo SGK - Phần 1.1: Khởi Động - Tìm hiểu một ứng dụng Angular đơn giản

![post-image](assets/images/angular/sgk/guide/start/index-image.jpg)

Bài viết gốc: https://angular.io/start

Bài viết này sẽ giới thiệu cho các bạn các thành phần cơ bản của Angular thông qua ví dụ về trang web bán hàng đơn giản, gồm có danh mục sản phẩm, giỏ hàng, và form thanh toán. Bạn có thể bắt đầu theo dõi hướng dẫn này ngay bây giờ mà không cần phải [cài đặt môi trường trên máy cá nhân](https://nhannguyendacoder.com/blog/angular/sgk/guide/setup-local "Setup guide").


<div class="callout is-helpful">
<header>Bạn mới tìm hiểu về lập trình web?</header>

Hãy tìm hiểu thêm về [HTML](https://developer.mozilla.org/en-US/docs/Learn/HTML "Learning HTML: Guides and tutorials") và [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript "JavaScript"). Xem phần hướng dẫn TypeScript trong 5 phút tại [đây](https://www.typescriptlang.org/docs/home.html "TypeScript documentation"). Bạn cũng có thể học các khóa học trình web căn bản trên các nền tảng học trực tuyến như [Udemy](http://www.udemy.com "Udemy online courses") hay [Codecademy](https://www.codecademy.com/ "Codecademy online courses").

</div>


## Tạo project

Trước tiên bạn hãy click vào [đây](https://angular.io/generated/live-examples/getting-started-v0/stackblitz.html) để tạo một ứng dụng mẫu trên StackBlitz. Ứng dụng này sẽ có một số phần code được viết sẵn, đây cũng là phần khung sườn mà chúng ta sẽ tiếp tục phát triển thêm trên đó.

<div class="lightbox">
  <img src="assets/images/angular/sgk/guide/start/new-app-all.gif" alt="Starter online store app">
</div>

- Phần xem trước bên phải hiển thị giao diện (UI) ban đầu của ứng dụng, bao gồm thanh menu ở bên trên (chứa tên của cửa hàng và icon thanh toán) và tiêu đề của phần danh sách sản phẩm (dữ liệu danh sách sản phẩm sẽ được cập nhật trong phần sau của bài viết).
- Phần bên trái hiển thị phần mã nguồn của ứng dụng, bao gồm các tập tin chứ mã và các tập tin chứa các thiết lập. Khi click vào một file bất kỳ, nội dung của tập tin được chọn sẽ hiển thị trong phần soạn thảo ở giữa màn hình.

Phần tiếp theo chúng ta sẽ cập nhật template (HTML và một số cú pháp mở rộng) cho phần danh sách sản phẩm với dữ liệu được cung cấp sẵn. Thông qua đó bạn sẽ thấy được việc thay đổi và cập nhật cho ứng dụng khá là dễ dàng.


<div class="callout is-helpful">
<header>Mẹo hay cho StackBlitz</header>

- Khi đăng nhập vào StackBlitz bạn có thể lưu lại dự án của mình để chỉnh sửa sau này. Bạn có thể đăng nhập bằng tài khoản Github. Bạn có thể clone một dự án của người khác về tài khoản của mình để thử nghiệm bằng cách click vào nút **Fork** ở phía trên bên trái màn hình. Để lưu lại các thay đổi, sử dụng phím tắt `control` + `s` (hoặc `command` + `s` trên Mac) .
- Giao diện của ứng dụng không cập nhật như bạn muốn, lưu lại thay đổi và click nút refresh trên màn hình xem trước.
- StackBlitz đang cập nhật liên tục, phần mã được tạo ra cho bạn có thể sẽ khác một chút, nhưng nó sẽ vẫn hoạt động đúng như mô tả.
- Khi tạo ứng dụng theo hướng dẫn ở trên, StackBlitz tạo sẵn các file cần thiết và tạo dữ liệu mẫu sẵn cho bạn.

</div>


<div class="alert is-important">

*Nếu bạn vào trực tiếp [trang chủ của StackBlitz](https://stackblitz.com/) và [tạo một ứng dụng Angular](https://stackblitz.com/fork/angular), bạn sẽ nhận được một ứng dụng khác với ứng dụng được tạo khi bạn làm theo hướng dẫn trong bài này.*

*Trong thực tế, chúng ta thường sử dụng [Angular CLI](https://angular.io/guide/glossary#command-line-interface-cli), một ứng dụng dòng lệnh (command-line) mạnh mẽ, giúp tạo và cập nhật các ứng dụng dễ dàng hơn. Các bạn có thể xem hướng dẫn từng bước cách dùng Angular CLI để tạo một project hoàn chỉnh ở [đây](https://angular.io/tutorial)*

</div>


## Cú pháp template

Phần template của Angular chính là phần code HTML. Ngoài các cú pháp HTML, ở phần template của Angular có hỗ trợ thêm một số cú pháp mở rộng khác. Trong phần này chúng ta sẽ tìm hiểu về cú pháp template bằng cách cập nhật phần danh sách sản phẩm của ứng dụng ban đầu.


<div class="alert is-helpful">

Để giúp bạn dễ dàng theo dõi, các bước sau chúng ta sẽ dùng dữ liệu các sản phẩm trong file `products.ts` và các methods trong file `product-list.component.ts` (2 file này được tự động tạo sẵn ở bước đầu tiên).

</div>


1. Trong thư mục `product-list`, mở file template `product-list.component.html`

2. Thay đổi template để hiển thị danh sách tên sản phẩm.

  a. Danh sách sản phẩm được khai báo sẵn trong mảng `products` của component `ProductListComponent`. Mỗi sản phẩm trong danh sách sẽ có cách hiển thị giống nhau. Để lặp qua mảng danh sách các sản phẩm ngoài template, chúng ta sẽ dùng directive `*ngFor` cho thẻ `<div>` như sau: 

  ```html
  <!--src/app/product-list/product-list.component.html-->

  <h2>Products</h2>

  <div *ngFor="let product of products">
  </div>
  ```

  Với `*ngFor`, chúng ta sẽ tạo ra một thẻ `<div>` cho mỗi sản phẩm trong danh sách.

  <div class="alert is-helpful">

  `*ngFor` được gọi là "structural directive". Structural directive là directive có thể thay đổi cấu trúc của DOM bằng cách thêm, xóa hay thay đổi các phần tử mà nó được gắn vào. Các structure directive sẽ có dấu `*` ở phía trước.

  </div>

  b. Để hiển thị tên của các sản phẩm, chúng ta sẽ dùng cú pháp **interpolation** `{{}}`. Interpolation sẽ tạo một giá trị theo kiểu chuỗi (string) và hiển thị nó lên trên giao diện. Bên trong thẻ `<div>`, thêm một thẻ `<h3>` để hiển thị tên của sản phẩm bằng cú pháp interpolation như sau:

  ```html
  <!--src/app/product-list/product-list.component.html-->

  <h2>Products</h2>

  <div *ngFor="let product of products">

  <h3>
    {{ product.name }}
  </h3>

  </div>
  ```

  Phần xem trước trên Stackblitz sẽ ngay lập tức cập nhật, hiển thị thêm tên của các sản phẩm.

  <div class="lightbox">
    <img src="assets/images/angular/sgk/guide/start/template-syntax-product-names.png" alt="Product names added to list">
  </div>

3. Tiếp theo chúng ta sẽ hiển chi tiết cho từng sản phẩm. Thêm thẻ `<a>` có thuộc tính `title` là tên sản phẩm bằng **property binding** `[ ]` như sau:

  ```html
  <!--src/app/product-list/product-list.component.html-->

  <h2>Products</h2>

  <div *ngFor="let product of products">

    <h3>
      <a [title]="product.name + ' details'">
        {{ product.name }}
      </a>
    </h3>

  </div>
  ```

  Trong phần xem trước, giữ con trỏ chuột ở trên tên sản phẩm bạn sẽ thấy hiện lên chuỗi `[Tên sản phẩm] + "detail"`. Như vậy, **interpolation** `{{}}` cho phép bạn render giá trị dưới dạng chuỗi; **property binding** `[]` cho phép bạn sử dụng các giá trị trong các biểu thức ở ngoài template như thiết lập giá trị cho thuộc tính `title` của thẻ `<a>` ở trên.

  <div class="lightbox">
    <img src="assets/images/angular/sgk/guide/start/template-syntax-product-anchor.png" alt="Product name anchor text is product name property">
  </div>


4. Tiếp theo chúng ta sẽ thêm phần mô tả cho sản phẩm trong thẻ `<p>`. Vì chúng ta dùng directive `*ngIf` nên Angular chỉ tạo ra thẻ `<p>` khi và chỉ khi sản phẩm có phần mô tả.

  ```html
  <!--src/app/product-list/product-list.component.html-->

  <h2>Products</h2>

  <div *ngFor="let product of products">

    <h3>
      <a [title]="product.name + ' details'">
        {{ product.name }}
      </a>
    </h3>

    <p *ngIf="product.description">
      Description: {{ product.description }}
    </p>

  </div>
  ```

  Hiện tại ứng dụng đã có thể hiển thị tên và mô tả của từng sản phẩm trong danh sách. Lưu ý là sản phẩm cuối cùng không có phần mô tả. Lý do là thuộc tính `description` của sản phẩm đó đang empty, vì vậy Angular không tạo ra thẻ `<p>` cho phần mô tả.

  <div class="lightbox">
    <img src="assets/images/angular/sgk/guide/start/template-syntax-product-description.png" alt="Product descriptions added to list">
  </div>

5. Chúng ta sẽ thêm một nút Share để người dùng có thể chia sẻ sản phẩm cho bạn bè của họ. Tiếp theo chúng ta cần khai báo rằng khi có sự kiện (event) người dùng click vào nút này thì ứng dụng sẽ gọi hàm `share()` (hàm này được khai báo sẵn trong file `product-list.component.ts`), việc khai báo thực hiện action nào đó khi một event xảy ra như vậy gọi là **event binding**. Khi khai báo event binding thì chúng ta dùng hai dấu ngoặc tròn `( )` để bao quanh tên của event như trong của đoạn code sau:

  ```html
  <!--src/app/product-list/product-list.component.html-->

  <h2>Products</h2>

  <div *ngFor="let product of products">

    <h3>
      <a [title]="product.name + ' details'">
        {{ product.name }}
      </a>
    </h3>

    <p *ngIf="product.description">
      Description: {{ product.description }}
    </p>

    <button (click)="share()">
      Share
    </button>

  </div>
  ```

  Bây giờ mỗi sản phẩm đã có một nút Share như sau:

  <div class="lightbox">
    <img src="assets/images/angular/sgk/guide/start/template-syntax-product-share-button.png" alt="Share button added for each product">
  </div>

  Và kết quả sau khi click vào nút Share:

  <div class="lightbox">
    <img src="assets/images/angular/sgk/guide/start/template-syntax-product-share-alert.png" alt="Alert box indicating product has been shared">
  </div>

Cho tới thời điểm hiện tại ứng dụng của chúng ta đã có tính năng hiển thị danh sách sản phẩm và tính năng chia sẻ. Trong quá trình làm thì bạn đã tìm hiểu qua năm cú pháp template phổ biến của Angular:
- `*ngFor`
- `*ngIf`
- Interpolation `{{ }}`
- Property binding `[ ]`
- Event binding `( )`


<div class="alert is-helpful">

Bạn có thể xem phần giới thiệu đầy đủ hơn về cú pháp template của Angular ở [đây](https://angular.io/guide/architecture-components#template-syntax "Template Syntax").

</div>


## Component

Các component là nơi tạo ra các thành phần giao diện và xử lý các thao tác của người dùng (click, input, drag,...) trên giao diện đó, các component có thể được tái sử dụng ở nhiều nơi khác nhau. Ví dụ chúng ta đã làm việc với `ProductListComponent`.

Một component bao gồm 3 phần:
- Component class để quản lý data và các method cần thiết. Ở phần trước, class `ProductListComponent` có method `share()` và quản lý danh sách các sản phẩm.
- Phần code HTML. Đây là phần định hình nên giao diện của component. Ở phần trước, file `product-list.component.html` chịu trách nhiệm hiển thị tên, mô tả và nút Share cho mỗi sản phẩm.
- Các style (CSS, SCSS,...) để định dạng cho giao diện. Phần trước chúng ta chưa làm việc với style.

Một ứng dụng Angular bao gồm nhiều component khác nhau, được tổ chức theo nhiều cấp như dạng hình cây, mỗi component có một mục đích và nhiêm vụ riêng.

Hiệm tại thì ứng dụng mẫu của chúng ta có 3 component:

  <div class="lightbox">
    <img src="assets/images/angular/sgk/guide/start/app-components.png" alt="Online store with three components">
  </div>

- app-root (phần có viền cam) là phần vỏ của ứng dụng. Đây là component đầu tiên được khởi tạo và là component cha của tất cả các component còn lại.
- app-top-bar (phần có màu nền xanh dương) là nơi chứa tên cửa hàng và nút thanh toán.
- app-product-list (phần có viền và nền màu tím) là phần danh sách sản phẩm mà chúng ta đã cùng chỉnh sửa ở phần trước.

Trong phần tiếp theo chúng ta sẽ tìm hiểu các tính năng khác thông qua việc thêm một component mới - `ProductAlertsComponent` - là con của `ProductListComponent`.


<div class="alert is-helpful">

Bạn có thể tìm thấy nhiều thông tin hơn về component và cách nó tương tác với template ở [đây](https://angular.io/guide/architecture-components "Concepts > Introduction to Components and Templates").

</div>


## Input

Hiện tại, danh sách sản phẩm hiển thị tên và phần mô tả của từng sản phẩm. `ProductListComponent` cũng khai báo thuộc tính `products` để chứa thông tin của các sản phẩm được import từ file `products.ts`

Bước tiếp theo là tạo ra một component để hiển thị thông báo, component này sẽ nhận vào tham số là một object của sản phẩm và kiểm tra giá, nếu sản phẩm có giá lớn hơn $700 thì sẽ hiển thị nut "Notify Me" cho phép người dùng đăng ký nhận thông báo khi sản phẩm giảm giá.

1. Tạo một component mới là `ProductAlertsComponent`.

  a. Click chuột phải vào thư mục `app` và dùng **Angular Generator** để tạo một component mới tên là `product-alerts`

  <div class="lightbox">
    <img src="assets/images/angular/sgk/guide/start/generate-component.png" alt="StackBlitz command to generate component">
  </div>

  StackBlitz sẽ tạo ra các file tương ứng với ba phần của một component:
  - product-alerts.component.ts
  - product-alerts.component.html
  - product-alerts.component.css

2. Mở file `product-alerts.component.ts`.

  ```typescript
  // src/app/product-alerts/product-alerts.component.ts 

  import { Component, OnInit } from '@angular/core';

  @Component({
    selector: 'app-product-alerts',
    templateUrl: './product-alerts.component.html',
    styleUrls: ['./product-alerts.component.css']
  })
  export class ProductAlertsComponent implements OnInit {
    constructor() { }

    ngOnInit() {
    }

  }
  ```

  a. Chúng ta có decorator `@Component()` để thông báo cho Angular biết là class theo sau decorator này là một component. Nó cung cấp các metadata của component như `selector`, `template` và `style`.

    - Selector là định danh của component, đó là tên mà bạn đặt cho component khi ứng dụng được render thành HTML. Theo qui ước, selector của component bắt đầu với `app-`, theo sau là tên của component đó.
    - Các file template và file style chính là file HTML và CSS được tạo ra bởi StackBlitz.

  b. Phần khai báo component cũng **export** một class là `ProductAlertsComponent`, đây là class xử lý logic của component.

3. Tiếp theo, thiết lập để component `ProductAlertsComponent` nhận một tham số là một object sản phẩm:

  a. Import `Input` từ @angular/core.

  ```typescript
  // src/app/product-alerts/product-alerts.component.ts

  import { Component, OnInit } from '@angular/core';
  import { Input } from '@angular/core';
  ```

  b. Trong class `ProductAlertsComponent`, khai báo một property là `product` có decorator là `@Input()`. Decorator `@Input()` cho biết giá trị của property `product` sẽ được truyền vào từ component cha, chính là `ProductListComponent`.

  ```typescript
  // src/app/product-alerts/product-alerts.component.ts

  export class ProductAlertsComponent implements OnInit {
    @Input() product;
    constructor() { }

    ngOnInit() {
    }

  }
  ```

4. Khai báo phần giao diện cho component `ProductAlertsComponent`.

  a. Mở file template `product-alerts.component.html` xóa nội dung mặc định được tạo sẵn, thay thế bằng nút "Notify Me" sẽ xuất hiện nếu giá của sản phẩm cao hơn $700

  ```html
  <!--src/app/product-alerts/product-alerts.component.html-->

  <p *ngIf="product.price > 700">
    <button>Notify Me</button>
  </p>
  ```

5. Hiển thị component `ProductAlertsComponent` như là con của component `ProductListComponent`.
  - Mở file `product-list.component.html`.
  - Để thêm một component con vào template chúng ta sẽ sử dụng **selector** của nó, ở đây là `app-product-alerts`.
  - Sử dụng **property binding** để truyền object sản phẩm vào component con.

  ```html
  <!--src/app/product-list/product-list.component.html-->

  <button (click)="share()">
    Share
  </button>

  <app-product-alerts
    [product]="product">
  </app-product-alerts>
  ```

  Component `ProductAlertsComponent` nhận vào một object của sản phẩm từ component `ProductListComponent`. Từ object được truyền vào, nó sẽ hiển thị hay ẩn nút "Notify Me" dựa vào giá của sản phẩm. Sản phẩm `Phone XL` có giá cao hơn $700 nên nút "Notify Me" sẽ xuất hiện cho sản phẩm này.

  <div class="lightbox">
    <img src="assets/images/angular/sgk/guide/start/product-alert-button.png" alt="Product alert button added to products over $700">
  </div>


  <div class="alert is-helpful">

  Xem thêm về [cách tương tác giữa các component](https://angular.io/guide/component-interaction "Components & Templates > Component Interaction") để tìm hiểu thêm về cách component cha truyền dữ liệu cho các component con, cách các component con xác định sự thay đổi của dữ liệu được truyền vào và có các hành động phù hợp.

  </div>

## Output

Để button "Notify Me" có thể hoạt động, bạn cần thiết lập hai thứ:
- Component `ProductAlertsComponent` sẽ phát ra (emit) một event khi người dùng click vào nút "Notify Me".
- Component `ProductListComponent` sẽ lắng nghe và thực thi hành động tương ứng mỗi khi có event đó xảy ra.

1. Mở file `product-alerts.component.ts`.

2. Import `Output` và `EventEmitter` từ `@angular/core`:

  ```typescript
  // src/app/product-alerts/product-alerts.component.ts 

  import { Component } from '@angular/core';
  import { Input } from '@angular/core';
  import { Output, EventEmitter } from '@angular/core';
  ```

3. Trong class `ProductAlertsComponent`, khởi tạo thuộc tính `notify` kiểu `EventEmitter`, có decorator là `@Output()`. Thuộc tính này sẽ chịu trách nhiệm bắn ra một event khi có người click vào nút "Notify Me", component cha của nó là `ProductListComponent` có thể lắng nghe event này và có hành động xử lý thích hợp.

  <div class="alert is-helpful">

  Khi Angular CLI tạo ra một component mới, có khai báo sẵn một empty `constructor`, khai báo implement interface `OnInit` với method rỗng là `ngOnInit()`. Để ngắn gọn thì chúng ta sẽ không đề cập đến chúng ở đây.

  </div>

  ```typescript
  // src/app/product-alerts/product-alerts.component.ts

  export class ProductAlertsComponent {
    @Input() product;
    @Output() notify = new EventEmitter();
  }
  ```

4. Trong template của `ProductAlertsComponent`, file `product-alerts.component.html`, khai báo **event binding** cho nút "Notify Me" để gọi method `notify.emit()` khi có người click vào nút này.

  ```html
  <!--src/app/product-alerts/product-alerts.component.html-->

  <p *ngIf="product.price > 700">
    <button (click)="notify.emit()">Notify Me</button>
  </p>
  ```

5. Tiếp theo, khai báo hành động sẽ xảy ra khi user click vào nút "Notify Me". Như đã trình bài thì component cha là `ProductListComponent` sẽ quản lý event phát ra từ component con `ProductAlertsComponent`. Trong file `product-list.component.ts` khai báo một method là `onNotify()` như sau:

  ```typescript
  // src/app/product-list/product-list.component.ts

  export class ProductListComponent {
    products = products;

    share() {
      window.alert('The product has been shared!');
    }

    onNotify() {
      window.alert('You will be notified when the product goes on sale');
    }
  }
  ```

6. Cuối cùng, cập nhật component `ProductListComponent` để nhận lắng nghe event từ component `ProductAlertsComponent`. Trong file `product-list.component.html`, khai báo thực thi hàm `onNotify()` khi `ProductAlertsComponent` phát ra event `notify` (**event binding**).

  ```html
  <!--src/app/product-list/product-list.component.html-->

  <button (click)="share()">
    Share
  </button>

  <app-product-alerts
    [product]="product" 
    (notify)="onNotify()">
  </app-product-alerts>
  ```

7. Kết quả khi click button "Notify Me"

  <div class="lightbox">
    <img src="assets/images/angular/sgk/guide/start/product-alert-notification.png" alt="Product alert notification confirmation dialog">
  </div>


  <div class="alert is-helpful">

  Xem thêm về [cách tương tác giữa các component](https://angular.io/guide/component-interaction "Components & Templates > Component Interaction") để tìm hiểu thêm về cách lắng nghe các event từ component con, truy cập các thuộc tính hay gọi các method của component con từ component cha, và sử dụng service để trao đổi qua lại giữa các component.

  </div>


## Bước tiếp theo

Bạn đã có một ứng dụng đơn giản với danh sách sản phẩm, nút Share và nút "Notify Me". Bạn đã học được một số kiến thức cơ bản của Angular về component và cú pháp template. Bạn cũng học được làm thế nào để component class và component template tương tác với nhau, và làm thế nào để các component giao tiếp với nhau.

Để tiếp tục khám phá Angular, bạn có thể:
* [Tiếp tục tìm hiểu về phần điều hướng trong Angular](https://nhannguyendacoder.com/blog/angular/sgk/start/start-routing "Try it: In-app navigation") và tạo ra một màn hình hiển thị chi tiết của sản phẩm, khi user click vào tên sản phẩm thì ứng dụng sẽ điều hướng tới màn hình chi tiết sản phẩm này.
* [Đi đến phần triển khai ứng dụng](https://nhannguyendacoder.com/blog/angular/sgk/start/start-deployment "Try it: Deployment") để tìm hiểu các phát triển ứng dụng ở môi trường máy cá nhân, hoặc triển khai ứng dụng lên Firebase hay là server của bạn.