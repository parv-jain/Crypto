import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { HoldingsProvider } from '../../providers/holdings/holdings';

/**
 * Generated class for the AddHoldingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


 @IonicPage({
     defaultHistory: ['HomePage']
 })
 @Component({
     selector: 'page-add-holding',
     templateUrl: 'add-holding.html'
 })
 export class AddHoldingPage {

     private cryptoUnavailable: boolean = false;
     private checkingValidity: boolean = false;

     private noConnection: boolean = false;

     private cryptoCode: string;
     private displayCurrency: string;
     private amountHolding;

     constructor(private navCtrl: NavController, private holdingsProvider: HoldingsProvider) {

     }

     addHolding(): void {

         this.cryptoUnavailable = false;
         this.checkingValidity = true;

         let holding = {
             crypto: this.cryptoCode,
             currency: this.displayCurrency,
             amount: this.amountHolding || 0
         };

         this.holdingsProvider.verifyHolding(holding).subscribe((result) => {

             this.checkingValidity = false;

             if(result.success){
                 this.holdingsProvider.addHolding(holding);
                 this.navCtrl.pop();
             } else {
                 this.cryptoUnavailable = true;
             }

         }, (err) => {

             this.noConnection = true;

             this.checkingValidity = false;

         });

     }

 }
