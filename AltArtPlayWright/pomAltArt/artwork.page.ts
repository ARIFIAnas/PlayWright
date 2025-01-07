import { Page, expect,Locator } from "@playwright/test";
import altart from "../altArt.json";

export class ArtworkPage {
    readonly page: Page;
    readonly linkArtworks: Locator;
    readonly linkAddArtwork: Locator;
    readonly optionList: Locator;
    readonly description: Locator;
    readonly PrimarySalename: Locator;
    readonly OwnedByname: Locator;
    readonly StyleOfArt:  Locator;
    readonly DateChoice:  Locator;
    readonly Physical:  Locator;
    readonly CreationDate:  Locator;
    constructor(page: Page) {
        this.page = page;
        this.CreationDate = page.locator('div').filter({ hasText: /^Created On \*Choose Date$/ }).getByRole('button');
        this.optionList = page.getByRole('button', { name: 'Select Edition Type' });
        this.description = page.locator('.ce-paragraph');
        this.linkAddArtwork = page.getByRole('link', { name: 'Add Artwork' });
        this.linkArtworks = page.getByRole('link', { name: 'Artworks' });
        this.DateChoice = page.getByRole('button', { name: 'Choose Date' });
        this.OwnedByname = page.locator('[id="headlessui-combobox-input-\\:r6\\:"]');
        this.PrimarySalename = page.locator('[id="headlessui-combobox-input-\\:r5\\:"]');
        this.StyleOfArt = page.locator('div').filter({ hasText: /^Select Style$/ }).first();
        this.Physical = page.locator('div').filter({ hasText: /^YesNo$/ }).getByLabel('No');
      }

      async addArtwork(){
        // go to page artwork
        await this.linkArtworks.click();
        // go to a new page to add an artwork
        await this.linkAddArtwork.click();
        //await expect (this.page.locator('div').filter({ hasText: 'Rai0nOwner' }).nth(3)).toBeVisible()

        // Give a name to the artwork
        await this.page.getByPlaceholder('Text here...').fill(altart.Artworkname);

        // choose the edition you want
        await this.optionList.click();
        await this.page.getByRole('option', { name: altart.Editions }).click();

        // Add the description about your art
        await this.description.fill(altart.Description);

        // the current price of your art and the currency you want 
        await this.page.locator('#current_price').fill(altart.CPrice);
        await this.page.locator('.css-1aagls8-control').first().click();
        await this.page.getByRole('option', { name: altart.Crypto }).click();
        await this.page.locator('#primary_sale_price').fill(altart.PPrice);

        // the date of the primary sale + the Primary sale buyer's name
        await this.DateChoice.first().click();
        await this.page.getByRole('gridcell', { name: altart.Date}).click();
        await this.PrimarySalename.fill(altart.PrimarySaleBuyer);
        //await this.page.waitForTimeout(5000);
        
        // Upload the Artwork
        //await this.page.getByText('Select File').click();
        const filepath = 'D:/New project PlayWright/Artwork/Palestina.png';
        await this.page.setInputFiles('input[type="file"]',filepath);
        //await this.page.waitForTimeout(5000);

        //Style of your Art work ****
        await this.StyleOfArt.click();
        await this.page.getByRole('option', { name: altart.StyleOfArt }).locator('label').click();
        await this.page.locator('.mt-6 > .undefined').first().click();
        await this.page.getByRole('option', { name: 'Meme' }).locator('label').click();

        //NFT Genesis
        await this.page.locator('form div').filter({ hasText: 'Select NFT Genesis' }).nth(1).click();
        await this.page.getByRole('option', { name: '2023' }).locator('label').click();
        
        // Supply
        await this.page.locator('form div').filter({ hasText: 'Select Supply' }).nth(1).click();
        await this.page.getByRole('option', { name: '- 24 /year' }).click();

        // Collaborator's Gmail
        await this.page.locator('[id="react-select-7-input"]').fill("daoidhaochz@gmail.com");
        //await this.page.waitForTimeout(5000);
        await this.page.locator('#react-select-7-listbox').click();

        // Owner Name
        await this.OwnedByname.fill('Raion');

        // The market place
        await this.page.getByRole('button', { name: 'Select Marketplace' }).click();
        await this.page.getByRole('option', { name: 'OpenSea' }).click();
        await this.page.getByPlaceholder('Enter URL Link').fill(altart.MarketPlaceLink);

        // Date of Mine
        await this.DateChoice.filter({ hasText: 'Choose Date' }).nth(0).click();
        await this.page.getByRole('gridcell', { name: altart.DateM }).click();

        // Creation date
        await this.CreationDate.click();
        await this.page.getByRole('gridcell', { name: altart.DateC }).nth(1).click();

        // Copyright
        await this.page.getByRole('button', { name: 'Select copyright' }).click();
        await this.page.getByRole('option', { name: 'COPY RIGHT 1 Lorem ipsum' }).click();
        
        // Artist Royalty
        await this.page.getByText('Yes').first().click();
        await this.page.locator('#artist_loyalty_percentage').fill('10');
        
        // Physical piece
        await this.page.getByText('No').nth(4).click();

        // Save as draft or Publish
        //await this.page.getByRole('button', { name: 'Save as a draft' }).isVisible();
        //await this.page.getByRole('button', { name: 'Publish' }).click();

    }
}