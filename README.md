# TempSensors-Dashboard

Simple responsive dashboard which allows you to check all the temperatures in your home - created using Blebox's api ([here](https://technical.blebox.eu/openapi_tempsensor/openAPI_tempSensor_20210118.html)) and Blebox's tempSensor devices.





**A Small thing before assigning the address:**

> TempSensor can change its address if the power has been turned off so make sure you've assigned ip address per mac.

> Each device has dhcp turned on automatically and you can't set the address manually in its configuration.



## Usage:

Install dependencies first

```
 npm i
```

## Config file


Add your temperature sensor ip address and assign the name in the main config file [ here](/config/ipList.json).



I also added firebase integration ([read about it here](/firebase/adminJSON.txt)) to count usage of the app but you can add anything you want 🤷‍♂️




Now it's time to start our server : )

```
 npm start
```

https://user-images.githubusercontent.com/20336369/152955629-f8736ff3-22f2-45e2-810f-b9ffe05a0bab.mp4
