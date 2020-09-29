---
title: 'Học Angular theo SGK - Phần 1.2: Khởi Động - Điều hướng trong ứng dụng Angular'
description: Phần này hướng dẫn các bạn sử dụng phần điều hướng của Angular (router) để giúp người dùng có thể di chuyển qua lại giữa các màn hình trong ứng dụng.
published: true
keywords: angular, angular sgk, hoc angular theo sach giao khoa, angular routing
categories: angular
date: 2020-09-26
image: assets/images/angular/sgk/guide/start/start-routing-image.jpg

---
# Học Angular theo SGK - Phần 1.2: Khởi Động - Điều hướng trong ứng dụng Angular

![post-image](assets/images/angular/sgk/guide/start/start-routing-image.jpg)

Bài viết gốc: https://angular.io/start/start-routing

Sau khi kết thúc [phần 1](https://nhannguyendacoder.com/blog/angular/sgk/start/index "Get started with a basic Angular app") thì ứng dụng bán hàng của chúng ta đã có một danh sách sản phẩm đơn giản.

Cho đến hiện tại thì ứng dụng chỉ có một URL duy nhất, và URL này luôn hiển thị màn hình "My Store" với danh sách sản phẩm.

Phần này sẽ hướng dẫn các bạn sử dụng [phần điều hướng của Angular](https://angular.io/guide/glossary#router "Router definition") (router) để giúp người dùng có thể di chuyển qua lại giữa các màn hình trong ứng dụng. Trong các ứng dụng single-page, tùy thuộc vào việc người dùng đang ở đâu trong ứng dụng mà bạn sẽ hiển thị cho người đó thấy những component và dữ liệu khác nhau, thay vì tải lại các trang mới từ máy chủ.

Phần điều hướng cho phép bạn hiển thị đầy đủ chi tiết của sản phẩm trong các màn hình độc lập, gọi là [view](https://angular.io/guide/glossary#view "View definition"), mỗi màn hình chi tiết của một sản phẩm sẽ có một URL khác nhau. 

*Như đã trình bày ở phần giới thiệu, ứng dụng single-page chỉ có một trang (page) duy nhất, nhưng có thể có nhiều màn hình (view) khác nhau, phần điều hướng trong Angular (router) cho phép chúng ta di chuyển qua lại giữa các màn hình đó.*

Phần điều hướng cho phép chuyển từ màn hình này sang màn hình khác (trong cùng một trang) theo các cách sau:

* Nhập URL trên thanh địa chỉ của trình duyệt để đi đến màn hình tương ứng.
* Click vào các đường link trên một trang để đi đến một màn hình mới.
* Click vào nút đi tới hoặc lui của trình duyệt để điều hướng lùi hay đi tới các địa chỉ URL trong lịch sử duyệt web.

## Đăng ký một route mới 

Phần điều hướng của Angular sử dụng route để định danh và di chuyển giữa các màn hình khác nhau. Trong một ứng dụng có nhiều màn hình thì mỗi màn hình sẽ có một route tương ứng.

Ứng dụng trong bài này đã được thiết lập với phần điều hướng của Angular (`Router`) để điều hướng về component `ProductListComponent`. Phần này sẽ hướng dẫn bạn khai báo một route mới cho màn hình chi tiết sản phẩm.

1. Tạo một component mới để hiển thị chi tiết sản phẩm với tên `product-details`.

    Để tạo một component mới, trong phần danh sách file và thư mục bên trái, click chuột phải vào thư mục `app`, chọn `Angular Generator` và sau đó chọn `Component`.

2. Trong file `app.module.ts`, thêm một route mới cho màn hình chi tiết sản phẩm, với `path` có giá trị là `products/:productId` và `ProductDetailsComponent` là giá trị của `component`.

    ```typescript
    // src/app/app.module.ts

    @NgModule({
        imports: [
            BrowserModule,
            ReactiveFormsModule,
            RouterModule.forRoot([
                { path: '', component: ProductListComponent },
                { path: 'products/:productId', component: ProductDetailsComponent },
            ])
        ],
    ```

    Như các bạn đã thấy, thì route khai báo sự liên kết giữa một hay nhiều đường dẫn URL với một component. Trong ví dụ này, các đường dẫn có dạng `products/:productId` sẽ hiển thị giao diện của màn hình chi tiết sản phẩm (`ProductDetailsComponent`). Tham số `:productId` là một biến số trên đường dẫn này, trong thực tế `:productId` sẽ được thay thế bằng `id` của sản phẩm cụ thể (chính là index của sản phẩm trong mảng `products`).

3. Tiếp theo chúng ta sẽ khai báo trên template để mà người dùng có thể di chuyển qua lại giữa các route đã được khai báo trước. Khi người dùng click vào tên sản phẩm trong danh sách, ứng dụng sẽ hiển thị màn hình chi tiết của sản phẩm đó. 

    a. Mở file `product-list.component.html`.

    b. Cập nhật phần `*ngFor` để lưu index của sản phẩm trong mảng  `products` vào biến `productId` khi lặp qua danh sách sản phẩm (ở đây chúng ta dùng index của sản phẩm như là id của nó).

    c. Thêm `routerLink` vào thẻ `<a>` như bên dưới.

    ```html
    <!--src/app/product-list/product-list.component.html-->

    <div *ngFor="let product of products; index as productId">

        <h3>
            <a 
                [title]="product.name + ' details'" 
                [routerLink]="['/products', productId]"
                >{{ product.name }}</a>
        </h3>
        <!-- . . . -->
    </div>
    ```

    Việc khai báo `routerLink` cho phép phần điều hướng của Angular quản lý các thẻ `<a>` trên template. Trong trường hợp này, route tới màn hình chi tiết sản phẩm có hai phần, phần cố định là `/products`, và phần biến số thay đổi là id của sản phẩm hiện tại. Ví dụ, địa chỉ URL cho sản phẩm có `id` là 1 sẽ trông giống như sau `https://getting-started-myfork.stackblitz.io/products/1`.

4. Kiểm tra lại phần thiết lập điều hướng bằng cách click vào tên của một sản phẩm. Ứng dụng sẽ hiển thị giao diện của component `ProductDetailsComponent`, chỉ có một dòng chữ là "product-details works!"

    Lưu ý là URL của phần xem trước trên Stackblitz sẽ thay đổi mỗi khi bạn click xem chi tiết sản phẩm. Phần cuối URL sẽ có dạng `products/#`, trong đó `#` là `id` của sản phẩm mà bạn click vào.

    <div class="lightbox">
      <img src="assets/images/angular/sgk/guide/start/product-details-works.png" alt="Product details view with updated URL">
    </div>



## Sử dụng thông tin của route

Component `ProductDetailsComponent` xử lý việc hiển thị thông tin chi tiết của từng sản phẩm. Phần điều hướng của Angular sẽ quyết định hiển thị component nào dựa vào URL trên trình duyệt và các route mà bạn khai báo trước đó. Phần này sẽ hướng dẫn bạn dựa vào route để hiển thị đúng thông tin của từng sản phẩm.

1. Mở file `product-details.component.ts`

2. Sử dụng danh sách sản phẩm trong file `products.ts`.

    a. Trước tiên, chúng ta cần import `ActivatedRoute` từ package `@angular/router`, và mảng `products` từ `../products`.

    ```typescript
    // src/app/product-details/product-details.component.ts

    import { Component, OnInit } from '@angular/core';
    import { ActivatedRoute } from '@angular/router';

    import { products } from '../products';
    ```

    b. Khai báo thuộc tính mới tên `product` và khai báo `ActivatedRoute` trong constructor trong class `ProductDetailsComponent`.

    ```typescript
    // src/app/product-details/product-details.component.ts

    export class ProductDetailsComponent implements OnInit {
        product;

        constructor(
            private route: ActivatedRoute,
        ) { }

    }
    ```

    `ActivatedRoute` chứa thông tin về route hiện tại, các tham số (như `:productId`, gọi là parameter), và các dữ liệu khác liên quan tới route.

    Cách khai báo `ActivatedRoute` như trên là cách khai báo để *inject* một *service*. Ở [phần quản lý dữ liệu](https://angular.io/start/start-data "Try it: Managing Data") chúng ta sẽ tìm hiểu chi tiết hơn về service.


3. Trong method `ngOnInit()`, lắng nghe (subscribe) các parameter của route để có `productId` và lấy ra sản phẩm cần hiển thị.

    ```typescript
    // src/app/product-details/product-details.component.ts

    ngOnInit() {
        this.route.paramMap.subscribe(params => {
            this.product = products[+params.get('productId')];
        });
    }
    ```

    Các parameter (hay tham số) của route là các biến số mà bạn khai báo cho một route. Từ một URL cụ thể, Angular có thể lấy được thông tin của các parameter, ví dụ ở đây là `productId`, từ `productId` chúng ta sẽ lấy được thông tin cụ thể của sản phẩm cần hiển thị.

4. Cập nhật template để hiển thị thông tin chi tiết của sản phẩm với `*ngIf`.

    ```html
    <!--src/app/product-details/product-details.component.html-->
    <h2>Product Details</h2>

    <div *ngIf="product">
        <h3>{{ product.name }}</h3>
        <h4>{{ product.price | currency }}</h4>
        <p>{{ product.description }}</p>
    </div>
    ```

Khi người dùng click vào tên của một sản phẩm trong danh sách, phần điều hướng của Angular sẽ đi đến một URL cụ thể, giao diện chuyển từ màn hình danh sách sản phẩm sang màn hình chi tiết sản phẩm với các thông tin liên quan.

<div class="lightbox">
  <img src="assets/images/angular/sgk/guide/start/product-details-routed.png" alt="Product details page with updated URL and full details displayed">
</div>



<div class="alert is-helpful">

Bạn có thể xem thêm về phần điều hướng của Angular ở [đây](https://angular.io/guide/router "Routing & Navigation guide").

</div>


## Các bước tiếp theo

Trong phần này bạn đã sử dụng phần điều hướng của Angular trong ứng dụng của mình.

* Các sản phẩm được liên kết từ màn hình danh sách sản phẩm tới màn hình chi tiết sản phẩm.
* Người dùng có thể click vào tên một sản phẩm trong danh sách để xem thông tin chi tiết ở một màn hình mới, với một URL/route riêng biệt.

Để tiếp tục khám phá Angular, bạn có thể chọn một trong các lựa chọn sau:
* [Tiếp tục đến phần quản lý dữ liệu](https://angular.io/start/start-data "Try it: Managing Data") để thêm chức năng giỏ hàng, dùng một service để quản lý thông tin của giỏ hàng và dùng HTTP để truy xuất thông tin phí giao hàng từ bên ngoài.
* [Đi đến phần triển khai ứng dụng](https://angular.io/start/start-deployment "Try it: Deployment") để tìm hiểu các phát triển ứng dụng ở môi trường máy cá nhân, hoặc triển khai ứng dụng lên Firebase hay là server của bạn.