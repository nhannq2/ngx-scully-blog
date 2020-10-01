---
title: 'Học Angular theo SGK - Phần 1.4: Khởi Động - Sử dụng form trong Angular'
description: 'Học Angular theo SGK - Phần 1.4: Khởi Động - Sử dụng form trong Angular'
published: true
keywords: angular, angular sgk, hoc angular theo sach giao khoa, angular forms
categories: angular
date: 2020-10-01
image: assets/images/angular/sgk/guide/start/start-forms-image.jpg

---
# Học Angular theo SGK - Phần 1.4: Khởi Động - Sử dụng form trong Angular

![post-image](assets/images/angular/sgk/guide/start/start-forms-image.jpg)

Bài viết gốc: https://angular.io/start/start-forms

Trong phần [Quản lý dữ liệu](https://nhannguyendacoder.com/blog/angular/sgk/start/start-data "Try it: Managing Data"), ứng dụng của chúng ta đã có tính năng danh sách sản phẩm và giỏ hàng.

Phần này sẽ chúng ta sẽ cùng nhau thêm tính năng thanh toán và lưu thông tin khách hàng vơi forms trong Angular.

## Form trong Angular 

Form trong Angular được xây dựng dựa trên form của HTML với mục đích giúp cho quá trình tạo và kiểm tra tính hợp lệ (validate) của form được dễ dàng hơn. Trong Angular có hai cách để tạo form là dùng Template driven form và Reactive form. Trong phần này chúng ta sẽ dùng Reactive form.

Reactive form bao gồm 2 phần: các object trong component để quản lý và lưu trữ dữ liệu từ form, và phần template của form nằm ngoài template của component.

## Tạo form thanh toán trong component

1. Mở file `cart.component.ts`.

2. Inject service `FormBuilder`, đây là service có chứa các method tiện lợi để tạo form được nhanh chóng hơn.

    a. Import service `FormBuilder` từ package `@angular/forms`.

    ```typescript
    // src/app/cart/cart.component.ts

    import { Component, OnInit } from '@angular/core';
    import { FormBuilder } from '@angular/forms';

    import { CartService } from '../cart.service';
    ```

    Module `ReactiveFormsModule` đã được import sẵn trong `AppModule` (file `app.module.ts`) chính là nới khai báo service `FormBuilder`.

    b. Inject service `FormBuilder` vào component `CartComponent`.

    ```typescript
    // src/app/cart/cart.component.ts

    export class CartComponent implements OnInit {
        items;

        constructor(
            private cartService: CartService,
            private formBuilder: FormBuilder,
        ) {
        }

        ngOnInit() {
            this.items = this.cartService.getItems();
        }
    }
    ```

3. Trong component `CartComponent`, khai báo thuộc tính `checkoutForm` để lưu trữ phần form được khai báo ở trong component.

    ```typescript
    // src/app/cart/cart.component.ts

    export class CartComponent implements OnInit {
        items;
        checkoutForm;
    }
    ```

4. Khai báo form bao gồm hai trường là tên (`name`) và địa chỉ (`address`) của khách hàng. Sử dụng method `group()` của `FormBuilder` để tạo form. 

    ```typescript
    // src/app/cart/cart.component.ts

    export class CartComponent implements OnInit {
        items;
        checkoutForm;

        constructor(
            private cartService: CartService,
            private formBuilder: FormBuilder,
        ) {
            this.checkoutForm = this.formBuilder.group({
                name: '',
                address: ''
            });
        }

        ngOnInit() {
            this.items = this.cartService.getItems();
        }
    }
    ```

5. Khi thanh toán, người dùng cần điền tên và địa chỉ của mình, sau khi người dùng submit đơn hàng thì các trường của form và giỏ hàng sẽ được làm rỗng.

    a. Trong file `cart.component.ts`, khai báo method `onSubmit()` để xử lý quá trình submit đơn hàng. Dùng method `clearCart()` của `CartService` để làm rỗng giỏ hàng và form sau khi đơn hàng được gửi đi. Trong thực tế thì dữ liệu đơn hàng sau khi submit sẽ được gửi tới serve để xử lý. Toàn bộ code của component `CartComponent` sẽ như sau:

    ```typescript
    // src/app/cart/cart.component.ts

    import { Component, OnInit } from '@angular/core';
    import { FormBuilder } from '@angular/forms';
    import { CartService } from '../cart.service';

    @Component({
        selector: 'app-cart',
        templateUrl: './cart.component.html',
        styleUrls: ['./cart.component.css']
    })
    export class CartComponent implements OnInit {
        items;
        checkoutForm;

        constructor(
            private cartService: CartService,
            private formBuilder: FormBuilder,
        ) {
            this.checkoutForm = this.formBuilder.group({
            name: '',
            address: ''
            });
        }

        ngOnInit() {
            this.items = this.cartService.getItems();
        }

        onSubmit(customerData) {
            // Process checkout data here
            this.items = this.cartService.clearCart();
            this.checkoutForm.reset();

            console.warn('Your order has been submitted', customerData);
        }
    }
    ```

Bây giờ bạn đã hoàn thành khai báo form trong component class, tiếp theo hãy đưa phần form này ra ngoài giao diện.

## Tạo form thanh toán

1. Mở file `cart.component.html`.

2. Ở dưới cùng, thêm một form HTML để khách hàng nhập thông tin.

3. Sử dụng **property binding** để truyền giá trị của `checkoutForm` trong component class vào thuộc tính `formGroup` của thẻ `form` ngoài template. Và thêm nút "Purchase" để submit form.

    ```html
    <!--src/app/cart/cart.component.html-->

    <form [formGroup]="checkoutForm">

        <button class="button" type="submit">Purchase</button>

    </form>
    ```

4. Trong thẻ `form` sử dụng **event binding** để lắng nghe và gọi method `onSubmit()` và truyền vào giá trị của form (`checkoutForm.value`) mỗi khi event `ngSubmit` (submit form) xảy ra.

    ```html
    <!--src/app/cart/cart.component.html-->
    <form [formGroup]="checkoutForm" (ngSubmit)="onSubmit(checkoutForm.value)">

        <button class="button" type="submit">Purchase</button>

    </form>
    ```

5. Thêm 2 input để người dùng nhập tên và địa chỉ. Dùng thuộc tính `formControlName` để truyền thông tin của hai trường đã được khai báo trong component class là `name` và `address` cho hai input tương ứng ngoài template. 

    ```html
    <!--src/app/cart/cart.component.html-->
    
    <h3>Cart</h3>

    <p>
        <a routerLink="/shipping">Shipping Prices</a>
    </p>

    <div class="cart-item" *ngFor="let item of items">
        <span>{{ item.name }} </span>
        <span>{{ item.price | currency }}</span>
    </div>

    <form [formGroup]="checkoutForm" (ngSubmit)="onSubmit(checkoutForm.value)">
        <div>
            <label for="name">Name</label>
            <input id="name" type="text" formControlName="name">
        </div>

        <div>
            <label for="address">Address</label>
            <input id="address" type="text" formControlName="address">
        </div>

        <button class="button" type="submit">Purchase</button>
    </form>
    ```

Sau khi thêm một vài sản phẩm vào giỏ hàng, người dùng có thể xem thông tin giỏ hàng, nhập thông tin (tên và địa chỉ) và submit đơn hàng của mình:

<div class="lightbox">
  <img src='assets/images/angular/sgk/guide/start/cart-with-items-and-form.png' alt="Cart view with checkout form">
</div>

Để xem đơn hàng được gửi đi, mở của sổ console để thấy một object có chứa tên và địa chỉ mà bạn đã submit.

## Tiếp theo

* [Đi đến phần triển khai ứng dụng](https://nhannguyendacoder.com/blog/angular/sgk/start/start-deployment "Try it: Deployment") để tìm hiểu các phát triển ứng dụng ở môi trường máy cá nhân, hoặc triển khai ứng dụng lên Firebase hay là server của bạn.
