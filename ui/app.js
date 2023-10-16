const app = new Vue({
    el:"#app", 
    created(){
        window.addEventListener("message",(event)=>{         
           const i = event.data;
           console.log(i.item);
        })
    },          
    data:{
        bcg: true                 
    },
    methods:{
      entrar:function(){
        console.log("Vue");
        this.bcg = false;
        fetch(`https://${GetParentResourceName()}/btnx`, {
            method:'POST',
            headers:{ 'Content-Type': 'application/json; charset=UTF-8'},
            body: JSON.stringify({ item: "fechar"})
        })
        .then( response => response.json())
        .then( response => console.log(response))
      }
    }
});