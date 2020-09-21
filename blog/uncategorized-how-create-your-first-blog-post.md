---
title: How to create your first blog post
description: How to create your first blog post tutorial.
published: true
keywords: blog, blog post, how to create blog post
categories: uncategorized
date: 2020-09-18
image: assets/images/uncategorized-how-create-your-first-blog-post/new-post.jpg
---

# How to create your first blog post

![How to create your first blog post](assets/images/uncategorized-how-create-your-first-blog-post/new-post.jpg)
 
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
    - **keywords** are phrases that discribe what your blog is about, separated by comma. For example: "angular, frontend programming, javascript programming"
    - **image** is the image that is displayed when you share your post on social networks. 
    - **categories** are categories that you post belong, seperated by comma. Each category is a category key in each category item defined in [`ngx-scully-blog/configuration/advanced/categories.ts`](./configuration/advanced/categories.ts)
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
- All images of your blog are put under `ngx-scully-blog/src/assets/images` folder. 
- You should group your images of a post into a folder has the same name as your mardown file, for example, `ngx-scully-blog/src/assets/images/my-first-blog-post` directory. 
- Example of using your images in markdown files:
    - In the post header: `image: assets/images/my-first-blog-post/hello-world.jpg`
    - An image in the post's content: `![hello-world-img](assets/images/my-first-blog-post/hello-world.jpg)`.

Final result includes the markdown file and images:
![first-post](assets/docs/first-post.png)

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





