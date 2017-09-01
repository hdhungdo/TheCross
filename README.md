## THE CROSS

Install Angular 4, Ionic 3 (NodeJS and npm)

After clone the project, try to run:
```bash
ionic cordova prepare
```
Then keep follow for adding dependencies, plugin and platform folder 

Follow instruction bellow iff getting any error.

Error:
```bash
Class 'Tabs' incorrectly implements interface 'NavigationContainer'. Types of property 'parent' are 
            incompatible. Type 'NavControllerBase' is not assignable to type 'NavController'. Types of property 'popTo' 
            are incompatible. Type '(indexOrViewCtrl: any, opts?: NavOptions, done?: () => void) => Promise<any>' is not 
            assignable to type '(page: string | Page | ViewController, params?: any, opts?: NavOptions, done?: Function) 
            => Promi...'. Types of parameters 'done' and 'opts' are incompatible. Type 'NavOptions' is not assignable to 
            type '() => void'. Type 'NavOptions' provides no match for the signature '(): void'. 
```
Fix this by taking the params argument out of the popTo() declaration on line 466 of ionic-angular/navigation/nav-controller.d.ts. 
```bash
abstract popTo(page: Page | string | ViewController, params?: any, opts?: NavOptions, done?: Function): Promise<any>;
To
abstract popTo(page: Page | string | ViewController, opts?: NavOptions, done?: Function): Promise<any>;
```
Error:
```bash
Class 'Subject<T>' incorrectly extends base class 'Observable<T>'. Types of property 'lift' are 
            incompatible. Type '<R>(operator: Operator<T, R>) => Observable<T>' is not assignable to type '<R>(operator: 
            Operator<T, R>) => Observable<R>'. Type 'Observable<T>' is not assignable to type 'Observable<R>'. Type 'T' 
            is not assignable to type 'R'. 
```
Fix this by run:
```bash
npm install typescript@2.4.0
```

Command Line for running project
```bash
'ionic serve' for web mode
OR
'ionic serve --l' for ionic lab mode
OR
'ionic cordova run android --prod' for android simulator (Make sure android SDK was installed)
OR
'ionic cordova run ios --prod'
```

