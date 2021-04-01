/**
 * Your root url.
 * 
 * Normally, this url is: your-firebase-project-name.web.app
 */
export const ROOT_SITE_URL = 'https://nhannguyendacoder.com'
/**
 * Your first name
 */
export const FIRST_NAME = 'Nhan'
/**
 * Your last name
 */
export const LAST_NAME = 'Nguyen'

export const SOCIAL_LINKS = [
    { title: 'Linkedin', url: 'https://linkedin.com/in/nhaancs', icon: ['fab', 'linkedin-in'], size: '1x' },
    { title: 'Github', url: 'https://github.com/nhaancs', icon: ['fab', 'github'], size: '1x' },
    { title: 'Twitter', url: 'https://twitter.com/nhaancs', icon: ['fab', 'twitter'], size: '1x' },
    { title: 'Facebook', url: 'https://facebook.com/nhaancs', icon: ['fab', 'facebook-f'], size: '1x' },
]
/**
 * Your email address.
 */
export const EMAIL = 'nhanpublic@gmail.com'
/**
 * Your copyright text, in HTML format
 */
export const COPYRIGHT_CONTENT = `Copyright &copy; ${new Date().getFullYear()} Nhan Nguyen Da Coder. All Rights Reserved.`

/**
 * Your Information that are displayed on the blog
 */
export const PORTFOLIO_INFO = {
    /**
     * Tell your audience what do you do. 
     * For example, "I help companies develop high performance, scalable and maintainable Angular applications".
     */
    INTRODUCTION: 'I help companies develop high performance, scalable and maintainable Angular applications.',
    /**
     * What is your job title. 
     * For example, "Senior Angular Developer".
     */
    JOB_TITLE: 'Senior Angular Developer',
    /**
     * Your profile image url. Should be a square image.
     * 
     * You can provide an image link here, or add an image to 
     * `ngx-scully-blog/src/assets/images` folder and provide a link as following format  
     * `https://yourdomain.com/assets/images/your-image-name.jpg`. For example, 
     * `https://yourdomain.com/assets/images/profile.jpg`
     */
    PROFILE_IMAGE: 'assets/images/profile.jpg',
}

/**
 * Default information for your blog
 */
export const BLOG_INFO = {
    /**
     * An description that is displayed in the preview section when you post your blog home url on social networks.
     * Tell people who you are and what is your blog about.
     */
    DESCRIPTION: 'Xin chào, mình là Nhân Nguyễn. Mình viết blog hướng dẫn lập trình web dành cho người tự học lập trình.',
    /**
     * An image that is displayed in the preview section when you post your blog home url on social networks.
     * 
     * You can provide an image link here, or add an image to 
     * `ngx-scully-blog/src/assets/images` folder and provide a link as following format
     * `https://yourdomain.com/assets/images/your-image-name`. For example, 
     * `https://yourdomain.com/assets/images/preview.jpg`
     */
    SHARE_IMAGE: 'assets/images/nhan-nguyen-da-coder.jpg',
    /**
     * Phrases that discribe what your blog is about, separated by comma.
     * For example: "angular, frontend programming, javascript programming"
     */
    KEYWORDS: 'tu hoc lap trinh, lap trinh, programming, angular',
    /**
     * Default title of your blog. This should be your blog name or your nick name. 
     * 
     * For example: Nhan Nguyen Da Coder, David blog
     */
    DEFAULT_TITLE: 'Nhan Nguyen Da Coder'
}
