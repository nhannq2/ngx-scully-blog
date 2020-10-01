---
title: 'Học Angular theo SGK - Phần 1.3: Khởi Động - Quản lý dữ liệu trong ứng dụng Angular'
description: 'Hướng dẫn tạo tính năng giỏ hàng và sử dụng service.'
published: true
keywords: 'angular, angular sgk, hoc angular theo sach giao khoa'
categories: angular
date: 2020-09-30
image: assets/images/angular/sgk/guide/start/start-data-image.jpg
---
# Học Angular theo SGK - Phần 1.3: Khởi Động - Quản lý dữ liệu trong ứng dụng Angular

![post-image](assets/images/angular/sgk/guide/start/start-data-image.jpg)

Bài viết gốc: https://angular.io/start/start-data

Trong phần [Điều hướng trong ứng dụng Angular](https://nhannguyendacoder.com/blog/angular/sgk/start/start-routing "Try it: In-app Navigation"), ứng dụng của chúng ta có hai màn hình: màn hình danh sách sản phẩm và màn hình chi tiết sản phẩm.

Người dùng có thể click vào tên sản phẩm trong danh sách để xem thông tin chi tiết trong màn hình mới với một URL hay route riêng biệt.

Phần này sẽ hướng dẫn bạn tạo tính năng giỏ hàng với 3 giai đoạn:

* Thêm nút "Buy" vào màn hình chi tiết sản phẩm, khi click vào nút này thì sản phẩm được chọn sẽ được thêm vào danh sách sản phẩm được quản lý trong `CartService`.
* Tạo component `CartComponent` để hiển thị danh sách sản phẩm trong giỏ hàng.
* Tạo component `ShippingComponent` để lấy phí giao hàng từng file `.json` bằng `HttpClient`.

## Service

Service là một phần không thể thiếu của các ứng dụng Angular. Trong Angular, service là một object có thể cùng được sử dụng ở nhiều phần khác nhau của ứng dụng với sự trợ giúp của [hệ thống dependency injection trong Angular](https://angular.io/guide/glossary#dependency-injection-di "Dependency injection definition").

Trong Angular, service được dùng để chia sẻ dữ liệu giữa các phần khác nhau của ứng dụng. Trong bài này, `CartService` được dùng để lưu thông tin và các method cần thiết cho giỏ hàng.

## Tạo một service cho giỏ hàng

Cho đến thời điểm hiện tại thì người dùng có thể xem thông tin sản phẩm, chia sẻ sản phẩm và nhận thông báo giảm giá của sản phẩm. Tuy nhiên người dùng chưa thể mua sản phẩm!

Trong phần này chúng ta sẽ thêm nút "Buy" và màn hình chi tiết sản phẩm và tạo một service để lưu thông tin sản phẩm được thêm vào giỏ hàng.

<div class="alert is-helpful">

Trong [phần sau](https://nhannguyendacoder.com/blog/angular/sgk/start/start-forms "Try it: Forms for user input"), bạn sẽ được hướng dẫn để sử dụng `CartService` ở màn hình thanh toán.

</div>

### Khai báo `CartService`

1. Để khai báo `CartService`, click chuột phải vào thư mục `app`, chọn `Angular Generator`, và chọn `Service`. Đặt tên cho service là `cart`.

    ```typescript
    // src/app/cart.service.ts

    import { Injectable } from '@angular/core';

    @Injectable({
        providedIn: 'root'
    })
    export class CartService {

    constructor() {}

    }
    ```

    <div class="alert is-helpful">

    StackBlitz có thể sẽ tự động khai báo service của bạn trong `app.module.ts` mà không dùng `{ providedIn: 'root' }` trong `@Injectable()` như trong đoạn code ở trên (nếu điều đó xảy ra thì bạn cũng không cần phải làm gì thêm cả). Bạn có thể tìm hiểu rõ hơn về service ở [đây](https://angular.io/guide/architecture-services "Concepts > Intro to Services and DI").

    </div>

2. Trong class `CartService`, khai báo một property là `items` để lưu một mảng các sản phẩm đã thêm vào giỏ hàng.

    ```typescript
    // src/app/cart.service.ts

    @Injectable({
        providedIn: 'root'
    })
    export class CartService {
        items = [];
    }
    ```

3. Khai báo các method để: thêm sản phẩm vào giỏ hàng, trả về danh sách sản phẩm có trong giỏ hàng, và xóa tất cả sản phẩm trong giỏ hàng:

    ```typescript
    // src/app/cart.service.ts

    @Injectable({
        providedIn: 'root'
    })
    export class CartService {
        items = [];

        addToCart(product) {
            this.items.push(product);
        }

        getItems() {
            return this.items;
        }

        clearCart() {
            this.items = [];
            return this.items;
        }
    }
    ```

    * Method `addToCart()` thêm một sản phẩm vào mảng `items`.

    * Method `getItems()` trả về danh sách sản phẩm đã thêm vào giỏ hàng.

    * Method `clearCart()` xóa tất cả sản phẩm trong giỏ hàng và trả về một mảng rỗng.

### Sử dụng `CartService`

Bây giờ chúng ta sẽ sử dụng `CartService` để thêm sản phẩm vào giỏ hàng:

1. Mở file `product-details.component.ts`.

2. Thiết lập component để sử dụng `CartService`.

    a. Import `CartService`.

    ```typescript
    // src/app/product-details/product-details.component.ts

    import { Component, OnInit } from '@angular/core';
    import { ActivatedRoute } from '@angular/router';

    import { products } from '../products';
    import { CartService } from '../cart.service';
    ```

    b. Inject `CartService` bằng cách thêm vào `constructor()` như sau:

    ```typescript
    // src/app/product-details/product-details.component.ts

    export class ProductDetailsComponent implements OnInit {
        constructor(
            private route: ActivatedRoute,
            private cartService: CartService
        ) { }
    }
    ```

    Trong Typescript thì đoạn code `constructor(private route: ActivatedRoute,...` là dạng viết tắt để khởi tạo thuộc tính của class. Phần code ở trên tương tự như đoạn code sau:

    ```typescript
    // src/app/product-details/product-details.component.ts

    export class ProductDetailsComponent implements OnInit {
        private route: ActivatedRoute;
        private cartService: CartService;

        constructor(
            route: ActivatedRoute,
            cartService: CartService
        ) { 
            this.route = route;
            this.cartService =  cartService;
        }
    }
    ```
    
    Nếu như bạn theo dõi từ những phần đầu tiên thì bạn có thể để ý được là chúng ta không hề khởi tạo component nào bằng lệnh `new` cả, ví dụ như `new ProductDetailsComponent()`. Angular sẽ đảm nhiệm việc khởi tạo component cho chúng ta, khi khởi tạo component thì Angular sẽ tự động tìm và truyền giá trị cho các tham số có trong `constructor` của component đó, ví dụ như ở đây là `route: ActivatedRoute và cartService: CartService`.

    Việc khai báo ở `constructor` như trên để khi khởi tạo Angular truyền giá trị vào gọi là **inject**, các giá trị được **inject** vào được gọi là các **dependency**. Trong ví dụ trên, chúng ta đã **inject** hai **dependency** vào `ProductDetailsComponent`, đó là `ActivatedRoute` và `CartService`.

    Trong Angular có một hệ thống gọi là **Dependency Injection**, nhiệm vụ của hệ thống này là đăng ký các **dependency** với Angular và cung cấp (**inject**) các **dependency** này đến những nơi cần sử dụng (như trong `ProductDetailsComponent`)

    Trong khi khai báo `CartService` thì đoạn code sau đăng ký service này với hệ thống **Dependency Injection**:

    ```typescript
    // src/app/cart.service.ts

    @Injectable({
        providedIn: 'root'
    })
    ...
    ```

    Còn `ActivatedRoute` là một service được khai báo sẵn của Angular.


3. Khai báo method `addToCart()`, nhiệm vụ của method này là thêm sản phẩm đang xem vào giỏ hàng.

    Method `addToCart()` thực hiện 3 việc sau:
    * Nhận vào một tham số là sản phẩm đang xem.
    * Sử dụng method `addToCart()` trong `CartService` để thêm sản phẩm vào giỏ hàng.
    * Hiển thị một tin nhắn thông báo rằng bạn đã thêm sản phẩm vào giỏ hàng.

    ```typescript
    // src/app/product-details/product-details.component.ts

    export class ProductDetailsComponent implements OnInit {
        addToCart(product) {
            this.cartService.addToCart(product);
            window.alert('Your product has been added to the cart!');
        }
    }
    ```

4. Thêm nút "Buy" vào màn hình chi tiết sản phẩm để thêm sản phẩm vào giỏ hàng.

    a. Mở file `product-details.component.html`.

    b. Thêm nút "Buy", sử dụng event binding để khi sự kiện `click()` xảy ra thì method `addToCart()` sẽ được gọi:

    ```html
    <!--src/app/product-details/product-details.component.html-->

    <h2>Product Details</h2>

    <div *ngIf="product">
        <h3>{{ product.name }}</h3>
        <h4>{{ product.price | currency }}</h4>
        <p>{{ product.description }}</p>

        <button (click)="addToCart(product)">Buy</button>
    </div>
    ```
    
    <div class="alert is-helpful">

    Dòng code `<h4>{{ product.price | currency }}</h4>` sử dụng **pipe** tên là `currency` để chuyển đổi `product.price` từ kiểu số sang kiểu string, thể hiện giá tiền của sản phẩm theo định dạng của tiền tệ. Bạn có thể tìm hiểu chi tiết hơn về **pipe** ở [đây](https://angular.io/guide/pipes "Pipes").

    </div>

5. Để thấy được nút "Buy" mới thêm vào, bạn tải lại ứng dụng và click vào tên sản phẩm để xem chi tiết.

    <div class="lightbox">
      <img src='assets/images/angular/sgk/guide/start/product-details-buy.png' alt="Display details for selected product with a Buy button">
    </div>

    a. Click vào nút "Buy" để thêm sản phẩm vào giỏ hàng và hiển thị thông báo xác nhận.

    <div class="lightbox">
      <img src='assets/images/angular/sgk/guide/start/buy-alert.png' alt="Display details for selected product with a Buy button">
    </div>


## Tạo màn hình hiển thị giỏ hàng

Cho đến bây giờ thì người dùng đã có thể thêm sản phẩm vào giỏ hàng với nút "Buy", nhưng họ vẫn chưa thấy được thông tin giỏ hàng của mình.

Hãy tạo màn hình hiển thị thông tin giỏ hàng qua 2 bước sau:

1. Tạo component `CartComponent` và thiết lập điều hướng (route) tới component này.
2. Hiển thị thông tin chi tiết giỏ hàng.

### Tạo component `CartComponent`

1. Tạo một component tên là `cart`.

    Reminder: click chuột phải vào thư mục `app`, chọn `Angular Generator`, và chọn `Component`.

    ```typescript
    // src/app/cart/cart.component.ts
    import { Component, OnInit } from '@angular/core';

    @Component({
        selector: 'app-cart',
        templateUrl: './cart.component.html',
        styleUrls: ['./cart.component.css']
    })
    export class CartComponent implements OnInit {

        constructor() { }

        ngOnInit() {
        }

    }
    ```

2. Thiết lập route cho component `CartComponent`.

    Mở file `app.module.ts` và thiết lập route cho component `CartComponent` có đường dẫn là `cart`:

    ```typescript 
    // src/app/app.module.ts
    @NgModule({
        imports: [
            BrowserModule,
            ReactiveFormsModule,
            RouterModule.forRoot([
                { path: '', component: ProductListComponent },
                { path: 'products/:productId', component: ProductDetailsComponent },
                { path: 'cart', component: CartComponent }, // <<< HERE
            ])
        ],
    ```

3. Cập nhật nút "Checkout" ở thanh menu trên cùng để nó điều hướng tới url `/cart`.

    Mở file `top-bar.component.html` và thêm `routerLink` với route là `/cart`.

    ```html
    <!--src/app/top-bar/top-bar.component.html-->

    <a routerLink="/cart" class="button fancy-button">
        <i class="material-icons">shopping_cart</i>Checkout
    </a>
    ```

4. Để xem thông tin giỏ hàng, click vào nút "Checkout". Bạn sẽ thấy giao diện mặc định có dòng chữ "cart works!" và url có dạng như sau `https://getting-started.stackblitz.io/cart`, trong đó phần `getting-started.stackblitz.io` có thể khác nhau tùy vào project trên Stackblitz của bạn.

    <div class="lightbox">
      <img src='assets/images/angular/sgk/guide/start/cart-works.png' alt="Display cart view before customizing">
    </div>

### Hiển thị thông tin giỏ hàng

Bạn có thể dùng service để chia sẻ dữ liệu giữa các component khác nhau:

* Component `ProductDetailsComponent` đã sử dụng `CartService` để thêm sản phẩm vào giỏ hàng (sản phẩm trong giỏ hàng được lưu trong mảng `items`).
* Phần này sẽ hướng dẫn bạn cách sử dụng `CartService` như thế nào để hiển thị các sản phẩm trong giỏ hàng trong component `CartComponent`.


1. Mở file `cart.component.ts`.

2. Sử dụng `CartService` trong component `CartComponent`.

    a. Import `CartService` từ file `cart.service.ts`.

    ```typescript
    // src/app/cart/cart.component.ts

    import { Component } from '@angular/core';
    import { CartService } from '../cart.service';
    ```

    b. Inject `CartService` vào component `CartComponent`.

    ```typescript
    // src/app/cart/cart.component.ts

    export class CartComponent {

        constructor(
            private cartService: CartService
        ) { }
    }

    ```

3. Khai báo thuộc tính `items` để lưu danh sách sản phẩm trong giỏ.

    ```typescript
    // src/app/cart/cart.component.ts
    export class CartComponent {
        items;

        constructor(
            private cartService: CartService
        ) { }
    }
    ```

4. Gán `items` bằng kết quả trả về của method `getItems()` trong `CartService`.

    ```typescript
    // src/app/cart/cart.component.ts
    
    export class CartComponent implements OnInit {
        items;

        constructor(
            private cartService: CartService
        ) { }

        ngOnInit() {
            this.items = this.cartService.getItems();
        }
    }
    ```

5. Thêm tiêu đề cho trang giỏ hàng, và dùng `*ngFor` với thẻ `<div>` để hiển thị tên và giá của từng sản phẩm trong giỏ hàng.

    ```html
    <!--src/app/cart/cart.component.html-->

    <h3>Cart</h3>

    <div class="cart-item" *ngFor="let item of items">
        <span>{{ item.name }}</span>
        <span>{{ item.price | currency }}</span>
    </div>
    ```

6. Kiểm tra lại component `CartComponent`.

    a. Click vào "My Store" ở thanh menu trên cùng để đi đến màn hình danh sách sản phẩm.

    b. Click vào tên sản phẩm để hiển thị chi tiết sản phẩm.

    c. Click "Buy" để thêm sản phẩm vào giỏ hàng.

    d. Click nút "Checkout" ở thanh menu trên cùng để xem chi tiết giỏ hàng.

    e. Để thêm một sản phẩm khác, click vào "My Store" để quay lại màn hình danh sách sản phẩm và thêm sản phẩm mới.

    <div class="lightbox">
      <img src='assets/images/angular/sgk/guide/start/cart-page-full.png' alt="Cart view with products added">
    </div>


<div class="alert is-helpful">

StackBlitz tip: Mỗi lần cửa sổ xem trước refresh (khi thay đổi code hay nhấn nút refresh) thì giỏ hàng của bạn sẽ trở nên rỗng, bạn cần thêm sản phẩm lại vào giỏ hàng.

</div>

<div class="alert is-helpful">

Bạn có thể tìm hiểu thêm về service ở  [đây](https://angular.io/guide/architecture-services "Concepts > Intro to Services and DI").

</div>


## Truy xuất phí giao hàng
<!-- Accessing data with the HTTP client -->

Angular cung cấp sẵn `HttpClient` để lấy dữ liệu từ bên ngoài (như lấy dữ liệu từ server, json file,...) và cung cấp dữ liệu lấy được cho ứng dụng của chúng ta dưới dạng **stream**.

*Stream là là một 'dòng chảy' của dữ liệu, dữ liệu có thể được đưa vào 'dòng chảy' này bất cứ lúc nào. Chúng ta có thể lắng nghe từ stream để được thông báo mỗi khi có dữ liệu mới.*

Phần này sẽ hướng dẫn bạn sử dụng `HttpClient` để truy xuất phí giao hàng tử file json.

### Khai báo dữ liệu phí giao hàng

Khi tạo ứng dụng này thì StackBlitz đã khai báo sẵn dữ liệu phí giao hàng trong file `assets/shipping.json`. Chúng ta chỉ cần sử dụng dữ liệu trong file này cho ứng dụng.

```json
// src/assets/shipping.json

[
    {
        "type": "Overnight",
        "price": 25.99
    },
    {
        "type": "2-Day",
        "price": 9.99
    },
    {
        "type": "Postal",
        "price": 2.99
    }
]
```


### Sử dụng `HttpClient` trong `AppModule`

Để có thể sử dụng `HttpClient`, bạn phải import `HttpClientModule` vào ứng dụng vì `HttpClient` được khai báo ở trong module này.

1. Mở file `app.module.ts`.

2. Import `HttpClientModule` từ package `@angular/common/http`. Vì có nhiều import nên ở đây sẽ không hiển thị các import không liên quan. 

    ```typescript
    // src/app/app.module.ts
    // ...
    import { HttpClientModule } from '@angular/common/http';
    ```

3. Thêm `HttpClientModule` vào array `imports` trong decorator `@NgModule()` của `AppModule` để có thể sử dụng `HttpClient` trong toàn ứng dụng.

    ```typescript
    // src/app/app.module.ts

    @NgModule({
        imports: [
            BrowserModule,
            HttpClientModule, // <<< HERE
            ReactiveFormsModule,
            RouterModule.forRoot([
                { path: '', component: ProductListComponent },
                { path: 'products/:productId', component: ProductDetailsComponent },
                { path: 'cart', component: CartComponent },
            ])
        ],
        declarations: [
            AppComponent,
            TopBarComponent,
            ProductListComponent,
            ProductAlertsComponent,
            ProductDetailsComponent,
            CartComponent,
        ],
        bootstrap: [
            AppComponent
        ]
    })
    export class AppModule { }
    ```

### Sử dụng `HttpClient` trong `CartService`

Tiếp theo hãy inject `HttpClient` (đây cũng là một service) vào service `CartService`.


1. Mở file `cart.service.ts`.

2. Import `HttpClient` từ package `@angular/common/http`.

    ```typescript
    // src/app/cart.service.ts

    import { Injectable } from '@angular/core';

    import { HttpClient } from '@angular/common/http';
    ```

3. Inject `HttpClient` vào service `CartService` thông qua constructor:

    ```typescript
    // src/app/cart.service.ts

    @Injectable({
        providedIn: 'root'
    })
    export class CartService {
        items = [];

        constructor(
            private http: HttpClient
        ) {}
    }
    ```


### Khai báo method `getShippingPrices()`

1. Mở file `cart.service.ts`.

2. Bên dưới method `clearCart()`, khai báo một method mới tên là `getShippingPrices()`. Method này sử dụng method `get()` của `HttpClient` để truy xuất phí giao hàng.

    ```typescript
    // src/app/cart.service.ts

    @Injectable({
        providedIn: 'root'
    })
    export class CartService {
        items = [];

        constructor(
            private http: HttpClient
        ) {}

        addToCart(product) {
            this.items.push(product);
        }

        getItems() {
            return this.items;
        }

        clearCart() {
            this.items = [];
            return this.items;
        }

        getShippingPrices() {
            return this.http.get('/assets/shipping.json');
        }
    }
    ```


<div class="alert is-helpful">

Bạn có thể tìm hiểu thêm về `HttpClient` ở [đây](https://angular.io/guide/http "Server interaction through HTTP") guide.

</div>

## Khai báo màn hình thông tin giao hàng

Bây giờ bạn đã có thể truy suất phí giao hàng, hãy tạo một component để hiển thị thông tin giao hàng.

1. Tạo một component tên là `shipping`.

    Reminder: click chuột phải vào thư mục `app`, chọn `Angular Generator`, và chọn `Component`.

    ```typescript
    // src/app/shipping/shipping.component.ts

    import { Component, OnInit } from '@angular/core';

    @Component({
        selector: 'app-shipping',
        templateUrl: './shipping.component.html',
        styleUrls: ['./shipping.component.css']
    })
    export class ShippingComponent implements OnInit {

        constructor() { }

        ngOnInit() {
        }

    }
    ```

2. Trong file `app.module.ts`, thêm một route mới cho màn hình thông tin giao hàng với `path` là `shipping`.

    ```typescript
    // src/app/app.module.ts

    @NgModule({
        imports: [
            BrowserModule,
            HttpClientModule,
            ReactiveFormsModule,
            RouterModule.forRoot([
                { path: '', component: ProductListComponent },
                { path: 'products/:productId', component: ProductDetailsComponent },
                { path: 'cart', component: CartComponent },
                { path: 'shipping', component: ShippingComponent },
            ])
        ],
        declarations: [
            AppComponent,
            TopBarComponent,
            ProductListComponent,
            ProductAlertsComponent,
            ProductDetailsComponent,
            CartComponent,
            ShippingComponent
        ],
        bootstrap: [
            AppComponent
        ]
    })
    export class AppModule { }
    ```

    Hiện tại chưa có liên kết nào trên giao diện để đi đến màn hình thông tin giao hàng. Bạn có thể đi đến màn hình này bằng cách gõ vào trình duyệt url đã khai báo trước đó. URL sẽ có dạng như sau: 
    
    `https://getting-started.stackblitz.io/shipping`, 
    
    trong đó phần 
    
    `getting-started.stackblitz.io` 
    
    có thể khác nhau tùy vào project trên Stackblitz của bạn.

3. Sử dụng service `CartService` trong component `ShippingComponent` để truy xuất thông tin phí giao hàng trong file `shipping.json`.

    a. Import `CartService`.

    ```typescript
    // src/app/shipping/shipping.component.ts
    
    import { Component, OnInit } from '@angular/core';

    import { CartService } from '../cart.service';
    ```

    b. Khai báo một thuộc tính mới là `shippingCosts`.

    ```typescript
    // src/app/shipping/shipping.component.ts

    export class ShippingComponent implements OnInit {
        shippingCosts;
    }   
    ```

    c. Inject `CartService` vào `ShippingComponent` thông qua constructor:

    ```typescript
    // src/app/shipping/shipping.component.ts

    constructor(
        private cartService: CartService
    ) {

    }
    ```

    d. Gán thuộc tính `shippingCosts` bằng với kết quả trả về của method `getShippingPrices()` trong service `CartService`.

    ```typescript
    // src/app/shipping/shipping.component.ts

    export class ShippingComponent implements OnInit {
        shippingCosts;

        constructor(
            private cartService: CartService
        ) {
        }

        ngOnInit() {
            this.shippingCosts = this.cartService.getShippingPrices();
        }
    }
    ```

4. Hiển thị hình thức giao hàng và phí tương ứng bằng pipe `async` trong component `ShippingComponent`:

    ```html
    <!--src/app/shipping/shipping.component.html-->

    <h3>Shipping Prices</h3>

    <div class="shipping-item" *ngFor="let shipping of shippingCosts | async">
        <span>{{ shipping.type }}</span>
        <span>{{ shipping.price | currency }}</span>
    </div>
    ```

    Pipe `async` trả về giá trị vừa xuất hiện trong stream, và tiếp tục cập nhật giá trị mới khi có dữ liệu mới được đưa vào stream cho đến khi nào component còn tồn tại. Pipe `async` sẽ tự hủy cùng với component. Bạn có thể tìm hiểu chi tiết về pipe `async` ở [đây](https://angular.io/api/common/AsyncPipe).

5. Thêm liên kết tới màn hình thông tin giao hàng từ màn hình chi tiết giỏ hàng:

    ```html
    <!--src/app/cart/cart.component.html-->

    <h3>Cart</h3>

    <p>
        <a routerLink="/shipping">Shipping Prices</a>
    </p>

    <div class="cart-item" *ngFor="let item of items">
        <span>{{ item.name }}</span>
        <span>{{ item.price | currency }}</span>
    </div>
    ```

6. Kiểm tra tính năng hiển thị thông tin giao hàng:

    Click vào nút "Checkout" để xem thông tin giỏ hàng. Lưu ý là khi bạn cập nhật code thì phần xem trước sẽ bị refresh lại làm rỗng giỏ hàng, khi đó bạn phải thêm lại sản phẩm vào giỏ hàng.

    <div class="lightbox">
      <img src='assets/images/angular/sgk/guide/start/cart-empty-with-shipping-prices.png' alt="Cart with link to shipping prices">
    </div>

    Click vào liên kết bạn mới khai báo để đi đến màn hình thông tin phí giao hàng.

    <div class="lightbox">
      <img src='assets/images/angular/sgk/guide/start/shipping-prices.png' alt="Display shipping prices">
    </div>


## Tiếp theo

Để tiếp tục khám phá Angular, bạn có thể chọn một trong các lựa chọn sau:
* [Tiến tục đi đến phần "Forms"](start/start-forms "Try it: Forms for User Input") để thêm tính năng form thanh toán cho ứng dụng.
* [Đi đến phần triển khai ứng dụng](https://nhannguyendacoder.com/blog/angular/sgk/start/start-deployment "Try it: Deployment") để tìm hiểu cách phát triển ứng dụng Angular ở môi trường máy cá nhân, hoặc triển khai ứng dụng lên Firebase hay là server của bạn.
