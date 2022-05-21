import { Injectable } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { Router } from "@angular/router";
import {
  BLOG_DEFAULT_SHARE_IMAGE,
  BLOG_KEYWORDS,
  BLOG_ROOT_URL,
  BLOG_SHORT_DESCRIPTION,
  BLOG_TITLE,
  FIRST_NAME,
  LAST_NAME,
} from "@configuration";
import {
  JsonLdService,
  SeoSocialShareData,
  SeoSocialShareService,
} from "ngx-seo";

export interface SeoData {
  title: string;
  keywords: string;
  description: string;
  image: string;
  published: string;
  modified: string;
  type: string;
}

@Injectable({
  providedIn: "root",
})
export class SeoHelperService {
  constructor(
    private readonly seoSocialShareService: SeoSocialShareService,
    private readonly jsonLdService: JsonLdService,
    private title: Title,
    private router: Router
  ) {}

  async setData(data?: Partial<SeoData>) {
    const convertedData = this.convertToSeoSocialShareData(data || {});
    this.title.setTitle(convertedData.title);
    this.seoSocialShareService.setData(convertedData);

    const jsonLdObject = this.jsonLdService.getObject(convertedData.type, {
      title: convertedData.title,
      url: convertedData.url,
      description: convertedData.description,
      image: convertedData.image,
    });
    this.jsonLdService.setData(jsonLdObject);
  }

  private convertToSeoSocialShareData(
    data: Partial<SeoData>
  ): SeoSocialShareData {
    return {
      ...data,
      title: data.title ? BLOG_TITLE + " - " + data.title : BLOG_TITLE,
      image: data.image
        ? BLOG_ROOT_URL + "/" + data.image
        : BLOG_DEFAULT_SHARE_IMAGE,
      keywords: data.keywords || BLOG_KEYWORDS,
      description: data.description || BLOG_SHORT_DESCRIPTION,
      url: BLOG_ROOT_URL + this.router.url,
      type: data.type || "website",
      author: FIRST_NAME + " " + LAST_NAME,
    };
  }
}
