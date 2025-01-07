import { Page, expect,Locator } from "@playwright/test";
import altart from "../altArt.json"

export class ReviewPage{
    readonly page : Page ;
    constructor(page:Page){
        this.page = page;
    }

    async Review(){
        await this.page.locator('div').filter({ hasText: /^palestinaBy Rai0n$/ }).first().click();
        await this.page.getByRole('tab', { name: 'Reviews' }).click();
        await this.page.getByPlaceholder('Title').fill(altart.Title);
        await this.page.getByPlaceholder('Review Detail').fill(altart.RDetail);
        await this.page.getByLabel('Reviews').getByRole('button').click();
    }

}