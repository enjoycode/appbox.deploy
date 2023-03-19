import * as System from '/System.js'
import * as PixUI from '/PixUI.js'
import * as AppBoxClient from '/AppBoxClient.js'
import {HomePage} from '/model/View/sys.HomePage'

System.initializeSystem();
AppBoxClient.initializeAppBoxClient();
AppBoxClient.Channel.Init(new AppBoxClient.WebChannel());
PixUI.WebApplication.Run(() => new HomePage());

export {}