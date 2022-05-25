import { Injectable } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { Router } from "@angular/router";
import {
  BLOG_DEFAULT_COVER,
  BLOG_KEYWORDS,
  BLOG_ROOT_URL,
  BLOG_DESCRIPTION,
  BLOG_TITLE,
  FIRST_NAME,
  LAST_NAME,
} from "@config";
import {
  JsonLdService,
  SeoSocialShareData,
  SeoSocialShareService,
} from "ngx-seo";

export interface SEOData {
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

  async setData(data?: Partial<SEOData>) {
    const convertedData = this.convertToSEOSocialShareData(data || {});
    
    this.title.setTitle(convertedData?.title as string);
    this.seoSocialShareService.setData(convertedData);

    const jsonLdObject = this.jsonLdService.getObject(convertedData?.type as string, {
      title: convertedData?.title as string,
      url: convertedData?.url as string,
      description: convertedData?.description as string,
      image: convertedData?.image as string,
    });
    this.jsonLdService.setData(jsonLdObject);
  }

  private convertToSEOSocialShareData(data: Partial<SEOData>): SeoSocialShareData {
    return {
      ...data,
      title: data.title ? BLOG_TITLE + " - " + data.title : BLOG_TITLE,
      image: data.image
        ? data.image
        : BLOG_ROOT_URL + "/" + BLOG_DEFAULT_COVER,
      keywords: data.keywords || BLOG_KEYWORDS,
      description: data.description || BLOG_DESCRIPTION,
      url: BLOG_ROOT_URL + this.router.url,
      type: data.type || "website",
      author: FIRST_NAME + " " + LAST_NAME,
    };
  }
}
