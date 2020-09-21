---
title: Angular Trick - Load config từ file json trong Angular
description: Trong bài này mình sẽ chia sẻ cách load config động từ file json trong Angular.
published: true
keywords: angular, configs, json
categories: angular
date: 2020-08-19
image: https://nhannguyendacoder.com/assets/images/angular-load-config-tu-file-json-trong-angular/dynamic-json-configs.jpg
---

# [Angular Trick] Load config từ file json trong Angular

![Load config từ file json trong Angular](../assets/images/angular-load-config-tu-file-json-trong-angular/dynamic-json-configs.jpg)

Trong bài này mình sẽ chia sẻ cách load config động từ file json trong Angular.

Link demo trên [stackblitz](https://stackblitz.com/edit/angular-load-configs-from-json?file=src/app/app.component.ts)

## Use cases

Ứng dụng Angular sẽ load các config từ file `config.json` trong thư mục assets. Mỗi môi trường khác nhau như development, test, staging, production sẽ có một file config tương ứng được thay thế trong quá trình deploy (không dùng fileReplacements option trong `angular.json`)

Khi bạn muốn thay đổi config (rest url, api key, debug mode,...) thì chỉ cần update file `config.json` ngay trên server mà không cần phải build lại app, khi reload lại trang là các config mới sẽ được cập nhật.

Tình huống thực tế mà mình gặp là khi app trên production có bug, cần bật mode debug lên hay backend thay đổi public url thì chỉ cần cập nhật lại file `config.json` mà không cần phải build lại app.

## Ưu điểm (Chau Tran)

- Build (ng build) 1 lần duy nhất cho tất cả các environments liên quan. Config sẽ được inject với giá trị phù hợp ở CI/CD pipeline.
- Khi thay đổi config, chỉ cần thay đổi ở tầng CI/CD mà ko cần phải thay đổi về code -> không cần phải build lại Angular 

## Nhược điểm (Chau Tran)

- Setup CI/CD pipeline phức tạp.
- Không theo chuẩn environment.ts của Angular
- Vì không phải là 1 file config dạng global như environment.ts. khi setup module mà module cần configuration từ environment (và module đang setup không hỗ trợ useFactory) thì sẽ không thể dùng được config để setup module này lúc này. 

## Configuration Service

Đầu tiên chúng ta sẽ tạo một constant để lưu đường dẫn file config để sau này có thay đổi thì chỉ cần đổi một nơi thôi. 

```typescript
// file: constant.ts
export const CONFIG_FILE = 'assets/config.json'
```

Tiếp theo khai báo một interface để mô tả cấu trúc file config

```typescript
// file: i-configuration.ts

// logging configs
export interface ILoggingConfiguration {
    sendToCentralizedServer: boolean;
    sendToConsole: boolean;
    logentriesToken: string;
}

// rest api and media configs
export interface IRESTConfiguration {
    url: string;
    mediaURL: string;
}

// firebase configs
export interface IFirebaseConfiguration {
    apiKey: string;
    authDomain: string;
    databaseURL: string;
    projectId: string;
    storageBucket: string;
    messagingSenderId: string;
}

export interface IConfiguration {
    applicationName: string;
    version: string;
    production: boolean;
    debug: boolean;
    rest: IRESTConfiguration;
    firebase: IFirebaseConfiguration;
    logging: ILoggingConfiguration;
}

```

Khai báo interface cho Configuration Service. (Thực ra là abstract class, vì interface không thể dùng cho Dependency Injection system của Angular, trong Typescript thì interface và abstract class có thể dùng thay thế cho nhau) 

```typescript
// file: i-configuration.service.ts

@Injectable({
    providedIn: "platform",
    useClass: ConfigurationService
})
export abstract class IConfigurationService {
    // client will listen to this property
    readonly configs$: Observable<IConfiguration>;
    // initialize configs
    abstract initialize();
}
```

Mình dùng interface để abstract configuration service, user chỉ cần biết tới `IConfigurationService` mà không cần quan tâm tới implementation của nó là `ConfigurationService`, sau này bạn cũng có thể đổi `ConfigurationService` thành `MockConfigurationService` để test chẳng hạn. Các implementation của `IConfigurationService` phải cung cấp property `readonly configs$: Observable<IConfiguration>` để client đăng ký nhận config, và method `initialize()` để khởi tạo config. Ở đây mình dùng `providedIn: "platform"` để service được khởi tạo cùng với platform injector, và chúng ta có thể dùng nó ở file `main.ts`

Tiếp theo chúng ta sẽ khai báo một implementation của interface `IConfigurationService` là `ConfigurationService`. Đây là class sẽ thực hiện việc load config từ file json và trả về cho user.

```typescript
// file: configuration.service.ts

@Injectable()
export class ConfigurationService implements IConfigurationService {
    private configs = new ReplaySubject<IConfiguration>(1)

    readonly configs$: Observable<IConfiguration> = this.configs.asObservable();

    async initialize() {
        try {
            let configs: IConfiguration = await fetch(CONFIG_FILE)
            .then(res => {
                if (!res.ok) { 
                    return Promise.reject(new Error('Response with ok is false')) 
                }
                return res.json()
            })

            this.configs.next(configs)
        } catch (error) {
            error.message = 'Failed to load app configs: ' + error.message
            throw error
        }
    }
}

```

Mình sử dụng `async` và `await` cho các hàm trả về promise giúp code dễ đọc hơn. Sau khi fetch file config `fetch(CONFIG_FILE)`, mình sẽ check xem response trả về có ok hay không vì với hàm `fetch`, các response trả về HTTP error status như 404, 500 thì  hàm này cũng không quăng ra exeption.

## Load config từ file json ở file main.ts 

Đầu tiên hãy tạo file `assets/config.json` với nội dung như sau

```json
{
    "applicationName": "My App",
    "production": false,
    "debug": true,
    "rest": {
        "url": "https://dev-rest.abc.com/api/v1",
        "mediaURL": "https://dev-media.abc.com"
    },
    "firebaseConfigs": {
        "apiKey": "apiKey",
        "authDomain": "authDomain",
        "databaseURL": "databaseURL",
        "projectId": "projectId",
        "storageBucket": "storageBucket",
        "messagingSenderId": "messagingSenderId"
    },
    "logging": {
        "sendToCentralizedServer": false,
        "sendToConsole": true,
        "logentriesToken": "logentriesToken"
    }
}
```

Vì sao đặt file config trong thư mục assets? Vì đây là thư mục mà Angular sẽ giữ lại sau khi build, chứa tất cả các static file của app như hình ảnh, icon, và cả file config nữa. Ứng dụng Angular sau khi build sẽ có dạng như sau

![angular after build](../assets/images/angular-load-config-tu-file-json-trong-angular/build.png)

Chúng ta sẽ load file config ngay ở file `main.ts` để provide cho app và sử dụng ngay tại file này luôn, ví dụ mình cần chạy hàm `enableProdMode()` cho môi trường production thì làm như sau: 

```typescript
// file: main.ts

(async () => {
    try {
        let platformRef = await platformBrowserDynamic()
        let configService = platformRef.injector.get(IConfigurationService)
        configService.initialize()

        let configs = await configService.configs$.pipe(first()).toPromise()
        if (configs.production) {
            enableProdMode();
        }
        
        platformRef.bootstrapModule(AppModule)
    } catch (error) {
        console.error('Initializing error', error)
    }
})()
```

Đầu tiên chúng ta sẽ đợi platform khởi tạo xong sẽ trả về một platform reference `let platformRef = await platformBrowserDynamic()`. Với platform reference có được ta có thể lấy ra configuration service `let configService = platformRef.injector.get(IConfigurationService)` và init nó `configService.initialize()`.

Init xong thì lấy giá trị configs như sau `let configs = await configService.configs$.pipe(first()).toPromise()` (lấy giá trị đầu tiên của stream `configs$`).

Ở đây mình check giá trị của config `production` để xem có cần bật mode production hay không. Và cuối cùng là bootstrap `AppModule`.

## Sử dụng configuration service

Vì chúng ta đã inject `IConfigurationService` ở platform (`providedIn: "platform"`) và init nó ở `main.ts` rồi nên bây giờ chỉ cần inject vào `AppComponent` và sử dụng thôi nào.

```typescript
// file: app.component.ts

@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
    styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
    constructor(public config: IConfigurationService) {}
}

```

```html
<!--file: app.component.html-->
<h3>The configs loaded from config.json file: </h3>
<pre>
    {{(config.configs$ | async) | json}}
</pre>
```

Cảm ơn các bạn đã theo dõi bài viết, mong nhận được góp ý từ mọi người.

Thanks a Tiep Phan, Chau Tran đã góp ý phần ưu, nhược điểm của phương pháp này và phần load config ở main.ts.

Bài viết này có tham khảo nội dung từ các nguồn sau: 
- https://leanpub.com/angular-architecture-the-unofficial-guide
- https://stackoverflow.com/questions/42110817/load-config-json-file-in-angular-2/42111501
- https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API

