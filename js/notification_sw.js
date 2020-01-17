// // self.addEventListener('push', () =>{
// //     self.ServiceWorkerRegistration.sendNotifiation('test from sw', {}); //{} - options  NOT A FUNCTION
// // });

// self.addEventListener("push", function(e) {
//    var options = {
//       body: "This notification was generated from a push, changed in sw!",
//       icon: "images/example.png",
//       vibrate: [100, 50, 100],
//       data: {
//          dateOfArrival: Date.now(),
//          primaryKey: "2"
//       },
//       actions: [
//          {
//             action: "explore",
//             title: "Explore this new world",
//             icon: "images/checkmark.png"
//          },
//          { action: "close", title: "Close", icon: "images/xmark.png" }
//       ]
//    };
//    e.waitUntil(self.registration.showNotification("Hello world!", options));
// });


var userName;
self.addEventListener("push", function(e) {
    console.log("in push fn in sw");
    var body;
    let flag = false;
 
    if (e.data) {
       body = e.data.text();
       userName = body.subString(0, body.indexOf(" "));
       if(userName.equalsIgnoreCase("you"))
       {
          body = "Warning msg";
       }
       else
       {
          flag = true;
          localStorage.setItem("user", userName);
         body = "sharing live info";
       }

    } else {
       body = "Push message no payload";
    }
 
    console.log("Extracted body : " + body);
 
    var options = {
       body: body,
       icon: "images/notification-flat.png",
       vibrate: [100, 50, 100],
       // sound: 'office_phone.mp3',
       data: {
          dateOfArrival: Date.now(),
          primaryKey: 1
       },
       //actions for warning msgs
       actions: [
         //  {
         //     action: "snooze",
         //     title: "Snooze this new world",
         //     icon: "./snooze.jpg"
         //  },
          {
             action: "go-live",
             title: "Share my location",
             icon: "./location.jpg"
          },
          {
             action: "ignore",
             title: "I don't want any of this",
             icon: "images/xmark.png"
          }
       ]
    };
    console.log("after setting options");
 
    if(flag)
    {
       options.actions = [{
         action: "track",
         title: `Track ${userName}`,
         icon: "./snooze.jpg"
      },
      {
         action: "ignore",
         title: "I don't want any of this",
         icon: "images/xmark.png"
      }]
    }
    const maxVisibleActions = Notification.maxActions;
    if (maxVisibleActions < 3) {
       options.body =
          `This notification will only display ` +
          `${maxVisibleActions} actions.`;
    } else {
       options.body =
          `This notification can display up to ` +
          `${maxVisibleActions} actions.`;
    }
 
    e.waitUntil(
       self.registration.showNotification("Push Notification", options)
    );
    //  You still need to make use of event.waitUntil() to keep the service worker running while your code is busy.
    console.log("sent notification");
 });
 
 self.addEventListener("notificationclick", function(event) {
    const clickedNotification = event.notification;
    clickedNotification.close();
 
    // Do something as the result of the notification click
    // const promiseChain = doSomething();
    // event.waitUntil(promiseChain);
 });
 
 self.addEventListener("notificationclick", function(event) {
    if (!event.action) {
       // Was a normal notification click
       console.log("Notification Click.");
       return;
    }
 
    switch (event.action) {
      //  case "snooze":
      //     console.log("User clicked snooze.");
         //  break;
       case "ignore":
          console.log("User clicked ignore.");
          break;
       case "go-live":
          console.log("User wants to share location.");
          break;
       case "track" :
          console.log("tracking");
          fetchFn();
 
       default:
          console.log(`Unknown action clicked: '${event.action}'`);
          break;
    }
 });
