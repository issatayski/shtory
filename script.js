AOS.init();

/* QUIZ LOGIC */
let quiz = {1:'',2:'',3:''};
let step = 1;

function selectAnswer(s,val){
    quiz[s]=val;
    nextStep();
}

function nextStep(){
    let current=document.querySelector('.quiz-step[data-step="'+step+'"]');
    current.classList.remove('active');

    step++;

    let next=document.querySelector('.quiz-step[data-step="'+step+'"]');
    if(next) next.classList.add('active');

    updateBar();
}

function updateBar(){
    let percent=(step-1)/4*100;
    document.getElementById('quizBar').style.width=percent+'%';
}

function sendQuiz(){
    let phone=document.getElementById('phone').value;

    let text=`Подбор дизайна:%0AСтиль: ${quiz[1]}%0AПомещение: ${quiz[2]}%0AИзделие: ${quiz[3]}%0AТелефон: ${phone}`;

    window.open(`https://wa.me/77000000000?text=${text}`,'_blank');
}
