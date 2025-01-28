
const buttons = document.querySelectorAll('button')
buttons.forEach(function(currentBtn){
  currentBtn.addEventListener('click', handleEvent)
})

function handleEvent(){
    drum = this.className.split(" ")[0];
    makeSound(drum);
    buttonAnimation(drum)
}

document.addEventListener("keydown", function(event){
    makeSound(event.key)
    buttonAnimation(event.key)
})

function makeSound(drum){
    switch(drum){
        case 'w':
            new Audio('./sounds/tom-1.mp3').play();
            break;
        case 'a':
            new Audio('./sounds/tom-2.mp3').play();
            break;
        case 's':
            new Audio('./sounds/tom-3.mp3').play();
            break;
        case 'd':
            new Audio('./sounds/tom-4.mp3').play();
            break;
        case 'j':
            new Audio('./sounds/crash.mp3').play();
            break;
        case 'k':
            new Audio('./sounds/kick-bass.mp3').play();
            break;
        case 'l':
            new Audio('./sounds/snare.mp3').play();

    }
}

function buttonAnimation(currentKey){
    buttons.forEach(el => el.classList.remove('pressed'))
    btn =  document.querySelector("."+currentKey)
    btn.classList.add('pressed');
    setTimeout(function(){
        btn.classList.remove('pressed');
    }, 1000)
}