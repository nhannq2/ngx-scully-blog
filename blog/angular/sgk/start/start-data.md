---
title: 'Học Angular theo SGK - Phần 1.3: Khởi Động - Quản lý dữ liệu'
description: 'Hướng dẫn bạn tạo tính năng giỏ hàng và sử dụng service.'
published: false
keywords: 'angular, angular sgk, hoc angular theo sach giao khoa'
categories: angular
date: 2020-09-29T00:00:00.000Z
image: assets/images/angular/sgk/guide/start/start-data-image.jpg
slugs:
    - ___UNPUBLISHED___kfnfbohx_hEokGSOs6JtEzoY2pY9i1PDopQXLYkN0

---
# Học Angular theo SGK - Phần 1.3: Khởi Động - Quản lý dữ liệu

![post-image](assets/images/angular/sgk/guide/start/start-data-image.jpg)

Bài viết gốc: https://angular.io/start/start-data

Trong phần [Điều hướng trong ứng dụng Angular](https://nhannguyendacoder.com/blog/angular/sgk/start/start-routing "Try it: In-app Navigation"), ứng dụng của chúng ta có hai màn hình: màn hình danh sách sản phẩm và màn hình chi tiết sản phẩm.

Người dùng có thể click vào tên sản phẩm trong danh sách để xem thông tin chi tiết trong màn hình mới với một URL hay route riêng biệt.

Phần này sẽ hướng dẫn bạn tạo tính năng giỏ hàng với 3 giai đoạn:

* Thêm nút "Buy" vào màn hình chi tiết sản phẩm, khi click vào nút này thì sản phẩm được chọn sẽ được thêm vào danh sách sản phẩm được quản lý trong `CartService`.
* Tạo component `CartComponent` để hiển thị danh sách sản phẩm trong giỏ hàng.
* Tạo component `ShippingComponent` để lấy phí giao hàng từng file `.json` bằng `HttpClient`.

## Service

Service là một phần không thể thiếu của các ứng dụng Angular. Trong Angular, service là một object của một class có thể cùng được sử dụng ở nhiều phần khác nhau của ứng dụng với sự trợ giúp của [hệ thống dependency injection trong Angular](https://angular.io/guide/glossary#dependency-injection-di "Dependency injection definition").

Trong Angular, service được dùng để chia sẻ dữ liệu giữa các phần khác nhau của ứng dụng. Trong bài này, `CartService` được dùng để lưu thông tin và các method cần thiết cho giỏ hàng.

## Tạo một service cho giỏ hàng

Cho đến thời điểm hiện tại thì người dùng có thể xem thông tin sản phẩm, chia sẻ sản phẩm và nhận thông báo giảm giá của sản phẩm. Tuy nhiên người dùng chưa thể mua sản phẩm!

Trong phần này chúng ta sẽ thêm nút "Buy" và màn hình chi tiết sản phẩm và tạo một service để lưu thông tin sản phẩm được thêm vào giỏ hàng.

<div class="alert is-helpful">

Trong [phần sau](https://angular.io/start/start-forms "Try it: Forms for user input"), bạn sẽ được hướng dẫn để sử dụng `CartService` ở màn hình thanh toán.

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

    StackBlitz có thể sẽ tự động khai báo service của bạn trong `app.module.ts` mà không dùng `{ providedIn: 'root' }` trong `@Injectable()`. Bạn có thể tìm hiểu rõ hơn về service ở [đây](https://angular.io/guide/architecture-services "Concepts > Intro to Services and DI").

    </div>

2. Trong class `CartService`, khai báo một property là `items` để lưu một mảng các sản phẩm đã thêm vào giỏ hàng.

    ```typescript
    // src/app/cart.service.ts
    export class CartService {
        items = [];
    }
    ```

3. Khai báo các method để thêm sản phẩm vào giỏ hàng, tra về danh sách sản phẩm có trong giỏ hàng, và xóa tất cả sản phẩm trong giỏ hàng:

    ```typescript
    // src/app/cart.service.ts

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

This section walks you through using the cart service to add a product to the cart with a "Buy" button.

1. Open `product-details.component.ts`.

2. Configure the component to use the cart service.

    a. Import the cart service.

        <code-example header="src/app/product-details/product-details.component.ts" path="getting-started/src/app/product-details/product-details.component.ts" region="cart-service">
        </code-example>

    b. Inject the cart service by adding it to the `constructor()`.

        <code-example path="getting-started/src/app/product-details/product-details.component.ts" header="src/app/product-details/product-details.component.ts" region="inject-cart-service">
        </code-example>

        <!--
        To do: Consider defining "inject" and describing the concept of "dependency injection"
        -->

3. Define the `addToCart()` method, which adds the current product to the cart.

    The `addToCart()` method does the following three things:
    * Receives the current `product`.
    * Uses the cart service's `addToCart()` method to add the product the cart.
    * Displays a message that you've added a product to the cart.

    <code-example path="getting-started/src/app/product-details/product-details.component.ts" header="src/app/product-details/product-details.component.ts" region="add-to-cart"></code-example>

4. Update the product details template with a "Buy" button that adds the current product to the cart.

    a. Open `product-details.component.html`.

    b. Add a button with the label "Buy", and bind the `click()` event to the `addToCart()` method:

        <code-example header="src/app/product-details/product-details.component.html" path="getting-started/src/app/product-details/product-details.component.html">
        </code-example>
    
    <div class="alert is-helpful">

    The line, `<h4>{{ product.price | currency }}</h4>` uses the `currency` pipe to transform `product.price` from a number to a currency string. A pipe is a way you can transform data in your HTML template. For more information about Angular pipes, see [Pipes](guide/pipes "Pipes").

    </div>

5. To see the new "Buy" button, refresh the application and click on a product's name to display its details.

    <div class="lightbox">
      <img src='assets/images/angular/sgk/guide/start/product-details-buy.png' alt="Display details for selected product with a Buy button">
    </div>

    a. Click the "Buy" button to add the product to the stored list of items in the cart and display a confirmation message.

    <div class="lightbox">
      <img src='assets/images/angular/sgk/guide/start/buy-alert.png' alt="Display details for selected product with a Buy button">
    </div>


## Create the cart view

At this point, users can put items in the cart by clicking "Buy", but they can't yet see their cart.

Create the cart view in two steps:

1. Create a cart component and configure routing to the new component. At this point, the cart view has only default text.
2. Display the cart items.

### Set up the component

 To create the cart view, begin by following the same steps you did to create the product details component and configure routing for the new component.

1. Generate a cart component, named `cart`.

    Reminder: In the file list, right-click the `app` folder, choose `Angular Generator` and `Component`.

    <code-example header="src/app/cart/cart.component.ts" path="getting-started/src/app/cart/cart.component.1.ts"></code-example>

2. Add routing (a URL pattern) for the cart component.

    Open `app.module.ts` and add a route for the component `CartComponent`, with a `path` of `cart`:

    <code-example header="src/app/app.module.ts" path="getting-started/src/app/app.module.ts" region="cart-route">
    </code-example>

3. Update the "Checkout" button so that it routes to the `/cart` url.

    Open `top-bar.component.html` and add a `routerLink` directive pointing to `/cart`.

    <code-example
        header="src/app/top-bar/top-bar.component.html"
        path="getting-started/src/app/top-bar/top-bar.component.html"
        region="cart-route">
    </code-example>

4. To see the new cart component, click the "Checkout" button. You can see the "cart works!" default text, and the URL has the pattern `https://getting-started.stackblitz.io/cart`,  where `getting-started.stackblitz.io` may be different for your StackBlitz project.

    <div class="lightbox">
      <img src='assets/images/angular/sgk/guide/start/cart-works.png' alt="Display cart view before customizing">
    </div>

### Display the cart items

You can use services to share data across components:

* The product details component already uses the cart service to add products to the cart.
* This section shows you how to use the cart service to display the products in the cart.


1. Open `cart.component.ts`.

2. Configure the component to use the cart service.

    a. Import the `CartService` from the `cart.service.ts` file.

        <code-example header="src/app/cart/cart.component.ts" path="getting-started/src/app/cart/cart.component.2.ts" region="imports">
        </code-example>

    b. Inject the `CartService` so that the cart component can use it.

        <code-example path="getting-started/src/app/cart/cart.component.2.ts" header="src/app/cart/cart.component.ts" region="inject-cart">
        </code-example>

3. Define the `items` property to store the products in the cart.

    <code-example path="getting-started/src/app/cart/cart.component.2.ts" header="src/app/cart/cart.component.ts" region="items">
    </code-example>

4. Set the items using the cart service's `getItems()` method. Recall that you defined this method [when you generated `cart.service.ts`](#generate-cart-service).

    The resulting `CartComponent` class is as follows:

    <code-example path="getting-started/src/app/cart/cart.component.3.ts" header="src/app/cart/cart.component.ts" region="props-services">
    </code-example>

5. Update the template with a header, and use a `<div>` with an `*ngFor` to display each of the cart items with its name and price.

    The resulting `CartComponent` template is as follows:

    <code-example header="src/app/cart/cart.component.html" path="getting-started/src/app/cart/cart.component.2.html" region="prices">
    </code-example>

6. Test your cart component.

    a. Click on "My Store" to go to the product list view.
    b. Click on a product name to display its details.
    c. Click "Buy" to add the product to the cart.
    d. Click "Checkout" to see the cart.
    e. To add another product, click "My Store" to return to the product list.

  Repeat to add more items to the cart.

    <div class="lightbox">
      <img src='assets/images/angular/sgk/guide/start/cart-page-full.png' alt="Cart view with products added">
    </div>


<div class="alert is-helpful">

StackBlitz tip: Any time the preview refreshes, the cart is cleared. If you make changes to the app, the page refreshes, so you'll need to buy products again to populate the cart.

</div>

<div class="alert is-helpful">

For more information about services, see [Introduction to Services and Dependency Injection](guide/architecture-services "Concepts > Intro to Services and DI").

</div>


## Retrieve shipping prices
<!-- Accessing data with the HTTP client -->

Servers often return data in the form of a stream.
Streams are useful because they make it easy to transform the returned data and make modifications to the way you request that data.
The Angular HTTP client, `HttpClient`, is a built-in way to fetch data from external APIs and provide them to your app as a stream.

This section shows you how to use the HTTP client to retrieve shipping prices from an external file.

### Predefined shipping data

The application that StackBlitz generates for this guide comes with predefined shipping data in `assets/shipping.json`.
Use this data to add shipping prices for items in the cart.

<code-example header="src/assets/shipping.json" path="getting-started/src/assets/shipping.json">
</code-example>


### Use `HttpClient` in the `AppModule`

Before you can use Angular's HTTP client, you must configure your app to use `HttpClientModule`.

Angular's `HttpClientModule` registers the providers your app needs to use a single instance of the `HttpClient` service throughout your app.

1. Open `app.module.ts`.

  This file contains imports and functionality that is available to the entire app.

2. Import `HttpClientModule` from the `@angular/common/http` package at the top of the file with the other imports. As there are a number of other imports, this code snippet omits them for brevity. Be sure to leave the existing imports in place.

    <code-example header="src/app/app.module.ts" path="getting-started/src/app/app.module.ts" region="http-client-module-import">
    </code-example>

3. Add `HttpClientModule` to the `AppModule` `@NgModule()` `imports` array to register Angular's `HttpClient` providers globally.

    <code-example path="getting-started/src/app/app.module.ts" header="src/app/app.module.ts" region="http-client-module">
    </code-example>

### Use `HttpClient` in the cart service

Now that the `AppModule` imports the `HttpClientModule`, the next step is to inject the `HttpClient` service into your service so your app can fetch data and interact with external APIs and resources.


1. Open `cart.service.ts`.

2. Import `HttpClient` from the `@angular/common/http` package.

    <code-example header="src/app/cart.service.ts" path="getting-started/src/app/cart.service.ts" region="import-http">
    </code-example>

3. Inject `HttpClient` into the `CartService` constructor:

    <code-example path="getting-started/src/app/cart.service.ts" header="src/app/cart.service.ts" region="inject-http">
    </code-example>


### Define the `get()` method

Multiple components can leverage the same service.
Later in this tutorial, the shipping component uses the cart service to retrieve shipping data via HTTP from the `shipping.json` file.
First, define a `get()` method.

1. Continue working in `cart.service.ts`.

2. Below the `clearCart()` method, define a new `getShippingPrices()` method that uses the `HttpClient` `get()` method to retrieve the shipping data.

    <code-example header="src/app/cart.service.ts" path="getting-started/src/app/cart.service.ts" region="get-shipping"></code-example>


<div class="alert is-helpful">

For more information about Angular's `HttpClient`, see the [Client-Server Interaction](guide/http "Server interaction through HTTP") guide.

</div>

## Define the shipping view

Now that your app can retrieve shipping data, create a shipping component and  template.

1. Generate a new component named `shipping`.

    Reminder: In the file list, right-click the `app` folder, choose `Angular Generator` and `Component`.

    <code-example header="src/app/shipping/shipping.component.ts" path="getting-started/src/app/shipping/shipping.component.1.ts"></code-example>

2. In `app.module.ts`, add a route for shipping. Specify a `path` of `shipping` and a component of `ShippingComponent`.

    <code-example header="src/app/app.module.ts" path="getting-started/src/app/app.module.ts" region="shipping-route"></code-example>

    There's no link to the new shipping component yet, but you can see its template in the preview pane by entering the URL its route specifies. The URL has the pattern: `https://getting-started.stackblitz.io/shipping` where the `getting-started.stackblitz.io` part may be different for your StackBlitz project.

3. Modify the shipping component so that it uses the cart service to retrieve shipping data via HTTP from the `shipping.json` file.

    a. Import the cart service.

        <code-example header="src/app/shipping/shipping.component.ts" path="getting-started/src/app/shipping/shipping.component.ts" region="imports"></code-example>

    b. Define a `shippingCosts` property.

        <code-example path="getting-started/src/app/shipping/shipping.component.ts" header="src/app/shipping/shipping.component.ts" region="props"></code-example>

    c. Inject the cart service in the `ShippingComponent` constructor:

        <code-example path="getting-started/src/app/shipping/shipping.component.ts" header="src/app/shipping/shipping.component.ts" region="inject-cart-service"></code-example>

    d. Set the `shippingCosts` property using the `getShippingPrices()` method from the cart service.

        <code-example path="getting-started/src/app/shipping/shipping.component.ts" header="src/app/shipping/shipping.component.ts" region="ctor"></code-example>

4. Update the shipping component's template to display the shipping types and prices using the `async` pipe:

    <code-example header="src/app/shipping/shipping.component.html" path="getting-started/src/app/shipping/shipping.component.html"></code-example>

    The `async` pipe returns the latest value from a stream of data and continues to do so for the life of a given component. When Angular destroys that component, the `async` pipe automatically stops. For detailed information about the `async` pipe, see the [AsyncPipe API documentation](/api/common/AsyncPipe).

5. Add a link from the cart view to the shipping view:

    <code-example header="src/app/cart/cart.component.html" path="getting-started/src/app/cart/cart.component.2.html"></code-example>

6. Test your shipping prices feature:

    Click the "Checkout" button to see the updated cart. Remember that changing the app causes the preview to refresh, which empties the cart.

    <div class="lightbox">
      <img src='assets/images/angular/sgk/guide/start/cart-empty-with-shipping-prices.png' alt="Cart with link to shipping prices">
    </div>

    Click on the link to navigate to the shipping prices.

    <div class="lightbox">
      <img src='assets/images/angular/sgk/guide/start/shipping-prices.png' alt="Display shipping prices">
    </div>


## Next steps

Congratulations! You have an online store application with a product catalog and shopping cart. You can also look up and display shipping prices.

To continue exploring Angular, choose either of the following options:
* [Continue to the "Forms" section](start/start-forms "Try it: Forms for User Input") to finish the app by adding the shopping cart view and a checkout form.
* [Skip ahead to the "Deployment" section](start/start-deployment "Try it: Deployment") to move to local development, or deploy your app to Firebase or your own server.
