console.log('hello,baobao!');

if('serviceWorker' in navigator){
    window.addEventListener('load',()=>{
        navigator.serviceWorker.register('./service-worker.js')
            .then((registration)=>{
                console.log("serviceWorker registed!");
            }).catch((error)=>{
                console.log("serviceWorker registed error!");
            });
    })
}