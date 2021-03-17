import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SeoHelperService } from 'src/app/services';
import { FIRST_NAME, LAST_NAME, PORTFOLIO_INFO } from '../../../../configuration/site-configs';

@Component({
  selector: 'app-portfolio',
  templateUrl: 'portfolio.component.html',
  styleUrls: ['portfolio.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PortfolioComponent {
  constructor(seo: SeoHelperService) { 
    seo.setData({
      title: FIRST_NAME+' '+LAST_NAME+' - '+PORTFOLIO_INFO.JOB_TITLE,
      description: PORTFOLIO_INFO.INTRODUCTION,
      image: PORTFOLIO_INFO.SHARE_IMAGE
    })
  }

}
