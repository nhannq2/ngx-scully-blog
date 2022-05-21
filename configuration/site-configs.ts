// ================================================================================
// Personal information

// Your first name
export const FIRST_NAME = "Nhan";
// Your last name
export const LAST_NAME = "Nguyen";
// Your email address.
export const EMAIL = "nhanpublic@gmail.com";

export const SOCIAL_LINKS = [
  {
    title: "Linkedin",
    url: "https://linkedin.com/in/nhaancs",
    icon: ["fab", "linkedin-in"],
    size: "1x",
  },
  {
    title: "Github",
    url: "https://github.com/nhaancs",
    icon: ["fab", "github"],
    size: "1x",
  },
  {
    title: "Twitter",
    url: "https://twitter.com/nhaancs",
    icon: ["fab", "twitter"],
    size: "1x",
  },
  {
    title: "Facebook",
    url: "https://facebook.com/nhaancs",
    icon: ["fab", "facebook-f"],
    size: "1x",
  },
];

// Introduce who you are, what are you doing
export const SHORT_INTRODUCTION = "Hi, my name is Nhan (Nathan), I'm a fullstack developer."

/**
 * Your profile image url. Should be a square image.
 *
 * You can provide an image link here, or add an image to
 * `ngx-scully-blog/src/assets/images` folder and provide a link as following format
 * `https://yourdomain.com/assets/images/your-image-name.jpg`. For example,
 * `https://yourdomain.com/assets/images/profile.jpg`
 */
export const PROFILE_IMAGE = "assets/images/profile.jpg"

// ================================================================================
// Blog information

// Your root url. Normally, this url is: your-firebase-project-name.web.app/blog
export const BLOG_ROOT_URL = "https://nhannguyendacoder.com/blog";
export const BLOG_TITLE = "Nhan Nguyen Blog"
// An description that is displayed in the preview section when home page is shared on social networks.
export const BLOG_SHORT_DESCRIPTION =
"Hi, my name is Nhan (Nathan), I'm a fullstack developer."
export const BLOG_KEYWORDS =
"tu hoc lap trinh, lap trinh, programming, angular, golang, go, javascript, typescript"
/**
* An image that is displayed in the preview section when you share your home page on social networks.
*
* You can provide an image link here, or add an image to
* `ngx-scully-blog/src/assets/images` folder and provide a link as following format
* `https://yourdomain.com/assets/images/your-image-name`. For example,
* `https://yourdomain.com/assets/images/preview.jpg`
*/
export const BLOG_DEFAULT_SHARE_IMAGE = "assets/images/nhan-nguyen-da-coder.jpg"

//Your copyright text, in HTML format
export const BLOG_COPYRIGHT_CONTENT = `Copyright &copy; ${new Date().getFullYear()} Nhan Nguyen. All Rights Reserved.`;
