var count=0,
    maxTimes=48,
    intervalId,
    isRunning=false;

// Criar contador na tela
var counterDiv=document.createElement('div');
counterDiv.id='contadorPassagem';
counterDiv.textContent='Passadas: 0 / '+maxTimes;
counterDiv.style.position='fixed';
counterDiv.style.top='10px';
counterDiv.style.left='10px';
counterDiv.style.padding='10px 15px';
counterDiv.style.background='rgba(0,0,0,0.7)';
counterDiv.style.color='white';
counterDiv.style.fontSize='16px';
counterDiv.style.borderRadius='6px';
counterDiv.style.zIndex='2000';
document.body.appendChild(counterDiv);

function updateCounter(){ 
    counterDiv.textContent='Passadas: '+count+' / '+maxTimes;
}

function createButton(text,onClick,top){
    var button=document.createElement('button');
    button.textContent=text;
    button.style.position='fixed';
    button.style.top=top+'px';
    button.style.right='10px';
    button.style.zIndex='2000';
    button.style.padding='10px';
    button.style.backgroundColor=text==='Iniciar'?'#4CAF50':(text==='Parar'?'#F44336':'#FFC107');
    button.style.color='white';
    button.style.border='none';
    button.style.borderRadius='5px';
    button.style.cursor='pointer';
    document.body.appendChild(button);
    button.addEventListener('click',onClick);
}

function openIAInNewTab(){
    alert("Por favor, copie o seguinte link e cole em uma guia anônima:\n\nhttps://www.gauthmath.com/");
    window.open('https://www.gauthmath.com/','_blank');
}

function openHowToUse(){
    window.open('https://pastebin.com/raw/nHA4919C','_blank');
}

function startInterval(){
    isRunning=true;
    var intervalMillis=prompt("Em quantos milissegundos você quer passar de página?");
    intervalMillis=parseInt(intervalMillis,10);

    if(isNaN(intervalMillis)||intervalMillis<=0){
        alert("Valor inválido. Será 1000 ms.");
        intervalMillis=1000;
    }

    var event=new KeyboardEvent('keydown',{key:'ArrowRight',code:'ArrowRight',keyCode:39,which:39,bubbles:true});

    intervalId=setInterval(function(){
        document.dispatchEvent(event);
        count++;
        updateCounter();

        if(count>=maxTimes){
            clearInterval(intervalId);
            alert("Terminou!");
            isRunning=false;
        }
    },intervalMillis);
}

function stopInterval(){
    clearInterval(intervalId);
    isRunning=false;
    alert("Script parado!");

    var event=new KeyboardEvent('keydown',{key:'Escape',code:'Escape',keyCode:27,which:27,bubbles:true});
    for(var i=0;i<50;i++){
        setTimeout(function(){ document.dispatchEvent(event); },10*i);
    }
}

createButton('Iniciar',function(){
    if(!isRunning){
        count=0;
        updateCounter();
        startInterval();
    } else {
        alert("Já está rodando!");
    }
},60);

createButton('Parar',stopInterval,100);
createButton('IA',openIAInNewTab,140);
createButton('Como Usar',openHowToUse,180);
