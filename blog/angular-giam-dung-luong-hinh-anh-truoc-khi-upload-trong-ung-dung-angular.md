---
title: Angular Trick - Giảm dung lượng hình ảnh trước khi upload trong ứng dụng Angular
description: Trong bài này mình sẽ chia sẻ cách giảm dung lượng hình ảnh trước khi upload trong ứng dụng Angular.
published: true
keywords: angular, compress image, nen hinh anh, giam dung luong hinh anh
categories: angular
date: 2020-08-18
image: https://nhannguyendacoder.com/assets/images/angular-giam-dung-luong-hinh-anh-truoc-khi-upload-trong-ung-dung-angular/nen-hinh-anh.jpg
---

# [Angular Trick] Giảm dung lượng hình ảnh trước khi upload trong ứng dụng Angular

![Nén hình ảnh](../assets/images/angular-giam-dung-luong-hinh-anh-truoc-khi-upload-trong-ung-dung-angular/nen-hinh-anh.jpg)

Trong bài này mình sẽ chia sẻ cách giảm dung lượng hình ảnh trước khi upload trong ứng dụng Angular.

Link demo trên [stackblitz](https://stackblitz.com/edit/angular-compress-image?file=src/app/app.component.ts)

## Use cases

- Bạn không có service riêng để xử lý hình ảnh, ví dụ như bạn dùng Firebase làm backend và upload hình lên trên đó luôn, và khách hàng của bạn không biết tối ưu hình ảnh bằng Photoshop hay tinypng.com.
- Không có yêu cầu quá khắc khe về chất lượng hình ảnh

## Ưu điểm

- Xử lý hình ảnh ngay trên frontend
- Hạn chế rủi ro khi client upload hình có dung lượng quá lớn
- Không cần thêm service xử lý hình ảnh

## Nhược điểm (Tiep Phan)

- Chất lượng hình ảnh chưa được optimize như các thư viện khác cho backend
- Chưa hỗ trợ trên Safari, IE và các trình duyệt trên browser, [xem chi tiết](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toBlob)
- Tốt nhất vẫn nên dùng backend để xử lý hình ảnh.

## Nội dung

Chúng ta sẽ tạo ra một service tên là CompressImageService để làm giảm dung lượng ảnh trước khi upload.

```typescript
// compress-image.service.ts
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'

// in bytes, compress images larger than 1MB
const fileSizeMax = 1 * 1024 * 1024
// in pixels, compress images have the width or height larger than 1024px
const widthHeightMax = 1024
const defaultWidthHeightRatio = 1
const defaultQualityRatio = 0.7

@Injectable({
  providedIn: 'root'
})
export class CompressImageService {
    compress(file: File): Observable<File> {
        const imageType = file.type || 'image/jpeg'
        const reader = new FileReader()
        reader.readAsDataURL(file)

        return Observable.create(observer => {
        // This event is triggered each time the reading operation is successfully completed.
        reader.onload = ev => {
            // Create an html image element
            const img = this.createImage(ev)
            // Choose the side (width or height) that longer than the other
            const imgWH = img.width > img.height ? img.width : img.height

            // Determines the ratios to compress the image
            let withHeightRatio = (imgWH > widthHeightMax) ? widthHeightMax/imgWH : defaultWidthHeightRatio
            let qualityRatio = (file.size > fileSizeMax) ? fileSizeMax/file.size : defaultQualityRatio

            // Fires immediately after the browser loads the object
            img.onload = () => { 
            const elem = document.createElement('canvas')
            // resize width, height
            elem.width = img.width * withHeightRatio
            elem.height = img.height * withHeightRatio

            const ctx = <CanvasRenderingContext2D>elem.getContext('2d')
            ctx.drawImage(img, 0, 0, elem.width, elem.height)
            ctx.canvas.toBlob(
                // callback, called when blob created
                blob => { 
                observer.next(new File(
                    [blob],
                    file.name,
                    {
                    type: imageType,
                    lastModified: Date.now(),
                    }
                ))
                },
                imageType,
                qualityRatio, // reduce image quantity 
            )
            }
        }

        // Catch errors when reading file
        reader.onerror = error => observer.error(error)
        })
    }

    private createImage(ev) {
        let imageContent = ev.target.result
        const img = new Image()
        img.src = imageContent
        return img
    }
}
```

## Sử dụng CompressImageService

```typescript
//app.component.ts
import { Component } from '@angular/core';
import { CompressImageService } from './compress-image.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
    constructor(private compressImage: CompressImageService) {}

    upload(event) {
        let image: File = event.target.files[0]
        console.log(`Image size before compressed: ${image.size} bytes.`)

        this.compressImage.compress(image)
        .pipe(take(1))
        .subscribe(compressedImage => {
            console.log(`Image size after compressed: ${compressedImage.size} bytes.`)
            // now you can do upload the compressed image 
        })
    }
}

```

Cảm ơn các bạn đã theo dõi bài viết, mong nhận được góp ý từ mọi người.

Thanks a Tiep Phan đã góp ý phần nhược điểm của phương pháp này.

