# Ngx-scully-blog: A simple blog for developers (Version 3.0.0)

If you want to create a blog to share your knowledge or to push you career, but you just want to focus on writing great articles and don't want to care about other stuff like search engine optimization (SEO), hosting, domain, etc. This project can help.

**Ngx-scully-blog** is a simple blog for developers that is easy to setup and SEO supported. After the inital setups, you only need to focus on writing your blog posts on markdown files.

This project is written in Angular, but you don't need to know anything about Angular. I'll guide you step by step. If you are an Angular developer already, that's great because you can take advantages of your previous experience.

My blog: [nhannguyendacoder.com](https://nhannguyendacoder.com)

## Table of contents
- [Prerequisites](#prerequisites)
- [Getting started](#getting-started)
    - [Install Nodejs](#install-nodejs)
    - [Install Angular CLI](#install-angular-cli)
    - [Checkout the project](#checkout-the-project)
    - [Setup Firebase to host your blog](#setup-firebase-to-host-your-blog)
    - [Personalize your blog](#personalize-your-blog)
    - [Deploy your blog to Firebase](#deploy-your-blog-to-firebase)
- [Write your first blog post](#write-your-first-blog-post)
    - [Create a markdown file](#create-a-markdown-file)
    - [Prepare post images](#prepare-post-images)
    - [Preview and deploy your post](#preview-and-deploy-your-post)
- [Useful tips](#useful-tips)
    - [Writing and publishing process](#writing-and-publishing-process)
    - [Code highlighting](#code-highlighting)
    - [Compress your image](#compress-your-image)
    - [Facebook sharing debugging](#facebook-sharing-debugging)
- [Advanced usage](#advanced-usage)
- [Still have questions?](#still-have-questions)
- [Altenatives](#altenatives)
- [References](#references)

## Prerequisites
You need to know Mardown in order to write your blog posts. It is quite simple, and you can take a quick look about its syntax [here](https://guides.github.com/pdfs/markdown-cheatsheet-online.pdf).

## Getting started

### Install Nodejs
You need to install Nodejs to run the project. You can download and install the Nodejs version for your operation system at [nodejs.org/en/download](https://nodejs.org/en/download).

### Install Angular CLI
You need Angular CLI to run Angular commands. Run `npm install -g @angular/cli` command in your terminal to install Angular CLI on your machine. 

*If errors happen, you may need to run `sudo npm install -g firebase-tools` instead, then you need to input your operation system password.*

### Checkout the project
Open your terminal and run the following commands in sequence:
- `git clone https://github.com/nhaancs/ngx-scully-blog.git`
- `cd ngx-scully-blog`
- `npm install` (*If you are using WSL on Windows, see more at https://scully.io/docs/learn/getting-started/installation#wsl-pre-requisites*)
- `npm run scully:preview`

This is the result when the last command done:

![scully-serve-done](./src/assets/docs/scully-serve-done.png)

In browser, go to Scully static server at [http://localhost:1668](http://localhost:1668). You will look something like this:

![initial-portfolio](./src/assets/docs/initial-portfolio.png)

**Note**: You will see some ugly texts like "FIRSTNAME LASTNAME", "YOUR JOB TITLE", etc. Don't worry, we will fix these text with your personal information later.

Then, click on blog icon to go to blog home page at [http://localhost:1668/blog](http://localhost:1668/blog). You will look something like this:

![initial-blog-home](./src/assets/docs/initial-blog-home.png)

Congrats, you have seen how your blog look like. Now you can stop your terminal and go to the next step to setup Firebase to host your blog!

### Setup Firebase to host your blog
- Go to [https://console.firebase.google.com](https://console.firebase.google.com) and login as your google account.

- After login, click on **Add project** button to create a new project.
    ![firebase-start-page](./src/assets/docs/firebase-start-page.png)

- Input your project name and click **Continue**. 
    ![firebase-create-project-page](./src/assets/docs/firebase-create-project-page.png)

    **Note**: if your project name is `ngx-scully-blog`, your blog address will be `ngx-scully-blog.web.app`. You can buy a custom domain like `yourdomain.com` and add to your project later. 
- Disable option **Enable Google analytics for this project** and click **Create project**
    ![disable-analytics](./src/assets/docs/disable-analytics.png)
    
    *If you already have a Google anlytics acount, you can leave this option on and click Next to setup Google analytics*

Ok, we have setup Firebase. Now we will go back to the source code to personalize your blog, make it ready to be deployed on Firebase.

### Personalize your blog
- Open the source code directory (`ngx-scully-blog`) you have cloned on the last step on your code editor, I am using [vscode](https://code.visualstudio.com), you could use your editor as well.
- Open [`ngx-scully-blog/configuration/site-configs.ts`](./configuration/site-configs.ts) file. This is the place you can personalize the site's configurations and the contents displayed on your blog (includes the portfolio page and the blog page).
- Now lets customize all the configurations in [`site-configs.ts`](./configuration/site-configs.ts) file to make the blog your own. I have put useful comments for each configuration so you can read the comments if you need more infomation.
- The final configuration your need to setup is for the sitemap plugin, which generate the `sitemap.xml` file for your blog.
    - Open [`ngx-scully-blog/scully.ngx-scully-blog.config.ts`](./scully.ngx-scully-blog.config.ts) file.
    - Update `urlPrefix` property value to your domain url. Normally, this url is: `your-firebase-project-name.web.app`

All the configurations have been setup and you are good to go. Lets deploy your blog to Firebase!

### Deploy your blog to Firebase

#### Login to Firebase
- Open your editor's terminal (in **vscode**, use **Ctrl** + **\`** keyboard shortcut). Now you should be inside the project root directory, `ngx-scully-blog` directory.
- Lets install Firebase CLI globaly by enter following command: `npm install -g firebase-tools`. 

    *If errors happen, you may need to run `sudo npm install -g firebase-tools` instead, then you need to input your operation system password.*

- Run command `firebase login` to login to Firebase.
- Input `y` to let Firebase collect CLI usage and error reporting information, if not, input `n`.
    ![firebase-login](./src/assets/docs/firebase-login.png)
- A new browser window will be opened and you can choose the right Firebase account to login (you may need to input email and password in some cases).
    ![firebase-choose-account](./src/assets/docs/firebase-choose-account.png)
- Next, click on "Allow" button to give Firebase CLI permissions to access to your Firebase account.
    ![firebase-allow-permissions](./src/assets/docs/firebase-allow-permissions.png)

Then you would see a success page like below.
    ![firebase-success-page](./src/assets/docs/firebase-success-page.png)

Go back to your editor's terminal. You should see a successful message like below.
    ![firebase-login-ok](./src/assets/docs/firebase-login-ok.png)

#### Init your project
- In the editor's terminal, run the command `firebase init` to initiate your project.
- Firebase CLI will ask you that **Which Firebase CLI features do you want to set up for this directory? Press Space to select features, then Enter to confirm your choices**:
    - Use arrow down key to move the cursor to **Hosting: Configure and deploy Firebase Hosting sites** option.
    - Press Space to select this option.
    ![firebase-select-features](./src/assets/docs/firebase-select-features.png)
    - Press Enter to continue.
- Project setup, Firebase CLI will ask you some questions:
    - Please select an option: Select **Use an existing project** option to use the Firebase project your created earlier and hit enter. 
    ![firebase-use-existing](./src/assets/docs/firebase-use-existing.png) 
    - Select a default Firebase project for this directory: Select the project name you created earlier and hit enter.
- Hosting setup, Firebase CLI will ask you some questions:
    - What do you want to use as your public directory?: Input **dist/static** and hit enter.
    - Configure as a single-page app (rewrite all urls to /index.html)?: Input **n** for No and hit enter
    - File dist/static/404.html already exists. Overwrite?: Input **n** for No and hit enter.
    ![firebase-hosting-setup](./src/assets/docs/firebase-hosting-setup.png) 
    - File dist/static/index.html already exists. Overwrite?: Input **n** for No and hit enter.
    - Final result:
    ![firebase-hosting-setup](./src/assets/docs/firebase-hosting-setup.png) 

Ok, now you are ready to deploy your blog to Firebase.

#### Deploy to Firebase hosting
In the code editor's terminal, inside the project root directory, run the command `npm run scully:deploy`.

The result will be like this:
![firebase-deploy-success](./src/assets/docs/firebase-deploy-success.png) 

**Note**: Your blog url is `your-firebase-project.web.app`. In my case, it is `ngx-scully-blog.web.app`

Congrats, your blog has been online, everyone can see it now.

## Write your first blog post
 
### Create a markdown file
Your blog posts will be written in markdown format and stored in `ngx-scully-blog/blog` directory. 

- First, open `ngx-scully-blog` in code editor and create `my-first-blog-post.md` inside `ngx-scully-blog/blog` directory.
- Open `ngx-scully-blog/blog/my-first-blog-post.md` file.
- At the very beginning of the file, add the content below 
    ```
    ---
    title: My first blog post
    description: This is my first blog post description
    published: true
    keywords: blog, blog post, my first blog post
    image: assets/images/my-first-blog-post/hello-world.jpg
    categories: uncategorized
    date: 2020-09-20
    ---
    ```

    The meaning of the fields:
    - **title** is the title of your post.
    - **description** is the short description of your post.
    - **published** is true or false, determine whether to publish your post or not.
    - **keywords** are phrases that discribe what are your post about, separated by comma. For example: "angular, frontend programming, javascript programming"
    - **image** is the image that is displayed in the preview section when you share your post on social networks. 
    - **categories** are categories that you post belong, seperated by comma. Each category is a category key in each category item defined in [`ngx-scully-blog/configuration/advanced/categories.ts`](./configuration/advanced/categories.ts). Uncategorized is the category created by default.
    - **date** is the publish date of your post, in YYYY-MM-DD format, for example, 2020-09-20.
- Next, lets write your post content. Add the content below to your markdown file.
    ```
    # My first blog post

    ![hello-world-img](assets/images/my-first-blog-post/hello-world.jpg)

    Welcome to my first blog post.
    ```

### Prepare post images
I created `ngx-scully-blog/src/assets/images/my-first-blog-post` and added `hello-world.jpg` image. In your future posts, you have to add your own images.

**Note**: 
- All images of your blog are put under `ngx-scully-blog/src/assets/images` directory. 
- You should group your images of a post into a directory has the same name as your mardown file, for example, `ngx-scully-blog/src/assets/images/my-first-blog-post` directory. 
- Example of using your images in markdown files:
    - Image in the post's header: `image: assets/images/my-first-blog-post/hello-world.jpg`
    - An image in the post's content: `![hello-world-img](assets/images/my-first-blog-post/hello-world.jpg)`.

Final result includes the markdown file and images:
![first-post](./src/assets/docs/first-post.png) 

### Preview and deploy your post
When you finish your post: 
- Run `npm run scully:preview` to preview your new post. After this command run success, go to [localhost:1668/blog](http://localhost:1668/blog), you can see your new post is added.
- Run `npm run scully:deploy` to deploy your new post to Firebase.

## Useful tips

### Writing and publishing process
- Write your post in markdown file, which put under `ngx-scully-blog/blog` directory.
- Prepare your post's images, which put under `ngx-scully-blog/src/assets/images`.
- Preview with `npm run scully:preview` command, then go to [localhost:1668/blog](http://localhost:1668/blog)
- Deploy to Firebase with `npm run scully:deploy` command.

### Code highlighting
Your code in code blocks will be highlighted automatically. For example,

```html
<div>
    <h3>HTML code block</h3>
</div>
```

```typescript
export class Userservice {
    constructor(private authService: AuthServcie) {

    }
}
```

### Compress your image
Compress your images with [tinypng](https://tinypng.com) before use it in your post, so your blog will load faster.

### Facebook sharing debugging
Your new post may not have preview section when sharing on Facebook. Go to [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug), paste the post url and fetch your post information several times, then share your post again.

## Advanced usage
You can read more advanced usage [here](./ADVANCED-USAGE.md)

## Still have questions?
For any futher questions, just creat a new issue. Thank you.

## Altenatives
- [hackernoon.com](https://hackernoon.com)
- [wordpress.com](https://wordpress.com)
- [blogger.com](https://blogger.com)
- [medium.com](https://medium.com)

## References
- [Angular](https://angular.io)
- [Scully.io](https://scully.io)
- [Getting started with Scully](https://nartc-scully.netlify.app/blog/getting-started-scully)
- [Introducing Scully: Angular + JAMStack](https://www.youtube.com/watch?v=Sh37rIUL-d4)
- [Start Bootstrap Resume theme](https://startbootstrap.com/themes/resume)
- [Start Bootstrap Blog Home template](https://startbootstrap.com/templates/blog-home)
- [Start Bootstrap Blog Post template](http://startbootstrap.com/templates/blog-post)