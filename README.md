# ngx-scully-blog

**ngx-scully-blog** is a simple blog made for developers that is easy to setup, support SEO, and more advanced features like Google Adsense, Google Analytics, Facebook Pixel, and many more.

> Blogging on Notion, generating a static site with Angular, Scully, and hosting on Firebase.

![ngx-scully-blog-demo.jpg](./ngx-scully-blog-demo.jpg)

## Getting started

Fork this project and then clone the forked project

```bash
git clone https://github.com/<your_username>/ngx-scully-blog.git && cd ngx-scully-blog
```

Install dependencies

```bash
npm install
```

Export the default Notion API key. This is the key I created for demo purpose, you will setup with your own Notion later.

```bash
export NOTION_API_KEY=secret_daYuK8nuNeFvxWrn0dIhDwZnGXyMN3fAdFG97gY5i3l
```

Run Scully

```bash
npm run scully:preview
```

The demo blog with default data will be available at [http://localhost:1668](http://localhost:1668)

## Make it your own

### Setup Firebase

- Go to [https://console.firebase.google.com](https://console.firebase.google.com) and login with your Google account.
- After login, click on **Add project** button to create a new project.
- Input your project name and click **Continue**.

    **Note**: if your project name is `ngx-scully-blog`, your blog address will be `ngx-scully-blog.web.app`. You can setup your custom domain as well.

- Disable option **Enable Google analytics for this project** and click **Create project**

### Setup Notion

- Register or login at [notion.so](https://notion.so)
- Create an integration at [notion.so/my-integrations](https://notion.so/my-integrations). Remember to copy the secret token!
- Create a Notion databse with the same properties with [this database](https://ngx-scully-blog.notion.site/1711090f063e401fa0840b3ce44a757b?v=111d7e3df3b942e7ac25185c39503811) (or you can choose duplicate this one)

  > - Title: Type Text
  > - Status: Type Select (Published, Unlisted, WIP, Deleted)
  > - Slug: Type Text (have no spaces)
  > - Description: Type Text
  > - Tags: Type Multi-select (create your own tags)
  > - Published At: Type Created time

- Go to the created database, and share it with the integration (Share → Select the integration in the Invite dropdown). Don’t forget the database id in the URL. It’s a series of characters after the last slash and before the question mark.
  > Here’s a reference: https://www.notion.so/{USER}/**{DATABASE_ID}**?{someotherirrelevantstuff} If you only have 1 ID before the question mark in the URL, then the first ID is the Database ID i.e. https://www.notion.so/**{DATABASE_ID}**?{OtherIdThatDoesNotMatter}

### Personalize your blog

- Update the config values in `ngx-scully-blog/src/app/config/site-configs.ts` file. I put comments for each config so you can read the comments if you need more infomation.
- Update favicon at `ngx-scully-blog/src/`

### Deploy your blog to Firebase

#### Login to Firebase

- Open your terminal and go to the project root directory, `ngx-scully-blog` directory.
- Lets install Firebase CLI globaly by enter following command: `npm install -g firebase-tools`.

    *If errors happen, try `sudo npm install -g firebase-tools` instead, then you need to input your operation system password.*

- Run command `firebase login` to login to Firebase.
- Input `y` to let Firebase collect CLI usage and error reporting information, if not, input `n`.
- A new browser window will be opened and you can login to Firebase here.
- Next, click on "Allow" button to give Firebase CLI permissions to access to your Firebase account.

Then you would see a success page notify that you are logged in successful.

Go back to your editor's terminal. You should will see a successful message also.

#### Init your project

- In the previous terminal, run the command `firebase init` to initiate your project.
- Firebase CLI will ask you that **Which Firebase CLI features do you want to set up for this directory? Press Space to select features, then Enter to confirm your choices**:
  - Use arrow down key to move the cursor to **Hosting: Configure and deploy Firebase Hosting sites** option.
  - Press Space to select this option.
  - Press Enter to continue.
- Project setup, Firebase CLI will ask you some questions:
  - Please select an option: Select **Use an existing project** option to use the Firebase project your created earlier and hit enter.
  - Select a default Firebase project for this directory: Select the project name you created earlier and hit enter.
- Hosting setup, Firebase CLI will ask you some questions:
  - What do you want to use as your public directory?: Input **dist/static** and hit enter.
  - Configure as a single-page app (rewrite all urls to /index.html)?: Input **n** for No and hit enter.
  - Set up automatic builds and deploys with GitHub?: Input **n** for No and hit enter.
  - File dist/static/404.html already exists. Overwrite?: Input **n** for No and hit enter.
  - File dist/static/index.html already exists. Overwrite?: Input **n** for No and hit enter.

Ok, now you are ready to deploy your blog to Firebase.

#### Deploy to Firebase hosting

In the previous terminal, inside the project root directory, run the command `npm run scully:build-and-deploy`.

Congrats, your blog has been online, everyone can see it now.

**Note**: Your blog url is `your-firebase-project.web.app`. In my case, it is `ngx-scully-blog.web.app`

## Write your first blog post

### Create a markdown file

Your blog posts will be written in markdown format and stored in `ngx-scully-blog/blog` directory.

- First, open `ngx-scully-blog` in code editor and create `my-first-blog-post.md` inside `ngx-scully-blog/blog` directory.
- Create `ngx-scully-blog/blog/my-first-blog-post.md` file.
- At the very beginning of the file, add the content below

    ```
    ---
    title: My first blog post
    description: This is my first blog post description
    published: true
    keywords: blog, blog post, my first blog post
    image: assets/images/my-first-blog-post/first-post-image.jpg
    categories: uncategorized
    date: 2020-03-18
    ---
    ```

    The meaning of the fields:
  - **title** is the title of your post.
  - **description** is the short description of your post.
  - **published** is true or false, determine whether to publish your post or not.
  - **keywords** are phrases that discribe what are your post about, separated by comma. For example: "angular, frontend programming, javascript programming"
  - **image** is the image that is displayed in the preview section when you share your post on social networks.
  - **categories** are categories that you post belong, seperated by comma. Each category is a category key in each category item defined in [`ngx-scully-blog/configuration/advanced/categories.ts`](./configuration/advanced/categories.ts). Uncategorized is the category created by default.
  - **date** is the publish date of your post, in YYYY-MM-DD format, for example, 2021-03-18.
- Next, lets write your post content. Add the content below to your markdown file.

    ```
    # My first blog post

    ![first-post-image](assets/images/my-first-blog-post/first-post-image.jpg)

    Welcome to my first blog post.
    ```

### Prepare post images

I created `ngx-scully-blog/src/assets/images/my-first-blog-post` directory and added `first-post-image.jpg` image. In your future posts, you have to add your own images.

**Note**:

- All images of your blog are put under `ngx-scully-blog/src/assets/images` directory.
- You should group your images of a post into a directory that has the same name as your mardown file, for example, `ngx-scully-blog/src/assets/images/my-first-blog-post` directory.
- Example of using your images in markdown files:
  - Image in the post's header: `image: assets/images/my-first-blog-post/first-post-image.jpg`
  - An image in the post's content: `![first-post-image](assets/images/my-first-blog-post/first-post-image.jpg)`.

### Preview and deploy your post

When you finish your post:

- Run `npm run scully:preview` to preview your new post. After this command run success, go to [localhost:1668](http://localhost:1668), you can see your new post is added.
- Run `npm run scully:build-and-deploy` to deploy your new post to Firebase.

## Useful tips

### Writing and publishing process

- Write your post in markdown file, which put under `ngx-scully-blog/blog` directory.
- Prepare your post's images, which put under `ngx-scully-blog/src/assets/images`.
- Preview with `npm run scully:preview` command, then go to [localhost:1668](http://localhost:1668)
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

## advance plugins

## images upload

### Facebook sharing debugging

Your new post may not have preview section when sharing on Facebook. Go to [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug), paste the post url and fetch your post information several times, then share your post again.

## Advanced usage

You can read more advanced usage [here](./ADVANCED-USAGE.md)

## Still have questions?

For any futher questions, just creat a new issue. Thank you.

# Advanced usage

## Table of contents

- [Manage menus](#manage-menus)
- [Manage categories](#manage-categories)
- [Manage texts](#manage-texts)
- [Google analytics](#google-analytics)
- [Facebook pixel](#facebook-pixel)
- [Logging errors](#logging-errors)

## Manage menus

Blog's menus are managed at [`ngx-scully-blog/configuration/advanced/menus.ts`](./configuration/advanced/menus.ts). Read the comments in the file for more information.

## Manage categories

Blog's categories are managed at [`ngx-scully-blog/configuration/advanced/categories.ts`](./configuration/advanced/categories.ts). Read the comments in the file for more information.

## Manage texts

Blog's texts are managed at [`ngx-scully-blog/configuration/advanced/text.ts`](./configuration/advanced/text.ts). Read the comments in the file for more information.

## Google analytics

Blog's Google analytics ID is managed at [`ngx-scully-blog/configuration/advanced/google-analytics.ts`](./configuration/advanced/google-analytics.ts). Read the comments in the file for more information.

## Facebook pixel

Blog's Facebook pixel ID is managed at [`ngx-scully-blog/configuration/advanced/facebook-pixel.ts`](./configuration/advanced/facebook-pixel.ts). Read the comments in the file for more information.

## Logging errors

Blog's logging is managed at [`ngx-scully-blog/configuration/advanced/logging.ts`](./configuration/advanced/logging.ts). Read the comments in the file for more information.

## References

- [Angular](https://angular.io)
- [Scully.io](https://scully.io)
- [Getting started with Scully](https://nartc-scully.netlify.app/blog/getting-started-scully)
- [Introducing Scully: Angular + JAMStack](https://www.youtube.com/watch?v=Sh37rIUL-d4)
- [Start Bootstrap Resume theme](https://startbootstrap.com/themes/resume)
- [Start Bootstrap Blog Home template](https://startbootstrap.com/templates/blog-home)
- [Start Bootstrap Blog Post template](http://startbootstrap.com/templates/blog-post)
- [DevBlog - Free Bootstrap 4 Blog Template for Developers](https://themes.3rdwavemedia.com/bootstrap-templates/popular/devblog-free-bootstrap-4-blog-template-for-developers/)
